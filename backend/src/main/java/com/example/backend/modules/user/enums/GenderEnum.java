package com.example.backend.modules.user.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum GenderEnum {
    UNKNOWN(0, "未知"),
    MALE(1, "男"),
    FEMALE(2, "女");

    private final Integer value;
    private final String desc;

    public static GenderEnum findByValue(Integer gender) {
        for (GenderEnum genderEnum : values()) {
            if (genderEnum.getValue().equals(gender)) {
                return genderEnum;
            }
        }
        return null;
    }
}