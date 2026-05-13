package com.example.backend.modules.feedback.enums;

import lombok.Getter;

@Getter
public enum FeedbackTypeEnum {
    PRODUCT_SUGGESTION(1, "产品建议"),
    FUNCTION_ERROR(2, "功能异常"),
    USAGE_CONSULTATION(3, "使用咨询"),
    OTHER(4, "其他");

    private final Integer value;
    private final String desc;

    FeedbackTypeEnum(Integer value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    public static FeedbackTypeEnum fromValue(Integer value) {
        if (value == null) {
            return null;
        }
        for (FeedbackTypeEnum type : FeedbackTypeEnum.values()) {
            if (type.getValue().equals(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("未知的反馈类型: " + value);
    }
} 