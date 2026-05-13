import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  message,
  Modal,
  Form,
  DatePicker,
  Input,
  Tabs,
} from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import dayjs from 'dayjs';
import {
  getOrderList,
  payOrder,
  confirmOrder,
  cancelOrder,
} from '@/api/order';
import type { OrderDetailVO } from '@/types/order';
import { OrderStatus, ORDER_STATUS_MAP } from '@/types/order';
import styles from './styles.module.less';

const { RangePicker } = DatePicker;

const OrderList: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<OrderDetailVO[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeTab, setActiveTab] = useState<string>('-1'); // 使用字符串 '-1' 表示全部

  // 防抖函数
  const debounce = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const fetchOrders = async (page = current) => {
    setLoading(true);
    try {
      const values = await form.getFieldsValue();
      const [startTime, endTime] = values.timeRange || [];
      
      const params = {
        ...values,
        startTime: startTime?.format('YYYY-MM-DD HH:mm:ss'),
        endTime: endTime?.format('YYYY-MM-DD HH:mm:ss'),
        timeRange: undefined,
        status: activeTab === '-1' ? undefined : Number(activeTab),
        page,
        size: pageSize,
      };

      const res = await getOrderList(params);
      setList(res.data.data.list);
      setTotal(res.data.data.total);
      setCurrent(page);
    } catch (error) {
      console.error('获取订单列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, [pageSize, activeTab]);

  // 实时搜索
  const handleSearch = debounce(() => {
    fetchOrders(1);
  }, 500);

  const handleReset = () => {
    form.resetFields();
    fetchOrders(1);
  };

  const handlePageChange = (pagination: TablePaginationConfig) => {
    const { current, pageSize: size } = pagination;
    if (size !== pageSize) {
      setPageSize(size || 10);
      return;
    }
    if (current) {
      fetchOrders(current);
    }
  };

  const handlePay = async (orderNo: string) => {
    try {
      await payOrder(orderNo);
      message.success('支付成功');
      fetchOrders();
    } catch (error) {
      console.error('支付失败:', error);
    }
  };

  const handleConfirm = async (orderNo: string) => {
    Modal.confirm({
      title: '确认收货',
      content: '确认已收到商品吗？',
      onOk: async () => {
        try {
          await confirmOrder(orderNo);
          message.success('确认收货成功');
          fetchOrders();
        } catch (error) {
          console.error('确认收货失败:', error);
        }
      },
    });
  };

  const handleCancel = async (orderNo: string) => {
    Modal.confirm({
      title: '取消订单',
      content: '确认要取消该订单吗？',
      onOk: async () => {
        try {
          await cancelOrder(orderNo);
          message.success('取消订单成功');
          fetchOrders();
        } catch (error) {
          console.error('取消订单失败:', error);
        }
      },
    });
  };

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      render: (orderNo: string) => (
        <Button
          type="link"
          onClick={() => navigate(`/user/order/detail/${orderNo}`)}
        >
          {orderNo}
        </Button>
      ),
    },
    {
      title: '订单金额',
      dataIndex: 'totalAmount',
      align: 'center' as const,
      render: (amount: number) => `￥${amount.toFixed(2)}`,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      align: 'center' as const,
      render: (status: OrderStatus) => (
        <Tag color={ORDER_STATUS_MAP[status].color}>
          {ORDER_STATUS_MAP[status].text}
        </Tag>
      ),
    },
    {
      title: '收货人',
      dataIndex: 'receiver',
      align: 'center' as const,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      align: 'center' as const,
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      align: 'center' as const,
      render: (time: string) => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      align: 'center' as const,
      render: (_: any, record: OrderDetailVO) => {
        const actions = [];
        
        if (record.status === OrderStatus.PENDING_PAYMENT) {
          actions.push(
            <Button key="pay" type="link" onClick={() => handlePay(record.orderNo)}>
              支付
            </Button>,
            <Button
              key="cancel"
              type="link"
              danger
              onClick={() => handleCancel(record.orderNo)}
            >
              取消
            </Button>,
          );
        } else if (record.status === OrderStatus.SHIPPED) {
          actions.push(
            <Button
              key="confirm"
              type="link"
              onClick={() => handleConfirm(record.orderNo)}
            >
              确认收货
            </Button>,
          );
        }

        return actions;
      },
    },
  ];

  const items = [
    { key: '-1', label: '全部' },
    { key: OrderStatus.PENDING_PAYMENT.toString(), label: '待付款' },
    { key: OrderStatus.PAID.toString(), label: '待发货' },
    { key: OrderStatus.SHIPPED.toString(), label: '待收货' },
    { key: OrderStatus.COMPLETED.toString(), label: '已完成' },
    { key: OrderStatus.CANCELLED.toString(), label: '已取消' },
  ];

  return (
    <Card className={styles.orderList}>
      <Form
        form={form}
        layout="inline"
        className={styles.searchForm}
        onValuesChange={handleSearch}
      >
        <Form.Item name="orderNo" label="订单编号">
          <Input placeholder="请输入订单编号" allowClear />
        </Form.Item>

        <Form.Item name="timeRange" label="创建时间">
          <RangePicker showTime />
        </Form.Item>

        <Form.Item>
          <Button onClick={handleReset}>重置</Button>
        </Form.Item>
      </Form>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={items}
        className={styles.tabs}
      />

      <Table
        columns={columns}
        dataSource={list}
        rowKey="id"
        loading={loading}
        pagination={{
          current,
          pageSize,
          total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        onChange={handlePageChange}
      />
    </Card>
  );
};

export default OrderList; 