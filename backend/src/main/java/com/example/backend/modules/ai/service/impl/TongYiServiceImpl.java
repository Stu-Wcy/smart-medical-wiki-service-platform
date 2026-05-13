package com.example.backend.modules.ai.service.impl;

import com.alibaba.dashscope.aigc.generation.Generation;
import com.alibaba.dashscope.aigc.generation.GenerationResult;
import com.alibaba.dashscope.aigc.generation.models.QwenParam;
import com.alibaba.dashscope.common.Message;
import com.alibaba.dashscope.common.Role;
import com.alibaba.dashscope.exception.ApiException;
import com.alibaba.dashscope.exception.InputRequiredException;
import com.alibaba.dashscope.exception.NoApiKeyException;
import com.example.backend.common.exception.BusinessException;
import com.example.backend.modules.ai.config.TongYiConfig;
import com.example.backend.modules.ai.entity.ConsultationMessage;
import com.example.backend.modules.ai.enums.MessageType;
import com.example.backend.modules.ai.service.AiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TongYiServiceImpl implements AiService {

    private final TongYiConfig config;

    @Override
    public String diagnose(String symptoms, List<ConsultationMessage> context) {
        try {
            Generation gen = new Generation();
            List<Message> messages = new ArrayList<>();

            // 系统提示语
            messages.add(Message.builder()
                    .role(Role.SYSTEM.getValue())
                    .content("你是一个专业的医生AI助手，请根据用户描述的症状进行初步诊断和建议。" +
                            "诊断时请注意以下几点：\n" +
                            "1. 仔细分析症状\n" +
                            "2. 给出可能的病因\n" +
                            "3. 提供初步建议\n" +
                            "4. 提醒是否需要及时就医\n" +
                            "请用专业但通俗易懂的语言回答。")
                    .build());

            // 添加历史对话上下文
            if (context != null && !context.isEmpty()) {
                for (ConsultationMessage msg : context) {
                    Role role = msg.getType().equals(MessageType.USER.getValue()) ? 
                            Role.USER : Role.ASSISTANT;
                    messages.add(Message.builder()
                            .role(role.getValue())
                            .content(msg.getContent())
                            .build());
                }
            }

            // 添加当前用户问题
            messages.add(Message.builder()
                    .role(Role.USER.getValue())
                    .content(symptoms)
                    .build());

            // 构建请求参数
            QwenParam param = QwenParam.builder()
                    .model(config.getModel())
                    .messages(messages)
                    .apiKey(config.getApiKey())
                    .topP(0.8)
                    .temperature(config.getTemperature())
                    .maxTokens(config.getMaxTokens())
                    .build();

            // 发送请求
            GenerationResult result = gen.call(param);
            
            // 返回AI回复内容
            return result.getOutput().getText();

        } catch (NoApiKeyException e) {
            log.error("通义千问API密钥未配置", e);
            throw new BusinessException("AI服务配置异常");
        } catch (InputRequiredException e) {
            log.error("通义千问API输入参数异常", e);
            throw new BusinessException("AI服务参数异常");
        } catch (ApiException e) {
            log.error("通义千问API调用异常", e);
            throw new BusinessException("AI服务调用失败");
        } catch (Exception e) {
            log.error("AI问诊异常", e);
            throw new BusinessException("AI问诊服务异常");
        }
    }
} 