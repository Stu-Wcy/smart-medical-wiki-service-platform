package com.example.backend.modules.feedback.service.impl;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.exception.BusinessException;
import com.example.backend.modules.feedback.dto.FeedbackCreateDTO;
import com.example.backend.modules.feedback.dto.FeedbackQueryDTO;
import com.example.backend.modules.feedback.dto.FeedbackReplyDTO;
import com.example.backend.modules.feedback.dto.FeedbackVO;
import com.example.backend.modules.feedback.entity.Feedback;
import com.example.backend.modules.feedback.enums.FeedbackStatusEnum;
import com.example.backend.modules.feedback.enums.FeedbackTypeEnum;
import com.example.backend.modules.feedback.repository.FeedbackRepository;
import com.example.backend.modules.feedback.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import jakarta.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void create(Long userId, FeedbackCreateDTO createDTO) {
        Feedback feedback = new Feedback();
        feedback.setUserId(userId);
        feedback.setType(FeedbackTypeEnum.fromValue(createDTO.getType()));
        feedback.setContent(createDTO.getContent());
        feedback.setImages(createDTO.getImages());
        feedback.setStatus(FeedbackStatusEnum.PENDING);
        feedback.setCreatedTime(LocalDateTime.now());
        feedback.setCreatedBy(userId);
        feedbackRepository.save(feedback);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void reply(Long id, FeedbackReplyDTO replyDTO) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new BusinessException("意见反馈不存在"));
        
        if (feedback.getStatus() == FeedbackStatusEnum.PROCESSED) {
            throw new BusinessException("意见反馈已处理");
        }

        feedback.setReply(replyDTO.getReply());
        feedback.setStatus(FeedbackStatusEnum.PROCESSED);
        feedback.setReplyTime(LocalDateTime.now());
        feedback.setUpdatedTime(LocalDateTime.now());
        feedbackRepository.save(feedback);
    }

    @Override
    public FeedbackVO getDetail(Long id, Long userId) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new BusinessException("意见反馈不存在"));
                
        // 如果不是管理员访问，需要验证是否是本人的反馈
        if (userId != null && !feedback.getUserId().equals(userId)) {
            throw new BusinessException("无权查看该反馈");
        }
        
        return buildFeedbackVO(feedback);
    }

    @Override
    public PageResult<FeedbackVO> list(FeedbackQueryDTO queryDTO, Integer page, Integer size) {
        // 构建查询条件
        Specification<Feedback> specification = buildSpecification(queryDTO);
        // 分页查询
        PageRequest pageRequest = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "createdTime"));
        Page<Feedback> feedbackPage = feedbackRepository.findAll(specification, pageRequest);
        // 构建返回结果
        List<FeedbackVO> feedbackVOs = feedbackPage.getContent().stream()
                .map(this::buildFeedbackVO)
                .collect(Collectors.toList());
        
        Page<FeedbackVO> voPage = new org.springframework.data.domain.PageImpl<>(
            feedbackVOs, pageRequest, feedbackPage.getTotalElements());
        return PageResult.build(voPage);
    }

    private FeedbackVO buildFeedbackVO(Feedback feedback) {
        FeedbackVO vo = new FeedbackVO();
        vo.setId(feedback.getId());
        vo.setUserId(feedback.getUserId());
        vo.setType(feedback.getType().getValue());
        vo.setTypeDesc(feedback.getType().getDesc());
        vo.setContent(feedback.getContent());
        vo.setImages(feedback.getImages());
        vo.setStatus(feedback.getStatus().getValue());
        vo.setStatusDesc(feedback.getStatus().getDesc());
        vo.setReply(feedback.getReply());
        vo.setReplyTime(feedback.getReplyTime());
        vo.setCreatedTime(feedback.getCreatedTime());
        return vo;
    }

    private Specification<Feedback> buildSpecification(FeedbackQueryDTO queryDTO) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 用户ID
            if (queryDTO.getUserId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("userId"), queryDTO.getUserId()));
            }

            // 反馈类型
            if (queryDTO.getType() != null) {
                predicates.add(criteriaBuilder.equal(root.get("type"), 
                    FeedbackTypeEnum.fromValue(queryDTO.getType())));
            }

            // 处理状态
            if (queryDTO.getStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), 
                    FeedbackStatusEnum.fromValue(queryDTO.getStatus())));
            }

            // 创建时间范围
            if (queryDTO.getStartTime() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("createdTime"),
                        queryDTO.getStartTime()));
            }
            if (queryDTO.getEndTime() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("createdTime"),
                        queryDTO.getEndTime()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
} 