package com.example.backend.modules.ai.entity;

import com.example.backend.common.base.BaseEntity;
import com.example.backend.modules.ai.enums.ConsultationStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "t_ai_consultation")
@EqualsAndHashCode(callSuper = true)
public class AiConsultation extends BaseEntity {
    
    /**
     * 用户ID
     */
    @Column(nullable = false)
    private Long userId;
    
    /**
     * 症状描述
     */
    @Column(nullable = false, columnDefinition = "text")
    private String symptoms;
    
    /**
     * AI诊断结果
     */
    @Column( columnDefinition = "text")
    private String diagnosis;
    
    /**
     * 建议
     */
    @Column(columnDefinition = "text")
    private String suggestions;
    
    /**
     * 问诊状态
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ConsultationStatus status;
    
    /**
     * 问诊持续时间（秒）
     */
    private Integer duration;
    
    /**
     * 提示标记数
     */
    private Integer promptTokens;
    
    /**
     * 完成标记数
     */
    private Integer completionTokens;
} 