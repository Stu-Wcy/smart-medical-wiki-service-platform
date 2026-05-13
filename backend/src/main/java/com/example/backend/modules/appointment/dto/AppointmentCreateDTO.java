package com.example.backend.modules.appointment.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 创建预约订单DTO
 */
@Data
public class AppointmentCreateDTO {

    @NotNull(message = "医生ID不能为空")
    private Long doctorId;

    @NotNull(message = "医院ID不能为空")
    private Long hospitalId;

    private Long departmentId;

    @NotNull(message = "排班ID不能为空")
    private Long scheduleId;

    @NotNull(message = "号源ID不能为空")
    private Long slotId;

    @NotNull(message = "预约日期不能为空")
    private LocalDate appointmentDate;

    @NotNull(message = "预约时间不能为空")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime appointmentTime;

    @NotNull(message = "时间段不能为空")
    private Integer timeSlot;

    @NotNull(message = "号源序号不能为空")
    private Integer slotNumber;

    @NotBlank(message = "就诊人姓名不能为空")
    private String patientName;

    @NotBlank(message = "就诊人手机号不能为空")
    private String patientPhone;

    private String patientIdCard;

    @NotNull(message = "挂号费不能为空")
    private BigDecimal consultationFee;

    private String notes;
}
