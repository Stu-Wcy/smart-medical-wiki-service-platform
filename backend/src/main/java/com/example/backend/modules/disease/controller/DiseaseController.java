package com.example.backend.modules.disease.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.disease.dto.DiseaseDTO;
import com.example.backend.modules.disease.dto.DiseaseQueryDTO;
import com.example.backend.modules.disease.service.DiseaseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "疾病管理接口")
@RestController
@RequestMapping("/api/admin/diseases")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
@SecurityRequirement(name = "Bearer")
public class DiseaseController {

    private final DiseaseService diseaseService;

    @Operation(summary = "分页查询疾病列表")
    @GetMapping
    public Result<PageResult<DiseaseDTO>> list(
            DiseaseQueryDTO queryDTO,
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer size) {
        Page<DiseaseDTO> diseasePage = diseaseService.list(queryDTO, page, size);
        return Result.success(PageResult.build(diseasePage));
    }

    @Operation(summary = "获取疾病详情")
    @GetMapping("/{id}")
    public Result<DiseaseDTO> get(@PathVariable Long id) {
        return Result.success(diseaseService.get(id));
    }

    @Operation(summary = "新增疾病")
    @PostMapping
    public Result<DiseaseDTO> add(@Valid @RequestBody DiseaseDTO addDTO) {
        return Result.success(diseaseService.add(addDTO));
    }

    @Operation(summary = "更新疾病")
    @PutMapping
    public Result<DiseaseDTO> update(@Valid @RequestBody DiseaseDTO updateDTO) {
        return Result.success(diseaseService.update(updateDTO));
    }

    @Operation(summary = "删除疾病")
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        diseaseService.delete(id);
        return Result.success();
    }

    @Operation(summary = "启用疾病")
    @PutMapping("/{id}/enable")
    public Result<Void> enable(@PathVariable Long id) {
        diseaseService.updateStatus(id, 1);
        return Result.success();
    }

    @Operation(summary = "禁用疾病")
    @PutMapping("/{id}/disable")
    public Result<Void> disable(@PathVariable Long id) {
        diseaseService.updateStatus(id, 0);
        return Result.success();
    }
} 
