package com.example.backend.modules.patient.dto;

import com.example.backend.modules.patient.enums.GenderEnum;
import com.example.backend.modules.patient.enums.RelationshipEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PatientCreateDTO {
    
    @NotBlank(message = "就诊人姓名不能为空")
    private String name;
    
    @Pattern(regexp = "^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$", 
             message = "身份证号格式不正确")
    private String idCard;
    
    @NotBlank(message = "手机号不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;
    
    @NotNull(message = "性别不能为空")
    private GenderEnum gender;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    
    @NotNull(message = "关系不能为空")
    private RelationshipEnum relationship = RelationshipEnum.SELF;
    
    private String emergencyContact;
    
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "紧急联系人电话格式不正确")
    private String emergencyPhone;
    
    private String address;
    
    private String medicalHistory;
    
    private String allergies;
    
    private Boolean isDefault = false;
}
