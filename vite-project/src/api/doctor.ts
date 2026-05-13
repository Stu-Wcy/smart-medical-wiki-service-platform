import request from '@/utils/request';
import type { Result } from '@/types/auth';

export const getDoctor = (id: number) => {
  return request.get<Result<any>>(`/public/doctors/${id}`);
};

export const getDoctorsByHospitalId = (hospitalId: number) => {
  return request.get<Result<any>>(`/public/doctors/hospital/${hospitalId}`);
};

export const getDoctorsByDepartmentId = (departmentId: number) => {
  return request.get<Result<any>>(`/public/doctors/department/${departmentId}`);
};

export const getDoctorAppointmentsPage = (params: any) => {
  return request.get<Result<any>>('/doctor/appointments/page', { params });
};

export const getDoctorAppointment = (id: number) => {
  return request.get<Result<any>>(`/doctor/appointments/${id}`);
};

export const updateDoctorAppointmentStatus = (id: number, status: string) => {
  return request.put<Result<void>>(`/doctor/appointments/${id}/status`, null, { params: { status } });
};

export const cancelDoctorAppointment = (id: number, cancelReason: string) => {
  return request.put<Result<void>>(`/doctor/appointments/${id}/cancel`, null, { params: { cancelReason } });
};

export const getDoctorProfile = () => {
  return request.get<Result<any>>('/doctor/profile');
};

export const updateDoctorProfile = (data: any) => {
  return request.put<Result<any>>('/doctor/profile', data);
};
