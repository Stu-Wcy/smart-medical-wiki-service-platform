package com.example.backend.modules.appointment.entity;

import com.example.backend.common.base.BaseEntity;
import com.example.backend.modules.appointment.enums.AppointmentStatus;
import com.example.backend.modules.doctor.entity.Doctor;
import com.example.backend.modules.hospital.entity.Hospital;
import com.example.backend.modules.department.entity.Department;
import com.example.backend.modules.schedule.entity.Schedule;
import com.example.backend.modules.schedule.entity.AppointmentSlot;
import com.example.backend.modules.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 预约订单实体
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_appointment")
public class Appointment extends BaseEntity {

    @Column(name = "appointment_no", nullable = false, unique = true, length = 50)
    private String appointmentNo;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "doctor_id", nullable = false)
    private Long doctorId;

    @Column(name = "hospital_id", nullable = false)
    private Long hospitalId;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "schedule_id", nullable = false)
    private Long scheduleId;

    @Column(name = "slot_id", nullable = false)
    private Long slotId;

    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;

    @Column(name = "appointment_time", nullable = false)
    private LocalDateTime appointmentTime;

    @Column(name = "time_slot", nullable = false)
    private Integer timeSlot; // 1-上午,2-下午,3-晚上

    @Column(name = "slot_number", nullable = false)
    private Integer slotNumber;

    @Column(name = "patient_name", nullable = false, length = 50)
    private String patientName;

    @Column(name = "patient_phone", nullable = false, length = 20)
    private String patientPhone;

    @Column(name = "patient_id_card", length = 20)
    private String patientIdCard;

    @Column(name = "consultation_fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal consultationFee;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status", nullable = false)
    private AppointmentStatus status = AppointmentStatus.PENDING;

    @Column(name = "cancel_reason", length = 200)
    private String cancelReason;

    @Column(name = "cancel_time")
    private LocalDateTime cancelTime;

    @Column(name = "notes", length = 500)
    private String notes;

    // 关联查询
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", insertable = false, updatable = false)
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", insertable = false, updatable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", insertable = false, updatable = false)
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id", insertable = false, updatable = false)
    private Schedule schedule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "slot_id", insertable = false, updatable = false)
    private AppointmentSlot appointmentSlot;
}
