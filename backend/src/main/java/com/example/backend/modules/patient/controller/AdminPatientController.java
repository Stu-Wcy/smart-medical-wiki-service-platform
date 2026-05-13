package com.example.backend.modules.patient.controller;

import com.example.backend.common.base.Result;
import com.example.backend.modules.patient.dto.*;
import com.example.backend.modules.patient.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/admin/patients")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminPatientController {

    private final PatientService patientService;

    /**
     * 管理员分页查询所有就诊人
     */
    @GetMapping("/page")
    public Result<com.example.backend.common.base.PageResult<PatientDTO>> getAllPatientsPage(PatientQueryDTO queryDTO) {
        try {
            // 处理关系字段的转换
            if (queryDTO.getRelationship() != null) {
                log.info("原始关系参数: {}", queryDTO.getRelationship());
            }

            Page<PatientDTO> result = patientService.getAllPatientsPage(queryDTO);
            return Result.success(result);
        } catch (Exception e) {
            log.error("管理员分页查询就诊人失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 管理员获取就诊人详情
     */
    @GetMapping("/{id}")
    public Result<PatientDTO> getPatientById(@PathVariable Long id) {
        try {
            PatientDTO result = patientService.getPatientByIdForAdmin(id);
            return Result.success(result);
        } catch (Exception e) {
            log.error("管理员获取就诊人详情失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 管理员更新就诊人信息
     */
    @PutMapping
    public Result<PatientDTO> updatePatient(@Valid @RequestBody PatientUpdateDTO updateDTO) {
        try {
            PatientDTO result = patientService.updatePatientForAdmin(updateDTO);
            return Result.success(result);
        } catch (Exception e) {
            log.error("管理员更新就诊人失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 管理员删除就诊人
     */
    @DeleteMapping("/{id}")
    public Result<Void> deletePatient(@PathVariable Long id) {
        try {
            patientService.deletePatientForAdmin(id);
            return Result.success();
        } catch (Exception e) {
            log.error("管理员删除就诊人失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 管理员验证身份证号是否存在
     */
    @GetMapping("/check/idcard")
    public Result<Boolean> checkIdCard(
            @RequestParam String idCard,
            @RequestParam(required = false) Long excludeId) {
        try {
            boolean exists = patientService.isIdCardExists(idCard, excludeId);
            return Result.success(exists);
        } catch (Exception e) {
            log.error("管理员验证身份证号失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 管理员验证手机号是否存在
     */
    @GetMapping("/check/phone")
    public Result<Boolean> checkPhone(
            @RequestParam String phone,
            @RequestParam(required = false) Long excludeId) {
        try {
            boolean exists = patientService.isPhoneExists(phone, excludeId);
            return Result.success(exists);
        } catch (Exception e) {
            log.error("管理员验证手机号失败", e);
            return Result.error(e.getMessage());
        }
    }
}
