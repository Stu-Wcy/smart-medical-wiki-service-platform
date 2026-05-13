package com.example.backend.modules.ai.dto;

import com.example.backend.modules.ai.enums.ConsultationStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ConsultationQueryDTO {
    
    /**
     * 用户ID
     */
    private Long userId;
    
    /**
     * 问诊状态
     */
    private ConsultationStatus status;
    
    /**
     * 开始时间
     */
    private LocalDateTime startTime;
    
    /**
     * 结束时间
     */
    private LocalDateTime endTime;
} 