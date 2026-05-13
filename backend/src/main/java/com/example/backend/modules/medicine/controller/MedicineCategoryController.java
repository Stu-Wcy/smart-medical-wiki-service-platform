package com.example.backend.modules.medicine.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.medicine.dto.MedicineCategoryDTO;
import com.example.backend.modules.medicine.service.MedicineCategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "药品分类管理")
@RestController
@RequestMapping("/api/medicine-categories")
@RequiredArgsConstructor
public class MedicineCategoryController {

    private final MedicineCategoryService medicineCategoryService;

    @Operation(summary = "获取所有分类")
    @GetMapping("/all")
    public Result<List<MedicineCategoryDTO>> listAll() {
        return Result.success(medicineCategoryService.listAll());
    }

    @Operation(summary = "分页查询分类")
    @GetMapping
    public Result<PageResult<MedicineCategoryDTO>> list(
            @Parameter(description = "分类名称") @RequestParam(required = false) String name,
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer size) {
        return Result.success(medicineCategoryService.list(name, page, size));
    }

    @Operation(summary = "获取分类详情")
    @GetMapping("/{id}")
    public Result<MedicineCategoryDTO> get(@Parameter(description = "分类ID") @PathVariable Long id) {
        return Result.success(medicineCategoryService.get(id));
    }

    @Operation(summary = "新增分类")
    @PostMapping
    public Result<MedicineCategoryDTO> add(@Valid @RequestBody MedicineCategoryDTO addDTO) {
        return Result.success(medicineCategoryService.add(addDTO));
    }

    @Operation(summary = "更新分类")
    @PutMapping("/{id}")
    public Result<MedicineCategoryDTO> update(
            @Parameter(description = "分类ID") @PathVariable Long id,
            @Valid @RequestBody MedicineCategoryDTO updateDTO) {
        updateDTO.setId(id);
        return Result.success(medicineCategoryService.update(updateDTO));
    }

    @Operation(summary = "删除分类")
    @DeleteMapping("/{id}")
    public Result<Void> delete(@Parameter(description = "分类ID") @PathVariable Long id) {
        medicineCategoryService.delete(id);
        return Result.success();
    }

    @Operation(summary = "更新分类状态")
    @PutMapping("/{id}/status")
    public Result<Void> updateStatus(
            @Parameter(description = "分类ID") @PathVariable Long id,
            @Parameter(description = "状态：0-禁用，1-正常") @RequestParam Integer status) {
        medicineCategoryService.updateStatus(id, status);
        return Result.success();
    }
} 