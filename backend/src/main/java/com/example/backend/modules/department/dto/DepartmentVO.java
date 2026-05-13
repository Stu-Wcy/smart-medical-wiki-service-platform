package com.example.backend.modules.department.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

/**
 * 科室信息VO
 */
@Data
@Schema(description = "科室信息")
public class DepartmentVO {

    @Schema(description = "科室ID")
    private Long id;

    @Schema(description = "科室名称")
    private String name;

    @Schema(description = "科室分类ID")
    private Long categoryId;

    @Schema(description = "科室分类名称")
    private String categoryName;

    @Schema(description = "所属医院ID")
    private Long hospitalId;

    @Schema(description = "所属医院名称")
    private String hospitalName;

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

    @Schema(description = "状态描述")
    private String statusDesc;

    @Schema(description = "创建时间")
    private LocalDateTime createdTime;

    @Schema(description = "更新时间")
    private LocalDateTime updatedTime;
}
