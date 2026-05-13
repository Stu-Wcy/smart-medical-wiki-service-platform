package com.example.backend.modules.order.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "订单查询条件")
public class OrderQueryDTO {

    @Schema(description = "订单编号")
    private String orderNo;

    @Schema(description = "订单状态")
    private Integer status;

    @Schema(description = "开始时间")
    private LocalDateTime startTime;

    @Schema(description = "结束时间")
    private LocalDateTime endTime;

    @Schema(description = "用户ID")
    private Long userId;

    @Schema(description = "收货人")
    private String receiver;

    @Schema(description = "联系电话")
    private String phone;
} 