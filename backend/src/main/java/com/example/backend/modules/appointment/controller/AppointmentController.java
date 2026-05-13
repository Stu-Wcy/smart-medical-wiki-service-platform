package com.example.backend.modules.appointment.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.appointment.dto.AppointmentCreateDTO;
import com.example.backend.modules.appointment.dto.AppointmentDTO;
import com.example.backend.modules.appointment.dto.AppointmentQueryDTO;
import com.example.backend.modules.appointment.service.AppointmentService;
import com.example.backend.modules.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 用户端预约订单控制器
 */
@Slf4j
@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
@Tag(name = "预约订单管理", description = "用户端预约订单相关接口")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Operation(summary = "创建预约订单")
    @PostMapping
    public Result<AppointmentDTO> createAppointment(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody AppointmentCreateDTO createDTO) {
        try {
            AppointmentDTO result = appointmentService.createAppointment(currentUser.getId(), createDTO);
            return Result.success(result);
        } catch (Exception e) {
            log.error("创建预约订单失败", e);
            return Result.error(e.getMessage());
        }
    }

    @Operation(summary = "取消预约订单")
    @PutMapping("/{id}/cancel")
    public Result<Void> cancelAppointment(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long id,
            @RequestParam String cancelReason) {
        try {
            appointmentService.cancelAppointment(currentUser.getId(), id, cancelReason);
            return Result.success();
        } catch (Exception e) {
            log.error("取消预约订单失败", e);
            return Result.error(e.getMessage());
        }
    }

    @Operation(summary = "获取预约订单详情")
    @GetMapping("/{id}")
    public Result<AppointmentDTO> getAppointmentById(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long id) {
        try {
            AppointmentDTO result = appointmentService.getAppointmentById(currentUser.getId(), id);
            return Result.success(result);
        } catch (Exception e) {
            log.error("获取预约订单详情失败", e);
            return Result.error(e.getMessage());
        }
    }

    @Operation(summary = "根据预约单号获取预约订单详情")
    @GetMapping("/no/{appointmentNo}")
    public Result<AppointmentDTO> getAppointmentByNo(@PathVariable String appointmentNo) {
        try {
            AppointmentDTO result = appointmentService.getAppointmentByNo(appointmentNo);
            return Result.success(result);
        } catch (Exception e) {
            log.error("根据预约单号获取预约订单详情失败", e);
            return Result.error(e.getMessage());
        }
    }

    @Operation(summary = "获取用户的预约订单列表")
    @GetMapping("/list")
    public Result<List<AppointmentDTO>> getUserAppointments(@AuthenticationPrincipal User currentUser) {
        try {
            List<AppointmentDTO> result = appointmentService.getUserAppointments(currentUser.getId());
            return Result.success(result);
        } catch (Exception e) {
            log.error("获取用户预约订单列表失败", e);
            return Result.error(e.getMessage());
        }
    }

    @Operation(summary = "分页查询用户的预约订单列表")
    @GetMapping("/page")
    public Result<PageResult<AppointmentDTO>> getUserAppointmentsPage(
            @AuthenticationPrincipal User currentUser,
            AppointmentQueryDTO queryDTO) {
        try {
            Page<AppointmentDTO> result = appointmentService.getUserAppointmentsPage(currentUser.getId(), queryDTO);
            return Result.success(result);
        } catch (Exception e) {
            log.error("分页查询用户预约订单列表失败", e);
            return Result.error(e.getMessage());
        }
    }

    @Operation(summary = "检查号源是否可预约")
    @GetMapping("/slots/{slotId}/available")
    public Result<Boolean> isSlotAvailable(@PathVariable Long slotId) {
        try {
            boolean result = appointmentService.isSlotAvailable(slotId);
            return Result.success(result);
        } catch (Exception e) {
            log.error("检查号源可用性失败", e);
            return Result.error(e.getMessage());
        }
    }
}
