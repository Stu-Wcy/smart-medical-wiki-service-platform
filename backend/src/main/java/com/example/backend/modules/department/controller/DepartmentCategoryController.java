package com.example.backend.modules.department.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.department.dto.DepartmentCategoryVO;
import com.example.backend.modules.department.service.DepartmentCategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 科室分类管理接口
 */
@Tag(name = "科室分类管理接口")
@RestController
@RequestMapping("/api/admin/department-categories")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@SecurityRequirement(name = "Bearer")
public class DepartmentCategoryController {

    private final DepartmentCategoryService categoryService;

    @Operation(summary = "分页查询科室分类列表")
    @GetMapping
    public Result<PageResult<DepartmentCategoryVO>> list(
            @Parameter(description = "分类名称") @RequestParam(required = false) String name,
            @Parameter(description = "状态") @RequestParam(required = false) Integer status,
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer size) {
        PageResult<DepartmentCategoryVO> result = categoryService.list(name, status, page, size);
        return Result.success(result);
    }

    @Operation(summary = "获取所有科室分类")
    @GetMapping("/all")
    public Result<List<DepartmentCategoryVO>> listAll() {
        List<DepartmentCategoryVO> result = categoryService.listAll();
        return Result.success(result);
    }

    @Operation(summary = "获取科室分类详情")
    @GetMapping("/{id}")
    public Result<DepartmentCategoryVO> get(@PathVariable Long id) {
        DepartmentCategoryVO result = categoryService.get(id);
        return Result.success(result);
    }

    @Operation(summary = "新增科室分类")
    @PostMapping
    public Result<DepartmentCategoryVO> add(
            @Parameter(description = "分类名称") @RequestParam String name,
            @Parameter(description = "分类描述") @RequestParam(required = false) String description,
            @Parameter(description = "分类图标") @RequestParam(required = false) String icon,
            @Parameter(description = "排序") @RequestParam(required = false) Integer sort,
            @Parameter(description = "状态") @RequestParam(required = false) Integer status) {
        DepartmentCategoryVO result = categoryService.add(name, description, icon, sort, status);
        return Result.success(result);
    }

    @Operation(summary = "更新科室分类")
    @PutMapping("/{id}")
    public Result<DepartmentCategoryVO> update(
            @PathVariable Long id,
            @Parameter(description = "分类名称") @RequestParam String name,
            @Parameter(description = "分类描述") @RequestParam(required = false) String description,
            @Parameter(description = "分类图标") @RequestParam(required = false) String icon,
            @Parameter(description = "排序") @RequestParam(required = false) Integer sort,
            @Parameter(description = "状态") @RequestParam(required = false) Integer status) {
        DepartmentCategoryVO result = categoryService.update(id, name, description, icon, sort, status);
        return Result.success(result);
    }

    @Operation(summary = "删除科室分类")
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return Result.success();
    }

    @Operation(summary = "批量删除科室分类")
    @DeleteMapping("/batch")
    public Result<Void> batchDelete(@RequestBody List<Long> ids) {
        categoryService.batchDelete(ids);
        return Result.success();
    }
}
