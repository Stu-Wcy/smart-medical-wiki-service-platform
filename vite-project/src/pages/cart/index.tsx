import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Table,
  Button,
  InputNumber,
  Space,
  Empty,
  Image,
  Modal,
  Form,
  Input,
  Radio,
  message,
} from 'antd';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import type { CartItem } from '@/types/order';
import {
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  calculateTotal,
} from '@/utils/cart';
import { createOrder } from '@/api/order';
import type { OrderCreateDTO } from '@/types/order';
import { PayType } from '@/types/order';
import styles from './styles.module.less';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const items = getCartItems();
    setCartItems(items);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    updateCartItemQuantity(id, quantity);
    loadCartItems();
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
    loadCartItems();
    setSelectedRowKeys(selectedRowKeys.filter(key => key !== id));
  };

  const handleClear = () => {
    Modal.confirm({
      title: '确认清空购物车？',
      content: '此操作将清空购物车中的所有商品',
      onOk: () => {
        clearCart();
        loadCartItems();
        setSelectedRowKeys([]);
      },
    });
  };

  const handleCheckout = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要结算的商品');
      return;
    }
    setCheckoutModalVisible(true);
  };

  const handleCheckoutSubmit = async (values: any) => {
    const selectedItems = cartItems.filter(item => selectedRowKeys.includes(item.id));
    const orderItems = selectedItems.map(item => ({
      medicineId: item.id,
      quantity: item.quantity,
    }));

    const orderData: OrderCreateDTO = {
      ...values,
      items: orderItems,
    };

    setSubmitting(true);
    try {
      const res = await createOrder(orderData);
      // 从购物车中移除已下单的商品
      selectedItems.forEach(item => removeFromCart(item.id));
      loadCartItems();
      setSelectedRowKeys([]);
      setCheckoutModalVisible(false);
      message.success('订单创建成功');
      // 跳转到订单详情页
      console.log('订单创建成功，订单号：', res.data)
      navigate(`/user/order/detail/${res.data.data}`);
    } catch (error) {
      console.error('创建订单失败:', error);
      message.error('创建订单失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: '商品信息',
      dataIndex: 'name',
      render: (_: string, record: CartItem) => (
        <div className={styles.product}>
          <Image
            src={record.image}
            alt={record.name}
            width={80}
            height={80}
            fallback="/images/fallback.png"
          />
          <div className={styles.info}>
            <div className={styles.name}>{record.name}</div>
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
      render: (_: number, record: CartItem) => (
        <InputNumber
          min={1}
          max={record.stock}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.id, value || 1)}
        />
      ),
    },
    {
      title: '小计',
      dataIndex: 'subtotal',
      align: 'center' as const,
      render: (_: number, record: CartItem) =>
        `￥${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center' as const,
      render: (_: any, record: CartItem) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(record.id)}
        >
          删除
        </Button>
      ),
    },
  ];

  const selectedItems = cartItems.filter(item => selectedRowKeys.includes(item.id));
  const totalAmount = calculateTotal(selectedItems);

  return (
    <div className={styles.cartPage}>
      <Card
        title={
          <Space>
            <ShoppingCartOutlined />
            <span>我的购物车</span>
          </Space>
        }
        extra={
          cartItems.length > 0 && (
            <Button type="link" danger onClick={handleClear}>
              清空购物车
            </Button>
          )
        }
      >
        {cartItems.length > 0 ? (
          <>
            <Table
              rowSelection={{
                selectedRowKeys,
                onChange: (keys) => setSelectedRowKeys(keys),
              }}
              columns={columns}
              dataSource={cartItems}
              rowKey="id"
              pagination={false}
            />
            <div className={styles.footer}>
              <div className={styles.summary}>
                已选择 {selectedRowKeys.length} 件商品
                <span className={styles.total}>
                  合计：<span className={styles.amount}>￥{totalAmount.toFixed(2)}</span>
                </span>
              </div>
              <Button type="primary" size="large" onClick={handleCheckout}>
                结算
              </Button>
            </div>
          </>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="购物车是空的"
          >
            <Button type="primary" onClick={() => navigate('/medicine/list')}>
              去逛逛
            </Button>
          </Empty>
        )}
      </Card>

      <Modal
        title="填写订单信息"
        open={checkoutModalVisible}
        onCancel={() => setCheckoutModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCheckoutSubmit}
          initialValues={{ payType: PayType.WECHAT }}
        >
          <Form.Item
            label="收货人"
            name="receiver"
            rules={[{ required: true, message: '请输入收货人姓名' }]}
          >
            <Input placeholder="请输入收货人姓名" />
          </Form.Item>

          <Form.Item
            label="联系电话"
            name="phone"
            rules={[
              { required: true, message: '请输入联系电话' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' },
            ]}
          >
            <Input placeholder="请输入联系电话" />
          </Form.Item>

          <Form.Item
            label="收货地址"
            name="address"
            rules={[{ required: true, message: '请输入收货地址' }]}
          >
            <Input.TextArea placeholder="请输入详细收货地址" rows={3} />
          </Form.Item>

          <Form.Item label="支付方式" name="payType" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={PayType.WECHAT}>微信支付</Radio>
              <Radio value={PayType.ALIPAY}>支付宝</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="订单备注" name="remark">
            <Input.TextArea placeholder="请输入订单备注（选填）" rows={3} />
          </Form.Item>

          <Form.Item>
            <div className={styles.modalFooter}>
              <div className={styles.modalTotal}>
                应付金额：<span className={styles.amount}>￥{totalAmount.toFixed(2)}</span>
              </div>
              <Space>
                <Button onClick={() => setCheckoutModalVisible(false)}>取消</Button>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  提交订单
                </Button>
              </Space>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Cart; 