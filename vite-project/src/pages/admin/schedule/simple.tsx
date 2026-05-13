import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  message,
  Tag,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

// 简化的排班类型
interface SimpleSchedule {
  id: number;
  doctorName: string;
  hospitalName: string;
  scheduleDate: string;
  timeSlot: number;
  totalSlots: number;
  availableSlots: number;
  consultationFee: number;
  status: number;
}

const SimpleScheduleManagement: React.FC = () => {
  const [schedules, setSchedules] = useState<SimpleSchedule[]>([]);
  const [loading, setLoading] = useState(false);

  // 模拟数据
  useEffect(() => {
    setSchedules([
      {
        id: 1,
        doctorName: '张医生',
        hospitalName: '测试医院',
        scheduleDate: '2025-07-23',
        timeSlot: 1,
        totalSlots: 20,
        availableSlots: 15,
        consultationFee: 100,
        status: 1,
      },
    ]);
  }, []);

  // 获取时间段标签
  const getTimeSlotTag = (timeSlot: number) => {
    const config = {
      1: { color: 'blue', text: '上午' },
      2: { color: 'orange', text: '下午' },
      3: { color: 'purple', text: '晚上' },
    };
    const item = config[timeSlot as keyof typeof config];
    return <Tag color={item?.color}>{item?.text}</Tag>;
  };

  // 表格列配置
  const columns: ColumnsType<SimpleSchedule> = [
    {
      title: '排班日期',
      dataIndex: 'scheduleDate',
      key: 'scheduleDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '时间段',
      dataIndex: 'timeSlot',
      key: 'timeSlot',
      render: (timeSlot: number) => getTimeSlotTag(timeSlot),
    },
    {
      title: '医生',
      dataIndex: 'doctorName',
      key: 'doctorName',
    },
    {
      title: '医院',
      dataIndex: 'hospitalName',
      key: 'hospitalName',
    },
    {
      title: '号源',
      key: 'slots',
      render: (_, record) => (
        <div>
          <div>总数: {record.totalSlots}</div>
          <div style={{ color: record.availableSlots > 0 ? '#52c41a' : '#ff4d4f' }}>
            可用: {record.availableSlots}
          </div>
        </div>
      ),
    },
    {
      title: '挂号费',
      dataIndex: 'consultationFee',
      key: 'consultationFee',
      render: (fee: number) => `¥${fee}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (
        status === 1 ? 
          <Tag color="success">正常</Tag> : 
          <Tag color="error">停诊</Tag>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Space wrap>
            <Button type="primary" icon={<PlusOutlined />}>
              新增排班
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={schedules}
          rowKey="id"
          loading={loading}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </Card>
    </div>
  );
};

export default SimpleScheduleManagement;
