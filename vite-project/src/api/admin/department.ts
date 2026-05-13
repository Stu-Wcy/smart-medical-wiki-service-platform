import request from '@/utils/request';
import type {
  DepartmentResult,
  DepartmentListResult,
  DepartmentPageResult,
  DepartmentQueryDTO,
  DepartmentAddDTO,
  DepartmentUpdateDTO,
} from '@/types/department';

const BASE_URL = '/admin/departments';

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

/**
 * 新增科室
 */
export const addDepartment = (data: DepartmentAddDTO) => {
  return request.post<DepartmentResult>(BASE_URL, data);
};

/**
 * 更新科室
 */
export const updateDepartment = (data: DepartmentUpdateDTO) => {
  return request.put<DepartmentResult>(BASE_URL, data);
};

/**
 * 删除科室
 */
export const deleteDepartment = (id: number) => {
  return request.delete(`${BASE_URL}/${id}`);
};

/**
 * 获取科室列表（别名，用于兼容）
 */
export const getDepartments = getDepartmentList;

/**
 * 批量删除科室
 */
export const batchDeleteDepartments = (ids: number[]) => {
  return request.delete(`${BASE_URL}/batch`, { data: ids });
};
