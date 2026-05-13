package com.example.backend.modules.ai.entity;

import com.example.backend.common.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "t_consultation_message")
@EqualsAndHashCode(callSuper = true)
public class ConsultationMessage extends BaseEntity {
    
    /**
     * 问诊记录ID
     */
    @Column(nullable = false)
    private Long consultationId;
    
    /**
     * 消息类型（0-用户消息，1-AI消息）
     */
    @Column(nullable = false)
    private Integer type;
    
    /**
     * 消息内容
     */
    @Column(nullable = false, columnDefinition = "text")
    private String content;
    
    /**
     * 提示标记数
     */
    private Integer promptTokens;
    
    /**
     * 完成标记数
     */
    private Integer completionTokens;
    
    /**
     * 序号（用于排序）
     */
    @Column(nullable = false)
    private Integer sequence;
} 