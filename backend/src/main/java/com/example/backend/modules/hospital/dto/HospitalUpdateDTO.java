package com.example.backend.modules.hospital.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

/**
 * 医院更新DTO
 */
@Data
@Schema(description = "医院更新请求")
public class HospitalUpdateDTO {

    @NotNull(message = "医院ID不能为空")
    @Schema(description = "医院ID", required = true)
    private Long id;

    @NotBlank(message = "医院名称不能为空")
    @Schema(description = "医院名称", required = true)
    private String name;

    @NotNull(message = "医院等级不能为空")
    @Schema(description = "医院等级(1-一级,2-二级,3-三级)", required = true)
    private Integer level;

    @NotNull(message = "医院类型不能为空")
    @Schema(description = "医院类型(1-综合医院,2-专科医院,3-中医医院)", required = true)
    private Integer type;

    @NotBlank(message = "省份不能为空")
    @Schema(description = "省份", required = true)
    private String province;

    @NotBlank(message = "城市不能为空")
    @Schema(description = "城市", required = true)
    private String city;

    @NotBlank(message = "区县不能为空")
    @Schema(description = "区县", required = true)
    private String district;

    @NotBlank(message = "详细地址不能为空")
    @Schema(description = "详细地址", required = true)
    private String address;

    @Schema(description = "联系电话")
    private String phone;

    @Email(message = "邮箱格式不正确")
    @Schema(description = "邮箱")
    private String email;

    @Schema(description = "官网地址")
    private String website;

    @Schema(description = "医院简介")
    private String description;

    @Schema(description = "医院图片(多个逗号分隔)")
    private String images;

    @Schema(description = "营业时间")
    private String businessHours;

    @Schema(description = "经度")
    private BigDecimal longitude;

    @Schema(description = "纬度")
    private BigDecimal latitude;

    @Schema(description = "状态(0-禁用,1-正常)")
    private Integer status;

    @Schema(description = "排序")
    private Integer sort;
}
