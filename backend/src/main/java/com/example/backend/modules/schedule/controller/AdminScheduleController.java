package com.example.backend.modules.schedule.controller;

import com.example.backend.common.base.Result;
import com.example.backend.common.base.PageResult;
import com.example.backend.modules.schedule.dto.*;
import com.example.backend.modules.schedule.service.ScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDate;

/**
 * 管理员排班管理控制器
 */
@Tag(name = "管理员排班管理")
@RestController
@RequestMapping("/api/admin/schedules")
@RequiredArgsConstructor
public class AdminScheduleController {

    private final ScheduleService scheduleService;

    @Operation(summary = "新增排班")
    @PostMapping
    public Result<Void> addSchedule(@Valid @RequestBody ScheduleAddDTO dto) {
        scheduleService.addSchedule(dto);
        return Result.success();
    }

    @Operation(summary = "更新排班")
    @PutMapping("/{id}")
    public Result<Void> updateSchedule(
            @Parameter(description = "排班ID") @PathVariable Long id,
            @Valid @RequestBody ScheduleAddDTO dto) {
        scheduleService.updateSchedule(id, dto);
        return Result.success();
    }

    @Operation(summary = "分页查询排班")
    @GetMapping
    public Result<PageResult<ScheduleDTO>> getSchedules(
            @Parameter(description = "医院ID") @RequestParam(required = false) Long hospitalId,
            @Parameter(description = "科室ID") @RequestParam(required = false) Long departmentId,
            @Parameter(description = "医生ID") @RequestParam(required = false) Long doctorId,
            @Parameter(description = "开始日期") @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @Parameter(description = "结束日期") @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate,
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
            @Parameter(description = "每页大小") @RequestParam(defaultValue = "10") Integer size) {
        
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<ScheduleDTO> schedulePage = scheduleService.getSchedules(
                hospitalId, departmentId, doctorId, startDate, endDate, pageable);

        return Result.success(schedulePage);
    }

    @Operation(summary = "删除排班")
    @DeleteMapping("/{id}")
    public Result<Void> deleteSchedule(@Parameter(description = "排班ID") @PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return Result.success();
    }

    @Operation(summary = "更新排班状态")
    @PutMapping("/{id}/status")
    public Result<Void> updateScheduleStatus(
            @Parameter(description = "排班ID") @PathVariable Long id,
            @RequestBody UpdateStatusRequest request) {
        scheduleService.updateScheduleStatus(id, request.getStatus());
        return Result.success();
    }

    // 内部类用于接收状态更新请求
    public static class UpdateStatusRequest {
        private Integer status;

        public Integer getStatus() {
            return status;
        }

        public void setStatus(Integer status) {
            this.status = status;
        }
    }
}
