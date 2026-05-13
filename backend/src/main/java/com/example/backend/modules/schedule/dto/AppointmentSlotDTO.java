package com.example.backend.modules.schedule.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 预约号源DTO
 */
@Data
public class AppointmentSlotDTO {
    private Long id;
    private Long scheduleId;
    private Integer slotNumber;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime appointmentTime;
    private Integer status; // 0-可预约,1-已预约,2-已取消,3-已完成
    private Long userId;
    private String userName;
    private String userPhone;
    private String appointmentNo;
}
