package com.example.backend.modules.ai.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ConsultationMessageDTO {
    
    /**
     * 问诊记录ID（可选，如果不传则创建新问诊）
     */
    private Long consultationId;
    
    /**
     * 消息内容
     */
    @NotBlank(message = "消息内容不能为空")
    private String content;
    
    /**
     * 是否结束问诊（可选，默认false）
     */
    private Boolean finish = false;
} 