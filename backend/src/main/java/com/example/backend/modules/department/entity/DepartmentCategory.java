package com.example.backend.modules.department.entity;

import com.example.backend.common.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 科室分类实体类
 */
@Data
@Entity
@Table(name = "t_department_category")
@EqualsAndHashCode(callSuper = true)
public class DepartmentCategory extends BaseEntity {

    /**
     * 分类名称
     */
    @Column(nullable = false, length = 50)
    private String name;

    /**
     * 分类描述
     */
    @Column(length = 200)
    private String description;

    /**
     * 分类图标
     */
    @Column(length = 100)
    private String icon;

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
