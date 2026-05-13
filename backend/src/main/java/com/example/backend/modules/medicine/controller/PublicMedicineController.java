package com.example.backend.modules.medicine.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.medicine.dto.MedicineCategoryDTO;
import com.example.backend.modules.medicine.dto.MedicineDTO;
import com.example.backend.modules.medicine.dto.MedicineQueryDTO;
import com.example.backend.modules.medicine.service.MedicineCategoryService;
import com.example.backend.modules.medicine.service.MedicineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "药品查询")
@RestController
@RequestMapping("/api/public/medicines")
@RequiredArgsConstructor
public class PublicMedicineController {

    private final MedicineService medicineService;
    private final MedicineCategoryService medicineCategoryService;

    @Operation(summary = "分页查询药品列表")
    @GetMapping
    public Result<PageResult<MedicineDTO>> list(
            @Parameter(description = "关键词(匹配药品名称、生产厂家)") @RequestParam(required = false) String keyword,
            @Parameter(description = "分类ID") @RequestParam(required = false) Long categoryId,
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer size) {
        MedicineQueryDTO queryDTO = new MedicineQueryDTO();
        queryDTO.setName(keyword);
        queryDTO.setManufacturer(keyword);
        queryDTO.setCategoryId(categoryId);
        queryDTO.setStatus(1); // 只查询正常状态的药品
        return Result.success(medicineService.list(queryDTO, page, size));
    }

    @Operation(summary = "获取药品详情")
    @GetMapping("/{id}")
    public Result<MedicineDTO> get(@Parameter(description = "药品ID") @PathVariable Long id) {
        return Result.success(medicineService.get(id));
    }

    @Operation(summary = "获取药品分类下拉框")
    @GetMapping("/categories")
    public Result<List<MedicineCategoryDTO>> listCategories() {
        return Result.success(medicineCategoryService.listAll());
    }
} 