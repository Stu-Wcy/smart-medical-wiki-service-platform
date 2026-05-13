package com.example.backend.modules.order.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Schema(description = "订单明细")
public class OrderItemVO {

    @Schema(description = "药品ID")
    private Long medicineId;

    @Schema(description = "药品名称")
    private String medicineName;

    @Schema(description = "药品图片")
    private String medicineImage;

    @Schema(description = "药品单价")
    private BigDecimal price;

    @Schema(description = "购买数量")
    private Integer quantity;

    @Schema(description = "小计金额")
    private BigDecimal subtotal;
} 