import type { PageResult, Result } from './common';

// 科室状态枚举
export enum DepartmentStatus {
  DISABLED = 0,
  NORMAL = 1,
}

export const DepartmentStatusTextMap: Record<DepartmentStatus, string> = {
  [DepartmentStatus.DISABLED]: '禁用',
  [DepartmentStatus.NORMAL]: '正常',
};

// 科室分类接口
export interface DepartmentCategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  sort: number;
  status: number;
  statusDesc: string;
  createdTime: string;
  updatedTime: string;
}

// 科室信息接口
export interface Department {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  hospitalId: number;
  hospitalName: string;
  description?: string;
  features?: string;
  services?: string;
  location?: string;
  phone?: string;
  images?: string;
  sort: number;
  status: number;
  statusDesc: string;
  createdTime: string;
  updatedTime: string;
}

// 科室查询DTO
export interface DepartmentQueryDTO {
  name?: string;
  categoryId?: number;
  hospitalId?: number;
  status?: number;
}

// 科室分类新增DTO
export interface DepartmentCategoryAddDTO {
  name: string;
  description?: string;
  icon?: string;
  sort?: number;
  status?: number;
}

// 科室分类更新DTO
export interface DepartmentCategoryUpdateDTO {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  sort?: number;
  status?: number;
}

// 科室新增DTO
export interface DepartmentAddDTO {
  name: string;
  categoryId: number;
  hospitalId: number;
  description?: string;
  features?: string;
  services?: string;
  location?: string;
  phone?: string;
  images?: string;
  sort?: number;
  status?: number;
}

// 科室更新DTO
export interface DepartmentUpdateDTO {
  id: number;
  name: string;
  categoryId: number;
  hospitalId: number;
  description?: string;
  features?: string;
  services?: string;
  location?: string;
  phone?: string;
  images?: string;
  sort?: number;
  status?: number;
}

// 科室分类新增DTO
export interface DepartmentCategoryAddDTO {
  name: string;
  description?: string;
  icon?: string;
  sort?: number;
  status?: number;
}

// 科室分类更新DTO
export interface DepartmentCategoryUpdateDTO {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  sort?: number;
  status?: number;
}

// API响应类型
export type DepartmentCategoryResult = Result<DepartmentCategory>;
export type DepartmentCategoryListResult = Result<DepartmentCategory[]>;
export type DepartmentCategoryPageResult = Result<PageResult<DepartmentCategory>>;

export type DepartmentResult = Result<Department>;
export type DepartmentListResult = Result<Department[]>;
export type DepartmentPageResult = Result<PageResult<Department>>;
