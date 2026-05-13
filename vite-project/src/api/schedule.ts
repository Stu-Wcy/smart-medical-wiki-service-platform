import request from '@/utils/request';
import type {
  DepartmentSchedule,
  ScheduleSlot,
  AppointmentSlot
} from '@/types/appointment';
import type { Result } from '@/types/common';

// 排班查询API

/**
 * 根据医院ID获取科室号源信息
 */
export const getDepartmentSchedulesByHospitalId = (hospitalId: number) => {
  return request.get<Result<DepartmentSchedule[]>>(`/schedules/hospital/${hospitalId}/departments`);
};

/**
 * 根据科室ID获取排班信息
 */
export const getDepartmentSchedules = (departmentId: number) => {
  return request.get<Result<ScheduleSlot[]>>(`/schedules/department/${departmentId}`);
};

/**
 * 根据医生ID获取排班信息
 */
export const getDoctorSchedules = (doctorId: number) => {
  return request.get<Result<ScheduleSlot[]>>(`/schedules/doctor/${doctorId}`);
};

/**
 * 根据排班ID获取号源列表
 */
export const getScheduleSlots = (scheduleId: number) => {
  return request.get<Result<AppointmentSlot[]>>(`/schedules/${scheduleId}/slots`);
};
