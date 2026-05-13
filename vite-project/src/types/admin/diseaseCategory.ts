import { PageParams, PageResult } from '../common';
//PageQuery,
// 疾病分类DTO
export interface DiseaseCategoryDTO {
  id?: number;
  name: string;
  description?: string;
  sort?: number;
  status?: number;
}

// 疾病分类查询参数
//PageQuery,
export interface DiseaseCategoryQuery extends PageParams {
  name?: string;
}

// 疾病分类分页结果
export type DiseaseCategoryPageResult = PageResult<DiseaseCategoryDTO>; 