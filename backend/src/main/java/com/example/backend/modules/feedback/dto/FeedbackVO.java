package com.example.backend.modules.feedback.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "意见反馈详情")
public class FeedbackVO {

    @Schema(description = "反馈ID")
    private Long id;

    @Schema(description = "用户ID")
    private Long userId;

    @Schema(description = "反馈类型")
    private Integer type;

    @Schema(description = "反馈类型描述")
    private String typeDesc;

    @Schema(description = "反馈内容")
    private String content;

    @Schema(description = "图片URL，多个用逗号分隔")
    private String images;

    @Schema(description = "处理状态")
    private Integer status;

    @Schema(description = "处理状态描述")
    private String statusDesc;

    @Schema(description = "回复内容")
    private String reply;

    @Schema(description = "回复时间")
    private LocalDateTime replyTime;

    @Schema(description = "创建时间")
    private LocalDateTime createdTime;
} 