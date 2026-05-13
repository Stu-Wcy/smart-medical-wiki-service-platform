package com.example.backend.modules.disease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "疾病查询条件")
public class DiseaseQueryDTO {

    @Schema(description = "疾病名称")
    private String name;

    @Schema(description = "分类ID")
    private Long categoryId;

    @Schema(description = "症状")
    private String symptom;

    @Schema(description = "病因")
    private String cause;

    @Schema(description = "状态：0-禁用，1-正常")
    private Integer status;
} 