package com.example.backend.modules.patient.repository;

import com.example.backend.modules.patient.entity.Patient;
import com.example.backend.modules.patient.enums.PatientStatusEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>, JpaSpecificationExecutor<Patient> {

    /**
     * 根据用户ID查找就诊人列表
     */
    List<Patient> findByUserIdAndDeletedFalseOrderByIsDefaultDescCreatedTimeDesc(Long userId);

    /**
     * 根据用户ID分页查找就诊人列表
     */
    Page<Patient> findByUserIdAndDeletedFalse(Long userId, Pageable pageable);

    /**
     * 根据用户ID和状态查找就诊人列表
     */
    List<Patient> findByUserIdAndStatusAndDeletedFalse(Long userId, PatientStatusEnum status);

    /**
     * 根据用户ID查找默认就诊人
     */
    Optional<Patient> findByUserIdAndIsDefaultTrueAndDeletedFalse(Long userId);

    /**
     * 根据手机号查找就诊人
     */
    Optional<Patient> findByPhoneAndDeletedFalse(String phone);

    /**
     * 根据身份证号查找就诊人
     */
    Optional<Patient> findByIdCardAndDeletedFalse(String idCard);

    /**
     * 根据用户ID和就诊人ID查找就诊人
     */
    Optional<Patient> findByIdAndUserIdAndDeletedFalse(Long id, Long userId);

    /**
     * 统计用户的就诊人数量
     */
    long countByUserIdAndDeletedFalse(Long userId);

    /**
     * 统计用户的启用状态就诊人数量
     */
    long countByUserIdAndStatusAndDeletedFalse(Long userId, PatientStatusEnum status);

    /**
     * 清除用户的所有默认就诊人设置
     */
    @Modifying
    @Query("UPDATE Patient p SET p.isDefault = false WHERE p.user.id = :userId AND p.deleted = false")
    void clearDefaultPatientByUserId(@Param("userId") Long userId);

    /**
     * 设置默认就诊人
     */
    @Modifying
    @Query("UPDATE Patient p SET p.isDefault = :isDefault WHERE p.id = :patientId AND p.user.id = :userId AND p.deleted = false")
    void setDefaultPatient(@Param("patientId") Long patientId, @Param("userId") Long userId, @Param("isDefault") Boolean isDefault);

    /**
     * 根据姓名模糊查询就诊人（管理员用）
     */
    Page<Patient> findByNameContainingAndDeletedFalse(String name, Pageable pageable);

    /**
     * 根据手机号模糊查询就诊人（管理员用）
     */
    Page<Patient> findByPhoneContainingAndDeletedFalse(String phone, Pageable pageable);

    /**
     * 查询所有未删除的就诊人（管理员用）
     */
    Page<Patient> findByDeletedFalse(Pageable pageable);
}
