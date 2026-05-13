package com.example.backend.modules.consult.service.impl;

import com.example.backend.common.service.MailService;
import com.example.backend.modules.consult.dto.ConsultationCreateDTO;
import com.example.backend.modules.consult.dto.ConsultationReplyDTO;
import com.example.backend.modules.consult.entity.OnlineConsultation;
import com.example.backend.modules.consult.enums.ConsultationStatus;
import com.example.backend.modules.consult.repository.OnlineConsultationRepository;
import com.example.backend.modules.consult.service.OnlineConsultationService;
import com.example.backend.modules.doctor.repository.DoctorUserRepository;
import com.example.backend.modules.user.entity.User;
import com.example.backend.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OnlineConsultationServiceImpl implements OnlineConsultationService {
    private final OnlineConsultationRepository consultationRepository;
    private final DoctorUserRepository doctorUserRepository;
    private final UserRepository userRepository;
    private final com.example.backend.modules.patient.repository.PatientRepository patientRepository;
    private final MailService mailService;
    private final SimpMessagingTemplate messagingTemplate;
    
    @Override
    @Transactional
    public OnlineConsultation create(Long userId, ConsultationCreateDTO dto) {
        OnlineConsultation oc = new OnlineConsultation();
        oc.setPatientId(dto.getPatientId());
        oc.setDoctorId(dto.getDoctorId());
        oc.setPatientCondition(dto.getPatientCondition());
        oc.setPicPath(dto.getPicUrls() != null ? String.join(",", dto.getPicUrls()) : null);
        oc.setStatus(ConsultationStatus.PENDING.getValue());
        oc.setCreatedAt(LocalDateTime.now());
        oc = consultationRepository.save(oc);
        notifyStatus(oc);
        return oc;
    }
    
    @Override
    public List<OnlineConsultation> listUser(Long userId) {
        List<com.example.backend.modules.patient.entity.Patient> patients = patientRepository.findByUserIdAndDeletedFalseOrderByIsDefaultDescCreatedTimeDesc(userId);
        List<Long> ids = patients.stream().map(com.example.backend.modules.patient.entity.Patient::getId).collect(Collectors.toList());
        if (ids.isEmpty()) return java.util.Collections.emptyList();
        return consultationRepository.findByPatientIdInOrderByCreatedAtDesc(ids);
    }
    
    @Override
    public List<OnlineConsultation> listDoctor(Long doctorId) {
        return consultationRepository.findByDoctorIdOrderByCreatedAtDesc(doctorId);
    }
    
    @Override
    public OnlineConsultation get(Long id) {
        return consultationRepository.findById(id).orElse(null);
    }
    
    @Override
    @Transactional
    public OnlineConsultation reply(Long doctorId, Long id, ConsultationReplyDTO dto) {
        OnlineConsultation oc = consultationRepository.findById(id).orElse(null);
        if (oc == null) return null;
        String reply = dto != null ? dto.getReplyText() : null;
        oc.setDoctorReply(reply);
        oc.setStatus(ConsultationStatus.REPLIED.getValue());
        oc.setRepliedAt(LocalDateTime.now());
        Boolean notifyByEmail = dto != null ? dto.getNotifyByEmail() : null;
        oc.setIsMailed(Boolean.TRUE.equals(notifyByEmail));
        oc = consultationRepository.save(oc);
        if (Boolean.TRUE.equals(notifyByEmail)) {
            User patient = userRepository.findById(oc.getPatientId()).orElse(null);
            if (patient != null && patient.getEmail() != null) {
                mailService.send(patient.getEmail(), "线上咨询已答复", reply != null ? reply : "");
            }
        }
        notifyStatus(oc);
        return oc;
    }
    
    @Override
    @Transactional
    public OnlineConsultation evaluate(Long userId, Long id, Integer evaluation) {
        OnlineConsultation oc = consultationRepository.findById(id).orElse(null);
        if (oc == null) return null;
        oc.setEvaluation(evaluation);
        oc.setStatus(ConsultationStatus.EVALUATED.getValue());
        oc = consultationRepository.save(oc);
        notifyStatus(oc);
        return oc;
    }
    
    private void notifyStatus(OnlineConsultation oc) {
        try {
            messagingTemplate.convertAndSend("/topic/consultations/doctor/" + oc.getDoctorId(), oc);
            messagingTemplate.convertAndSend("/topic/consultations/user/" + oc.getPatientId(), oc);
        } catch (Exception ignored) {}
    }
}
