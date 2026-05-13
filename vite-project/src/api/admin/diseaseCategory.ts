import request from '@/utils/request';
import type { DiseaseCategoryDTO, DiseaseCategoryQuery, DiseaseCategoryPageResult } from '@/types/admin/diseaseCategory';
import type { Result } from '@/types/common';

const BASE_URL = '/admin/disease/categories';

// 获取疾病分类列表
export const getDiseaseCategoryList = (params: DiseaseCategoryQuery) => {
  return request.get<Result<DiseaseCategoryPageResult>>(BASE_URL, { params });
};

// 获取疾病分类详情
export const getDiseaseCategoryDetail = (id: number) => {
  return request.get<Result<DiseaseCategoryDTO>>(`${BASE_URL}/${id}`);
};

// 新增疾病分类
export const addDiseaseCategory = (data: DiseaseCategoryDTO) => {
  return request.post<Result<DiseaseCategoryDTO>>(BASE_URL, data);
};

// 更新疾病分类
export const updateDiseaseCategory = (data: DiseaseCategoryDTO) => {
  return request.put<Result<DiseaseCategoryDTO>>(BASE_URL, data);
};

// 删除疾病分类
export const deleteDiseaseCategory = (id: number) => {
  return request.delete<Result<void>>(`${BASE_URL}/${id}`);
};

// 启用疾病分类
export const enableDiseaseCategory = (id: number) => {
  return request.put<Result<void>>(`${BASE_URL}/${id}/enable`);
};

// 禁用疾病分类
export const disableDiseaseCategory = (id: number) => {
  return request.put<Result<void>>(`${BASE_URL}/${id}/disable`);
}; 