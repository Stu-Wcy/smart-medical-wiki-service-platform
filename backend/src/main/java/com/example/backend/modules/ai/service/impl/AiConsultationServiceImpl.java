package com.example.backend.modules.ai.service.impl;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.exception.BusinessException;
import com.example.backend.modules.ai.dto.*;
import com.example.backend.modules.ai.entity.AiConsultation;
import com.example.backend.modules.ai.entity.ConsultationMessage;
import com.example.backend.modules.ai.enums.ConsultationStatus;
import com.example.backend.modules.ai.enums.MessageType;
import com.example.backend.modules.ai.repository.AiConsultationRepository;
import com.example.backend.modules.ai.repository.ConsultationMessageRepository;
import com.example.backend.modules.ai.service.AiConsultationService;
import com.example.backend.modules.ai.service.AiService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AiConsultationServiceImpl implements AiConsultationService {

    private final AiService aiService;
    private final AiConsultationRepository consultationRepository;
    private final ConsultationMessageRepository messageRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ConsultationMessageVO sendMessage(Long userId, ConsultationMessageDTO messageDTO) {
        AiConsultation consultation;
        Integer maxSequence = 0;
        
        // 如果没有consultationId，创建新问诊
        if (messageDTO.getConsultationId() == null) {
            consultation = new AiConsultation();
            consultation.setUserId(userId);
            consultation.setSymptoms(messageDTO.getContent());
            consultation.setStatus(ConsultationStatus.IN_PROGRESS);
            consultation.setCreatedBy(userId);
            consultationRepository.save(consultation);
        } else {
            // 获取已有问诊记录
            consultation = consultationRepository.findById(messageDTO.getConsultationId())
                    .orElseThrow(() -> new BusinessException("问诊记录不存在"));
            
            // 验证权限
            if (!consultation.getUserId().equals(userId)) {
                throw new BusinessException("无权操作该问诊记录");
            }
            
            // 验证问诊状态
            if (consultation.getStatus() != ConsultationStatus.IN_PROGRESS) {
                throw new BusinessException("问诊已结束");
            }
            
            // 获取最大序号
            Integer lastSequence = messageRepository.findMaxSequenceByConsultationId(consultation.getId());
            if (lastSequence != null) {
                maxSequence = lastSequence;
            }
        }
        
        try {
            // 保存用户消息
            ConsultationMessage userMessage = new ConsultationMessage();
            userMessage.setConsultationId(consultation.getId());
            userMessage.setType(MessageType.USER.getValue());
            userMessage.setContent(messageDTO.getContent());
            userMessage.setSequence(maxSequence + 1);
            userMessage.setCreatedBy(userId);
            messageRepository.save(userMessage);
            
            // 获取历史消息作为上下文
            List<ConsultationMessage> context = messageRepository
                    .findByConsultationIdOrderBySequenceAsc(consultation.getId());
            
            // 调用AI服务进行回复
            String reply = aiService.diagnose(messageDTO.getContent(), context);
            
            // 保存AI回复消息
            ConsultationMessage aiMessage = new ConsultationMessage();
            aiMessage.setConsultationId(consultation.getId());
            aiMessage.setType(MessageType.AI.getValue());
            aiMessage.setContent(reply);
            aiMessage.setSequence(maxSequence + 2);
            aiMessage.setCreatedBy(userId);
            messageRepository.save(aiMessage);
            
            // 更新问诊记录
            consultation.setDiagnosis(reply);
            
            // 如果用户选择结束问诊
            if (Boolean.TRUE.equals(messageDTO.getFinish())) {
                consultation.setStatus(ConsultationStatus.COMPLETED);
            }
            
            consultationRepository.save(consultation);
            
            return buildMessageVO(aiMessage);
            
        } catch (Exception e) {
            consultation.setStatus(ConsultationStatus.FAILED);
            consultationRepository.save(consultation);
            throw new BusinessException("AI回复失败：" + e.getMessage());
        }
    }

    @Override
    public ConsultationVO getDetail(Long id, Long userId) {
        AiConsultation consultation = consultationRepository.findById(id)
                .orElseThrow(() -> new BusinessException("问诊记录不存在"));
                
        // 如果不是管理员访问，需要验证是否是本人的问诊记录
        if (userId != null && !consultation.getUserId().equals(userId)) {
            throw new BusinessException("无权查看该问诊记录");
        }
        
        return buildConsultationVO(consultation);
    }

    @Override
    public List<ConsultationMessageVO> getMessages(Long consultationId, Long userId) {
        // 验证问诊记录是否存在
        AiConsultation consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new BusinessException("问诊记录不存在"));
        
        // 如果不是管理员访问，需要验证是否是本人的问诊记录
        if (userId != null && !consultation.getUserId().equals(userId)) {
            throw new BusinessException("无权查看该问诊记录");
        }
        
        // 查询消息列表
        List<ConsultationMessage> messages = messageRepository
                .findByConsultationIdOrderBySequenceAsc(consultationId);
        
        return messages.stream()
                .map(this::buildMessageVO)
                .collect(Collectors.toList());
    }

    @Override
    public PageResult<ConsultationVO> list(ConsultationQueryDTO queryDTO, Integer page, Integer size) {
        // 构建查询条件
        Specification<AiConsultation> specification = buildSpecification(queryDTO);
        
        // 分页查询
        PageRequest pageRequest = PageRequest.of(page - 1, size, 
                Sort.by(Sort.Direction.DESC, "createdTime"));
        Page<AiConsultation> consultationPage = consultationRepository.findAll(specification, pageRequest);
        
        // 构建返回结果
        List<ConsultationVO> consultationVOs = consultationPage.getContent().stream()
                .map(this::buildConsultationVO)
                .collect(Collectors.toList());
        
        return PageResult.build(new org.springframework.data.domain.PageImpl<>(
                consultationVOs, pageRequest, consultationPage.getTotalElements()));
    }

    private ConsultationVO buildConsultationVO(AiConsultation consultation) {
        ConsultationVO vo = new ConsultationVO();
        vo.setId(consultation.getId());
        vo.setUserId(consultation.getUserId());
        vo.setSymptoms(consultation.getSymptoms());
        vo.setDiagnosis(consultation.getDiagnosis());
        vo.setSuggestions(consultation.getSuggestions());
        vo.setStatus(consultation.getStatus());
        vo.setStatusDesc(consultation.getStatus().getDesc());
        vo.setDuration(consultation.getDuration());
        vo.setCreatedTime(consultation.getCreatedTime());
        return vo;
    }

    private ConsultationMessageVO buildMessageVO(ConsultationMessage message) {
        ConsultationMessageVO vo = new ConsultationMessageVO();
        vo.setId(message.getId());
        vo.setConsultationId(message.getConsultationId());
        vo.setType(MessageType.fromValue(message.getType()));
        vo.setTypeDesc(MessageType.fromValue(message.getType()).getDesc());
        vo.setContent(message.getContent());
        vo.setSequence(message.getSequence());
        vo.setCreatedTime(message.getCreatedTime());
        return vo;
    }

    private Specification<AiConsultation> buildSpecification(ConsultationQueryDTO queryDTO) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            // 用户ID
            if (queryDTO.getUserId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("userId"), queryDTO.getUserId()));
            }
            
            // 状态
            if (queryDTO.getStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), queryDTO.getStatus()));
            }
            
            // 时间范围
            if (queryDTO.getStartTime() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("createdTime"), queryDTO.getStartTime()));
            }
            if (queryDTO.getEndTime() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("createdTime"), queryDTO.getEndTime()));
            }
            
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
} 