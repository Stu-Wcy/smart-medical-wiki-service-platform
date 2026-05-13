import request from '@/utils/request';
import type { ResultData, ResultPageData } from '@/types/common';

const BASE_URL = '/admin/schedules';

// 排班相关类型定义
export interface Schedule {
  id: number;
  doctorId: number;
  doctorName: string;
  doctorTitle: string;
  hospitalId: number;
  hospitalName: string;
  departmentId?: number;
  departmentName?: string;
  scheduleDate: string;
  timeSlot: number; // 1-上午,2-下午,3-晚上
  timeSlotName: string;
  startTime: string;
  endTime: string;
  totalSlots: number;
  availableSlots: number;
  consultationFee: number;
  status: number;
  notes?: string;
}

export interface ScheduleAddDTO {
  doctorId: number;
  hospitalId: number;
  departmentId?: number;
  scheduleDate: string;
  timeSlot: number;
  startTime: string;
  endTime: string;
  totalSlots: number;
  consultationFee: number;
  notes?: string;
}

export interface ScheduleQuery {
  hospitalId?: number;
  departmentId?: number;
  doctorId?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
}

/**
 * 新增排班
 */
export const addSchedule = (data: ScheduleAddDTO) => {
  return request.post<ResultData<void>>(`${BASE_URL}`, data);
};

/**
 * 更新排班
 */
export const updateSchedule = (id: number, data: ScheduleAddDTO) => {
  return request.put<ResultData<void>>(`${BASE_URL}/${id}`, data);
};

/**
 * 分页查询排班
 */
export const getSchedules = (params: ScheduleQuery) => {
  return request.get<ResultPageData<Schedule>>(`${BASE_URL}`, { params });
};

/**
 * 删除排班
 */
export const deleteSchedule = (id: number) => {
  return request.delete<ResultData<void>>(`${BASE_URL}/${id}`);
};

/**
 * 更新排班状态
 */
export const updateScheduleStatus = (id: number, status: number) => {
  return request.put<ResultData<void>>(`${BASE_URL}/${id}/status`, { status });
};
