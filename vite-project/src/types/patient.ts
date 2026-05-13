// 就诊人相关类型定义

// 性别枚举
export enum GenderEnum {
  FEMALE = 'FEMALE',
  MALE = 'MALE'
}

// 关系枚举
export enum RelationshipEnum {
  SELF = 'SELF',
  FATHER = 'FATHER',
  MOTHER = 'MOTHER',
  SPOUSE = 'SPOUSE',
  CHILD = 'CHILD',
  OTHER = 'OTHER'
}

// 就诊人状态枚举
export enum PatientStatusEnum {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE'
}

// 就诊人基本信息
export interface Patient {
  id: number;
  userId: number;
  userName?: string;
  name: string;
  idCard?: string;
  phone: string;
  gender: GenderEnum;
  genderName?: string;
  birthDate?: string;
  age?: number;
  relationship: RelationshipEnum;
  relationshipName?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  address?: string;
  medicalHistory?: string;
  allergies?: string;
  isDefault: boolean;
  status: PatientStatusEnum;
  statusName?: string;
  createdTime?: string;
  updatedTime?: string;
}

// 创建就诊人DTO
export interface PatientCreateDTO {
  name: string;
  idCard?: string;
  phone: string;
  gender: GenderEnum;
  birthDate?: string;
  relationship: RelationshipEnum;
  emergencyContact?: string;
  emergencyPhone?: string;
  address?: string;
  medicalHistory?: string;
  allergies?: string;
  isDefault?: boolean;
}

// 更新就诊人DTO
export interface PatientUpdateDTO {
  id: number;
  name: string;
  idCard?: string;
  phone: string;
  gender: GenderEnum;
  birthDate?: string;
  relationship: RelationshipEnum;
  emergencyContact?: string;
  emergencyPhone?: string;
  address?: string;
  medicalHistory?: string;
  allergies?: string;
  isDefault?: boolean;
  status?: PatientStatusEnum;
}

// 查询就诊人DTO
export interface PatientQueryDTO {
  userId?: number;
  name?: string;
  phone?: string;
  idCard?: string;
  gender?: GenderEnum;
  relationship?: RelationshipEnum;
  status?: PatientStatusEnum;
  isDefault?: boolean;
  page?: number;
  size?: number;
}

// 性别选项
export const GENDER_OPTIONS = [
  { label: '女', value: GenderEnum.FEMALE },
  { label: '男', value: GenderEnum.MALE }
];

// 关系选项
export const RELATIONSHIP_OPTIONS = [
  { label: '本人', value: RelationshipEnum.SELF },
  { label: '父亲', value: RelationshipEnum.FATHER },
  { label: '母亲', value: RelationshipEnum.MOTHER },
  { label: '配偶', value: RelationshipEnum.SPOUSE },
  { label: '子女', value: RelationshipEnum.CHILD },
  { label: '其他', value: RelationshipEnum.OTHER }
];

// 状态选项
export const PATIENT_STATUS_OPTIONS = [
  { label: '启用', value: PatientStatusEnum.ACTIVE },
  { label: '禁用', value: PatientStatusEnum.INACTIVE }
];

// 性别映射
export const GENDER_MAP = {
  [GenderEnum.FEMALE]: '女',
  [GenderEnum.MALE]: '男'
};

// 关系映射
export const RELATIONSHIP_MAP = {
  [RelationshipEnum.SELF]: '本人',
  [RelationshipEnum.FATHER]: '父亲',
  [RelationshipEnum.MOTHER]: '母亲',
  [RelationshipEnum.SPOUSE]: '配偶',
  [RelationshipEnum.CHILD]: '子女',
  [RelationshipEnum.OTHER]: '其他'
};

// 状态映射
export const PATIENT_STATUS_MAP = {
  [PatientStatusEnum.ACTIVE]: '启用',
  [PatientStatusEnum.INACTIVE]: '禁用'
};

// 工具函数
export const getGenderLabel = (gender: GenderEnum): string => {
  return GENDER_MAP[gender] || '未知';
};

export const getRelationshipLabel = (relationship: RelationshipEnum): string => {
  return RELATIONSHIP_MAP[relationship] || '未知';
};

export const getPatientStatusLabel = (status: PatientStatusEnum): string => {
  return PATIENT_STATUS_MAP[status] || '未知';
};
