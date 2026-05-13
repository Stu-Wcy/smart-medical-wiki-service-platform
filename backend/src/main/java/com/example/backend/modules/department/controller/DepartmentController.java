package com.example.backend.modules.department.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.department.dto.*;
import com.example.backend.modules.department.service.DepartmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

/**
 * 科室管理接口
 */
@Tag(name = "科室管理接口")
@RestController
@RequestMapping("/api/admin/departments")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@SecurityRequirement(name = "Bearer")
public class DepartmentController {

    private final DepartmentService departmentService;

    @Operation(summary = "分页查询科室列表")
    @GetMapping
    public Result<PageResult<DepartmentVO>> list(
            DepartmentQueryDTO queryDTO,
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer size) {
        PageResult<DepartmentVO> result = departmentService.list(queryDTO, page, size);
        return Result.success(result);
    }

    @Operation(summary = "根据医院ID获取科室列表")
    @GetMapping("/hospital/{hospitalId}")
    public Result<List<DepartmentVO>> listByHospitalId(@PathVariable Long hospitalId) {
        List<DepartmentVO> result = departmentService.listByHospitalId(hospitalId);
        return Result.success(result);
    }

    @Operation(summary = "根据分类ID获取科室列表")
    @GetMapping("/category/{categoryId}")
    public Result<List<DepartmentVO>> listByCategoryId(@PathVariable Long categoryId) {
        List<DepartmentVO> result = departmentService.listByCategoryId(categoryId);
        return Result.success(result);
    }

    @Operation(summary = "获取科室详情")
    @GetMapping("/{id}")
    public Result<DepartmentVO> get(@PathVariable Long id) {
        DepartmentVO result = departmentService.get(id);
        return Result.success(result);
    }

    @Operation(summary = "新增科室")
    @PostMapping
    public Result<DepartmentVO> add(@Valid @RequestBody DepartmentAddDTO addDTO) {
        DepartmentVO result = departmentService.add(addDTO);
        return Result.success(result);
    }

    @Operation(summary = "更新科室")
    @PutMapping
    public Result<DepartmentVO> update(@Valid @RequestBody DepartmentUpdateDTO updateDTO) {
        DepartmentVO result = departmentService.update(updateDTO);
        return Result.success(result);
    }

    @Operation(summary = "删除科室")
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        departmentService.delete(id);
        return Result.success();
    }

    @Operation(summary = "批量删除科室")
    @DeleteMapping("/batch")
    public Result<Void> batchDelete(@RequestBody List<Long> ids) {
        departmentService.batchDelete(ids);
        return Result.success();
    }
}
