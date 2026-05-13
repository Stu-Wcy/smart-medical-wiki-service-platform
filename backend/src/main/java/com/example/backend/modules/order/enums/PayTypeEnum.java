package com.example.backend.modules.order.enums;

import lombok.Getter;

@Getter
public enum PayTypeEnum {
    WECHAT(1, "微信支付"),
    ALIPAY(2, "支付宝");

    private final Integer value;
    private final String desc;

    PayTypeEnum(Integer value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    public static PayTypeEnum fromValue(Integer value) {
        if (value == null) {
            return null;
        }
        for (PayTypeEnum type : PayTypeEnum.values()) {
            if (type.getValue().equals(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("未知的支付方式: " + value);
    }
} 