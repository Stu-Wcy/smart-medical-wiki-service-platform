package com.example.backend.modules.hospital.entity;

import com.example.backend.common.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

/**
 * 医院信息实体类
 */
@Data
@Entity
@Table(name = "t_hospital")
@EqualsAndHashCode(callSuper = true)
public class Hospital extends BaseEntity {

    /**
     * 医院名称
     */
    @Column(nullable = false, length = 100)
    private String name;

    /**
     * 医院等级
     */
    @Column(nullable = false)
    private Integer level = 1;

    /**
     * 医院类型
     */
    @Column(nullable = false)
    private Integer type = 1;

    /**
     * 省份
     */
    @Column(nullable = false, length = 50)
    private String province;

    /**
     * 城市
     */
    @Column(nullable = false, length = 50)
    private String city;

    /**
     * 区县
     */
    @Column(nullable = false, length = 50)
    private String district;

    /**
     * 详细地址
     */
    @Column(nullable = false, length = 200)
    private String address;

    /**
     * 联系电话
     */
    @Column(length = 20)
    private String phone;

    /**
     * 邮箱
     */
    @Column(length = 100)
    private String email;

    /**
     * 官网地址
     */
    @Column(length = 200)
    private String website;

    /**
     * 医院简介
     */
    @Column(columnDefinition = "text")
    private String description;

    /**
     * 医院图片(多个逗号分隔)
     */
    @Column(length = 1000)
    private String images;

    /**
     * 营业时间
     */
    @Column(length = 100)
    private String businessHours;

    /**
     * 经度
     */
    @Column(precision = 10, scale = 7)
    private BigDecimal longitude;

    /**
     * 纬度
     */
    @Column(precision = 10, scale = 7)
    private BigDecimal latitude;

    /**
     * 状态
     */
    @Column(nullable = false)
    private Integer status = 1;

    /**
     * 排序
     */
    private Integer sort = 0;
}
