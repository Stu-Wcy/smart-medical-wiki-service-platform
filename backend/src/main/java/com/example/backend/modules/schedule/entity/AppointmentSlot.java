package com.example.backend.modules.schedule.entity;

import com.example.backend.common.base.BaseEntity;
import com.example.backend.modules.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * 预约号源实体
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_appointment_slot")
public class AppointmentSlot extends BaseEntity {

    @Column(name = "schedule_id", nullable = false)
    private Long scheduleId;

    @Column(name = "slot_number", nullable = false)
    private Integer slotNumber;

    @Column(name = "appointment_time", nullable = false)
    private LocalDateTime appointmentTime;

    @Column(name = "status", nullable = false)
    private Integer status; // 0-可预约,1-已预约,2-已取消,3-已完成

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_name", length = 50)
    private String userName;

    @Column(name = "user_phone", length = 20)
    private String userPhone;

    @Column(name = "appointment_no", length = 50)
    private String appointmentNo;

    @Column(name = "cancel_reason", length = 200)
    private String cancelReason;

    @Column(name = "cancel_time")
    private LocalDateTime cancelTime;

    // 关联查询
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id", insertable = false, updatable = false)
    private Schedule schedule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;
}
