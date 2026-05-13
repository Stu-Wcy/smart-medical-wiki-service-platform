package com.example.backend.modules.feedback.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "意见反馈查询条件")
public class FeedbackQueryDTO {

    @Schema(description = "反馈类型")
    private Integer type;

    @Schema(description = "处理状态")
    private Integer status;

    @Schema(description = "用户ID")
    private Long userId;

    @Schema(description = "开始时间")
    private LocalDateTime startTime;

    @Schema(description = "结束时间")
    private LocalDateTime endTime;
} 