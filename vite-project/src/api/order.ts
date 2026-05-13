import request from '@/utils/request';
import type {
  OrderListResult,
  OrderDetailResult,
  OrderQueryDTO,
  OrderCreateDTO,
} from '@/types/order';
import {Result} from "../types/auth.ts";

// 获取订单列表
export const getOrderList = (params: OrderQueryDTO & { page?: number; size?: number }) => {
  return request.get<OrderListResult>('/orders', { params });
};

// 获取订单详情
export const getOrderDetail = (orderNo: string) => {
  return request.get<OrderDetailResult>(`/orders/${orderNo}`);
};

// 创建订单
export const createOrder = (data: OrderCreateDTO) => {
  return request.post<Result<string>>('/orders', data);
};

// 支付订单
export const payOrder = (orderNo: string) => {
  return request.put(`/orders/${orderNo}/pay`);
};

// 确认收货
export const confirmOrder = (orderNo: string) => {
  return request.put(`/orders/${orderNo}/confirm`);
};

// 取消订单
export const cancelOrder = (orderNo: string) => {
  return request.put(`/orders/${orderNo}/cancel`);
}; 