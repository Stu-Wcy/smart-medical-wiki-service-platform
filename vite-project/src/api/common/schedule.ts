import request from '@/utils/request';
import type { ResultData } from '@/types/common';

const BASE_URL = '/schedules';

// 科室号源信息类型定义
export interface DepartmentSchedule {
  departmentId: number;
  departmentName: string;
  departmentDescription?: string;
  departmentImages?: string[];
  doctors: DoctorScheduleInfo[];
}

export interface DoctorScheduleInfo {
  doctorId: number;
  doctorName: string;
  doctorTitle: string;
  doctorAvatar?: string;
  doctorSpecialties?: string;
  consultationFee: number;
  schedules: ScheduleSlot[];
}

export interface ScheduleSlot {
  scheduleId: number;
  doctorId: number;
  scheduleDate: string;
  timeSlot: number; // 1-上午,2-下午,3-晚上
  timeSlotName: string;
  startTime: string;
  endTime: string;
  totalSlots: number;
  availableSlots: number;
  status: number; // 0-停诊,1-正常
}

/**
 * 根据医院ID获取科室号源信息
 */
export const getDepartmentSchedulesByHospitalId = (hospitalId: number) => {
  return request.get<ResultData<DepartmentSchedule[]>>(`${BASE_URL}/hospital/${hospitalId}/departments`);
};

/**
 * 根据科室ID获取排班信息
 */
export const getDepartmentSchedules = (departmentId: number) => {
  return request.get<ResultData<ScheduleSlot[]>>(`${BASE_URL}/department/${departmentId}`);
};
