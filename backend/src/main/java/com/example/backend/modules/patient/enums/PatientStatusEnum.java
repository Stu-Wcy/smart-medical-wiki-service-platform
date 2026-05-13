package com.example.backend.modules.patient.enums;

import lombok.Getter;

@Getter
public enum PatientStatusEnum {
    INACTIVE(0, "禁用"),
    ACTIVE(1, "启用");

    private final Integer code;
    private final String description;

    PatientStatusEnum(Integer code, String description) {
        this.code = code;
        this.description = description;
    }

    public static PatientStatusEnum fromCode(Integer code) {
        if (code == null) {
            return ACTIVE;
        }
        for (PatientStatusEnum status : values()) {
            if (status.getCode().equals(code)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown patient status code: " + code);
    }
}
