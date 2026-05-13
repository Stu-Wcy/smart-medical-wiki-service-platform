package com.example.backend.modules.consult.service;

import com.example.backend.modules.consult.dto.ConsultationCreateDTO;
import com.example.backend.modules.consult.dto.ConsultationReplyDTO;
import com.example.backend.modules.consult.entity.OnlineConsultation;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OnlineConsultationService {
    OnlineConsultation create(Long userId, ConsultationCreateDTO dto);
    List<OnlineConsultation> listUser(Long userId);
    List<OnlineConsultation> listDoctor(Long doctorId);
    OnlineConsultation get(Long id);
    OnlineConsultation reply(Long doctorId, Long id, ConsultationReplyDTO dto);
    OnlineConsultation evaluate(Long userId, Long id, Integer evaluation);
}
