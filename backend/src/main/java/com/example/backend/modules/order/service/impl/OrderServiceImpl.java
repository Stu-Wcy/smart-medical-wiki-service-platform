package com.example.backend.modules.order.service.impl;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.exception.BusinessException;
import com.example.backend.modules.medicine.entity.Medicine;
import com.example.backend.modules.medicine.repository.MedicineRepository;
import com.example.backend.modules.order.dto.OrderCreateDTO;
import com.example.backend.modules.order.dto.OrderDetailVO;
import com.example.backend.modules.order.dto.OrderItemDTO;
import com.example.backend.modules.order.dto.OrderItemVO;
import com.example.backend.modules.order.dto.OrderQueryDTO;
import com.example.backend.modules.order.entity.Order;
import com.example.backend.modules.order.entity.OrderItem;
import com.example.backend.modules.order.enums.OrderStatusEnum;
import com.example.backend.modules.order.enums.PayTypeEnum;
import com.example.backend.modules.order.repository.OrderItemRepository;
import com.example.backend.modules.order.repository.OrderRepository;
import com.example.backend.modules.order.service.OrderService;
import com.example.backend.modules.user.entity.User;
import com.example.backend.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import jakarta.persistence.criteria.Predicate;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MedicineRepository medicineRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public String create(Long userId, OrderCreateDTO createDTO) {
        // 1. 校验用户是否存在
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException("用户不存在"));

        // 2. 校验药品是否存在，并计算订单总金额
        List<OrderItemDTO> items = createDTO.getItems();
        List<Long> medicineIds = items.stream()
                .map(OrderItemDTO::getMedicineId)
                .collect(Collectors.toList());
        List<Medicine> medicines = medicineRepository.findAllById(medicineIds);
        if (medicines.size() != medicineIds.size()) {
            throw new BusinessException("部分药品不存在");
        }

        Map<Long, Medicine> medicineMap = medicines.stream()
                .collect(Collectors.toMap(Medicine::getId, Function.identity()));

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderItemDTO item : items) {
            Medicine medicine = medicineMap.get(item.getMedicineId());
            if (medicine == null) {
                throw new BusinessException("药品不存在");
            }
            BigDecimal subtotal = medicine.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            totalAmount = totalAmount.add(subtotal);

            OrderItem orderItem = new OrderItem();
            orderItem.setMedicineId(medicine.getId());
            orderItem.setMedicineName(medicine.getName());
            orderItem.setMedicineImage(medicine.getImages());
            orderItem.setPrice(medicine.getPrice());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setSubtotal(subtotal);
            orderItems.add(orderItem);
        }

        // 3. 创建订单
        Order order = new Order();
        order.setUserId(userId);
        order.setOrderNo(generateOrderNo());
        order.setTotalAmount(totalAmount);
        order.setPayAmount(totalAmount);
        order.setPayType(PayTypeEnum.fromValue(createDTO.getPayType()));
        order.setStatus(OrderStatusEnum.PENDING_PAYMENT);
        order.setReceiver(createDTO.getReceiver());
        order.setPhone(createDTO.getPhone());
        order.setAddress(createDTO.getAddress());
        order.setRemark(createDTO.getRemark());
        order.setCreatedTime(LocalDateTime.now());
        order = orderRepository.save(order);

        // 4. 保存订单明细
        for (OrderItem orderItem : orderItems) {
            orderItem.setOrderId(order.getId());
            orderItem.setCreatedTime(LocalDateTime.now());
        }
        orderItemRepository.saveAll(orderItems);

        return order.getOrderNo();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void cancel(Long userId, String orderNo) {
        Order order = getOrderByUserIdAndOrderNo(userId, orderNo);
        if (order.getStatus() != OrderStatusEnum.PENDING_PAYMENT) {
            throw new BusinessException("订单状态不允许取消");
        }
        order.setStatus(OrderStatusEnum.CANCELLED);
        order.setUpdatedTime(LocalDateTime.now());
        orderRepository.save(order);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void pay(Long userId, String orderNo) {
        Order order = getOrderByUserIdAndOrderNo(userId, orderNo);
        if (order.getStatus() != OrderStatusEnum.PENDING_PAYMENT) {
            throw new BusinessException("订单状态不允许支付");
        }
        order.setStatus(OrderStatusEnum.PAID);
        order.setPayTime(LocalDateTime.now());
        order.setUpdatedTime(LocalDateTime.now());
        orderRepository.save(order);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deliver(String orderNo) {
        Order order = getOrderByOrderNo(orderNo);
        if (order.getStatus() != OrderStatusEnum.PAID) {
            throw new BusinessException("订单状态不允许发货");
        }
        order.setStatus(OrderStatusEnum.DELIVERED);
        order.setDeliveryTime(LocalDateTime.now());
        order.setUpdatedTime(LocalDateTime.now());
        orderRepository.save(order);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void confirm(Long userId, String orderNo) {
        Order order = getOrderByUserIdAndOrderNo(userId, orderNo);
        if (order.getStatus() != OrderStatusEnum.DELIVERED) {
            throw new BusinessException("订单状态不允许确认收货");
        }
        order.setStatus(OrderStatusEnum.COMPLETED);
        order.setCompleteTime(LocalDateTime.now());
        order.setUpdatedTime(LocalDateTime.now());
        orderRepository.save(order);
    }

    @Override
    public OrderDetailVO getDetail(Long userId, String orderNo) {
        Order order ;
        if (userId == null) {
            order = getOrderByOrderNo(orderNo);
        }else {
             order = getOrderByUserIdAndOrderNo(userId, orderNo);
        }

        List<OrderItem> orderItems = orderItemRepository.findByOrderId(order.getId());
        return buildOrderDetailVO(order, orderItems);
    }

    @Override
    public PageResult<OrderDetailVO> list(Long userId, OrderQueryDTO queryDTO, Integer page, Integer size) {
        // 构建查询条件
        Specification<Order> specification = buildSpecification(userId, queryDTO);
        // 分页查询
        PageRequest pageRequest = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "createdTime"));
        Page<Order> orderPage = orderRepository.findAll(specification, pageRequest);
        // 查询订单明细
        List<Long> orderIds = orderPage.getContent().stream()
                .map(Order::getId)
                .collect(Collectors.toList());
        List<OrderItem> orderItems = orderItemRepository.findByOrderIdIn(orderIds);
        Map<Long, List<OrderItem>> orderItemMap = orderItems.stream()
                .collect(Collectors.groupingBy(OrderItem::getOrderId));
        // 构建返回结果
        List<OrderDetailVO> orderDetailVOs = orderPage.getContent().stream()
                .map(order -> buildOrderDetailVO(order, orderItemMap.get(order.getId())))
                .collect(Collectors.toList());
        
        Page<OrderDetailVO> detailVOPage = new org.springframework.data.domain.PageImpl<>(
            orderDetailVOs, pageRequest, orderPage.getTotalElements());
        return PageResult.build(detailVOPage);
    }

    @Override
    public PageResult<OrderDetailVO> listForAdmin(OrderQueryDTO queryDTO, Integer page, Integer size) {
        return list(null, queryDTO, page, size);
    }

    private Order getOrderByUserIdAndOrderNo(Long userId, String orderNo) {
        return orderRepository.findByUserIdAndOrderNo(userId, orderNo)
                .orElseThrow(() -> new BusinessException("订单不存在"));
    }

    private Order getOrderByOrderNo(String orderNo) {
        return orderRepository.findByOrderNo(orderNo)
                .orElseThrow(() -> new BusinessException("订单不存在"));
    }

    private String generateOrderNo() {
        return String.format("%s%d", LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMddHHmmss")),
                (int) (Math.random() * 1000));
    }

    private OrderDetailVO buildOrderDetailVO(Order order, List<OrderItem> orderItems) {
        OrderDetailVO orderDetailVO = new OrderDetailVO();
        orderDetailVO.setId(order.getId());
        orderDetailVO.setOrderNo(order.getOrderNo());
        orderDetailVO.setTotalAmount(order.getTotalAmount());
        orderDetailVO.setPayAmount(order.getPayAmount());
        orderDetailVO.setPayType(order.getPayType().getValue());
        orderDetailVO.setPayTypeDesc(order.getPayType().getDesc());
        orderDetailVO.setStatus(order.getStatus().getCode());
        orderDetailVO.setStatusDesc(order.getStatus().getDesc());
        orderDetailVO.setReceiver(order.getReceiver());
        orderDetailVO.setPhone(order.getPhone());
        orderDetailVO.setAddress(order.getAddress());
        orderDetailVO.setRemark(order.getRemark());
        orderDetailVO.setPayTime(order.getPayTime());
        orderDetailVO.setDeliveryTime(order.getDeliveryTime());
        orderDetailVO.setCompleteTime(order.getCompleteTime());
        orderDetailVO.setCreatedTime(order.getCreatedTime());

        if (orderItems != null && !orderItems.isEmpty()) {
            List<OrderItemVO> itemVOs = orderItems.stream()
                    .map(this::buildOrderItemVO)
                    .collect(Collectors.toList());
            orderDetailVO.setItems(itemVOs);
        }

        return orderDetailVO;
    }

    private OrderItemVO buildOrderItemVO(OrderItem orderItem) {
        OrderItemVO itemVO = new OrderItemVO();
        itemVO.setMedicineId(orderItem.getMedicineId());
        itemVO.setMedicineName(orderItem.getMedicineName());
        itemVO.setMedicineImage(orderItem.getMedicineImage());
        itemVO.setPrice(orderItem.getPrice());
        itemVO.setQuantity(orderItem.getQuantity());
        itemVO.setSubtotal(orderItem.getSubtotal());
        return itemVO;
    }

    private Specification<Order> buildSpecification(Long userId, OrderQueryDTO queryDTO) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 用户ID
            if (userId != null) {
                predicates.add(criteriaBuilder.equal(root.get("userId"), userId));
            }

            // 订单编号
            if (StringUtils.hasText(queryDTO.getOrderNo())) {
                predicates.add(criteriaBuilder.like(root.get("orderNo"),
                        "%" + queryDTO.getOrderNo() + "%"));
            }

            // 订单状态
            if (queryDTO.getStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), 
                    OrderStatusEnum.fromCode(queryDTO.getStatus())));
            }

            // 收货人
            if (StringUtils.hasText(queryDTO.getReceiver())) {
                predicates.add(criteriaBuilder.like(root.get("receiver"),
                        "%" + queryDTO.getReceiver() + "%"));
            }

            // 联系电话
            if (StringUtils.hasText(queryDTO.getPhone())) {
                predicates.add(criteriaBuilder.like(root.get("phone"),
                        "%" + queryDTO.getPhone() + "%"));
            }

            // 创建时间范围
            if (queryDTO.getStartTime() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("createdTime"),
                        queryDTO.getStartTime()));
            }
            if (queryDTO.getEndTime() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("createdTime"),
                        queryDTO.getEndTime()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
} 