package com.example.backend.modules.order.entity;

import com.example.backend.common.base.BaseEntity;
import com.example.backend.modules.order.enums.OrderStatusEnum;
import com.example.backend.modules.order.enums.PayTypeEnum;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "t_order")
@EqualsAndHashCode(callSuper = true)
public class Order extends BaseEntity {

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "order_no", nullable = false, unique = true)
    private String orderNo;

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "pay_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal payAmount;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "pay_type")
    private PayTypeEnum payType;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status", nullable = false)
    private OrderStatusEnum status;

    @Column(name = "receiver", nullable = false)
    private String receiver;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "remark")
    private String remark;

    @Column(name = "pay_time")
    private LocalDateTime payTime;

    @Column(name = "delivery_time")
    private LocalDateTime deliveryTime;

    @Column(name = "complete_time")
    private LocalDateTime completeTime;
} 