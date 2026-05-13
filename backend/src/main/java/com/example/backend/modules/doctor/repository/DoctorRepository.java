package com.example.backend.modules.doctor.repository;

import com.example.backend.modules.doctor.entity.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 医生信息数据访问接口
 */
@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long>, JpaSpecificationExecutor<Doctor> {

    /**
     * 根据医院ID查询医生列表
     */
    List<Doctor> findByHospitalIdAndStatusOrderBySort(Long hospitalId, Integer status);

    /**
     * 根据科室ID查询医生列表
     */
    List<Doctor> findByDepartmentIdAndStatusOrderBySort(Long departmentId, Integer status);

    /**
     * 根据医院ID和科室ID查询医生列表
     */
    List<Doctor> findByHospitalIdAndDepartmentIdAndStatusOrderBySort(Long hospitalId, Long departmentId, Integer status);

    /**
     * 根据医院ID分页查询医生列表
     */
    Page<Doctor> findByHospitalIdAndStatusOrderBySort(Long hospitalId, Integer status, Pageable pageable);

    /**
     * 根据科室ID分页查询医生列表
     */
    Page<Doctor> findByDepartmentIdAndStatusOrderBySort(Long departmentId, Integer status, Pageable pageable);

    /**
     * 查询医生详情（包含医院和科室信息）
     */
    @Query("SELECT d FROM Doctor d " +
           "LEFT JOIN d.hospital h " +
           "LEFT JOIN d.department dept " +
           "WHERE d.id = :id")
    Doctor findByIdWithDetails(@Param("id") Long id);

    /**
     * 根据医院ID查询医生列表（包含医院和科室信息）
     */
    @Query("SELECT d FROM Doctor d " +
           "LEFT JOIN d.hospital h " +
           "LEFT JOIN d.department dept " +
           "WHERE d.hospitalId = :hospitalId AND d.status = :status " +
           "ORDER BY d.sort ASC, d.id ASC")
    List<Doctor> findByHospitalIdWithDetails(@Param("hospitalId") Long hospitalId, @Param("status") Integer status);

    /**
     * 根据科室ID查询医生列表（包含医院和科室信息）
     */
    @Query("SELECT d FROM Doctor d " +
           "LEFT JOIN d.hospital h " +
           "LEFT JOIN d.department dept " +
           "WHERE d.departmentId = :departmentId AND d.status = :status " +
           "ORDER BY d.sort ASC, d.id ASC")
    List<Doctor> findByDepartmentIdWithDetails(@Param("departmentId") Long departmentId, @Param("status") Integer status);

    /**
     * 统计医院的医生数量
     */
    long countByHospitalIdAndStatus(Long hospitalId, Integer status);

    /**
     * 统计科室的医生数量
     */
    long countByDepartmentIdAndStatus(Long departmentId, Integer status);


}
