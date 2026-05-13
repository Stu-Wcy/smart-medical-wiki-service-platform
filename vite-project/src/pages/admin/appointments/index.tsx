import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Typography,
  Input,
  Select,
  DatePicker,
  Modal,
  message,
  Row,
  Col,
  Descriptions,
  Form
} from 'antd';
import { 
  SearchOutlined, 
  EyeOutlined, 
  EditOutlined,
  CloseOutlined,
  CalendarOutlined,
  DollarOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { 
  getAllAppointmentsPage, 
  updateAppointmentStatus, 
  cancelAppointmentForAdmin,
  getAppointmentByIdForAdmin 
} from '@/api/appointment';
import type { Appointment, AppointmentQueryDTO, AppointmentStatus } from '@/types/appointment';
import { APPOINTMENT_STATUS_OPTIONS, getAppointmentStatusColor } from '@/types/appointment';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const AdminAppointments: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Appointment[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchParams, setSearchParams] = useState<AppointmentQueryDTO>({});
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [newStatus, setNewStatus] = useState<AppointmentStatus | undefined>();
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    fetchData();
  }, [current, pageSize, searchParams]);

  // 获取数据
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        ...searchParams,
        page: current,
        size: pageSize,
      };
      const response = await getAllAppointmentsPage(params);
      if (response.data && response.data.code === 200) {
        const result = response.data.data;
        setDataSource(result.list || []);
        setTotal(result.total || 0);
      } else {
        message.error('获取预约订单失败');
      }
    } catch (error) {
      console.error('获取预约订单失败:', error);
      message.error('获取预约订单失败');
    } finally {
      setLoading(false);
    }
  };

  // 搜索
  const handleSearch = () => {
    setCurrent(1);
    fetchData();
  };

  // 重置搜索
  const handleReset = () => {
    setSearchParams({});
    setCurrent(1);
  };

  // 查看详情
  const handleViewDetail = async (record: Appointment) => {
    try {
      const response = await getAppointmentByIdForAdmin(record.id);
      if (response.data && response.data.code === 200) {
        setSelectedAppointment(response.data.data);
        setDetailModalVisible(true);
      } else {
        message.error('获取预约详情失败');
      }
    } catch (error) {
      console.error('获取预约详情失败:', error);
      message.error('获取预约详情失败');
    }
  };

  // 更新状态
  const handleUpdateStatus = (record: Appointment) => {
    setSelectedAppointment(record);
    setNewStatus(record.status);
    setStatusModalVisible(true);
  };

  // 确认更新状态
  const handleConfirmUpdateStatus = async () => {
    if (!selectedAppointment || !newStatus) {
      message.error('请选择状态');
      return;
    }

    try {
      await updateAppointmentStatus(selectedAppointment.id, newStatus);
      message.success('状态更新成功');
      setStatusModalVisible(false);
      fetchData();
    } catch (error: any) {
      console.error('状态更新失败:', error);
      message.error(error.response?.data?.message || '状态更新失败');
    }
  };

  // 取消预约
  const handleCancel = (record: Appointment) => {
    setSelectedAppointment(record);
    setCancelModalVisible(true);
    setCancelReason('');
  };

  // 确认取消
  const handleConfirmCancel = async () => {
    if (!selectedAppointment || !cancelReason.trim()) {
      message.error('请输入取消原因');
      return;
    }

    try {
      await cancelAppointmentForAdmin(selectedAppointment.id, cancelReason);
      message.success('取消预约成功');
      setCancelModalVisible(false);
      fetchData();
    } catch (error: any) {
      console.error('取消预约失败:', error);
      message.error(error.response?.data?.message || '取消预约失败');
    }
  };

  // 表格列定义
  const columns: ColumnsType<Appointment> = [
    {
      title: '预约单号',
      dataIndex: 'appointmentNo',
      key: 'appointmentNo',
      width: 150,
      render: (text) => <Text copyable>{text}</Text>
    },
    {
      title: '就诊信息',
      key: 'appointmentInfo',
      width: 200,
      render: (_, record) => (
        <div>
          <div><Text strong>{record.hospitalName}</Text></div>
          <div><Text type="secondary">{record.departmentName}</Text></div>
          <div><Text type="secondary">{record.doctorName} {record.doctorTitle}</Text></div>
        </div>
      )
    },
    {
      title: '就诊时间',
      key: 'appointmentTime',
      width: 150,
      render: (_, record) => (
        <div>
          <div>
            <CalendarOutlined style={{ marginRight: '4px' }} />
            {record.appointmentDate}
          </div>
          <div>
            <Tag color="blue">{record.timeSlotName}</Tag>
            {dayjs(record.appointmentTime).format('HH:mm')}
          </div>
        </div>
      )
    },
    {
      title: '就诊人信息',
      key: 'patientInfo',
      width: 150,
      render: (_, record) => (
        <div>
          <div><Text strong>{record.patientName}</Text></div>
          <div><Text type="secondary">{record.patientPhone}</Text></div>
        </div>
      )
    },
    {
      title: '挂号费',
      dataIndex: 'consultationFee',
      key: 'consultationFee',
      width: 100,
      render: (fee) => (
        <Text strong style={{ color: '#ff4d4f' }}>
          <DollarOutlined style={{ marginRight: '4px' }} />
          ¥{fee}
        </Text>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={getAppointmentStatusColor(status)}>
          {status === 'PENDING' && '已预约'}
          {status === 'CANCELLED' && '已取消'}
          {status === 'COMPLETED' && '已完成'}
          {status === 'EXPIRED' && '已过期'}
        </Tag>
      )
    },
    {
      title: '预约时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
      width: 150,
      render: (time) => dayjs(time).format('YYYY-MM-DD HH:mm')
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            详情
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleUpdateStatus(record)}
          >
            状态
          </Button>
          {record.status === 'PENDING' && (
            <Button
              type="link"
              size="small"
              danger
              icon={<CloseOutlined />}
              onClick={() => handleCancel(record)}
            >
              取消
            </Button>
          )}
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Title level={4} style={{ margin: 0 }}>预约订单管理</Title>
        </div>

        {/* 搜索表单 */}
        <Card size="small" style={{ marginBottom: '16px' }}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Input
                placeholder="搜索预约单号"
                prefix={<SearchOutlined />}
                value={searchParams.appointmentNo}
                onChange={(e) => setSearchParams(prev => ({ ...prev, appointmentNo: e.target.value }))}
                allowClear
              />
            </Col>
            <Col span={6}>
              <Input
                placeholder="搜索就诊人姓名"
                value={searchParams.patientName}
                onChange={(e) => setSearchParams(prev => ({ ...prev, patientName: e.target.value }))}
                allowClear
              />
            </Col>
            <Col span={6}>
              <Input
                placeholder="搜索就诊人手机号"
                value={searchParams.patientPhone}
                onChange={(e) => setSearchParams(prev => ({ ...prev, patientPhone: e.target.value }))}
                allowClear
              />
            </Col>
            <Col span={6}>
              <Select
                placeholder="选择状态"
                style={{ width: '100%' }}
                value={searchParams.status}
                onChange={(value) => setSearchParams(prev => ({ ...prev, status: value }))}
                allowClear
              >
                {APPOINTMENT_STATUS_OPTIONS.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
            <Col span={12}>
              <RangePicker
                style={{ width: '100%' }}
                placeholder={['开始日期', '结束日期']}
                value={searchParams.startDate && searchParams.endDate ? [
                  dayjs(searchParams.startDate),
                  dayjs(searchParams.endDate)
                ] : null}
                onChange={(dates) => {
                  if (dates) {
                    setSearchParams(prev => ({
                      ...prev,
                      startDate: dates[0]?.format('YYYY-MM-DD'),
                      endDate: dates[1]?.format('YYYY-MM-DD')
                    }));
                  } else {
                    setSearchParams(prev => ({
                      ...prev,
                      startDate: undefined,
                      endDate: undefined
                    }));
                  }
                }}
              />
            </Col>
            <Col span={12}>
              <Space>
                <Button type="primary" onClick={handleSearch}>
                  搜索
                </Button>
                <Button onClick={handleReset}>
                  重置
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* 数据表格 */}
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1400 }}
          pagination={{
            current,
            pageSize,
            total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
            onChange: (page, size) => {
              setCurrent(page);
              setPageSize(size);
            }
          }}
        />
      </Card>

      {/* 详情弹窗 */}
      <Modal
        title="预约详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedAppointment && (
          <div>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="预约单号" span={2}>
                <Text copyable>{selectedAppointment.appointmentNo}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="医院">{selectedAppointment.hospitalName}</Descriptions.Item>
              <Descriptions.Item label="科室">{selectedAppointment.departmentName}</Descriptions.Item>
              <Descriptions.Item label="医生">{selectedAppointment.doctorName}</Descriptions.Item>
              <Descriptions.Item label="职称">{selectedAppointment.doctorTitle}</Descriptions.Item>
              <Descriptions.Item label="就诊日期">{selectedAppointment.appointmentDate}</Descriptions.Item>
              <Descriptions.Item label="就诊时间">
                {selectedAppointment.timeSlotName} {dayjs(selectedAppointment.appointmentTime).format('HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="就诊人">{selectedAppointment.patientName}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{selectedAppointment.patientPhone}</Descriptions.Item>
              <Descriptions.Item label="身份证号">
                {selectedAppointment.patientIdCard ? 
                  selectedAppointment.patientIdCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2') : 
                  '未填写'
                }
              </Descriptions.Item>
              <Descriptions.Item label="挂号费">¥{selectedAppointment.consultationFee}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={getAppointmentStatusColor(selectedAppointment.status)}>
                  {selectedAppointment.statusName}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="预约时间" span={2}>
                {dayjs(selectedAppointment.createdTime).format('YYYY-MM-DD HH:mm:ss')}
              </Descriptions.Item>
              {selectedAppointment.notes && (
                <Descriptions.Item label="备注" span={2}>
                  {selectedAppointment.notes}
                </Descriptions.Item>
              )}
              {selectedAppointment.cancelReason && (
                <Descriptions.Item label="取消原因" span={2}>
                  {selectedAppointment.cancelReason}
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* 更新状态弹窗 */}
      <Modal
        title="更新预约状态"
        open={statusModalVisible}
        onOk={handleConfirmUpdateStatus}
        onCancel={() => setStatusModalVisible(false)}
        okText="确认更新"
        cancelText="取消"
      >
        <div style={{ marginBottom: '16px' }}>
          <Text>请选择新的预约状态：</Text>
        </div>
        <Select
          style={{ width: '100%' }}
          value={newStatus}
          onChange={setNewStatus}
          placeholder="请选择状态"
        >
          {APPOINTMENT_STATUS_OPTIONS.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Modal>

      {/* 取消预约弹窗 */}
      <Modal
        title="取消预约"
        open={cancelModalVisible}
        onOk={handleConfirmCancel}
        onCancel={() => setCancelModalVisible(false)}
        okText="确认取消"
        cancelText="返回"
      >
        <div style={{ marginBottom: '16px' }}>
          <Text>确定要取消以下预约吗？</Text>
        </div>
        {selectedAppointment && (
          <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
            <div><Text strong>{selectedAppointment.hospitalName}</Text></div>
            <div>{selectedAppointment.departmentName} - {selectedAppointment.doctorName}</div>
            <div>{selectedAppointment.appointmentDate} {selectedAppointment.timeSlotName}</div>
            <div>就诊人：{selectedAppointment.patientName}</div>
          </div>
        )}
        <div>
          <Text>取消原因：</Text>
          <Input.TextArea
            placeholder="请输入取消原因"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            rows={3}
            maxLength={200}
            showCount
          />
        </div>
      </Modal>
    </div>
  );
};

export default AdminAppointments;
