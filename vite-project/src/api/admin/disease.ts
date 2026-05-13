import request from '@/utils/request';
import type { DiseaseDTO, DiseaseQueryDTO, DiseasePageResult } from '@/types/admin/disease';
import type { Result } from '@/types/common';

const BASE_URL = '/admin/diseases';

// 获取疾病列表
export const getDiseaseList = (params: DiseaseQueryDTO) => {
  return request.get<Result<DiseasePageResult>>(BASE_URL, { params });
};

// 获取疾病详情
export const getDiseaseDetail = (id: number) => {
  return request.get<Result<DiseaseDTO>>(`${BASE_URL}/${id}`);
};

// 新增疾病
export const addDisease = (data: DiseaseDTO) => {
  return request.post<Result<DiseaseDTO>>(BASE_URL, data);
};

// 更新疾病
export const updateDisease = (data: DiseaseDTO) => {
  return request.put<Result<DiseaseDTO>>(BASE_URL, data);
};

// 删除疾病
export const deleteDisease = (id: number) => {
  return request.delete<Result<void>>(`${BASE_URL}/${id}`);
};

// 启用疾病
export const enableDisease = (id: number) => {
  return request.put<Result<void>>(`${BASE_URL}/${id}/enable`);
};

// 禁用疾病
export const disableDisease = (id: number) => {
  return request.put<Result<void>>(`${BASE_URL}/${id}/disable`);
}; 