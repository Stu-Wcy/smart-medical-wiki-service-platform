package com.example.backend.modules.user.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserStatusEnum {
    DISABLED(0, "禁用"),
    NORMAL(1, "正常");

    private final Integer value;
    private final String desc;

  public static UserStatusEnum findByValue(Integer status) {
    for (UserStatusEnum statusEnum : UserStatusEnum.values()) {
      if (statusEnum.getValue().equals(status)) {
        return statusEnum;
      }
    }
    return null;
  }
}