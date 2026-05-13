import request from '@/utils/request';
import type {
  HospitalQueryDTO,
  HospitalAddDTO,
  HospitalUpdateDTO,
  HospitalListResult,
  HospitalDetailResult,
  ProvinceListResult,
  CityListResult,
} from '@/types/hospital';
import type { PageParams, Result } from '@/types/common';

// 管理员接口
export const adminHospitalApi = {
  // 分页查询医院列表
  getList: (params: HospitalQueryDTO & PageParams) => {
    return request.get<HospitalListResult>('/admin/hospitals', { params });
  },

  // 获取医院详情
  getDetail: (id: number) => {
    return request.get<HospitalDetailResult>(`/admin/hospitals/${id}`);
  },

  // 新增医院
  add: (data: HospitalAddDTO) => {
    return request.post<HospitalDetailResult>('/admin/hospitals', data);
  },

  // 更新医院
  update: (data: HospitalUpdateDTO) => {
    return request.put<HospitalDetailResult>('/admin/hospitals', data);
  },

  // 删除医院
  delete: (id: number) => {
    return request.delete<Result<null>>(`/admin/hospitals/${id}`);
  },

  // 批量删除医院
  batchDelete: (ids: number[]) => {
    return request.delete<Result<null>>('/admin/hospitals/batch', { data: ids });
  },

  // 获取所有省份
  getProvinces: () => {
    return request.get<ProvinceListResult>('/admin/hospitals/provinces');
  },

  // 根据省份获取城市
  getCitiesByProvince: (province: string) => {
    return request.get<CityListResult>('/admin/hospitals/cities', {
      params: { province },
    });
  },
};

// 兼容性函数
export const getHospitals = adminHospitalApi.getList;
