package com.example.backend.modules.appointment.enums;

import lombok.Getter;

/**
 * 预约状态枚举
 */
@Getter
public enum AppointmentStatus {
    PENDING(1, "已预约"),
    CANCELLED(2, "已取消"),
    COMPLETED(3, "已完成"),
    EXPIRED(4, "已过期");

    private final Integer value;
    private final String description;

    AppointmentStatus(Integer value, String description) {
        this.value = value;
        this.description = description;
    }

    public static AppointmentStatus fromValue(Integer value) {
        if (value == null) {
            return null;
        }
        for (AppointmentStatus status : values()) {
            if (status.getValue().equals(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("未知的预约状态: " + value);
    }
}
