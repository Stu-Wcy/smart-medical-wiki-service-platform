package com.example.backend.modules.feedback.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.common.utils.SecurityUtils;
import com.example.backend.modules.feedback.dto.FeedbackCreateDTO;
import com.example.backend.modules.feedback.dto.FeedbackQueryDTO;
import com.example.backend.modules.feedback.dto.FeedbackVO;
import com.example.backend.modules.feedback.service.FeedbackService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "意见反馈")
@RestController
@RequestMapping("/api/feedbacks")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Operation(summary = "创建意见反馈")
    @PostMapping
    public Result<Void> create(@RequestBody @Valid FeedbackCreateDTO createDTO) {
        feedbackService.create(SecurityUtils.getCurrentUserId(), createDTO);
        return Result.success();
    }

    @Operation(summary = "查询意见反馈详情")
    @GetMapping("/{id}")
    public Result<FeedbackVO> getDetail(@Parameter(description = "意见反馈ID") @PathVariable Long id) {
        return Result.success(feedbackService.getDetail(id, SecurityUtils.getCurrentUserId()));
    }

    @Operation(summary = "分页查询我的意见反馈")
    @GetMapping
    public Result<PageResult<FeedbackVO>> list(@Valid FeedbackQueryDTO queryDTO,
                                     @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
                                     @Parameter(description = "每页大小") @RequestParam(defaultValue = "10") Integer size) {
        queryDTO.setUserId(SecurityUtils.getCurrentUserId());
        return Result.success(feedbackService.list(queryDTO, page, size));
    }
} 