import type { PageResult, Result } from '../common';

// 药品信息DTO
export interface MedicineInfoDTO {
  id: number;
  name: string;
  description: string;
  manufacturer: string;
  price: number;
  stock: number;
  unit: string;
  category: string;
  status: number; // 0: 下架, 1: 上架
  createdAt: string;
  updatedAt: string;
}

// 药品查询DTO
export interface MedicineQueryDTO {
  name?: string;
  categoryId?: number;
  manufacturer?: string;
  status?: number;
}

// 药品添加DTO
export interface MedicineAddDTO {
  name: string;
  description: string;
  manufacturer: string;
  price: number;
  stock: number;
  unit: string;
  category: string;
}

// 药品更新DTO
export interface MedicineUpdateDTO extends MedicineAddDTO {
  id: number;
}

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
  createdAt?: string;
  updatedAt?: string;
}

// 分页查询结果类型
export type PageResultMedicineDTO = PageResult<MedicineDTO>;

// API 响应结果类型
export type ResultMedicineDTO = Result<MedicineDTO>;

export interface ResultVoid {
  code: number;
  message: string;
  data: any;
} 