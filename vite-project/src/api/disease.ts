import  request  from '@/utils/request';
import type { DiseaseDTO, DiseaseCategoryDTO, DiseaseQuery, DiseasePageResult } from '@/types/disease';
import type { Result } from '@/types/common';

const BASE_URL = '/public/diseases';

// 获取疾病列表
export const getDiseaseList = (params: DiseaseQuery) => {
  return request.get<Result<DiseasePageResult>>(BASE_URL, { params });
};

// 获取疾病详情
export const getDiseaseDetail = (id: number) => {
  return request.get<Result<DiseaseDTO>>(`${BASE_URL}/${id}`);
};

// 获取疾病分类列表
export const getDiseaseCategoryList = () => {
  return request.get<Result<DiseaseCategoryDTO[]>>(`${BASE_URL}/categories`);
}; 