package com.example.backend.modules.ai.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MessageType {
    USER(0, "用户消息"),
    AI(1, "AI消息");

    private final Integer value;
    private final String desc;

    public static MessageType fromValue(Integer value) {
        for (MessageType type : MessageType.values()) {
            if (type.getValue().equals(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid MessageType value: " + value);
    }
} 