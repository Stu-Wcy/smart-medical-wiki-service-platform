package com.example.backend.modules.department.repository;

import com.example.backend.modules.department.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 科室Repository
 */
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    /**
     * 分页查询科室
     */
    @Query("SELECT d FROM Department d " +
           "WHERE d.deleted = false " +
           "AND (:name IS NULL OR d.name LIKE %:name%) " +
           "AND (:categoryId IS NULL OR d.category.id = :categoryId) " +
           "AND (:hospitalId IS NULL OR d.hospital.id = :hospitalId) " +
           "AND (:status IS NULL OR d.status = :status)")
    Page<Department> findByConditions(@Param("name") String name,
                                    @Param("categoryId") Long categoryId,
                                    @Param("hospitalId") Long hospitalId,
                                    @Param("status") Integer status,
                                    Pageable pageable);

    /**
     * 根据医院ID查询科室列表
     */
    @Query("SELECT d FROM Department d " +
           "WHERE d.deleted = false " +
           "AND d.hospital.id = :hospitalId " +
           "AND d.status = :status " +
           "ORDER BY d.sort ASC, d.id ASC")
    List<Department> findByHospitalIdAndStatus(@Param("hospitalId") Long hospitalId,
                                             @Param("status") Integer status);

    /**
     * 根据分类ID查询科室列表
     */
    @Query("SELECT d FROM Department d " +
           "WHERE d.deleted = false " +
           "AND d.category.id = :categoryId " +
           "AND d.status = :status " +
           "ORDER BY d.sort ASC, d.id ASC")
    List<Department> findByCategoryIdAndStatus(@Param("categoryId") Long categoryId,
                                             @Param("status") Integer status);

    /**
     * 检查科室名称在同一医院下是否存在
     */
    boolean existsByNameAndHospitalIdAndDeletedFalse(String name, Long hospitalId);

    /**
     * 检查科室名称在同一医院下是否存在（排除指定ID）
     */
    boolean existsByNameAndHospitalIdAndIdNotAndDeletedFalse(String name, Long hospitalId, Long id);
}
