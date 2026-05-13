import request from '@/utils/request';
import type {
  DoctorQueryDTO,
  DoctorAddDTO,
  DoctorUpdateDTO,
  DoctorResult,
  DoctorListResult,
  DoctorPageResult,
} from '@/types/doctor';

const BASE_URL = '/admin/doctors';

/**
 * 分页查询医生列表
 */
export const getDoctorList = (params: DoctorQueryDTO & {
  page?: number;
  size?: number;
}) => {
  return request.get<DoctorPageResult>(BASE_URL, { params });
};

/**
 * 获取医生列表（别名，用于兼容）
 */
export const getDoctors = getDoctorList;

/**
 * 根据医院ID获取医生列表
 */
export const getDoctorsByHospitalId = (hospitalId: number) => {
  return request.get<DoctorListResult>(`${BASE_URL}/hospital/${hospitalId}`);
};

/**
 * 根据科室ID获取医生列表
 */
export const getDoctorsByDepartmentId = (departmentId: number) => {
  return request.get<DoctorListResult>(`${BASE_URL}/department/${departmentId}`);
};

/**
 * 获取医生详情
 */
export const getDoctor = (id: number) => {
  return request.get<DoctorResult>(`${BASE_URL}/${id}`);
};

/**
 * 新增医生
 */
export const addDoctor = (data: DoctorAddDTO) => {
  return request.post<DoctorResult>(BASE_URL, data);
};

/**
 * 更新医生
 */
export const updateDoctor = (data: DoctorUpdateDTO) => {
  return request.put<DoctorResult>(BASE_URL, data);
};

/**
 * 删除医生
 */
export const deleteDoctor = (id: number) => {
  return request.delete(`${BASE_URL}/${id}`);
};

/**
 * 批量删除医生
 */
export const deleteDoctors = (ids: number[]) => {
  return request.delete(`${BASE_URL}/batch`, { data: ids });
};

/**
 * 更新医生状态
 */
export const updateDoctorStatus = (id: number, status: number) => {
  return request.put(`${BASE_URL}/${id}/status`, null, { params: { status } });
};
