import request from '@/utils/request';
import type { LoginDTO, RegisterDTO, UserInfoDTO, Result } from '@/types/auth';
import type { Result as R } from '@/types/common';

// 登录
export const login = (data: LoginDTO) => {
  console.log(data);
  return request.post<Result<UserInfoDTO>>('/auth/login', data);
};

// 注册
export const register = (data: RegisterDTO) => {
  return request.post<Result<UserInfoDTO>>('/auth/register', data);
};

// 退出登录
export const logout = () => {
  return request.post<Result<null>>('/auth/logout');
};

// 获取当前用户信息
export const getCurrentUser = () => {
  return request.get<Result<UserInfoDTO>>('/auth/current');
};

// 更新当前用户信息
export const updateCurrentUser = (data: Partial<UserInfoDTO>) => {
  return request.put<Result<UserInfoDTO>>('/auth/current', data);
};
 
export const changePassword = (data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  return request.post<R<boolean>>('/auth/password/change', data);
};
