package com.example.backend.modules.ai.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ConsultationCreateDTO {
    
    /**
     * 症状描述
     */
    @NotBlank(message = "症状描述不能为空")
    private String symptoms;
} 