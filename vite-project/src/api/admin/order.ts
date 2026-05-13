import type { OrderQueryDTO } from '@/types/order';
import request from '@/utils/request';
import {OrderDetailVO} from "../../types/order.ts";
import {PageResult} from "../../types/common.ts";
import {Result} from "../../types/auth.ts";

// 分页查询订单列表
export const getAdminOrderList = (params: OrderQueryDTO & { page?: number; size?: number }) => {
  return request<Result<PageResult<OrderDetailVO>>>({
    url: '/admin/orders',
    method: 'GET',
    params,
  });
};

// 获取订单详情
export const getOrderDetail = (orderNo: string) => {
  return request<Result<OrderDetailVO>>({
    url: `/admin/orders/${orderNo}`,
    method: 'GET',
  });
};

// 发货
export const deliverOrder = (orderNo: string) => {
  return request({
    url: `/admin/orders/${orderNo}/deliver`,
    method: 'PUT',
  });
}; 