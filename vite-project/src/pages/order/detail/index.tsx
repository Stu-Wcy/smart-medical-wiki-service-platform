import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Button,
  Tag,
  Table,
  Space,
  Modal,
  message,
  Image,
  Empty,
  Spin,
} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  getOrderDetail,
  payOrder,
  confirmOrder,
  cancelOrder,
} from '@/api/order';
import type { OrderDetailVO, OrderItemVO } from '@/types/order';
import { OrderStatus, ORDER_STATUS_MAP } from '@/types/order';
import styles from './styles.module.less';

const OrderDetail: React.FC = () => {
  const { orderNo } = useParams<{ orderNo: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderDetailVO>();

  const fetchOrderDetail = async () => {
    if (!orderNo) return;
    setLoading(true);
    try {
      const res = await getOrderDetail(orderNo);
      setOrder(res.data.data);
    } catch (error) {
      console.error('获取订单详情失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [orderNo]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePay = async () => {
    if (!orderNo) return;
    try {
      await payOrder(orderNo);
      message.success('支付成功');
      fetchOrderDetail();
    } catch (error) {
      console.error('支付失败:', error);
    }
  };

  const handleConfirm = async () => {
    if (!orderNo) return;
    Modal.confirm({
      title: '确认收货',
      content: '确认已收到商品吗？',
      onOk: async () => {
        try {
          await confirmOrder(orderNo);
          message.success('确认收货成功');
          fetchOrderDetail();
        } catch (error) {
          console.error('确认收货失败:', error);
        }
      },
    });
  };

  const handleCancel = async () => {
    if (!orderNo) return;
    Modal.confirm({
      title: '取消订单',
      content: '确认要取消该订单吗？',
      onOk: async () => {
        try {
          await cancelOrder(orderNo);
          message.success('取消订单成功');
          fetchOrderDetail();
        } catch (error) {
          console.error('取消订单失败:', error);
        }
      },
    });
  };

  const columns = [
    {
      title: '商品信息',
      dataIndex: 'medicineName',
      render: (_: string, record: OrderItemVO) => (
        <div className={styles.product}>
          <Image
            src={record.medicineImage}
            alt={record.medicineName}
            width={80}
            height={80}
            fallback="/images/fallback.png"
          />
          <div className={styles.info}>
            <div className={styles.name}>{record.medicineName}</div>
            <div className={styles.price}>￥{record.price.toFixed(2)}</div>
          </div>
        </div>
      ),
    },
    {
      title: '单价',
      dataIndex: 'price',
      align: 'center' as const,
      render: (price: number) => `￥${price.toFixed(2)}`,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      align: 'center' as const,
    },
    {
      title: '小计',
      dataIndex: 'subtotal',
      align: 'center' as const,
      render: (subtotal: number) => `￥${subtotal.toFixed(2)}`,
    },
  ];

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  if (!order) {
    return (
      <Card className={styles.orderDetail}>
        <Empty description="暂无订单信息" />
      </Card>
    );
  }

  const renderActions = () => {
    const actions = [];

    if (order.status === OrderStatus.PENDING_PAYMENT) {
      actions.push(
        <Button key="pay" type="primary" onClick={handlePay}>
          立即支付
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          取消订单
        </Button>,
      );
    } else if (order.status === OrderStatus.SHIPPED) {
      actions.push(
        <Button key="confirm" type="primary" onClick={handleConfirm}>
          确认收货
        </Button>,
      );
    }

    return actions;
  };

  return (
    <div className={styles.orderDetail}>
      <Card
        title={
          <div className={styles.header}>
            <Button icon={<LeftOutlined />} onClick={handleBack}>
              返回
            </Button>
            <Space size="middle">
              <span className={styles.title}>订单详情</span>
              <Tag color={ORDER_STATUS_MAP[order.status as keyof typeof ORDER_STATUS_MAP].color}>
                {ORDER_STATUS_MAP[order.status as keyof typeof ORDER_STATUS_MAP].text}
              </Tag>
            </Space>
          </div>
        }
        extra={<Space>{renderActions()}</Space>}
      >
        <Descriptions title="订单信息" bordered>
          <Descriptions.Item label="订单编号">{order.orderNo}</Descriptions.Item>
          <Descriptions.Item label="订单金额">
            ￥{order.totalAmount.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="支付方式">
            {order.payTypeDesc}
          </Descriptions.Item>
          <Descriptions.Item label="收货人">{order.receiver}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{order.phone}</Descriptions.Item>
          <Descriptions.Item label="收货地址">{order.address}</Descriptions.Item>
          <Descriptions.Item label="订单备注" span={3}>
            {order.remark || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {dayjs(order.createdTime).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="支付时间">
            {order.payTime
              ? dayjs(order.payTime).format('YYYY-MM-DD HH:mm:ss')
              : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="发货时间">
            {order.deliveryTime
              ? dayjs(order.deliveryTime).format('YYYY-MM-DD HH:mm:ss')
              : '-'}
          </Descriptions.Item>
        </Descriptions>

        <Card title="商品信息" className={styles.products}>
          <Table
            columns={columns}
            dataSource={order.items}
            rowKey="medicineId"
            pagination={false}
          />
          <div className={styles.summary}>
            共 {order.items.length} 件商品，
            实付金额：
            <span className={styles.amount}>￥{order.payAmount.toFixed(2)}</span>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default OrderDetail; 
