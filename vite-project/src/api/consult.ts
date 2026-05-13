import request from '@/utils/request';
import type { Result } from '@/types/common';

export const listOnlineDoctors = (params?: any) => {
  return request.get<Result<any>>('/public/doctors/online', { params });
};

export const createConsultation = (data: {
  patientId: number;
  doctorId: number;
  patientCondition: string;
  picUrls?: string[];
}) => {
  return request.post<Result<any>>('/user/consultations', data);
};

export const listMyConsultations = () => {
  return request.get<Result<any[]>>('/user/consultations');
};

export const evaluateConsultation = (id: number, evaluation: number) => {
  return request.post<Result<any>>(`/user/consultations/${id}/evaluate`, null, { params: { evaluation } });
};

export const listDoctorConsultations = () => {
  return request.get<Result<any[]>>('/doctor/consultations');
};

export const getConsultationDetail = (id: number) => {
  return request.get<Result<any>>(`/doctor/consultations/${id}`);
};

export const replyConsultation = (id: number, data: { replyText: string; notifyByEmail?: boolean }) => {
  return request.post<Result<any>>(`/doctor/consultations/${id}/reply`, data);
};
 
export const getConsultationPatient = (id: number) => {
  return request.get<Result<any>>(`/doctor/consultations/${id}/patient`);
};

export const listAdminConsultations = (params?: any) => {
  return request.get<Result<any[]>>('/admin/consultations', { params });
};

export const getAdminConsultationDetail = (id: number) => {
  return request.get<Result<any>>(`/admin/consultations/${id}`);
};
