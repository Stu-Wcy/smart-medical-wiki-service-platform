package com.example.backend.modules.hospital.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 医院类型枚举
 */
@Getter
@RequiredArgsConstructor
public enum HospitalTypeEnum {
    GENERAL(1, "综合医院"),
    SPECIALIZED(2, "专科医院"),
    TRADITIONAL_CHINESE(3, "中医医院");

    private final Integer value;
    private final String desc;

    public static HospitalTypeEnum findByValue(Integer value) {
        for (HospitalTypeEnum type : HospitalTypeEnum.values()) {
            if (type.getValue().equals(value)) {
                return type;
            }
        }
        return null;
    }
}
