package com.example.backend.modules.feedback.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "回复意见反馈")
public class FeedbackReplyDTO {

    @Schema(description = "回复内容")
    @NotBlank(message = "回复内容不能为空")
    @Size(max = 1000, message = "回复内容长度不能超过1000个字符")
    private String reply;
} 