package com.example.backend.modules.consult.repository;

import com.example.backend.modules.consult.entity.OnlineConsultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface OnlineConsultationRepository extends JpaRepository<OnlineConsultation, Long>, JpaSpecificationExecutor<OnlineConsultation> {
    List<OnlineConsultation> findByDoctorIdOrderByCreatedAtDesc(Long doctorId);
    List<OnlineConsultation> findByPatientIdOrderByCreatedAtDesc(Long patientId);
    List<OnlineConsultation> findByPatientIdInOrderByCreatedAtDesc(List<Long> patientIds);
}
