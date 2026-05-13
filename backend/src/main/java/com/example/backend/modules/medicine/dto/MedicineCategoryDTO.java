package com.example.backend.modules.medicine.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "药品分类信息")
public class MedicineCategoryDTO {

    @Schema(description = "ID")
    private Long id;

    @NotBlank(message = "分类名称不能为空")
    @Size(max = 50, message = "分类名称长度不能超过50")
    @Schema(description = "分类名称")
    private String name;

    @Size(max = 200, message = "分类描述长度不能超过200")
    @Schema(description = "分类描述")
    private String description;

    @Schema(description = "排序号")
    private Integer sort;

    @Schema(description = "状态：0-禁用，1-正常")
    private Integer status;
} 