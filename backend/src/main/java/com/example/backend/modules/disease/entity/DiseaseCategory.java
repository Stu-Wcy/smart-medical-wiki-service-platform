package com.example.backend.modules.disease.entity;

import com.example.backend.common.base.BaseEntity;
import com.example.backend.modules.disease.enums.DiseaseStatusEnum;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "t_disease_category")
@EqualsAndHashCode(callSuper = true)
public class DiseaseCategory extends BaseEntity {

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 200)
    private String description;

    private Integer sort;

    @Enumerated(EnumType.ORDINAL)
    private DiseaseStatusEnum status = DiseaseStatusEnum.NORMAL;
} 