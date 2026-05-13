package com.example.backend.modules.department.repository;

import com.example.backend.modules.department.entity.DepartmentCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 科室分类Repository
 */
@Repository
public interface DepartmentCategoryRepository extends JpaRepository<DepartmentCategory, Long> {

    /**
     * 根据状态查询分类列表
     */
    List<DepartmentCategory> findByStatusOrderBySortAscIdAsc(Integer status);

    /**
     * 分页查询科室分类
     */
    @Query("SELECT dc FROM DepartmentCategory dc WHERE dc.deleted = false " +
           "AND (:name IS NULL OR dc.name LIKE %:name%) " +
           "AND (:status IS NULL OR dc.status = :status)")
    Page<DepartmentCategory> findByConditions(@Param("name") String name,
                                            @Param("status") Integer status,
                                            Pageable pageable);

    /**
     * 检查分类名称是否存在
     */
    boolean existsByNameAndDeletedFalse(String name);

    /**
     * 检查分类名称是否存在（排除指定ID）
     */
    boolean existsByNameAndIdNotAndDeletedFalse(String name, Long id);
}
