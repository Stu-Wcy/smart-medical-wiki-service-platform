package com.example.backend.modules.patient.entity;

import com.example.backend.common.base.BaseEntity;
import com.example.backend.modules.patient.enums.GenderEnum;
import com.example.backend.modules.patient.enums.PatientStatusEnum;
import com.example.backend.modules.patient.enums.RelationshipEnum;
import com.example.backend.modules.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "t_patient")
@EqualsAndHashCode(callSuper = true)
public class Patient extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "id_card", length = 18)
    private String idCard;

    @Column(name = "phone", length = 20, nullable = false)
    private String phone;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "gender", nullable = false)
    private GenderEnum gender;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "age")
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(name = "relationship", length = 20, nullable = false)
    private RelationshipEnum relationship = RelationshipEnum.SELF;

    @Column(name = "emergency_contact", length = 50)
    private String emergencyContact;

    @Column(name = "emergency_phone", length = 20)
    private String emergencyPhone;

    @Column(name = "address", length = 200)
    private String address;

    @Column(name = "medical_history", columnDefinition = "TEXT")
    private String medicalHistory;

    @Column(name = "allergies", length = 500)
    private String allergies;

    @Column(name = "is_default", nullable = false)
    private Boolean isDefault = false;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status", nullable = false)
    private PatientStatusEnum status = PatientStatusEnum.ACTIVE;

    // 计算年龄的方法
    public void calculateAge() {
        if (birthDate != null) {
            this.age = LocalDate.now().getYear() - birthDate.getYear();
            if (LocalDate.now().getDayOfYear() < birthDate.getDayOfYear()) {
                this.age--;
            }
        }
    }

    @PrePersist
    @PreUpdate
    public void prePersist() {
        calculateAge();
    }
}
