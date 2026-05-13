import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Space, Button, DatePicker, message, Select, Modal, Descriptions, Tag, Image } from 'antd';
import { listAdminConsultations, getAdminConsultationDetail } from '@/api/consult';

const AdminConsultationsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [doctorId, setDoctorId] = useState<string>('');
  const [patientId, setPatientId] = useState<string>('');
  const [range, setRange] = useState<any>(null);
  const [status, setStatus] = useState<string>('');
  const [detailOpen, setDetailOpen] = useState(false);
  const [detail, setDetail] = useState<any | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await listAdminConsultations({
        doctorId: doctorId || undefined,
        patientId: patientId || undefined,
        status: status || undefined,
        start: range?.[0] ? range[0].toISOString() : undefined,
        end: range?.[1] ? range[1].toISOString() : undefined,
      });
      setData(res.data.data || []);
    } catch (e: any) {
      message.error(e?.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [doctorId, patientId, status, range]);

  const filtered = data;

  const columns = [
    { title: '咨询ID', dataIndex: 'id' },
    { title: '病人ID', dataIndex: 'patientId' },
    { title: '医生ID', dataIndex: 'doctorId' },
    { title: '状态', dataIndex: 'status' },
    { title: '咨询时间', dataIndex: 'createdAt' },
    { title: '回复时间', dataIndex: 'repliedAt' },
    {
      title: '操作',
      render: (_: any, r: any) => (
        <Button type="link" onClick={async () => {
          setDetailOpen(true);
          setDetailLoading(true);
          try {
            const res = await getAdminConsultationDetail(r.id);
            setDetail(res.data.data);
          } catch (e: any) {
            message.error(e?.message || '加载详情失败');
          } finally {
            setDetailLoading(false);
          }
        }}>查看详情</Button>
      )
    }
  ];

  return (
    <Card title="咨询记录查看" loading={loading}>
      <Space style={{ marginBottom: 12 }}>
        <Input placeholder="医生ID" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} style={{ width: 180 }} />
        <Input placeholder="病人ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} style={{ width: 180 }} />
        <Select
          placeholder="状态"
          value={status}
          onChange={setStatus}
          allowClear
          style={{ width: 160 }}
          options={[
            { label: '待答复', value: '1' },
            { label: '已答复', value: '2' },
            { label: '已评价', value: '3' },
            { label: '已关闭', value: '4' },
          ]}
        />
        <DatePicker.RangePicker value={range} onChange={setRange as any} />
      </Space>
      <Table rowKey="id" dataSource={filtered} columns={columns as any} />
      <Modal open={detailOpen} onCancel={() => setDetailOpen(false)} footer={null} title="咨询详情" width={720}>
        <Card loading={detailLoading} bordered={false}>
          <Descriptions column={2} size="small">
            <Descriptions.Item label="咨询ID">{detail?.id}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={detail?.status === 1 ? 'orange' : detail?.status === 2 ? 'green' : detail?.status === 3 ? 'blue' : 'default'}>
                {detail?.status === 1 ? '待答复' : detail?.status === 2 ? '已答复' : detail?.status === 3 ? '已评价' : '已关闭'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="病人ID">{detail?.patientId}</Descriptions.Item>
            <Descriptions.Item label="医生ID">{detail?.doctorId}</Descriptions.Item>
            <Descriptions.Item label="咨询时间">{detail?.createdAt}</Descriptions.Item>
            <Descriptions.Item label="回复时间">{detail?.repliedAt}</Descriptions.Item>
          </Descriptions>
          <Card size="small" title="咨询内容" style={{ marginTop: 12 }}>
            <div style={{ whiteSpace: 'pre-wrap' }}>{detail?.patientCondition}</div>
            {detail?.picPath && (
              <Space style={{ marginTop: 8 }} wrap>
                {(detail.picPath || '').split(',').filter((x: string) => x).map((u: string, i: number) => (
                  <Image key={i} src={u} width={96} height={96} style={{ objectFit: 'cover' }} />
                ))}
              </Space>
            )}
          </Card>
          {detail?.doctorReply && (
            <Card size="small" title="医生回复" style={{ marginTop: 12 }}>
              <div style={{ whiteSpace: 'pre-wrap' }}>{detail?.doctorReply}</div>
            </Card>
          )}
        </Card>
      </Modal>
    </Card>
  );
};

export default AdminConsultationsPage;
