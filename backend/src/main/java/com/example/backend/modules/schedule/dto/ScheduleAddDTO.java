package com.example.backend.modules.schedule.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * 新增排班DTO
 */
@Data
public class ScheduleAddDTO {

    @NotNull(message = "医生ID不能为空")
    private Long doctorId;

    @NotNull(message = "医院ID不能为空")
    private Long hospitalId;

    private Long departmentId;

    @NotNull(message = "排班日期不能为空")
    private LocalDate scheduleDate;

    @NotNull(message = "时间段不能为空")
    @Min(value = 1, message = "时间段值无效")
    @Max(value = 3, message = "时间段值无效")
    private Integer timeSlot;

    @NotNull(message = "开始时间不能为空")
    private LocalTime startTime;

    @NotNull(message = "结束时间不能为空")
    private LocalTime endTime;

    @NotNull(message = "总号源数量不能为空")
    @Min(value = 1, message = "总号源数量必须大于0")
    private Integer totalSlots;

    @NotNull(message = "挂号费用不能为空")
    @DecimalMin(value = "0.00", message = "挂号费用不能为负数")
    private BigDecimal consultationFee;

    private String notes;
}
