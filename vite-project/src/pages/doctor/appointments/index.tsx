import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, Space, Button, message } from 'antd';
import { getDoctorAppointmentsPage, updateDoctorAppointmentStatus, cancelDoctorAppointment } from '@/api/doctor';

const statusColors: Record<string, string> = {
  PENDING: 'blue',
  COMPLETED: 'green',
  CANCELLED: 'red',
};

const DoctorAppointments: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const fetchData = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const res = await getDoctorAppointmentsPage({ page, size });
      const pageData = res.data.data;
      setData(pageData.content || pageData.items || []);
      setPagination({ current: page, pageSize: size, total: pageData.totalElements || pageData.total || 0 });
    } catch (e: any) {
      message.error(e?.message || '加载预约数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { title: '预约单号', dataIndex: 'appointmentNo', key: 'appointmentNo' },
    { title: '就诊人', dataIndex: 'patientName', key: 'patientName' },
    { title: '电话', dataIndex: 'patientPhone', key: 'patientPhone' },
    { title: '日期', dataIndex: 'appointmentDate', key: 'appointmentDate' },
    { title: '时间', dataIndex: 'appointmentTime', key: 'appointmentTime' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={statusColors[s] || 'default'}>{s}</Tag> },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" onClick={async () => {
            try {
              await updateDoctorAppointmentStatus(record.id, 'COMPLETED');
              message.success('已标记完成');
              fetchData(pagination.current, pagination.pageSize);
            } catch (e: any) {
              message.error(e?.message || '操作失败');
            }
          }}>标记完成</Button>
          <Button type="link" danger onClick={async () => {
            try {
              await cancelDoctorAppointment(record.id, '医生操作取消');
              message.success('已取消预约');
              fetchData(pagination.current, pagination.pageSize);
            } catch (e: any) {
              message.error(e?.message || '操作失败');
            }
          }}>取消预约</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="我的预约">
      <Table
        rowKey="id"
        loading={loading}
        dataSource={data}
        columns={columns as any}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, size) => fetchData(page, size),
        }}
      />
    </Card>
  );
};

export default DoctorAppointments;
