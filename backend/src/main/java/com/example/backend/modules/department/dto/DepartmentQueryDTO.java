package com.example.backend.modules.department.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 科室查询DTO
 */
@Data
@Schema(description = "科室查询条件")
public class DepartmentQueryDTO {

    @Schema(description = "科室名称")
    private String name;

    @Schema(description = "科室分类ID")
    private Long categoryId;

    @Schema(description = "所属医院ID")
    private Long hospitalId;

    @Schema(description = "状态")
    private Integer status;
}
