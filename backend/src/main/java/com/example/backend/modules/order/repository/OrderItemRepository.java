package com.example.backend.modules.order.repository;

import com.example.backend.modules.order.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long>, JpaSpecificationExecutor<OrderItem> {

    /**
     * 根据订单ID查询订单明细
     *
     * @param orderId 订单ID
     * @return 订单明细列表
     */
    List<OrderItem> findByOrderId(Long orderId);

    /**
     * 根据订单ID列表查询订单明细
     *
     * @param orderIds 订单ID列表
     * @return 订单明细列表
     */
    List<OrderItem> findByOrderIdIn(List<Long> orderIds);
} 