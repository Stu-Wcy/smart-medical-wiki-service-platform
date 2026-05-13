import request from '@/utils/request';
import type {
  MedicineListResult,
  MedicineDetailResult,
  MedicineCategoryListResult,
  MedicineQueryParams,
} from '@/types/medicine';

// 获取药品分类列表
export const getMedicineCategoryList = () => {
  return request.get<MedicineCategoryListResult>('/public/medicines/categories');
};

// 获取药品列表
export const getMedicineList = (params: MedicineQueryParams) => {
  return request.get<MedicineListResult>('/public/medicines', { params });
};

// 获取药品详情
export const getMedicineDetail = (id: number) => {
  return request.get<MedicineDetailResult>(`/public/medicines/${id}`);
}; 