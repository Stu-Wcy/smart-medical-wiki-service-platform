package com.example.backend.modules.medicine.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.medicine.dto.MedicineDTO;
import com.example.backend.modules.medicine.dto.MedicineQueryDTO;
import com.example.backend.modules.medicine.service.MedicineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

@Tag(name = "药品管理")
@RestController
@RequestMapping("/api/medicines")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
public class MedicineController {

    private final MedicineService medicineService;

    @Operation(summary = "分页查询药品列表")
    @GetMapping
    public Result<PageResult<MedicineDTO>> list(
            @Parameter(description = "查询条件") MedicineQueryDTO queryDTO,
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer size) {
        Page<MedicineDTO> resultPage = medicineService.list(queryDTO, page, size);
        return Result.success(resultPage);
    }

    @Operation(summary = "获取药品详情")
    @GetMapping("/{id}")
    public Result<MedicineDTO> get(@Parameter(description = "药品ID") @PathVariable Long id) {
        return Result.success(medicineService.get(id));
    }

    @Operation(summary = "新增药品")
    @PostMapping
    public Result<MedicineDTO> add(@Valid @RequestBody MedicineDTO addDTO) {
        return Result.success(medicineService.add(addDTO));
    }

    @Operation(summary = "更新药品")
    @PutMapping("/{id}")
    public Result<MedicineDTO> update(
            @Parameter(description = "药品ID") @PathVariable Long id,
            @Valid @RequestBody MedicineDTO updateDTO) {
        updateDTO.setId(id);
        return Result.success(medicineService.update(updateDTO));
    }

    @Operation(summary = "删除药品")
    @DeleteMapping("/{id}")
    public Result<Void> delete(@Parameter(description = "药品ID") @PathVariable Long id) {
        medicineService.delete(id);
        return Result.success();
    }

    @Operation(summary = "更新药品状态")
    @PutMapping("/{id}/status")
    public Result<Void> updateStatus(
            @Parameter(description = "药品ID") @PathVariable Long id,
            @Parameter(description = "状态(0-禁用,1-正常)") @RequestParam Integer status) {
        medicineService.updateStatus(id, status);
        return Result.success();
    }
} 
