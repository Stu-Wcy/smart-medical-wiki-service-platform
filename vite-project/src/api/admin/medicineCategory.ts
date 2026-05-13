import request from '@/utils/request';
import type { Result, PageResult } from '@/types/common';
import type { MedicineCategoryDTO } from '@/types/admin/medicineCategory';

const BASE_URL = '/medicine-categories';

// 获取分类列表
export const getMedicineCategoryList = async (params: {
  page?: number;
  size?: number;
  name?: string;
}) => {
  return request.get<PageResult<MedicineCategoryDTO>>(BASE_URL, { params });
};

// 获取所有分类
export const getAllMedicineCategories = async () => {
  return request.get<Result<MedicineCategoryDTO[]>>(`${BASE_URL}/all`);
};

// 获取分类详情
export const getMedicineCategoryDetail = (id: number) => {
  return request.get<Result<MedicineCategoryDTO>>(`${BASE_URL}/${id}`);
};

// 添加分类
export const addMedicineCategory = async (category: MedicineCategoryDTO) => {
  return request.post<Result<MedicineCategoryDTO>>(BASE_URL, category);
};

// 更新分类
export const updateMedicineCategory = async (id: number, data: MedicineCategoryDTO) => {
  return request.put<Result<MedicineCategoryDTO>>(`${BASE_URL}/${id}`, data);
};

// 删除分类
export const deleteMedicineCategory = async (id: number) => {
  return request.delete<Result<void>>(`${BASE_URL}/${id}`);
};

// 更新分类状态
export const updateMedicineCategoryStatus = async (id: number, status: number) => {
  return request.put<Result<void>>(`${BASE_URL}/${id}/status`, null, {
    params: { status },
  });
}; 