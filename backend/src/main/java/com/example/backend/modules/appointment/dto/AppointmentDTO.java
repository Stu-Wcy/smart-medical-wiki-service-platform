package com.example.backend.modules.appointment.dto;

import com.example.backend.modules.appointment.enums.AppointmentStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 预约订单DTO
 */
@Data
public class AppointmentDTO {

    private Long id;

    private String appointmentNo;

    private Long userId;

    private Long doctorId;

    private String doctorName;

    private String doctorTitle;

    private Long hospitalId;

    private String hospitalName;

    private Long departmentId;

    private String departmentName;

    private Long scheduleId;

    private Long slotId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate appointmentDate;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime appointmentTime;

    private Integer timeSlot;

    private String timeSlotName;

    private Integer slotNumber;

    private String patientName;

    private String patientPhone;

    private String patientIdCard;

    private BigDecimal consultationFee;

    private AppointmentStatus status;

    private String statusName;

    private String cancelReason;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime cancelTime;

    private String notes;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedTime;

    // 便捷方法
    public String getStatusName() {
        return status != null ? status.getDescription() : null;
    }

    public String getTimeSlotName() {
        if (timeSlot == null) return null;
        switch (timeSlot) {
            case 1: return "上午";
            case 2: return "下午";
            case 3: return "晚上";
            default: return "未知";
        }
    }
}
