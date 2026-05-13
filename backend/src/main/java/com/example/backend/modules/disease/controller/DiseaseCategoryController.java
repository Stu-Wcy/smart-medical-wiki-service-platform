package com.example.backend.modules.disease.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.disease.dto.DiseaseCategoryDTO;
import com.example.backend.modules.disease.service.DiseaseCategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "疾病分类管理接口")
@RestController
@RequestMapping("/api/admin/disease/categories")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
@SecurityRequirement(name = "Bearer")
public class DiseaseCategoryController {

    private final DiseaseCategoryService diseaseCategoryService;

    @Operation(summary = "分页查询疾病分类列表")
    @GetMapping
    public Result<PageResult<DiseaseCategoryDTO>> list(
            @Parameter(description = "分类名称") @RequestParam(required = false) String name,
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer size) {
        Page<DiseaseCategoryDTO> categoryPage = diseaseCategoryService.list(name, page, size);
        return Result.success(PageResult.build(categoryPage));
    }

    @Operation(summary = "获取疾病分类详情")
    @GetMapping("/{id}")
    public Result<DiseaseCategoryDTO> get(@PathVariable Long id) {
        return Result.success(diseaseCategoryService.get(id));
    }

    @Operation(summary = "新增疾病分类")
    @PostMapping
    public Result<DiseaseCategoryDTO> add(@Valid @RequestBody DiseaseCategoryDTO addDTO) {
        return Result.success(diseaseCategoryService.add(addDTO));
    }

    @Operation(summary = "更新疾病分类")
    @PutMapping
    public Result<DiseaseCategoryDTO> update(@Valid @RequestBody DiseaseCategoryDTO updateDTO) {
        return Result.success(diseaseCategoryService.update(updateDTO));
    }

    @Operation(summary = "删除疾病分类")
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        diseaseCategoryService.delete(id);
        return Result.success();
    }

    @Operation(summary = "启用疾病分类")
    @PutMapping("/{id}/enable")
    public Result<Void> enable(@PathVariable Long id) {
        diseaseCategoryService.updateStatus(id, 1);
        return Result.success();
    }

    @Operation(summary = "禁用疾病分类")
    @PutMapping("/{id}/disable")
    public Result<Void> disable(@PathVariable Long id) {
        diseaseCategoryService.updateStatus(id, 0);
        return Result.success();
    }
} 