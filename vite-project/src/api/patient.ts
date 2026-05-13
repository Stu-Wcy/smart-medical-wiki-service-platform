import request from '@/utils/request';
import type { Result } from '@/types/common';

export const getUserPatients = () => request.get<Result<any[]>>('/patients/list');
export const getMyPatients = getUserPatients;
export const createPatient = (data: any) => request.post<Result<any>>('/patients', data);
export const updatePatient = (data: any) => request.put<Result<any>>('/patients', data);
export const deletePatient = (id: number) => request.delete<Result<void>>(`/patients/${id}`);
export const setDefaultPatient = (id: number) => request.put<Result<void>>(`/patients/${id}/default`);
export const getAllPatientsPage = (params: any) => request.get<Result<any>>('/admin/patients/page', { params });
export const deletePatientForAdmin = (id: number) => request.delete<Result<void>>(`/admin/patients/${id}`);
export const getPatientById = (id: number) => request.get<Result<any>>(`/patients/${id}`);
