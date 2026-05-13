package com.example.backend.modules.ai.repository;

import com.example.backend.modules.ai.entity.ConsultationMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ConsultationMessageRepository extends JpaRepository<ConsultationMessage, Long> {
    
    /**
     * 查询问诊记录的所有消息
     *
     * @param consultationId 问诊记录ID
     * @return 消息列表
     */
    @Query("SELECT m FROM ConsultationMessage m WHERE m.consultationId = ?1 ORDER BY m.sequence ASC")
    List<ConsultationMessage> findByConsultationIdOrderBySequenceAsc(Long consultationId);
    
    /**
     * 查询问诊记录的最大序号
     *
     * @param consultationId 问诊记录ID
     * @return 最大序号
     */
    @Query("SELECT MAX(m.sequence) FROM ConsultationMessage m WHERE m.consultationId = ?1")
    Integer findMaxSequenceByConsultationId(Long consultationId);
} 