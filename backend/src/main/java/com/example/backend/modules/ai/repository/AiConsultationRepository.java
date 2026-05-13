package com.example.backend.modules.ai.repository;

import com.example.backend.modules.ai.entity.AiConsultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AiConsultationRepository extends JpaRepository<AiConsultation, Long>, 
        JpaSpecificationExecutor<AiConsultation> {
} 