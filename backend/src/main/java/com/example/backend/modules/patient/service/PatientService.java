package com.example.backend.modules.patient.service;

import com.example.backend.modules.patient.dto.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PatientService {

    /**
     * 创建就诊人
     */
    PatientDTO createPatient(Long userId, PatientCreateDTO createDTO);

    /**
     * 更新就诊人信息
     */
    PatientDTO updatePatient(Long userId, PatientUpdateDTO updateDTO);

    /**
     * 删除就诊人
     */
    void deletePatient(Long userId, Long patientId);

    /**
     * 根据ID获取就诊人详情
     */
    PatientDTO getPatientById(Long userId, Long patientId);

    /**
     * 获取用户的就诊人列表
     */
    List<PatientDTO> getUserPatients(Long userId);

    /**
     * 分页查询用户的就诊人列表
     */
    Page<PatientDTO> getUserPatientsPage(Long userId, PatientQueryDTO queryDTO);

    /**
     * 获取用户的默认就诊人
     */
    PatientDTO getDefaultPatient(Long userId);

    /**
     * 设置默认就诊人
     */
    void setDefaultPatient(Long userId, Long patientId);

    /**
     * 更新就诊人状态
     */
    void updatePatientStatus(Long userId, Long patientId, Integer status);

    /**
     * 管理员分页查询所有就诊人
     */
    Page<PatientDTO> getAllPatientsPage(PatientQueryDTO queryDTO);

    /**
     * 管理员根据ID获取就诊人详情
     */
    PatientDTO getPatientByIdForAdmin(Long patientId);

    /**
     * 管理员更新就诊人信息
     */
    PatientDTO updatePatientForAdmin(PatientUpdateDTO updateDTO);

    /**
     * 管理员删除就诊人
     */
    void deletePatientForAdmin(Long patientId);

    /**
     * 验证身份证号是否已存在
     */
    boolean isIdCardExists(String idCard, Long excludeId);

    /**
     * 验证手机号是否已存在
     */
    boolean isPhoneExists(String phone, Long excludeId);
}
