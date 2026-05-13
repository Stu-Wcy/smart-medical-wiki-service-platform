package com.example.backend.modules.appointment.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.appointment.dto.AppointmentDTO;
import com.example.backend.modules.appointment.dto.AppointmentQueryDTO;
import com.example.backend.modules.appointment.enums.AppointmentStatus;
import com.example.backend.modules.appointment.service.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * 管理员端预约订单控制器
 */
@Slf4j
@RestController
@RequestMapping("/api/admin/appointments")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "管理员预约订单管理", description = "管理员端预约订单相关接口")
public class AdminAppointmentController {

    private final AppointmentService appointmentService;

    @Operation(summary = "管理员分页查询所有预约订单")
    @GetMapping("/page")
    public Result<PageResult<AppointmentDTO>> getAllAppointmentsPage(AppointmentQueryDTO queryDTO) {
        try {
            Page<AppointmentDTO> result = appointmentService.getAllAppointmentsPage(queryDTO);
            return Result.success(result);
        } catch (Exception e) {
            log.error("管理员分页查询预约订单失败", e);
            return Result.error(e.getMessage());
        }
    }

    @Operation(summary = "管理员获取预约订单详情")
    @GetMapping("/{id}")
    public Result<AppointmentDTO> getAppointmentById(@PathVariable Long id) {
        try {
            AppointmentDTO result = appointmentService.getAppointmentByIdForAdmin(id);
            return Result.success(result);
        } catch (Exception e) {
            log.error("管理员获取预约订单详情失败", e);
            return Result.error(e.getMessage());
        }
    }

    @Operation(summary = "管理员更新预约订单状态")
    @PutMapping("/{id}/status")
    public Result<Void> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestParam AppointmentStatus status) {
        try {
            appointmentService.updateAppointmentStatus(id, status);
            return Result.success();
        } catch (Exception e) {
            log.error("管理员更新预约订单状态失败", e);
            return Result.error(e.getMessage());
        }
    }

    @Operation(summary = "管理员取消预约订单")
    @PutMapping("/{id}/cancel")
    public Result<Void> cancelAppointment(
            @PathVariable Long id,
            @RequestParam String cancelReason) {
        try {
            appointmentService.cancelAppointmentForAdmin(id, cancelReason);
            return Result.success();
        } catch (Exception e) {
            log.error("管理员取消预约订单失败", e);
            return Result.error(e.getMessage());
        }
    }
}
