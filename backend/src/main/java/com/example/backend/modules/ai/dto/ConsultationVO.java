package com.example.backend.modules.ai.dto;

import com.example.backend.modules.ai.enums.ConsultationStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ConsultationVO {
    
    /**
     * ID
     */
    private Long id;
    
    /**
     * 用户ID
     */
    private Long userId;
    
    /**
     * 症状描述
     */
    private String symptoms;
    
    /**
     * AI诊断结果
     */
    private String diagnosis;
    
    /**
     * 建议
     */
    private String suggestions;
    
    /**
     * 问诊状态
     */
    private ConsultationStatus status;
    
    /**
     * 状态描述
     */
    private String statusDesc;
    
    /**
     * 问诊持续时间（秒）
     */
    private Integer duration;
    
    /**
     * 创建时间
     */
    private LocalDateTime createdTime;
} 