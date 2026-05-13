import request from '@/utils/request';
import type { 
  Appointment, 
  AppointmentCreateDTO, 
  AppointmentQueryDTO,
  AppointmentStatus
} from '@/types/appointment';
import type { PageResult, Result } from '@/types/common';

// 用户端预约订单API

/**
 * 创建预约订单
 */
export const createAppointment = (data: AppointmentCreateDTO) => {
  return request.post<Result<Appointment>>('/appointments', data);
};

/**
 * 取消预约订单
 */
export const cancelAppointment = (id: number, cancelReason: string) => {
  return request.put<Result<void>>(`/appointments/${id}/cancel`, null, {
    params: { cancelReason }
  });
};

/**
 * 获取预约订单详情
 */
export const getAppointmentById = (id: number) => {
  return request.get<Result<Appointment>>(`/appointments/${id}`);
};

/**
 * 根据预约单号获取预约订单详情
 */
export const getAppointmentByNo = (appointmentNo: string) => {
  return request.get<Result<Appointment>>(`/appointments/no/${appointmentNo}`);
};

/**
 * 获取用户的预约订单列表
 */
export const getUserAppointments = () => {
  return request.get<Result<Appointment[]>>('/appointments/list');
};

/**
 * 分页查询用户的预约订单列表
 */
export const getUserAppointmentsPage = (params: AppointmentQueryDTO) => {
  return request.get<Result<PageResult<Appointment>>>('/appointments/page', { params });
};

/**
 * 检查号源是否可预约
 */
export const isSlotAvailable = (slotId: number) => {
  return request.get<Result<boolean>>(`/appointments/slots/${slotId}/available`);
};

// 管理员端预约订单API

/**
 * 管理员分页查询所有预约订单
 */
export const getAllAppointmentsPage = (params: AppointmentQueryDTO) => {
  return request.get<Result<PageResult<Appointment>>>('/admin/appointments/page', { params });
};

/**
 * 管理员获取预约订单详情
 */
export const getAppointmentByIdForAdmin = (id: number) => {
  return request.get<Result<Appointment>>(`/admin/appointments/${id}`);
};

/**
 * 管理员更新预约订单状态
 */
export const updateAppointmentStatus = (id: number, status: AppointmentStatus) => {
  return request.put<Result<void>>(`/admin/appointments/${id}/status`, null, {
    params: { status }
  });
};

/**
 * 管理员取消预约订单
 */
export const cancelAppointmentForAdmin = (id: number, cancelReason: string) => {
  return request.put<Result<void>>(`/admin/appointments/${id}/cancel`, null, {
    params: { cancelReason }
  });
};
