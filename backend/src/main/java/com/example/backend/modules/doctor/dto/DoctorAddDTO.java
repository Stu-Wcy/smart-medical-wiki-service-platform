package com.example.backend.modules.doctor.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

/**
 * 医生添加DTO
 */
@Data
@Schema(description = "医生添加信息")
public class DoctorAddDTO {

    @NotBlank(message = "医生姓名不能为空")
    @Schema(description = "医生姓名", required = true)
    private String name;

    @NotBlank(message = "职称不能为空")
    @Schema(description = "职称", required = true)
    private String title;

    @Schema(description = "专长领域")
    private String specialties;

    @Schema(description = "医生简介")
    private String introduction;

    @Schema(description = "头像URL")
    private String avatar;

    @NotNull(message = "所属医院不能为空")
    @Schema(description = "所属医院ID", required = true)
    private Long hospitalId;

    @Schema(description = "所属科室ID")
    private Long departmentId;

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
    private Integer status = 1;

    @Schema(description = "排序")
    private Integer sort = 0;
}
