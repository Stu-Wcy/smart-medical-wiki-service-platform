package com.example.backend.modules.hospital.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 医院等级枚举
 */
@Getter
@RequiredArgsConstructor
public enum HospitalLevelEnum {
    LEVEL_ONE(1, "一级医院"),
    LEVEL_TWO(2, "二级医院"),
    LEVEL_THREE(3, "三级医院");

    private final Integer value;
    private final String desc;

    public static HospitalLevelEnum findByValue(Integer value) {
        for (HospitalLevelEnum level : HospitalLevelEnum.values()) {
            if (level.getValue().equals(value)) {
                return level;
            }
        }
        return null;
    }
}
