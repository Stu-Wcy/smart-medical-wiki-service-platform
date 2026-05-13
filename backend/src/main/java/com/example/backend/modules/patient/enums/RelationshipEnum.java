package com.example.backend.modules.patient.enums;

import lombok.Getter;

@Getter
public enum RelationshipEnum {
    SELF("本人"),
    FATHER("父亲"),
    MOTHER("母亲"),
    SPOUSE("配偶"),
    CHILD("子女"),
    OTHER("其他");

    private final String description;

    RelationshipEnum(String description) {
        this.description = description;
    }

    public static RelationshipEnum fromDescription(String description) {
        if (description == null) {
            return SELF;
        }
        for (RelationshipEnum relationship : values()) {
            if (relationship.getDescription().equals(description)) {
                return relationship;
            }
        }
        return OTHER;
    }

    /**
     * 从字符串值转换，支持枚举名称和描述
     */
    public static RelationshipEnum fromString(String value) {
        if (value == null || value.trim().isEmpty()) {
            return SELF;
        }

        // 首先尝试按枚举名称匹配
        try {
            return RelationshipEnum.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            // 如果枚举名称匹配失败，尝试按描述匹配
            return fromDescription(value);
        }
    }
}
