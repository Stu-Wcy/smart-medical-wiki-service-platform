package com.example.backend.modules.order.service;

import com.example.backend.common.base.PageResult;
import com.example.backend.modules.order.dto.OrderCreateDTO;
import com.example.backend.modules.order.dto.OrderDetailVO;
import com.example.backend.modules.order.dto.OrderQueryDTO;

public interface OrderService {

    /**
     * 创建订单
     *
     * @param userId 用户ID
     * @param createDTO 创建订单请求
     * @return 订单编号
     */
    String create(Long userId, OrderCreateDTO createDTO);

    /**
     * 取消订单
     *
     * @param userId 用户ID
     * @param orderNo 订单编号
     */
    void cancel(Long userId, String orderNo);

    /**
     * 支付订单
     *
     * @param userId 用户ID
     * @param orderNo 订单编号
     */
    void pay(Long userId, String orderNo);

    /**
     * 发货
     *
     * @param orderNo 订单编号
     */
    void deliver(String orderNo);

    /**
     * 确认收货
     *
     * @param userId 用户ID
     * @param orderNo 订单编号
     */
    void confirm(Long userId, String orderNo);

    /**
     * 查询订单详情
     *
     * @param userId 用户ID
     * @param orderNo 订单编号
     * @return 订单详情
     */
    OrderDetailVO getDetail(Long userId, String orderNo);

    /**
     * 分页查询订单列表
     *
     * @param userId 用户ID
     * @param queryDTO 查询条件
     * @param page 页码
     * @param size 每页大小
     * @return 订单列表
     */
    PageResult<OrderDetailVO> list(Long userId, OrderQueryDTO queryDTO, Integer page, Integer size);

    /**
     * 管理员分页查询订单列表
     *
     * @param queryDTO 查询条件
     * @param page 页码
     * @param size 每页大小
     * @return 订单列表
     */
    PageResult<OrderDetailVO> listForAdmin(OrderQueryDTO queryDTO, Integer page, Integer size);
} 