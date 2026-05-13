package com.example.backend.modules.patient.dto;

import com.example.backend.modules.patient.enums.GenderEnum;
import com.example.backend.modules.patient.enums.PatientStatusEnum;
import com.example.backend.modules.patient.enums.RelationshipEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class PatientDTO {
    
    private Long id;
    
    private Long userId;
    
    private String userName;
    
    private String name;
    
    private String idCard;
    
    private String phone;
    
    private GenderEnum gender;
    
    private String genderName;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    
    private Integer age;
    
    private RelationshipEnum relationship;
    
    private String relationshipName;
    
    private String emergencyContact;
    
    private String emergencyPhone;
    
    private String address;
    
    private String medicalHistory;
    
    private String allergies;
    
    private Boolean isDefault;
    
    private PatientStatusEnum status;
    
    private String statusName;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdTime;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedTime;
    
    // 便捷方法
    public String getGenderName() {
        return gender != null ? gender.getDescription() : null;
    }
    
    public String getRelationshipName() {
        return relationship != null ? relationship.getDescription() : null;
    }
    
    public String getStatusName() {
        return status != null ? status.getDescription() : null;
    }
}
