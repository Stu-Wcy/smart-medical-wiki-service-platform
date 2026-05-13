package com.example.backend.modules.schedule.entity;

import com.example.backend.common.base.BaseEntity;
import com.example.backend.modules.doctor.entity.Doctor;
import com.example.backend.modules.hospital.entity.Hospital;
import com.example.backend.modules.department.entity.Department;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * 医生排班实体
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_schedule")
public class Schedule extends BaseEntity {

    @Column(name = "doctor_id", nullable = false)
    private Long doctorId;

    @Column(name = "hospital_id", nullable = false)
    private Long hospitalId;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "schedule_date", nullable = false)
    private LocalDate scheduleDate;

    @Column(name = "time_slot", nullable = false)
    private Integer timeSlot; // 1-上午,2-下午,3-晚上

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "total_slots", nullable = false)
    private Integer totalSlots;

    @Column(name = "available_slots", nullable = false)
    private Integer availableSlots;

    @Column(name = "consultation_fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal consultationFee;

    @Column(name = "status", nullable = false)
    private Integer status; // 0-停诊,1-正常

    @Column(name = "notes", length = 500)
    private String notes;

    // 关联查询
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", insertable = false, updatable = false)
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", insertable = false, updatable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", insertable = false, updatable = false)
    private Department department;
}
