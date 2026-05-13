package com.example.backend.modules.schedule.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * 排班信息DTO
 */
@Data
public class ScheduleDTO {
    private Long id;
    private Long doctorId;
    private String doctorName;
    private String doctorTitle;
    private Long hospitalId;
    private String hospitalName;
    private Long departmentId;
    private String departmentName;
    private LocalDate scheduleDate;
    private Integer timeSlot; // 1-上午,2-下午,3-晚上
    private String timeSlotName;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer totalSlots;
    private Integer availableSlots;
    private BigDecimal consultationFee;
    private Integer status;
    private String notes;
}
