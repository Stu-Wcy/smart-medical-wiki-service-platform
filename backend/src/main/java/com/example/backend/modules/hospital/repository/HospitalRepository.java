package com.example.backend.modules.hospital.repository;

import com.example.backend.modules.hospital.entity.Hospital;
import com.example.backend.modules.hospital.enums.HospitalLevelEnum;
import com.example.backend.modules.hospital.enums.HospitalStatusEnum;
import com.example.backend.modules.hospital.enums.HospitalTypeEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 医院信息Repository
 */
@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    /**
     * 根据状态查询医院列表
     */
    List<Hospital> findByStatusOrderBySortAscIdAsc(Integer status);

    /**
     * 根据省市查询医院
     */
    List<Hospital> findByProvinceAndCityAndStatusOrderBySortAscIdAsc(
            String province, String city, Integer status);

    /**
     * 根据医院等级查询
     */
    List<Hospital> findByLevelAndStatusOrderBySortAscIdAsc(
            Integer level, Integer status);

    /**
     * 根据医院类型查询
     */
    List<Hospital> findByTypeAndStatusOrderBySortAscIdAsc(
            Integer type, Integer status);

    /**
     * 根据名称模糊查询
     */
    List<Hospital> findByNameContainingAndStatusOrderBySortAscIdAsc(
            String name, Integer status);

    /**
     * 多条件分页查询
     */
    @Query("SELECT h FROM Hospital h WHERE " +
           "(:name IS NULL OR h.name LIKE %:name%) AND " +
           "(:province IS NULL OR h.province = :province) AND " +
           "(:city IS NULL OR h.city = :city) AND " +
           "(:level IS NULL OR h.level = :level) AND " +
           "(:type IS NULL OR h.type = :type) AND " +
           "(:status IS NULL OR h.status = :status) AND " +
           "h.deleted = false " +
           "ORDER BY h.sort ASC, h.id ASC")
    Page<Hospital> findByConditions(
            @Param("name") String name,
            @Param("province") String province,
            @Param("city") String city,
            @Param("level") Integer level,
            @Param("type") Integer type,
            @Param("status") Integer status,
            Pageable pageable);

    /**
     * 查询所有省份
     */
    @Query("SELECT DISTINCT h.province FROM Hospital h WHERE h.status = :status AND h.deleted = false ORDER BY h.province")
    List<String> findDistinctProvinces(@Param("status") Integer status);

    /**
     * 根据省份查询城市
     */
    @Query("SELECT DISTINCT h.city FROM Hospital h WHERE h.province = :province AND h.status = :status AND h.deleted = false ORDER BY h.city")
    List<String> findDistinctCitiesByProvince(@Param("province") String province, @Param("status") Integer status);
}
