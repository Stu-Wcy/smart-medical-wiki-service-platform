package com.example.backend.modules.disease.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DiseaseStatusEnum {
    DISABLED(0, "禁用"),
    NORMAL(1, "正常");

    private final Integer value;
    private final String desc;
} 