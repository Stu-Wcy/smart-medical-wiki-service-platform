import request from '@/utils/request';
import type { Result } from '@/types/common';

const BASE_URL = '/admin/doctor-users';

export const getDoctorUserByUserId = (userId: number) => {
  return request.get<Result<any>>(`${BASE_URL}/by-user/${userId}`);
};

export const bindDoctorUser = (userId: number, doctorId: number) => {
  return request.post<Result<void>>(`${BASE_URL}/bind`, { userId, doctorId });
};
