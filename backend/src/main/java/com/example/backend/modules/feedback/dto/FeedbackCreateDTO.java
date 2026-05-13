package com.example.backend.modules.feedback.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "创建意见反馈")
public class FeedbackCreateDTO {

    @Schema(description = "反馈类型：1-产品建议，2-功能异常，3-使用咨询，4-其他")
    @NotNull(message = "反馈类型不能为空")
    private Integer type;

    @Schema(description = "反馈内容")
    @NotBlank(message = "反馈内容不能为空")
    @Size(max = 1000, message = "反馈内容长度不能超过1000个字符")
    private String content;

    @Schema(description = "图片URL，多个用逗号分隔")
    private String images;
} 