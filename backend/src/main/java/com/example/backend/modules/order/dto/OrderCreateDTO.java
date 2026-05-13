package com.example.backend.modules.order.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

@Data
@Schema(description = "创建订单")
public class OrderCreateDTO {

    @Schema(description = "收货人")
    @NotBlank(message = "收货人不能为空")
    @Size(max = 50, message = "收货人长度不能超过50个字符")
    private String receiver;

    @Schema(description = "联系电话")
    @NotBlank(message = "联系电话不能为空")
    @Size(max = 20, message = "联系电话长度不能超过20个字符")
    private String phone;

    @Schema(description = "收货地址")
    @NotBlank(message = "收货地址不能为空")
    @Size(max = 200, message = "收货地址长度不能超过200个字符")
    private String address;

    @Schema(description = "订单备注")
    @Size(max = 200, message = "订单备注长度不能超过200个字符")
    private String remark;

    @Schema(description = "支付方式：1-微信支付，2-支付宝")
    @NotNull(message = "支付方式不能为空")
    private Integer payType;

    @Schema(description = "订单明细")
    @NotEmpty(message = "订单明细不能为空")
    @Valid
    private List<OrderItemDTO> items;
} 