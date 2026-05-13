package com.example.backend.modules.hospital.dto;

import com.example.backend.modules.hospital.enums.HospitalLevelEnum;
import com.example.backend.modules.hospital.enums.HospitalStatusEnum;
import com.example.backend.modules.hospital.enums.HospitalTypeEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 医院信息VO
 */
@Data
@Schema(description = "医院信息")
public class HospitalVO {

    @Schema(description = "医院ID")
    private Long id;

    @Schema(description = "医院名称")
    private String name;

    @Schema(description = "医院等级")
    private Integer level;

    @Schema(description = "医院等级描述")
    private String levelDesc;

    @Schema(description = "医院类型")
    private Integer type;

    @Schema(description = "医院类型描述")
    private String typeDesc;

    @Schema(description = "省份")
    private String province;

    @Schema(description = "城市")
    private String city;

    @Schema(description = "区县")
    private String district;

    @Schema(description = "详细地址")
    private String address;

    @Schema(description = "完整地址")
    private String fullAddress;

    @Schema(description = "联系电话")
    private String phone;

    @Schema(description = "邮箱")
    private String email;

    @Schema(description = "官网地址")
    private String website;

    @Schema(description = "医院简介")
    private String description;

    @Schema(description = "医院图片")
    private String images;

    @Schema(description = "营业时间")
    private String businessHours;

    @Schema(description = "经度")
    private BigDecimal longitude;

    @Schema(description = "纬度")
    private BigDecimal latitude;

    @Schema(description = "状态")
    private Integer status;

    @Schema(description = "状态描述")
    private String statusDesc;

    @Schema(description = "排序")
    private Integer sort;

    @Schema(description = "创建时间")
    private LocalDateTime createdTime;

    @Schema(description = "更新时间")
    private LocalDateTime updatedTime;

    // 设置描述字段的便捷方法
    public void setLevelWithDesc(HospitalLevelEnum levelEnum) {
        this.level = levelEnum != null ? levelEnum.getValue() : null;
        this.levelDesc = levelEnum != null ? levelEnum.getDesc() : null;
    }

    public void setTypeWithDesc(HospitalTypeEnum typeEnum) {
        this.type = typeEnum != null ? typeEnum.getValue() : null;
        this.typeDesc = typeEnum != null ? typeEnum.getDesc() : null;
    }

    public void setStatusWithDesc(HospitalStatusEnum statusEnum) {
        this.status = statusEnum != null ? statusEnum.getValue() : null;
        this.statusDesc = statusEnum != null ? statusEnum.getDesc() : null;
    }

    // 设置完整地址
    public void setAddressFields(String province, String city, String district, String address) {
        this.province = province;
        this.city = city;
        this.district = district;
        this.address = address;
        this.fullAddress = province + city + district + address;
    }
}
