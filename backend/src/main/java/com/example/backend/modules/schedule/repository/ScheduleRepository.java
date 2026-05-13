package com.example.backend.modules.schedule.repository;

import com.example.backend.modules.schedule.entity.Schedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    /**
     * 根据医生ID和日期查询排班
     */
    List<Schedule> findByDoctorIdAndScheduleDateAndDeletedFalse(Long doctorId, LocalDate scheduleDate);

    /**
     * 根据医院ID和日期查询排班
     */
    List<Schedule> findByHospitalIdAndScheduleDateAndDeletedFalse(Long hospitalId, LocalDate scheduleDate);

    /**
     * 根据科室ID和日期查询排班
     */
    List<Schedule> findByDepartmentIdAndScheduleDateAndDeletedFalse(Long departmentId, LocalDate scheduleDate);

    /**
     * 根据医院ID和日期范围查询排班
     */
    @Query("SELECT s FROM Schedule s WHERE s.hospitalId = :hospitalId " +
           "AND s.scheduleDate BETWEEN :startDate AND :endDate " +
           "AND s.deleted = false AND s.status = 1 " +
           "ORDER BY s.scheduleDate, s.timeSlot")
    List<Schedule> findByHospitalIdAndDateRange(@Param("hospitalId") Long hospitalId,
                                               @Param("startDate") LocalDate startDate,
                                               @Param("endDate") LocalDate endDate);

    /**
     * 根据科室ID和日期范围查询排班
     */
    @Query("SELECT s FROM Schedule s WHERE s.departmentId = :departmentId " +
           "AND s.scheduleDate BETWEEN :startDate AND :endDate " +
           "AND s.deleted = false AND s.status = 1 " +
           "ORDER BY s.scheduleDate, s.timeSlot")
    List<Schedule> findByDepartmentIdAndDateRange(@Param("departmentId") Long departmentId,
                                                 @Param("startDate") LocalDate startDate,
                                                 @Param("endDate") LocalDate endDate);

    /**
     * 根据医生ID和日期范围查询排班
     */
    @Query("SELECT s FROM Schedule s WHERE s.doctorId = :doctorId " +
           "AND s.scheduleDate BETWEEN :startDate AND :endDate " +
           "AND s.deleted = false AND s.status = 1 " +
           "ORDER BY s.scheduleDate, s.timeSlot")
    List<Schedule> findByDoctorIdAndDateRange(@Param("doctorId") Long doctorId,
                                             @Param("startDate") LocalDate startDate,
                                             @Param("endDate") LocalDate endDate);

    /**
     * 检查排班是否存在冲突
     */
    @Query("SELECT s FROM Schedule s WHERE s.doctorId = :doctorId " +
           "AND s.scheduleDate = :scheduleDate AND s.timeSlot = :timeSlot " +
           "AND s.deleted = false AND (:excludeId IS NULL OR s.id != :excludeId)")
    Optional<Schedule> findConflictSchedule(@Param("doctorId") Long doctorId,
                                          @Param("scheduleDate") LocalDate scheduleDate,
                                          @Param("timeSlot") Integer timeSlot,
                                          @Param("excludeId") Long excludeId);

    /**
     * 分页查询排班
     */
    @Query("SELECT s FROM Schedule s WHERE " +
           "(:hospitalId IS NULL OR s.hospitalId = :hospitalId) AND " +
           "(:departmentId IS NULL OR s.departmentId = :departmentId) AND " +
           "(:doctorId IS NULL OR s.doctorId = :doctorId) AND " +
           "(:startDate IS NULL OR s.scheduleDate >= :startDate) AND " +
           "(:endDate IS NULL OR s.scheduleDate <= :endDate) AND " +
           "s.deleted = false " +
           "ORDER BY s.scheduleDate DESC, s.timeSlot")
    Page<Schedule> findSchedulesWithConditions(@Param("hospitalId") Long hospitalId,
                                             @Param("departmentId") Long departmentId,
                                             @Param("doctorId") Long doctorId,
                                             @Param("startDate") LocalDate startDate,
                                             @Param("endDate") LocalDate endDate,
                                             Pageable pageable);
}
