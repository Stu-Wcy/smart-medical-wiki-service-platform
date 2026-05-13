package com.example.backend.modules.medicine.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Schema(description = "药品信息")
public class MedicineDTO {

    @Schema(description = "ID")
    private Long id;

    @NotBlank(message = "药品名称不能为空")
    @Size(max = 100, message = "药品名称长度不能超过100")
    @Schema(description = "药品名称")
    private String name;

    @Size(max = 1000, message = "图片地址长度不能超过1000")
    @Schema(description = "图片地址，多个图片用逗号分隔")
    private String images;

    @Size(max = 200, message = "生产厂家长度不能超过200")
    @Schema(description = "生产厂家")
    private String manufacturer;

    @Size(max = 100, message = "规格长度不能超过100")
    @Schema(description = "规格")
    private String specification;

    @Schema(description = "价格")
    private BigDecimal price;

    @Schema(description = "库存")
    private Integer stock;

    @Schema(description = "描述")
    private String description;

    @Schema(description = "用法用量")
    private String usageMethod;

    @Schema(description = "禁忌")
    private String contraindication;

    @Schema(description = "状态：0-禁用，1-正常")
    private Integer status;

    @NotNull(message = "分类不能为空")
    @Schema(description = "分类ID")
    private Long categoryId;

    @Schema(description = "分类名称")
    private String categoryName;
} 