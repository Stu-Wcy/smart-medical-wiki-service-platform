package com.example.backend.modules.ai.service;

import com.example.backend.modules.ai.entity.ConsultationMessage;
import java.util.List;

public interface AiService {
    /**
     * 进行AI问诊（带上下文）
     *
     * @param symptoms 症状描述
     * @param context 对话上下文
     * @return AI诊断结果
     */
    String diagnose(String symptoms, List<ConsultationMessage> context);
} 