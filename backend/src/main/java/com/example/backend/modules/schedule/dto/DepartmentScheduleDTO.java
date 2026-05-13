package com.example.backend.modules.schedule.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

/**
 * 科室号源信息DTO（用于医院详情页显示）
 */
@Data
public class DepartmentScheduleDTO {
    private Long departmentId;
    private String departmentName;
    private String departmentDescription;
    private List<String> departmentImages;
    private List<DoctorScheduleInfo> doctors;

    @Data
    public static class DoctorScheduleInfo {
        private Long doctorId;
        private String doctorName;
        private String doctorTitle;
        private String doctorAvatar;
        private String doctorSpecialties;
        private BigDecimal consultationFee;
        private List<ScheduleSlot> schedules;
    }

    @Data
    public static class ScheduleSlot {
        private Long scheduleId;
        private Long doctorId;
        private LocalDate scheduleDate;
        private Integer timeSlot; // 1-上午,2-下午,3-晚上
        private String timeSlotName;
        private LocalTime startTime;
        private LocalTime endTime;
        private Integer totalSlots;
        private Integer availableSlots;
        private Integer status; // 0-停诊,1-正常
    }
}
