import request from '@/utils/request';
import type {
  HospitalQueryDTO,
  HospitalListResult,
  HospitalDetailResult,
  ProvinceListResult,
  CityListResult,
} from '@/types/hospital';
import type { PageParams } from '@/types/common';

// 公共接口 - 用户端
export const hospitalApi = {
  // 分页查询医院列表
  getList: (params: HospitalQueryDTO & PageParams) => {
    return request.get<HospitalListResult>('/public/hospitals', { params });
  },

  // 获取医院详情
  getDetail: (id: number) => {
    return request.get<HospitalDetailResult>(`/public/hospitals/${id}`);
  },

  // 获取所有省份
  getProvinces: () => {
    return request.get<ProvinceListResult>('/public/hospitals/provinces');
  },

  // 根据省份获取城市
  getCitiesByProvince: (province: string) => {
    return request.get<CityListResult>('/public/hospitals/cities', {
      params: { province },
    });
  },
};
