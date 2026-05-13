package com.example.backend.modules.medicine.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MedicineStatusEnum {
    DISABLED(0, "禁用"),
    NORMAL(1, "正常");

    private final Integer value;
    private final String desc;
} 