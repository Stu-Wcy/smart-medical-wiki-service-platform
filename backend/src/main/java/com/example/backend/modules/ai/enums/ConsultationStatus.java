package com.example.backend.modules.ai.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ConsultationStatus {
    IN_PROGRESS(0, "进行中"),
    COMPLETED(1, "已完成"),
    FAILED(2, "失败");

    private final Integer value;
    private final String desc;

    public static ConsultationStatus fromValue(Integer value) {
        for (ConsultationStatus status : ConsultationStatus.values()) {
            if (status.getValue().equals(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid ConsultationStatus value: " + value);
    }
} 