import type { PageResult, Result } from './common';

// 订单查询参数
export interface OrderQueryDTO {
  orderNo?: string;
  status?: number;
  startTime?: string;
  endTime?: string;
  userId?: number;
  receiver?: string;
  phone?: string;
}

// 订单明细
export interface OrderItemDTO {
  medicineId: number;
  quantity: number;
}

// 创建订单参数
export interface OrderCreateDTO {
  receiver: string;
  phone: string;
  address: string;
  remark?: string;
  payType: number;
  items: OrderItemDTO[];
}

// 订单明细展示
export interface OrderItemVO {
  medicineId: number;
  medicineName: string;
  medicineImage: string;
  price: number;
  quantity: number;
  subtotal: number;
}

// 订单详情
export interface OrderDetailVO {
  id: number;
  orderNo: string;
  totalAmount: number;
  payAmount: number;
  payType: number;
  payTypeDesc: string;
  status: number;
  statusDesc: string;
  receiver: string;
  phone: string;
  address: string;
  remark?: string;
  payTime?: string;
  deliveryTime?: string;
  completeTime?: string;
  createdTime: string;
  items: OrderItemVO[];
}

// API 响应类型
export type OrderListResult = Result<PageResult<OrderDetailVO>>;
export type OrderDetailResult = Result<OrderDetailVO>;

// 购物车商品项
export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

// 枚举定义
export enum OrderStatus {
  PENDING_PAYMENT = 0,
  PAID = 1,
  SHIPPED = 2,
  COMPLETED = 3,
  CANCELLED = 4,
}

export enum PayType {
  WECHAT = 1,
  ALIPAY = 2,
}

// 状态描述映射
export const ORDER_STATUS_MAP = {
  [OrderStatus.PENDING_PAYMENT]: { text: '待支付', color: 'warning' },
  [OrderStatus.PAID]: { text: '已支付', color: 'processing' },
  [OrderStatus.SHIPPED]: { text: '已发货', color: 'processing' },
  [OrderStatus.COMPLETED]: { text: '已完成', color: 'success' },
  [OrderStatus.CANCELLED]: { text: '已取消', color: 'default' },
};

export const PAY_TYPE_MAP = {
  [PayType.WECHAT]: { text: '微信支付', icon: 'wechat' },
  [PayType.ALIPAY]: { text: '支付宝', icon: 'alipay' },
}; 