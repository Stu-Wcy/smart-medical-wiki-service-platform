import type { PageResult, Result } from '../common';

export enum Gender {
  UNKNOWN = 0,
  MALE = 1,
  FEMALE = 2,
}

export const GenderTextMap: Record<Gender, string> = {
  [Gender.UNKNOWN]: '未知',
  [Gender.MALE]: '男',
  [Gender.FEMALE]: '女',
};

export enum RoleType {
  VISITOR = 0,
  USER = 1,
  ADMIN = 2,
  DOCTOR = 3,
}

export const RoleTypeTextMap: Record<RoleType, string> = {
  [RoleType.VISITOR]: '游客',
  [RoleType.USER]: '用户',
  [RoleType.ADMIN]: '管理员',
  [RoleType.DOCTOR]: '医生',
};

export enum UserStatus {
  DISABLED = 0,
  NORMAL = 1,
}

export const UserStatusTextMap: Record<UserStatus, string> = {
  [UserStatus.DISABLED]: '禁用',
  [UserStatus.NORMAL]: '正常',
};

// 用户信息
export interface UserInfoDTO {
  id: number;
  username: string;
  nickname?: string;
  realName?: string;
  avatar?: string;
  phone?: string;
  email?: string;
  gender: Gender;
  birthDate?: string;
  roleType: RoleType;
  status: UserStatus;
  createTime?: string;
  updateTime?: string;
}

// 用户查询条件
export interface UserQueryDTO {
  username?: string;
  realName?: string;
  phone?: string;
  email?: string;
  status?: UserStatus;
}

// 新增用户请求
export interface UserAddDTO {
  username: string;
  password: string;
  nickname?: string;
  realName?: string;
  avatar?: string;
  phone?: string;
  email?: string;
  gender?: Gender;
  birthDate?: string;
  roleType?: RoleType;
}

// 更新用户请求
export interface UserUpdateDTO extends Omit<UserAddDTO, 'username' | 'password'> {
  id: number;
  status?: UserStatus;
}

// 分页查询结果
export type PageResultUserInfoDTO = PageResult<UserInfoDTO>;

// API 响应结果
export type ResultUserInfoDTO = Result<UserInfoDTO>;

// 空响应结果
export type ResultVoid = Result<void>; 
