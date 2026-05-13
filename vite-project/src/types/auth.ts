// 用户角色类型
export type RoleType = 'USER' | 'ADMIN' | 'VISITOR' | 'DOCTOR';

// 登录请求DTO
export interface LoginDTO {
  username: string;
  password: string;
}

// 注册请求DTO
export interface RegisterDTO extends LoginDTO {
  confirmPassword: string;
  email: string;
  phone: string;
}

// 用户信息DTO
export interface UserInfoDTO {
  id?: number;
  username: string;
  nickname?: string;
  realName?: string;
  avatar?: string;
  phone?: string;
  email?: string;
  gender?: 'UNKNOWN' | 'MALE' | 'FEMALE';
  birthDate?: string;
  token?: string;
  roleType?: RoleType;
  status?: 'DISABLED' | 'NORMAL';
  isOnline?: boolean;
}

// API 响应数据类型
export interface Result<T> {
  code: number;
  message: string;
  data: T;
}

// 登录表单数据类型（包含记住我选项）
export interface LoginFormData {
  username: string;
  password: string;
  remember?: boolean;
}

// 注册表单数据类型（包含用户协议选项）
export interface RegisterFormData extends RegisterDTO {
  agreement: boolean;
}

export interface UserInfo {
  id: number;
  username: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  gender?: number;
  department?: string;
  position?: string;
  roleType: RoleType;
}

export interface LoginResponse {
  code: number;
  message: string;
  data: {
    token: string;
  } & UserInfo;
} 
