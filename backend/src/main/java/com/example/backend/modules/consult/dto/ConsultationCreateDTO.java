package com.example.backend.modules.consult.dto;

import lombok.Data;

import java.util.List;

@Data
public class ConsultationCreateDTO {
    private Long patientId;
    private Long doctorId;
    private String patientCondition;
    private List<String> picUrls;
}
