import { PageResult } from './common';

// 疾病DTO
export interface DiseaseDTO {
  id?: number;
  name: string;
  categoryId: number;
  categoryName?: string;
  symptoms?: string;
  causes?: string;
  treatment?: string;
  prevention?: string;
  images?: string;
  status?: number;
}

// 疾病分类DTO
export interface DiseaseCategoryDTO {
  id: number;
  name: string;
  description?: string;
  sort?: number;
  status?: number;
}

// 疾病查询参数
export interface DiseaseQuery {
  keyword?: string;
  categoryId?: number;
  page?: number;
  size?: number;
}

// 疾病分页结果
export type DiseasePageResult = PageResult<DiseaseDTO>; 