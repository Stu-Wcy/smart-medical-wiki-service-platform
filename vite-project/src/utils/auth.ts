import type { UserInfoDTO } from '@/types/auth';

const TOKEN_KEY = 'token';
const USER_INFO_KEY = 'medwise_user_info';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);

export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const getStoredUserInfo = (): UserInfoDTO | null => {
  const userInfo = localStorage.getItem(USER_INFO_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
};

export const setStoredUserInfo = (userInfo: UserInfoDTO): void => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
};

export const removeStoredUserInfo = (): void => {
  localStorage.removeItem(USER_INFO_KEY);
};

export const clearAuthStorage = (): void => {
  removeToken();
  removeStoredUserInfo();
}; 