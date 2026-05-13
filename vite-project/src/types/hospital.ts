import type { PageResult, Result } from './common';

// 医院等级枚举
export enum HospitalLevel {
  LEVEL_ONE = 1,
  LEVEL_TWO = 2,
  LEVEL_THREE = 3,
}

export const HospitalLevelTextMap: Record<HospitalLevel, string> = {
  [HospitalLevel.LEVEL_ONE]: '一级医院',
  [HospitalLevel.LEVEL_TWO]: '二级医院',
  [HospitalLevel.LEVEL_THREE]: '三级医院',
};

// 医院类型枚举
export enum HospitalType {
  GENERAL = 1,
  SPECIALIZED = 2,
  TRADITIONAL_CHINESE = 3,
}

export const HospitalTypeTextMap: Record<HospitalType, string> = {
  [HospitalType.GENERAL]: '综合医院',
  [HospitalType.SPECIALIZED]: '专科医院',
  [HospitalType.TRADITIONAL_CHINESE]: '中医医院',
};

// 医院状态枚举
export enum HospitalStatus {
  DISABLED = 0,
  NORMAL = 1,
}

export const HospitalStatusTextMap: Record<HospitalStatus, string> = {
  [HospitalStatus.DISABLED]: '禁用',
  [HospitalStatus.NORMAL]: '正常',
};

// 医院信息接口
export interface Hospital {
  id: number;
  name: string;
  level: number;
  levelDesc: string;
  type: number;
  typeDesc: string;
  province: string;
  city: string;
  district: string;
  address: string;
  fullAddress: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  images?: string;
  businessHours?: string;
  longitude?: number;
  latitude?: number;
  status: number;
  statusDesc: string;
  sort: number;
  createdTime: string;
  updatedTime: string;
}

// 医院查询参数
export interface HospitalQueryDTO {
  name?: string;
  province?: string;
  city?: string;
  district?: string;
  level?: HospitalLevel;
  type?: HospitalType;
  status?: HospitalStatus;
}

// 医院新增参数
export interface HospitalAddDTO {
  name: string;
  level: HospitalLevel;
  type: HospitalType;
  province: string;
  city: string;
  district: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  images?: string;
  businessHours?: string;
  longitude?: number;
  latitude?: number;
  status?: HospitalStatus;
  sort?: number;
}

// 医院更新参数
export interface HospitalUpdateDTO extends HospitalAddDTO {
  id: number;
}

// API 响应类型
export type HospitalListResult = Result<PageResult<Hospital>>;
export type HospitalDetailResult = Result<Hospital>;
export type ProvinceListResult = Result<string[]>;
export type CityListResult = Result<string[]>;
