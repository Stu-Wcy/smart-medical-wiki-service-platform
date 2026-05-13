package com.example.backend.modules.disease.entity;

import com.example.backend.common.base.BaseEntity;
import com.example.backend.modules.disease.enums.DiseaseStatusEnum;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "t_disease")
@EqualsAndHashCode(callSuper = true)
public class Disease extends BaseEntity {

    @Column(length = 100, nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private DiseaseCategory category;

    @Column(columnDefinition = "text")
    private String symptoms;

    @Column(columnDefinition = "text")
    private String causes;

    @Column(columnDefinition = "text")
    private String treatment;

    @Column(columnDefinition = "text")
    private String prevention;

    @Column(length = 1000)
    private String images;

    @Enumerated(EnumType.ORDINAL)
    private DiseaseStatusEnum status = DiseaseStatusEnum.NORMAL;
} 