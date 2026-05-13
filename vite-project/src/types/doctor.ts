/**
 * 医生信息类型定义
 */

// 医生基本信息
export interface Doctor {
  id: number;
  name: string;
  title: string;
  specialties?: string;
  introduction?: string;
  avatar?: string;
  hospitalId: number;
  hospitalName?: string;
  departmentId?: number;
  departmentName?: string;
  phone?: string;
  email?: string;
  education?: string;
  experience?: string;
  achievements?: string;
  consultationFee?: number;
  status: number;
  statusDesc?: string;
  sort?: number;
  createdTime?: string;
  updatedTime?: string;
}

// 医生查询条件
export interface DoctorQueryDTO {
  name?: string;
  title?: string;
  hospitalId?: number;
  departmentId?: number;
  status?: number;
  specialties?: string;
}

// 医生添加DTO
export interface DoctorAddDTO {
  name: string;
  title: string;
  specialties?: string;
  introduction?: string;
  avatar?: string;
  hospitalId: number;
  departmentId?: number;
  phone?: string;
  email?: string;
  education?: string;
  experience?: string;
  achievements?: string;
  consultationFee?: number;
  status?: number;
  sort?: number;
}

// 医生更新DTO
export interface DoctorUpdateDTO {
  id: number;
  name: string;
  title: string;
  specialties?: string;
  introduction?: string;
  avatar?: string;
  hospitalId: number;
  departmentId?: number;
  phone?: string;
  email?: string;
  education?: string;
  experience?: string;
  achievements?: string;
  consultationFee?: number;
  status?: number;
  sort?: number;
}

// API响应类型
export interface DoctorResult {
  code: number;
  message: string;
  data: Doctor;
}

export interface DoctorListResult {
  code: number;
  message: string;
  data: Doctor[];
}

export interface DoctorPageResult {
  code: number;
  message: string;
  data: {
    records: Doctor[];
    total: number;
    page: number;
    size: number;
  };
}
