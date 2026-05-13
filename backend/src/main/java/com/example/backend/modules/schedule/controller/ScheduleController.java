package com.example.backend.modules.schedule.controller;

import com.example.backend.common.base.Result;
import com.example.backend.modules.schedule.dto.DepartmentScheduleDTO;
import com.example.backend.modules.schedule.dto.AppointmentSlotDTO;
import com.example.backend.modules.schedule.service.ScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 用户端排班查询控制器
 */
@Tag(name = "排班查询")
@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Operation(summary = "根据医院ID获取科室号源信息")
    @GetMapping("/hospital/{hospitalId}/departments")
    public Result<List<DepartmentScheduleDTO>> getDepartmentSchedulesByHospitalId(
            @Parameter(description = "医院ID") @PathVariable Long hospitalId) {
        List<DepartmentScheduleDTO> result = scheduleService.getDepartmentSchedulesByHospitalId(hospitalId);
        return Result.success(result);
    }

    @Operation(summary = "根据科室ID获取排班信息")
    @GetMapping("/department/{departmentId}")
    public Result<List<DepartmentScheduleDTO.ScheduleSlot>> getDepartmentSchedules(
            @Parameter(description = "科室ID") @PathVariable Long departmentId) {
        List<DepartmentScheduleDTO.ScheduleSlot> result = scheduleService.getDepartmentSchedules(departmentId);
        return Result.success(result);
    }

    @Operation(summary = "根据医生ID获取排班信息")
    @GetMapping("/doctor/{doctorId}")
    public Result<List<DepartmentScheduleDTO.ScheduleSlot>> getDoctorSchedules(
            @Parameter(description = "医生ID") @PathVariable Long doctorId) {
        List<DepartmentScheduleDTO.ScheduleSlot> result = scheduleService.getDoctorSchedules(doctorId);
        return Result.success(result);
    }

    @Operation(summary = "根据排班ID获取号源列表")
    @GetMapping("/{scheduleId}/slots")
    public Result<List<AppointmentSlotDTO>> getScheduleSlots(
            @Parameter(description = "排班ID") @PathVariable Long scheduleId) {
        List<AppointmentSlotDTO> result = scheduleService.getScheduleSlots(scheduleId);
        return Result.success(result);
    }
}
