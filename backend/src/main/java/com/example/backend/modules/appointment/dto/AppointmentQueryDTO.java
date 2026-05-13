package com.example.backend.modules.appointment.dto;

import com.example.backend.modules.appointment.enums.AppointmentStatus;
import lombok.Data;

import java.time.LocalDate;

/**
 * 预约订单查询DTO
 */
@Data
public class AppointmentQueryDTO {

    private Long userId;

    private Long doctorId;

    private Long hospitalId;

    private Long departmentId;

    private String appointmentNo;

    private String patientName;

    private String patientPhone;

    private AppointmentStatus status;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer timeSlot;

    private Integer page = 1;

    private Integer size = 10;
}
