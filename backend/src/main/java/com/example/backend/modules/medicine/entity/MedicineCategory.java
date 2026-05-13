package com.example.backend.modules.medicine.entity;

import com.example.backend.common.base.BaseEntity;
import com.example.backend.modules.medicine.enums.MedicineStatusEnum;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "t_medicine_category")
@EqualsAndHashCode(callSuper = true)
public class MedicineCategory extends BaseEntity {

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 200)
    private String description;

    private Integer sort;

    @Enumerated(EnumType.ORDINAL)
    private MedicineStatusEnum status = MedicineStatusEnum.NORMAL;
} 