package com.example.backend.modules.appointment.service;

import com.example.backend.common.base.PageResult;
import com.example.backend.modules.appointment.dto.AppointmentCreateDTO;
import com.example.backend.modules.appointment.dto.AppointmentDTO;
import com.example.backend.modules.appointment.dto.AppointmentQueryDTO;
import com.example.backend.modules.appointment.enums.AppointmentStatus;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * 预约订单服务接口
 */
public interface AppointmentService {

    /**
     * 创建预约订单
     */
    AppointmentDTO createAppointment(Long userId, AppointmentCreateDTO createDTO);

    /**
     * 取消预约订单
     */
    void cancelAppointment(Long userId, Long appointmentId, String cancelReason);

    /**
     * 根据ID获取预约订单详情
     */
    AppointmentDTO getAppointmentById(Long userId, Long appointmentId);

    /**
     * 根据预约单号获取预约订单详情
     */
    AppointmentDTO getAppointmentByNo(String appointmentNo);

    /**
     * 获取用户的预约订单列表
     */
    List<AppointmentDTO> getUserAppointments(Long userId);

    /**
     * 分页查询用户的预约订单列表
     */
    Page<AppointmentDTO> getUserAppointmentsPage(Long userId, AppointmentQueryDTO queryDTO);

    /**
     * 更新预约订单状态（管理员用）
     */
    void updateAppointmentStatus(Long appointmentId, AppointmentStatus status);

    /**
     * 管理员分页查询所有预约订单
     */
    Page<AppointmentDTO> getAllAppointmentsPage(AppointmentQueryDTO queryDTO);

    /**
     * 管理员根据ID获取预约订单详情
     */
    AppointmentDTO getAppointmentByIdForAdmin(Long appointmentId);

    /**
     * 管理员取消预约订单
     */
    void cancelAppointmentForAdmin(Long appointmentId, String cancelReason);

    /**
     * 获取医生的预约订单列表
     */
    List<AppointmentDTO> getDoctorAppointments(Long doctorId);

    /**
     * 检查号源是否可预约
     */
    boolean isSlotAvailable(Long slotId);

    /**
     * 生成预约单号
     */
    String generateAppointmentNo();
}
