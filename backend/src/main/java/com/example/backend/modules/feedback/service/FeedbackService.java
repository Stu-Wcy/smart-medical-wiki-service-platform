package com.example.backend.modules.feedback.service;

import com.example.backend.common.base.PageResult;
import com.example.backend.modules.feedback.dto.FeedbackCreateDTO;
import com.example.backend.modules.feedback.dto.FeedbackQueryDTO;
import com.example.backend.modules.feedback.dto.FeedbackReplyDTO;
import com.example.backend.modules.feedback.dto.FeedbackVO;

public interface FeedbackService {

    /**
     * 创建意见反馈
     *
     * @param userId 用户ID
     * @param createDTO 创建意见反馈请求
     */
    void create(Long userId, FeedbackCreateDTO createDTO);

    /**
     * 回复意见反馈
     *
     * @param id 意见反馈ID
     * @param replyDTO 回复意见反馈请求
     */
    void reply(Long id, FeedbackReplyDTO replyDTO);

    /**
     * 查询意见反馈详情
     *
     * @param id 意见反馈ID
     * @param userId 用户ID，如果是管理员则可以为null
     * @return 意见反馈详情
     */
    FeedbackVO getDetail(Long id, Long userId);

    /**
     * 分页查询意见反馈列表
     *
     * @param queryDTO 查询条件
     * @param page 页码
     * @param size 每页大小
     * @return 意见反馈列表
     */
    PageResult<FeedbackVO> list(FeedbackQueryDTO queryDTO, Integer page, Integer size);
} 