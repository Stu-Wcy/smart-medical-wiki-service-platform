import request from '@/utils/request';
import type {
  DepartmentResult,
  DepartmentListResult,
  DepartmentPageResult,
  DepartmentCategoryListResult,
  DepartmentQueryDTO,
} from '@/types/department';

const BASE_URL = '/public/departments';

/**
 * 获取所有科室分类
 */
export const getDepartmentCategories = () => {
  return request.get<DepartmentCategoryListResult>(`${BASE_URL}/categories`);
};

/**
 * 分页查询科室列表
 */
export const getDepartmentList = (params: DepartmentQueryDTO & {
  page?: number;
  size?: number;
}) => {
  return request.get<DepartmentPageResult>(BASE_URL, { params });
};

/**
 * 根据医院ID获取科室列表
 */
export const getDepartmentsByHospitalId = (hospitalId: number) => {
  return request.get<DepartmentListResult>(`${BASE_URL}/hospital/${hospitalId}`);
};

/**
 * 根据分类ID获取科室列表
 */
export const getDepartmentsByCategoryId = (categoryId: number) => {
  return request.get<DepartmentListResult>(`${BASE_URL}/category/${categoryId}`);
};

/**
 * 获取科室详情
 */
export const getDepartment = (id: number) => {
  return request.get<DepartmentResult>(`${BASE_URL}/${id}`);
};
