package com.example.backend.modules.department.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * 科室更新DTO
 */
@Data
@Schema(description = "科室更新信息")
public class DepartmentUpdateDTO {

    @Schema(description = "科室ID", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "科室ID不能为空")
    private Long id;

    @Schema(description = "科室名称", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "科室名称不能为空")
    private String name;

    @Schema(description = "科室分类ID", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "科室分类不能为空")
    private Long categoryId;

    @Schema(description = "所属医院ID", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "所属医院不能为空")
    private Long hospitalId;

    @Schema(description = "科室介绍")
    private String description;

    @Schema(description = "科室特色")
    private String features;

    @Schema(description = "诊疗服务")
    private String services;

    @Schema(description = "科室位置")
    private String location;

    @Schema(description = "科室电话")
    private String phone;

    @Schema(description = "科室图片")
    private String images;

    @Schema(description = "排序")
    private Integer sort;

    @Schema(description = "状态")
    private Integer status;
}
