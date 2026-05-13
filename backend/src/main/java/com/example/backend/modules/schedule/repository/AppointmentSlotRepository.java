package com.example.backend.modules.schedule.repository;

import com.example.backend.modules.schedule.entity.AppointmentSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentSlotRepository extends JpaRepository<AppointmentSlot, Long> {

    /**
     * 根据排班ID查询号源
     */
    List<AppointmentSlot> findByScheduleIdAndDeletedFalseOrderBySlotNumber(Long scheduleId);

    /**
     * 根据排班ID查询可用号源
     */
    List<AppointmentSlot> findByScheduleIdAndStatusAndDeletedFalseOrderBySlotNumber(Long scheduleId, Integer status);

    /**
     * 根据用户ID查询预约记录
     */
    List<AppointmentSlot> findByUserIdAndDeletedFalseOrderByAppointmentTimeDesc(Long userId);

    /**
     * 统计排班的可用号源数量
     */
    @Query("SELECT COUNT(a) FROM AppointmentSlot a WHERE a.scheduleId = :scheduleId AND a.status = 0 AND a.deleted = false")
    Integer countAvailableSlots(@Param("scheduleId") Long scheduleId);

    /**
     * 统计排班的已预约号源数量
     */
    @Query("SELECT COUNT(a) FROM AppointmentSlot a WHERE a.scheduleId = :scheduleId AND a.status = 1 AND a.deleted = false")
    Integer countBookedSlots(@Param("scheduleId") Long scheduleId);

    /**
     * 统计排班指定状态的号源数量
     */
    @Query("SELECT COUNT(a) FROM AppointmentSlot a WHERE a.scheduleId = :scheduleId AND a.status = :status AND a.deleted = false")
    Integer countByScheduleIdAndStatusAndDeletedFalse(@Param("scheduleId") Long scheduleId, @Param("status") Integer status);

    /**
     * 根据排班ID删除号源
     */
    void deleteByScheduleId(Long scheduleId);
}
