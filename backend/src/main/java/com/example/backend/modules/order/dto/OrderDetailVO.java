package com.example.backend.modules.order.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Schema(description = "订单详情")
public class OrderDetailVO {

    @Schema(description = "订单ID")
    private Long id;

    @Schema(description = "订单编号")
    private String orderNo;

    @Schema(description = "订单总金额")
    private BigDecimal totalAmount;

    @Schema(description = "实付金额")
    private BigDecimal payAmount;

    @Schema(description = "支付方式：1-微信支付，2-支付宝")
    private Integer payType;

    @Schema(description = "支付方式描述")
    private String payTypeDesc;

    @Schema(description = "订单状态：0-待支付，1-已支付，2-已发货，3-已完成，4-已取消")
    private Integer status;

    @Schema(description = "订单状态描述")
    private String statusDesc;

    @Schema(description = "收货人")
    private String receiver;

    @Schema(description = "联系电话")
    private String phone;

    @Schema(description = "收货地址")
    private String address;

    @Schema(description = "订单备注")
    private String remark;

    @Schema(description = "支付时间")
    private LocalDateTime payTime;

    @Schema(description = "发货时间")
    private LocalDateTime deliveryTime;

    @Schema(description = "完成时间")
    private LocalDateTime completeTime;

    @Schema(description = "创建时间")
    private LocalDateTime createdTime;

    @Schema(description = "订单明细")
    private List<OrderItemVO> items;
} 