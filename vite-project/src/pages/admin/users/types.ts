import type { UserInfo } from '@/types/auth';

export interface UserTableItem extends UserInfo {
  key: string;
  status: 'active' | 'locked';
  createdAt: string;
}

export interface UserFormData {
  username: string;
  password?: string;
  nickname?: string;
  email?: string;
  phone?: string;
  gender?: number;
  roleType: 'USER' | 'ADMIN';
} 