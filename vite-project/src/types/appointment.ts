// 预约挂号相关类型定义

// 预约状态枚举
export enum AppointmentStatus {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED', 
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED'
}

// 时间段枚举
export enum TimeSlot {
  MORNING = 1,
  AFTERNOON = 2,
  EVENING = 3
}

// 预约订单基本信息
export interface Appointment {
  id: number;
  appointmentNo: string;
  userId: number;
  doctorId: number;
  doctorName?: string;
  doctorTitle?: string;
  hospitalId: number;
  hospitalName?: string;
  departmentId?: number;
  departmentName?: string;
  scheduleId: number;
  slotId: number;
  appointmentDate: string;
  appointmentTime: string;
  timeSlot: number;
  timeSlotName?: string;
  slotNumber: number;
  patientName: string;
  patientPhone: string;
  patientIdCard?: string;
  consultationFee: number;
  status: AppointmentStatus;
  statusName?: string;
  cancelReason?: string;
  cancelTime?: string;
  notes?: string;
  createdTime?: string;
  updatedTime?: string;
}

// 创建预约订单DTO
export interface AppointmentCreateDTO {
  doctorId: number;
  hospitalId: number;
  departmentId?: number;
  scheduleId: number;
  slotId: number;
  appointmentDate: string;
  appointmentTime: string;
  timeSlot: number;
  slotNumber: number;
  patientName: string;
  patientPhone: string;
  patientIdCard?: string;
  consultationFee: number;
  notes?: string;
}

// 预约订单查询DTO
export interface AppointmentQueryDTO {
  userId?: number;
  doctorId?: number;
  hospitalId?: number;
  departmentId?: number;
  appointmentNo?: string;
  patientName?: string;
  patientPhone?: string;
  status?: AppointmentStatus;
  startDate?: string;
  endDate?: string;
  timeSlot?: number;
  page?: number;
  size?: number;
}

// 排班信息
export interface Schedule {
  id: number;
  doctorId: number;
  doctorName?: string;
  doctorTitle?: string;
  hospitalId: number;
  hospitalName?: string;
  departmentId?: number;
  departmentName?: string;
  scheduleDate: string;
  timeSlot: number;
  timeSlotName?: string;
  startTime: string;
  endTime: string;
  totalSlots: number;
  availableSlots: number;
  consultationFee: number;
  status: number;
  notes?: string;
}

// 号源信息
export interface AppointmentSlot {
  id: number;
  scheduleId: number;
  slotNumber: number;
  appointmentTime: string;
  status: number; // 0-可预约,1-已预约,2-已取消,3-已完成
  userId?: number;
  userName?: string;
  userPhone?: string;
  appointmentNo?: string;
}

// 科室排班信息
export interface DepartmentSchedule {
  departmentId: number;
  departmentName: string;
  departmentDescription?: string;
  departmentImages?: string[];
  doctors: DoctorScheduleInfo[];
}

// 医生排班信息
export interface DoctorScheduleInfo {
  doctorId: number;
  doctorName: string;
  doctorTitle: string;
  doctorAvatar?: string;
  doctorSpecialties?: string;
  consultationFee: number;
  schedules: ScheduleSlot[];
}

// 排班时段信息
export interface ScheduleSlot {
  scheduleId: number;
  doctorId: number;
  scheduleDate: string;
  timeSlot: number;
  timeSlotName: string;
  startTime: string;
  endTime: string;
  totalSlots: number;
  availableSlots: number;
  status: number;
}

// 预约状态选项
export const APPOINTMENT_STATUS_OPTIONS = [
  { label: '已预约', value: AppointmentStatus.PENDING },
  { label: '已取消', value: AppointmentStatus.CANCELLED },
  { label: '已完成', value: AppointmentStatus.COMPLETED },
  { label: '已过期', value: AppointmentStatus.EXPIRED }
];

// 时间段选项
export const TIME_SLOT_OPTIONS = [
  { label: '上午', value: TimeSlot.MORNING },
  { label: '下午', value: TimeSlot.AFTERNOON },
  { label: '晚上', value: TimeSlot.EVENING }
];

// 状态映射
export const APPOINTMENT_STATUS_MAP = {
  [AppointmentStatus.PENDING]: '已预约',
  [AppointmentStatus.CANCELLED]: '已取消',
  [AppointmentStatus.COMPLETED]: '已完成',
  [AppointmentStatus.EXPIRED]: '已过期'
};

// 时间段映射
export const TIME_SLOT_MAP = {
  [TimeSlot.MORNING]: '上午',
  [TimeSlot.AFTERNOON]: '下午',
  [TimeSlot.EVENING]: '晚上'
};

// 工具函数
export const getAppointmentStatusLabel = (status: AppointmentStatus): string => {
  return APPOINTMENT_STATUS_MAP[status] || '未知';
};

export const getTimeSlotLabel = (timeSlot: number): string => {
  return TIME_SLOT_MAP[timeSlot as TimeSlot] || '未知';
};

// 状态颜色映射
export const getAppointmentStatusColor = (status: AppointmentStatus): string => {
  switch (status) {
    case AppointmentStatus.PENDING:
      return 'blue';
    case AppointmentStatus.CANCELLED:
      return 'red';
    case AppointmentStatus.COMPLETED:
      return 'green';
    case AppointmentStatus.EXPIRED:
      return 'gray';
    default:
      return 'default';
  }
};
