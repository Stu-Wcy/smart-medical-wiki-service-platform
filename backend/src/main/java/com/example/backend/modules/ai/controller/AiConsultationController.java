package com.example.backend.modules.ai.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.common.utils.SecurityUtils;
import com.example.backend.modules.ai.dto.*;
import com.example.backend.modules.ai.service.AiConsultationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "AI问诊")
@RestController
@RequestMapping("/api/public/ai/consultations")
@RequiredArgsConstructor
public class AiConsultationController {

    private final AiConsultationService consultationService;

    @Operation(summary = "发送问诊消息（不传consultationId则创建新问诊）")
    @PostMapping("/messages")
    public Result<ConsultationMessageVO> sendMessage(@RequestBody @Valid ConsultationMessageDTO messageDTO) {
        return Result.success(consultationService.sendMessage(SecurityUtils.getCurrentUserId(), messageDTO));
    }

    @Operation(summary = "查询问诊记录详情")
    @GetMapping("/{id}")
    public Result<ConsultationVO> getDetail(@Parameter(description = "问诊记录ID") @PathVariable Long id) {
        return Result.success(consultationService.getDetail(id, SecurityUtils.getCurrentUserId()));
    }

    @Operation(summary = "查询问诊记录的消息列表")
    @GetMapping("/{id}/messages")
    public Result<List<ConsultationMessageVO>> getMessages(@Parameter(description = "问诊记录ID") @PathVariable Long id) {
        return Result.success(consultationService.getMessages(id, SecurityUtils.getCurrentUserId()));
    }

    @Operation(summary = "分页查询我的问诊记录")
    @GetMapping
    public Result<PageResult<ConsultationVO>> list(@Valid ConsultationQueryDTO queryDTO,
                                         @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
                                         @Parameter(description = "每页大小") @RequestParam(defaultValue = "10") Integer size) {
        queryDTO.setUserId(SecurityUtils.getCurrentUserId());
        return Result.success(consultationService.list(queryDTO, page, size));
    }
} 