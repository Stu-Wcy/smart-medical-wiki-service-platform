package com.example.backend.modules.doctor.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.doctor.dto.*;
import com.example.backend.modules.doctor.service.DoctorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 管理员医生信息控制器
 */
@Slf4j
@RestController
@RequestMapping("/api/admin/doctors")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
@Tag(name = "管理员医生管理", description = "管理员医生信息管理接口")
public class AdminDoctorController {

    private final DoctorService doctorService;

    @GetMapping
    @Operation(summary = "分页查询医生列表", description = "根据条件分页查询医生信息")
    public Result<PageResult<DoctorDTO>> getDoctorList(
            DoctorQueryDTO queryDTO,
            @Parameter(description = "页码", example = "1") @RequestParam(defaultValue = "1") int page,
            @Parameter(description = "每页大小", example = "10") @RequestParam(defaultValue = "10") int size) {
        
        PageResult<DoctorDTO> result = doctorService.getDoctorList(queryDTO, page, size);
        return Result.success(result);
    }

    @GetMapping("/hospital/{hospitalId}")
    @Operation(summary = "根据医院ID获取医生列表", description = "获取指定医院的所有医生")
    public Result<List<DoctorDTO>> getDoctorsByHospitalId(
            @Parameter(description = "医院ID") @PathVariable Long hospitalId) {
        
        List<DoctorDTO> doctors = doctorService.getDoctorsByHospitalId(hospitalId);
        return Result.success(doctors);
    }

    @GetMapping("/department/{departmentId}")
    @Operation(summary = "根据科室ID获取医生列表", description = "获取指定科室的所有医生")
    public Result<List<DoctorDTO>> getDoctorsByDepartmentId(
            @Parameter(description = "科室ID") @PathVariable Long departmentId) {
        
        List<DoctorDTO> doctors = doctorService.getDoctorsByDepartmentId(departmentId);
        return Result.success(doctors);
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取医生详情", description = "根据ID获取医生详细信息")
    public Result<DoctorDTO> getDoctorById(
            @Parameter(description = "医生ID") @PathVariable Long id) {
        
        DoctorDTO doctor = doctorService.getDoctorById(id);
        return Result.success(doctor);
    }

    @PostMapping
    @Operation(summary = "添加医生", description = "新增医生信息")
    public Result<DoctorDTO> addDoctor(@Validated @RequestBody DoctorAddDTO addDTO) {
        DoctorDTO doctor = doctorService.addDoctor(addDTO);
        return Result.success(doctor);
    }

    @PutMapping
    @Operation(summary = "更新医生信息", description = "修改医生信息")
    public Result<DoctorDTO> updateDoctor(@Validated @RequestBody DoctorUpdateDTO updateDTO) {
        DoctorDTO doctor = doctorService.updateDoctor(updateDTO);
        return Result.success(doctor);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除医生", description = "根据ID删除医生")
    public Result<Void> deleteDoctor(
            @Parameter(description = "医生ID") @PathVariable Long id) {
        
        doctorService.deleteDoctor(id);
        return Result.success();
    }

    @DeleteMapping("/batch")
    @Operation(summary = "批量删除医生", description = "根据ID列表批量删除医生")
    public Result<Void> deleteDoctors(@RequestBody List<Long> ids) {
        doctorService.deleteDoctors(ids);
        return Result.success();
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "更新医生状态", description = "修改医生的状态（正常/停诊）")
    public Result<Void> updateDoctorStatus(
            @Parameter(description = "医生ID") @PathVariable Long id,
            @Parameter(description = "状态：0-停诊，1-正常") @RequestParam Integer status) {
        
        doctorService.updateDoctorStatus(id, status);
        return Result.success();
    }
}
