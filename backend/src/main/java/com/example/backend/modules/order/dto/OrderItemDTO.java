package com.example.backend.modules.order.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(description = "订单明细")
public class OrderItemDTO {

    @NotNull(message = "药品ID不能为空")
    @Schema(description = "药品ID")
    private Long medicineId;

    @NotNull(message = "数量不能为空")
    @Min(value = 1, message = "数量必须大于0")
    @Schema(description = "数量")
    private Integer quantity;
} 