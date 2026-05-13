package com.example.backend.modules.appointment.repository;

import com.example.backend.modules.appointment.entity.Appointment;
import com.example.backend.modules.appointment.enums.AppointmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * 预约订单Repository
 */
@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long>, JpaSpecificationExecutor<Appointment> {

    /**
     * 根据预约单号查找预约订单
     */
    Optional<Appointment> findByAppointmentNoAndDeletedFalse(String appointmentNo);

    /**
     * 根据用户ID查找预约订单列表
     */
    List<Appointment> findByUserIdAndDeletedFalseOrderByCreatedTimeDesc(Long userId);

    /**
     * 根据用户ID分页查找预约订单列表
     */
    Page<Appointment> findByUserIdAndDeletedFalse(Long userId, Pageable pageable);

    /**
     * 根据用户ID和状态查找预约订单列表
     */
    List<Appointment> findByUserIdAndStatusAndDeletedFalse(Long userId, AppointmentStatus status);

    /**
     * 根据医生ID查找预约订单列表
     */
    List<Appointment> findByDoctorIdAndDeletedFalseOrderByAppointmentTimeAsc(Long doctorId);

    /**
     * 根据医生ID和日期查找预约订单列表
     */
    List<Appointment> findByDoctorIdAndAppointmentDateAndDeletedFalse(Long doctorId, LocalDate appointmentDate);

    /**
     * 根据号源ID查找预约订单
     */
    Optional<Appointment> findBySlotIdAndDeletedFalse(Long slotId);

    /**
     * 统计用户的预约订单数量
     */
    long countByUserIdAndDeletedFalse(Long userId);

    /**
     * 统计用户指定状态的预约订单数量
     */
    long countByUserIdAndStatusAndDeletedFalse(Long userId, AppointmentStatus status);

    /**
     * 统计医生指定日期的预约订单数量
     */
    long countByDoctorIdAndAppointmentDateAndDeletedFalse(Long doctorId, LocalDate appointmentDate);

    /**
     * 查找即将过期的预约订单（用于定时任务）
     */
    @Query("SELECT a FROM Appointment a WHERE a.status = :status AND a.appointmentTime < :expireTime AND a.deleted = false")
    List<Appointment> findExpiredAppointments(@Param("status") AppointmentStatus status, @Param("expireTime") LocalDateTime expireTime);

    /**
     * 根据医院ID查找预约订单列表
     */
    List<Appointment> findByHospitalIdAndDeletedFalseOrderByAppointmentTimeDesc(Long hospitalId);

    /**
     * 根据科室ID查找预约订单列表
     */
    List<Appointment> findByDepartmentIdAndDeletedFalseOrderByAppointmentTimeDesc(Long departmentId);
}
