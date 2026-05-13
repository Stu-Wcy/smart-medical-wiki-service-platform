package com.example.backend.modules.doctor.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 医生查询DTO
 */
@Data
@Schema(description = "医生查询条件")
public class DoctorQueryDTO {

    @Schema(description = "医生姓名")
    private String name;

    @Schema(description = "职称")
    private String title;

    @Schema(description = "所属医院ID")
    private Long hospitalId;

    @Schema(description = "所属科室ID")
    private Long departmentId;

    @Schema(description = "状态：0-停诊，1-正常")
    private Integer status;

    @Schema(description = "专长关键词")
    private String specialties;
}
