package com.example.backend.modules.ai.service;

import com.example.backend.common.base.PageResult;
import com.example.backend.modules.ai.dto.*;

import java.util.List;

public interface AiConsultationService {

    /**
     * 发送问诊消息（不传consultationId则创建新问诊）
     *
     * @param userId 用户ID
     * @param messageDTO 消息DTO
     * @return 消息VO
     */
    ConsultationMessageVO sendMessage(Long userId, ConsultationMessageDTO messageDTO);

    /**
     * 查询问诊记录详情
     *
     * @param id 问诊记录ID
     * @param userId 用户ID（管理员传null）
     * @return 问诊记录VO
     */
    ConsultationVO getDetail(Long id, Long userId);

    /**
     * 查询问诊记录的消息列表
     *
     * @param consultationId 问诊记录ID
     * @param userId 用户ID（管理员传null）
     * @return 消息VO列表
     */
    List<ConsultationMessageVO> getMessages(Long consultationId, Long userId);

    /**
     * 分页查询问诊记录
     *
     * @param queryDTO 查询条件
     * @param page 页码
     * @param size 每页大小
     * @return 分页结果
     */
    PageResult<ConsultationVO> list(ConsultationQueryDTO queryDTO, Integer page, Integer size);
} 