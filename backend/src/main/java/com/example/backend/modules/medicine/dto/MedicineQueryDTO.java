package com.example.backend.modules.medicine.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "药品查询条件")
public class MedicineQueryDTO {

    @Schema(description = "药品名称")
    private String name;

    @Schema(description = "分类ID")
    private Long categoryId;

    @Schema(description = "生产厂家")
    private String manufacturer;

    @Schema(description = "状态：0-禁用，1-正常")
    private Integer status;
}