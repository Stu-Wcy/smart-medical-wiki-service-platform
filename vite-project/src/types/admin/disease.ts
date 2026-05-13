import { PageParams, PageResult } from '../common';
//PageQuery
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

// 疾病查询参数
//PageQuery
export interface DiseaseQueryDTO extends PageParams {
  name?: string;
  categoryId?: number;
  symptom?: string;
  cause?: string;
  status?: number;
}

// 疾病分页结果
export type DiseasePageResult = PageResult<DiseaseDTO>; 