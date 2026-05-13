package com.example.backend.modules.appointment.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.common.utils.SecurityUtils;
import com.example.backend.modules.appointment.dto.AppointmentDTO;
import com.example.backend.modules.appointment.dto.AppointmentQueryDTO;
import com.example.backend.modules.appointment.enums.AppointmentStatus;
import com.example.backend.modules.appointment.service.AppointmentService;
import com.example.backend.modules.doctor.entity.DoctorUser;
import com.example.backend.modules.doctor.repository.DoctorUserRepository;
import com.example.backend.modules.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "医生预约管理")
@RestController
@RequestMapping("/api/doctor/appointments")
@RequiredArgsConstructor
@PreAuthorize("hasRole('DOCTOR')")
public class DoctorAppointmentController {
    private final AppointmentService appointmentService;
    private final DoctorUserRepository doctorUserRepository;
    
    private Long getCurrentDoctorId() {
        User user = SecurityUtils.getCurrentUser();
        DoctorUser du = doctorUserRepository.findByUserId(user.getId())
            .orElseThrow(() -> new RuntimeException("医生账户未建立关联"));
        return du.getDoctorId();
    }
    
    @Operation(summary = "医生分页查询自身预约订单")
    @GetMapping("/page")
    public Result<PageResult<AppointmentDTO>> page(AppointmentQueryDTO queryDTO) {
        Long doctorId = getCurrentDoctorId();
        queryDTO.setDoctorId(doctorId);
        Page<AppointmentDTO> page = appointmentService.getAllAppointmentsPage(queryDTO);
        return Result.success(page);
    }
    
    @Operation(summary = "医生查看预约订单详情")
    @GetMapping("/{id}")
    public Result<AppointmentDTO> get(@PathVariable Long id) {
        Long doctorId = getCurrentDoctorId();
        AppointmentDTO dto = appointmentService.getAppointmentByIdForAdmin(id);
        if (!doctorId.equals(dto.getDoctorId())) {
            return Result.error("无权限查看该预约");
        }
        return Result.success(dto);
    }
    
    @Operation(summary = "医生更新预约订单状态（限定自身订单）")
    @PutMapping("/{id}/status")
    public Result<Void> updateStatus(@PathVariable Long id, @RequestParam AppointmentStatus status) {
        Long doctorId = getCurrentDoctorId();
        AppointmentDTO dto = appointmentService.getAppointmentByIdForAdmin(id);
        if (!doctorId.equals(dto.getDoctorId())) {
            return Result.error("无权限操作该预约");
        }
        appointmentService.updateAppointmentStatus(id, status);
        return Result.success();
    }
    
    @Operation(summary = "医生取消预约订单（限定自身订单）")
    @PutMapping("/{id}/cancel")
    public Result<Void> cancel(@PathVariable Long id, @RequestParam String cancelReason) {
        Long doctorId = getCurrentDoctorId();
        AppointmentDTO dto = appointmentService.getAppointmentByIdForAdmin(id);
        if (!doctorId.equals(dto.getDoctorId())) {
            return Result.error("无权限操作该预约");
        }
        appointmentService.cancelAppointmentForAdmin(id, cancelReason);
        return Result.success();
    }
}
