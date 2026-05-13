package com.example.backend.modules.order.repository;

import com.example.backend.modules.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {

    /**
     * 根据订单编号查询订单
     *
     * @param orderNo 订单编号
     * @return 订单信息
     */
    Optional<Order> findByOrderNo(String orderNo);

    /**
     * 根据用户ID和订单编号查询订单
     *
     * @param userId 用户ID
     * @param orderNo 订单编号
     * @return 订单信息
     */
    Optional<Order> findByUserIdAndOrderNo(Long userId, String orderNo);
} 