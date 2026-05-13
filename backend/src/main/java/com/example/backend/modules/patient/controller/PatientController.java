package com.example.backend.modules.patient.controller;

import com.example.backend.common.base.Result;
import com.example.backend.modules.patient.dto.*;
import com.example.backend.modules.patient.service.PatientService;
import com.example.backend.modules.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    /**
     * 创建就诊人
     */
    @PostMapping
    public Result<PatientDTO> createPatient(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody PatientCreateDTO createDTO) {
        try {
            PatientDTO result = patientService.createPatient(currentUser.getId(), createDTO);
            return Result.success(result);
        } catch (Exception e) {
            log.error("创建就诊人失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 更新就诊人信息
     */
    @PutMapping
    public Result<PatientDTO> updatePatient(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody PatientUpdateDTO updateDTO) {
        try {
            PatientDTO result = patientService.updatePatient(currentUser.getId(), updateDTO);
            return Result.success(result);
        } catch (Exception e) {
            log.error("更新就诊人失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 删除就诊人
     */
    @DeleteMapping("/{id}")
    public Result<Void> deletePatient(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long id) {
        try {
            patientService.deletePatient(currentUser.getId(), id);
            return Result.success();
        } catch (Exception e) {
            log.error("删除就诊人失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取就诊人详情
     */
    @GetMapping("/{id}")
    public Result<PatientDTO> getPatient(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long id) {
        try {
            PatientDTO result = patientService.getPatientById(currentUser.getId(), id);
            return Result.success(result);
        } catch (Exception e) {
            log.error("获取就诊人详情失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取用户的就诊人列表
     */
    @GetMapping("/list")
    public Result<List<PatientDTO>> getUserPatients(@AuthenticationPrincipal User currentUser) {
        try {
            List<PatientDTO> result = patientService.getUserPatients(currentUser.getId());
            return Result.success(result);
        } catch (Exception e) {
            log.error("获取就诊人列表失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 分页查询用户的就诊人列表
     */
    @GetMapping("/page")
    public Result<com.example.backend.common.base.PageResult<PatientDTO>> getUserPatientsPage(
            @AuthenticationPrincipal User currentUser,
            PatientQueryDTO queryDTO) {
        try {
            Page<PatientDTO> result = patientService.getUserPatientsPage(currentUser.getId(), queryDTO);
            return Result.success(result);
        } catch (Exception e) {
            log.error("分页查询就诊人列表失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取默认就诊人
     */
    @GetMapping("/default")
    public Result<PatientDTO> getDefaultPatient(@AuthenticationPrincipal User currentUser) {
        try {
            PatientDTO result = patientService.getDefaultPatient(currentUser.getId());
            return Result.success(result);
        } catch (Exception e) {
            log.error("获取默认就诊人失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 设置默认就诊人
     */
    @PutMapping("/{id}/default")
    public Result<Void> setDefaultPatient(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long id) {
        try {
            patientService.setDefaultPatient(currentUser.getId(), id);
            return Result.success();
        } catch (Exception e) {
            log.error("设置默认就诊人失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 更新就诊人状态
     */
    @PutMapping("/{id}/status")
    public Result<Void> updatePatientStatus(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long id,
            @RequestParam Integer status) {
        try {
            patientService.updatePatientStatus(currentUser.getId(), id, status);
            return Result.success();
        } catch (Exception e) {
            log.error("更新就诊人状态失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 验证身份证号是否存在
     */
    @GetMapping("/check/idcard")
    public Result<Boolean> checkIdCard(
            @RequestParam String idCard,
            @RequestParam(required = false) Long excludeId) {
        try {
            boolean exists = patientService.isIdCardExists(idCard, excludeId);
            return Result.success(exists);
        } catch (Exception e) {
            log.error("验证身份证号失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 验证手机号是否存在
     */
    @GetMapping("/check/phone")
    public Result<Boolean> checkPhone(
            @RequestParam String phone,
            @RequestParam(required = false) Long excludeId) {
        try {
            boolean exists = patientService.isPhoneExists(phone, excludeId);
            return Result.success(exists);
        } catch (Exception e) {
            log.error("验证手机号失败", e);
            return Result.error(e.getMessage());
        }
    }
}
