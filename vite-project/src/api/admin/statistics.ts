import request from '@/utils/request';
import type { Result } from '@/types/common';

// 统计数据接口
export interface StatisticsData {
  // 基础统计
  totalUsers: number;
  totalHospitals: number;
  totalDoctors: number;
  totalDepartments: number;
  totalMedicines: number;
  totalDiseases: number;
  totalOrders: number;
  totalRevenue: number;
  totalConsultations: number;
  totalFeedbacks: number;
  
  // 今日统计
  todayUsers: number;
  todayOrders: number;
  todayRevenue: number;
  todayConsultations: number;
  
  // 本月统计
  monthUsers: number;
  monthOrders: number;
  monthRevenue: number;
  monthConsultations: number;
  
  // 趋势数据
  userTrend: Array<{ date: string; count: number }>;
  orderTrend: Array<{ date: string; count: number; revenue: number }>;
  consultationTrend: Array<{ date: string; count: number }>;
  
  // 分布数据
  hospitalDistribution: Array<{ province: string; count: number }>;
  orderStatusDistribution: Array<{ status: string; count: number; percentage: number }>;
  medicineTypeDistribution: Array<{ type: string; count: number; percentage: number }>;
  diseaseTypeDistribution: Array<{ type: string; count: number; percentage: number }>;
  
  // 排行数据
  topHospitals: Array<{ id: number; name: string; orderCount: number; revenue: number }>;
  topMedicines: Array<{ id: number; name: string; orderCount: number; revenue: number }>;
  topDiseases: Array<{ id: number; name: string; searchCount: number }>;
}

// 获取统计数据
export const getStatistics = () => {
  return request.get<Result<StatisticsData>>('/admin/statistics');
};

// 获取用户增长趋势
export const getUserTrend = (days: number = 30) => {
  return request.get<Result<Array<{ date: string; count: number }>>>('/admin/statistics/user-trend', {
    params: { days }
  });
};

// 获取订单趋势
export const getOrderTrend = (days: number = 30) => {
  return request.get<Result<Array<{ date: string; count: number; revenue: number }>>>('/admin/statistics/order-trend', {
    params: { days }
  });
};

// 获取问诊趋势
export const getConsultationTrend = (days: number = 30) => {
  return request.get<Result<Array<{ date: string; count: number }>>>('/admin/statistics/consultation-trend', {
    params: { days }
  });
};

// 获取医院分布
export const getHospitalDistribution = () => {
  return request.get<Result<Array<{ province: string; count: number }>>>('/admin/statistics/hospital-distribution');
};

// 获取订单状态分布
export const getOrderStatusDistribution = () => {
  return request.get<Result<Array<{ status: string; count: number; percentage: number }>>>('/admin/statistics/order-status-distribution');
};

// 获取热门医院排行
export const getTopHospitals = (limit: number = 10) => {
  return request.get<Result<Array<{ id: number; name: string; orderCount: number; revenue: number }>>>('/admin/statistics/top-hospitals', {
    params: { limit }
  });
};

// 获取热门药品排行
export const getTopMedicines = (limit: number = 10) => {
  return request.get<Result<Array<{ id: number; name: string; orderCount: number; revenue: number }>>>('/admin/statistics/top-medicines', {
    params: { limit }
  });
};

// 获取热门疾病排行
export const getTopDiseases = (limit: number = 10) => {
  return request.get<Result<Array<{ id: number; name: string; searchCount: number }>>>('/admin/statistics/top-diseases', {
    params: { limit }
  });
};
