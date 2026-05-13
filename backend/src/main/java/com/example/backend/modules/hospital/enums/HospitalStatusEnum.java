package com.example.backend.modules.hospital.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 医院状态枚举
 */
@Getter
@RequiredArgsConstructor
public enum HospitalStatusEnum {
    DISABLED(0, "禁用"),
    NORMAL(1, "正常");

    private final Integer value;
    private final String desc;

    public static HospitalStatusEnum findByValue(Integer value) {
        for (HospitalStatusEnum status : HospitalStatusEnum.values()) {
            if (status.getValue().equals(value)) {
                return status;
            }
        }
        return null;
    }
}
