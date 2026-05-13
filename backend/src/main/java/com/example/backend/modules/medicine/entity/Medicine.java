package com.example.backend.modules.medicine.entity;

import com.example.backend.common.base.BaseEntity;
import com.example.backend.modules.medicine.enums.MedicineStatusEnum;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "t_medicine")
@EqualsAndHashCode(callSuper = true)
public class Medicine extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private MedicineCategory category;

    @Column(length = 100)
    private String specification;

    @Column(length = 200)
    private String manufacturer;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    private Integer stock;

    @Column(columnDefinition = "text")
    private String description;

    @Column(columnDefinition = "text")
    private String usageMethod;

    @Column(columnDefinition = "text")
    private String contraindication;

    @Column(length = 1000)
    private String images;

    @Enumerated(EnumType.ORDINAL)
    private MedicineStatusEnum status = MedicineStatusEnum.NORMAL;
} 