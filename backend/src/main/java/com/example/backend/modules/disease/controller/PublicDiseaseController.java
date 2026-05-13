package com.example.backend.modules.disease.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.disease.dto.DiseaseCategoryDTO;
import com.example.backend.modules.disease.dto.DiseaseDTO;
import com.example.backend.modules.disease.dto.DiseaseQueryDTO;
import com.example.backend.modules.disease.service.DiseaseCategoryService;
import com.example.backend.modules.disease.service.DiseaseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "疾病查询")
@RestController
@RequestMapping("/api/public/diseases")
@RequiredArgsConstructor
public class PublicDiseaseController {

    private final DiseaseService diseaseService;
    private final DiseaseCategoryService diseaseCategoryService;

    @Operation(summary = "分页查询疾病列表")
    @GetMapping
    public Result<PageResult<DiseaseDTO>> list(
            @Parameter(description = "关键词(匹配疾病名称、症状、病因)") @RequestParam(required = false) String keyword,
            @Parameter(description = "分类ID") @RequestParam(required = false) Long categoryId,
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer size) {
        DiseaseQueryDTO queryDTO = new DiseaseQueryDTO();
        queryDTO.setName(keyword);
        queryDTO.setSymptom(keyword);
        queryDTO.setCause(keyword);
        queryDTO.setCategoryId(categoryId);
        queryDTO.setStatus(1); // 只查询正常状态的疾病
        return Result.success(diseaseService.list(queryDTO, page, size));
    }

    @Operation(summary = "获取疾病详情")
    @GetMapping("/{id}")
    public Result<DiseaseDTO> get(@Parameter(description = "疾病ID") @PathVariable Long id) {
        return Result.success(diseaseService.get(id));
    }

    @Operation(summary = "获取疾病分类下拉框")
    @GetMapping("/categories")
    public Result<List<DiseaseCategoryDTO>> listCategories() {
        return Result.success(diseaseCategoryService.listAll());
    }
} 