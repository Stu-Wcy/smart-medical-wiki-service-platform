import type { PageResult, Result } from './common';

// 药品分类DTO
export interface MedicineCategoryDTO {
  id?: number;
  name: string;
  description?: string;
  sort?: number;
  status?: number;
}

// 药品DTO
export interface MedicineDTO {
  id?: number;
  name: string;
  images?: string;
  manufacturer?: string;
  specification?: string;
  price?: number;
  stock?: number;
  description?: string;
  usageMethod?: string;
  contraindication?: string;
  status?: number;
  categoryId: number;
  categoryName?: string;
}

// API 响应类型
export type MedicineListResult = Result<PageResult<MedicineDTO>>;
export type MedicineDetailResult = Result<MedicineDTO>;
export type MedicineCategoryListResult = Result<MedicineCategoryDTO[]>;

// 查询参数类型
export interface MedicineQueryParams {
  keyword?: string;
  categoryId?: number;
  page?: number;
  size?: number;
} 