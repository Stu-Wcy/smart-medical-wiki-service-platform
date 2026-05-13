package com.example.backend.modules.department.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.department.dto.*;
import com.example.backend.modules.department.service.DepartmentCategoryService;
import com.example.backend.modules.department.service.DepartmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 公共科室浏览接口
 */
@Tag(name = "公共科室浏览接口")
@RestController
@RequestMapping("/api/public/departments")
@RequiredArgsConstructor
public class PublicDepartmentController {

    private final DepartmentService departmentService;
    private final DepartmentCategoryService categoryService;

    @Operation(summary = "获取所有科室分类")
    @GetMapping("/categories")
    public Result<List<DepartmentCategoryVO>> getCategories() {
        List<DepartmentCategoryVO> result = categoryService.listAll();
        return Result.success(result);
    }

    @Operation(summary = "分页查询科室列表")
    @GetMapping
    public Result<PageResult<DepartmentVO>> list(
            DepartmentQueryDTO queryDTO,
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer size) {
        PageResult<DepartmentVO> result = departmentService.listForPublic(queryDTO, page, size);
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
        DepartmentVO result = departmentService.getForPublic(id);
        return Result.success(result);
    }
}
