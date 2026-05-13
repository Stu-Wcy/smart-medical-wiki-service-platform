// 性别枚举
export enum Gender {
  UNKNOWN = 0,
  MALE = 1,
  FEMALE = 2,
}

export const GENDER_MAP = {
  [Gender.UNKNOWN]: { text: '未知', value: Gender.UNKNOWN },
  [Gender.MALE]: { text: '男', value: Gender.MALE },
  [Gender.FEMALE]: { text: '女', value: Gender.FEMALE },
};

// 角色类型枚举
export enum RoleType {
  VISITOR = 0,
  USER = 1,
  ADMIN = 2,
  DOCTOR = 3,
}

export const ROLE_TYPE_MAP = {
  [RoleType.VISITOR]: { text: '游客', value: RoleType.VISITOR },
  [RoleType.USER]: { text: '普通用户', value: RoleType.USER },
  [RoleType.ADMIN]: { text: '管理员', value: RoleType.ADMIN },
  [RoleType.DOCTOR]: { text: '医生', value: RoleType.DOCTOR },
};

// 用户状态枚举
export enum UserStatus {
  DISABLED = 0,
  NORMAL = 1,
}

export const USER_STATUS_MAP = {
  [UserStatus.DISABLED]: { text: '禁用', value: UserStatus.DISABLED },
  [UserStatus.NORMAL]: { text: '正常', value: UserStatus.NORMAL },
};

// 获取枚举文本的工具函数
export const getEnumText = (map: Record<number, { text: string; value: number}>, value: number | string | undefined, defaultText = '-') => {
  if (value === undefined || value === null) {
    return defaultText;
  }
  const numValue = Number(value);
  console.log(map, value, numValue,map[numValue])
  return map[numValue]?.text || defaultText;
};

// 获取枚举值的工具函数
export const getEnumValue = (map: Record<number, { text: string; value: number }>, value: number | string | undefined, defaultValue: number) => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  const numValue = Number(value);
  console.log(map, value, numValue,map[numValue])
  return map[numValue]?.value ?? defaultValue;
};

/**
 * 方案一：基础安全版 (类型严格校验)
 * 特点：利用泛型约束确保类型安全
 */
export function getEnumValue1<T extends Record<string, unknown>>(
    enumObj: T,
    key: keyof T
): T[keyof T] {
  return enumObj[key];
}
