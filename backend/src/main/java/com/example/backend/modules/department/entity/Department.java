package com.example.backend.modules.department.entity;

import com.example.backend.common.base.BaseEntity;
import com.example.backend.modules.hospital.entity.Hospital;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 科室信息实体类
 */
@Data
@Entity
@Table(name = "t_department")
@EqualsAndHashCode(callSuper = true)
public class Department extends BaseEntity {

    /**
     * 科室名称
     */
    @Column(nullable = false, length = 100)
    private String name;

    /**
     * 科室分类
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private DepartmentCategory category;

    /**
     * 所属医院
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    /**
     * 科室介绍
     */
    @Column(columnDefinition = "text")
    private String description;

    /**
     * 科室特色
     */
    @Column(columnDefinition = "text")
    private String features;

    /**
     * 诊疗服务
     */
    @Column(columnDefinition = "text")
    private String services;

    /**
     * 科室位置
     */
    @Column(length = 200)
    private String location;

    /**
     * 科室电话
     */
    @Column(length = 20)
    private String phone;

    /**
     * 科室图片(多个逗号分隔)
     */
    @Column(length = 1000)
    private String images;

    /**
     * 排序
     */
    private Integer sort = 0;

    /**
     * 状态
     */
    @Column(nullable = false)
    private Integer status = 1;
}
