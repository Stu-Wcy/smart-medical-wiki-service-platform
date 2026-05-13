package com.example.backend.modules.ai.dto;

import com.example.backend.modules.ai.enums.MessageType;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ConsultationMessageVO {
    
    /**
     * ID
     */
    private Long id;
    
    /**
     * 问诊记录ID
     */
    private Long consultationId;
    
    /**
     * 消息类型
     */
    private MessageType type;
    
    /**
     * 类型描述
     */
    private String typeDesc;
    
    /**
     * 消息内容
     */
    private String content;
    
    /**
     * 序号
     */
    private Integer sequence;
    
    /**
     * 创建时间
     */
    private LocalDateTime createdTime;
} 