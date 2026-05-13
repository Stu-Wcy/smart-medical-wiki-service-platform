package com.example.backend.modules.user.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoleTypeEnum {
    VISITOR(0, "游客"),
    USER(1, "用户"),
    ADMIN(2, "管理员"),
    DOCTOR(3, "医生");

    private final Integer value;
    private final String desc;

  public static RoleTypeEnum findByValue(Integer roleType) {
    for (RoleTypeEnum roleTypeEnum : RoleTypeEnum.values()) {
      if (roleTypeEnum.getValue().equals(roleType)) {
        return roleTypeEnum;
      }
    }
    return null;
  }
}
