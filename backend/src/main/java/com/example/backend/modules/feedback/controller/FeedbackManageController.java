package com.example.backend.modules.feedback.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.feedback.dto.FeedbackQueryDTO;
import com.example.backend.modules.feedback.dto.FeedbackReplyDTO;
import com.example.backend.modules.feedback.dto.FeedbackVO;
import com.example.backend.modules.feedback.service.FeedbackService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "意见反馈管理")
@RestController
@RequestMapping("/api/admin/feedbacks")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class FeedbackManageController {

    private final FeedbackService feedbackService;

    @Operation(summary = "回复意见反馈")
    @PutMapping("/{id}/reply")
    public Result<Void> reply(@Parameter(description = "意见反馈ID") @PathVariable Long id,
                     @RequestBody @Valid FeedbackReplyDTO replyDTO) {
        feedbackService.reply(id, replyDTO);
        return Result.success();
    }

    @Operation(summary = "查询意见反馈详情")
    @GetMapping("/{id}")
    public Result<FeedbackVO> getDetail(@Parameter(description = "意见反馈ID") @PathVariable Long id) {
        return Result.success(feedbackService.getDetail(id, null));
    }

    @Operation(summary = "分页查询意见反馈")
    @GetMapping
    public Result<PageResult<FeedbackVO>> list(@Valid FeedbackQueryDTO queryDTO,
                                     @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
                                     @Parameter(description = "每页大小") @RequestParam(defaultValue = "10") Integer size) {
        return Result.success(feedbackService.list(queryDTO, page, size));
    }
} 