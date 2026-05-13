package com.example.backend.modules.disease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(description = "疾病信息")
public class DiseaseDTO {

    @Schema(description = "疾病ID")
    private Long id;

    @NotBlank(message = "疾病名称不能为空")
    @Schema(description = "疾病名称", required = true)
    private String name;

    @NotNull(message = "疾病分类不能为空")
    @Schema(description = "分类ID", required = true)
    private Long categoryId;

    @Schema(description = "分类名称")
    private String categoryName;

    @Schema(description = "症状描述")
    private String symptoms;

    @Schema(description = "病因")
    private String causes;

    @Schema(description = "治疗方案")
    private String treatment;

    @Schema(description = "预防措施")
    private String prevention;

    @Schema(description = "图片URL(多个逗号分隔)")
    private String images;

    @Schema(description = "状态(0-禁用,1-正常)")
    private Integer status;
} 