package com.example.backend.modules.doctor.entity;

import com.example.backend.modules.hospital.entity.Hospital;
import com.example.backend.modules.department.entity.Department;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 医生信息实体类
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "t_doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 医生姓名
     */
    @Column(name = "name", nullable = false, length = 50)
    private String name;

    /**
     * 职称
     */
    @Column(name = "title", nullable = false, length = 50)
    private String title;

    /**
     * 专长领域
     */
    @Column(name = "specialties", columnDefinition = "TEXT")
    private String specialties;

    /**
     * 医生简介
     */
    @Column(name = "introduction", columnDefinition = "TEXT")
    private String introduction;

    /**
     * 头像URL
     */
    @Column(name = "avatar", length = 500)
    private String avatar;

    /**
     * 所属医院ID
     */
    @Column(name = "hospital_id", nullable = false)
    private Long hospitalId;

    /**
     * 所属科室ID
     */
    @Column(name = "department_id")
    private Long departmentId;

    /**
     * 联系电话
     */
    @Column(name = "phone", length = 20)
    private String phone;

    /**
     * 邮箱
     */
    @Column(name = "email", length = 100)
    private String email;

    /**
     * 教育背景
     */
    @Column(name = "education", length = 200)
    private String education;

    /**
     * 工作经历
     */
    @Column(name = "experience", columnDefinition = "TEXT")
    private String experience;

    /**
     * 主要成就
     */
    @Column(name = "achievements", columnDefinition = "TEXT")
    private String achievements;

    /**
     * 挂号费用
     */
    @Column(name = "consultation_fee", precision = 10, scale = 2)
    private BigDecimal consultationFee = BigDecimal.ZERO;

    /**
     * 状态：0-停诊，1-正常
     */
    @Column(name = "status")
    private Integer status = 1;

    /**
     * 排序
     */
    @Column(name = "sort")
    private Integer sort = 0;

    /**
     * 创建时间
     */
    @CreationTimestamp
    @Column(name = "created_time", updatable = false)
    private LocalDateTime createdTime;

    /**
     * 更新时间
     */
    @UpdateTimestamp
    @Column(name = "updated_time")
    private LocalDateTime updatedTime;

    // 关联关系
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", insertable = false, updatable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", insertable = false, updatable = false)
    private Department department;

    // 状态描述
    @Transient
    private String statusDesc;

    @Transient
    private String hospitalName;

    @Transient
    private String departmentName;

    public String getStatusDesc() {
        if (status == null) return "未知";
        return switch (status) {
            case 0 -> "停诊";
            case 1 -> "正常";
            default -> "未知";
        };
    }
}
