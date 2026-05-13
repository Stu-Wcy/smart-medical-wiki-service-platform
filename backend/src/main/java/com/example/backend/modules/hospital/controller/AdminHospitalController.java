package com.example.backend.modules.hospital.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.hospital.dto.*;
import com.example.backend.modules.hospital.service.HospitalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 管理员医院信息接口
 */
@Tag(name = "管理员-医院管理")
@RestController
@RequestMapping("/api/admin/hospitals")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminHospitalController {

    private final HospitalService hospitalService;

    @Operation(summary = "分页查询医院列表")
    @GetMapping
    public Result<PageResult<HospitalVO>> list(
            HospitalQueryDTO queryDTO,
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer size) {
        return Result.success(hospitalService.list(queryDTO, page, size));
    }

    @Operation(summary = "获取医院详情")
    @GetMapping("/{id}")
    public Result<HospitalVO> get(@Parameter(description = "医院ID") @PathVariable Long id) {
        return Result.success(hospitalService.get(id));
    }

    @Operation(summary = "新增医院")
    @PostMapping
    public Result<HospitalVO> add(@RequestBody @Valid HospitalAddDTO addDTO) {
        return Result.success(hospitalService.add(addDTO));
    }

    @Operation(summary = "更新医院")
    @PutMapping
    public Result<HospitalVO> update(@RequestBody @Valid HospitalUpdateDTO updateDTO) {
        return Result.success(hospitalService.update(updateDTO));
    }

    @Operation(summary = "删除医院")
    @DeleteMapping("/{id}")
    public Result<Void> delete(@Parameter(description = "医院ID") @PathVariable Long id) {
        hospitalService.delete(id);
        return Result.success();
    }

    @Operation(summary = "批量删除医院")
    @DeleteMapping("/batch")
    public Result<Void> batchDelete(@RequestBody List<Long> ids) {
        hospitalService.batchDelete(ids);
        return Result.success();
    }

    @Operation(summary = "获取所有省份")
    @GetMapping("/provinces")
    public Result<List<String>> getProvinces() {
        return Result.success(hospitalService.getProvinces());
    }

    @Operation(summary = "根据省份获取城市")
    @GetMapping("/cities")
    public Result<List<String>> getCitiesByProvince(
            @Parameter(description = "省份") @RequestParam String province) {
        return Result.success(hospitalService.getCitiesByProvince(province));
    }
}
