import request from '@/utils/request';
import type { Result } from '@/types/common';
import type {
  UserInfoDTO,
  UserQueryDTO,
  UserAddDTO,
  UserUpdateDTO,
  PageResultUserInfoDTO,
} from '@/types/admin/user';

const BASE_URL = '/admin/users';

// 获取用户列表
export const getUserList = async (params: {
  page: number;
  size: number;
  queryDTO: UserQueryDTO;
}) => {
  const { page, size, queryDTO } = params;
  return request.get<Result<PageResultUserInfoDTO>>(BASE_URL, {
    params: {
      page,
      size,
      ...queryDTO,
    },
  });
};

// 获取用户详情
export const getUserDetail = async (id: number) => {
  return request.get<Result<UserInfoDTO>>(`${BASE_URL}/${id}`);
};

// 添加用户
export const addUser = async (user: UserAddDTO) => {
  return request.post<Result<UserInfoDTO>>(BASE_URL, user);
};

// 更新用户
export const updateUser = async (user: UserUpdateDTO) => {
  return request.put<Result<UserInfoDTO>>(BASE_URL, user);
};

// 删除用户
export const deleteUser = async (id: number) => {
  return request.delete<Result<void>>(`${BASE_URL}/${id}`);
};

// 启用用户
export const enableUser = async (id: number) => {
  return request.put<Result<void>>(`${BASE_URL}/${id}/enable`);
};

// 禁用用户
export const disableUser = async (id: number) => {
  return request.put<Result<void>>(`${BASE_URL}/${id}/disable`);
};
 
// 批量删除用户（兼容构建）
export const batchDeleteUsers = async (ids: number[]) => {
  return request.post<Result<void>>(`${BASE_URL}/batch-delete`, { ids });
};
