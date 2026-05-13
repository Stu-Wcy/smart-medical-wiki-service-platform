package com.example.backend.modules.feedback.enums;

import lombok.Getter;

@Getter
public enum FeedbackStatusEnum {
    PENDING(0, "待处理"),
    PROCESSED(1, "已处理");

    private final Integer value;
    private final String desc;

    FeedbackStatusEnum(Integer value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    public static FeedbackStatusEnum fromValue(Integer value) {
        if (value == null) {
            return null;
        }
        for (FeedbackStatusEnum status : FeedbackStatusEnum.values()) {
            if (status.getValue().equals(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("未知的处理状态: " + value);
    }
} 