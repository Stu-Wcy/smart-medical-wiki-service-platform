package com.example.backend.modules.doctor.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 医生信息DTO
 */
@Data
@Schema(description = "医生信息")
public class DoctorDTO {

    @Schema(description = "医生ID")
    private Long id;

    @Schema(description = "医生姓名", required = true)
    private String name;

    @Schema(description = "职称", required = true)
    private String title;

    @Schema(description = "专长领域")
    private String specialties;

    @Schema(description = "医生简介")
    private String introduction;

    @Schema(description = "头像URL")
    private String avatar;

    @Schema(description = "所属医院ID", required = true)
    private Long hospitalId;

    @Schema(description = "所属医院名称")
    private String hospitalName;

    @Schema(description = "所属科室ID")
    private Long departmentId;

    @Schema(description = "所属科室名称")
    private String departmentName;

    @Schema(description = "联系电话")
    private String phone;

    @Schema(description = "邮箱")
    private String email;

    @Schema(description = "教育背景")
    private String education;

    @Schema(description = "工作经历")
    private String experience;

    @Schema(description = "主要成就")
    private String achievements;

    @Schema(description = "挂号费用")
    private BigDecimal consultationFee;

    @Schema(description = "状态：0-停诊，1-正常")
    private Integer status;

    @Schema(description = "状态描述")
    private String statusDesc;

    @Schema(description = "排序")
    private Integer sort;

    @Schema(description = "创建时间")
    private LocalDateTime createdTime;

    @Schema(description = "更新时间")
    private LocalDateTime updatedTime;
}
