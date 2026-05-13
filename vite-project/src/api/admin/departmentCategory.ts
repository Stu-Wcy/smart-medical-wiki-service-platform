import request from '@/utils/request';
import type {
  DepartmentCategoryResult,
  DepartmentCategoryListResult,
  DepartmentCategoryPageResult,
  DepartmentCategoryAddDTO,
  DepartmentCategoryUpdateDTO,
} from '@/types/department';

const BASE_URL = '/admin/department-categories';

/**
 * 分页查询科室分类列表
 */
export const getDepartmentCategoryList = (params: {
  name?: string;
  status?: number;
  page?: number;
  size?: number;
}) => {
  return request.get<DepartmentCategoryPageResult>(BASE_URL, { params });
};

/**
 * 获取所有科室分类
 */
export const getAllDepartmentCategories = () => {
  return request.get<DepartmentCategoryListResult>(`${BASE_URL}/all`);
};

/**
 * 获取科室分类详情
 */
export const getDepartmentCategory = (id: number) => {
  return request.get<DepartmentCategoryResult>(`${BASE_URL}/${id}`);
};

/**
 * 新增科室分类
 */
export const addDepartmentCategory = (data: DepartmentCategoryAddDTO) => {
  const formData = new FormData();
  formData.append('name', data.name);
  if (data.description) formData.append('description', data.description);
  if (data.icon) formData.append('icon', data.icon);
  if (data.sort !== undefined) formData.append('sort', data.sort.toString());
  if (data.status !== undefined) formData.append('status', data.status.toString());

  return request.post<DepartmentCategoryResult>(BASE_URL, formData);
};

/**
 * 更新科室分类
 */
export const updateDepartmentCategory = (data: DepartmentCategoryUpdateDTO) => {
  const formData = new FormData();
  formData.append('name', data.name);
  if (data.description) formData.append('description', data.description);
  if (data.icon) formData.append('icon', data.icon);
  if (data.sort !== undefined) formData.append('sort', data.sort.toString());
  if (data.status !== undefined) formData.append('status', data.status.toString());

  return request.put<DepartmentCategoryResult>(`${BASE_URL}/${data.id}`, formData);
};

/**
 * 删除科室分类
 */
export const deleteDepartmentCategory = (id: number) => {
  return request.delete(`${BASE_URL}/${id}`);
};

/**
 * 批量删除科室分类
 */
export const batchDeleteDepartmentCategories = (ids: number[]) => {
  return request.delete(`${BASE_URL}/batch`, { data: ids });
};
