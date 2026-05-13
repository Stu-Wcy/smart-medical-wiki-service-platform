import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Input, Checkbox, message, Descriptions, Tag, Space, Image, Tabs } from 'antd';
import { listDoctorConsultations, getConsultationDetail, replyConsultation, getConsultationPatient } from '@/api/consult';

const DoctorConsultationsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [replyOpen, setReplyOpen] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [notify, setNotify] = useState(true);
  const [sending, setSending] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detail, setDetail] = useState<any | null>(null);
  const [patient, setPatient] = useState<any | null>(null);
  const [history, setHistory] = useState<Array<{ time: string; content: string }>>([]);
  const [viewOnly, setViewOnly] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await listDoctorConsultations();
      setData(res.data.data || []);
    } catch (e: any) {
      message.error(e?.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openDetail = async (r: any, replyMode: boolean) => {
    setCurrentId(r.id);
    setReplyText('');
    setReplyOpen(true);
    setViewOnly(!replyMode);
    setDetailLoading(true);
    try {
      const res = await getConsultationDetail(r.id);
      const oc = res.data.data;
      setDetail(oc);
      const prev = oc.doctorReply ? [{ time: oc.repliedAt || oc.createdAt, content: oc.doctorReply }] : [];
      setHistory(prev);
      const pRes = await getConsultationPatient(r.id);
      setPatient(pRes.data.data);
    } catch (e: any) {
      message.error(e?.message || '加载详情失败');
    } finally {
      setDetailLoading(false);
    }
  };

  const columns = [
    { title: '咨询ID', dataIndex: 'id' },
    { title: '病人ID', dataIndex: 'patientId' },
    { title: '时间', dataIndex: 'createdAt' },
    { title: '状态', dataIndex: 'status' },
    {
      title: '操作', render: (_: any, r: any) => (
        <Space>
          {r.status === 1 && (
            <Button type="link" onClick={() => openDetail(r, true)}>回复</Button>
          )}
          {r.status !== 1 && (
            <Button type="link" onClick={() => openDetail(r, false)}>查看</Button>
          )}
        </Space>
      )
    }
  ];

  const submitReply = async () => {
    if (!currentId) return;
    try {
      setSending(true);
      await replyConsultation(currentId, { replyText, notifyByEmail: notify });
      message.success('已答复');
      setReplyOpen(false);
      load();
    } catch (e: any) {
      message.error(e?.message || '提交失败');
    } finally {
      setSending(false);
    }
  };

  const tabItems = [
    { key: 'all', label: '全部', data: data },
    { key: 'pending', label: '待处理', data: data.filter(d => d.status === 1) },
    { key: 'replied', label: '已完成', data: data.filter(d => d.status === 2) },
    { key: 'evaluated', label: '已评价', data: data.filter(d => d.status === 3) },
    { key: 'closed', label: '已关闭', data: data.filter(d => d.status === 4) },
  ];

  return (
    <Card title="咨询管理" loading={loading}>
      <Tabs
        items={tabItems.map(t => ({
          key: t.key,
          label: t.label,
          children: <Table rowKey="id" dataSource={t.data} columns={columns as any} pagination={{ pageSize: 10 }} />
        }))}
      />
      <Modal
        title="咨询详情与回复"
        open={replyOpen}
        onOk={viewOnly ? undefined : submitReply}
        okText={viewOnly ? undefined : (sending ? '发送中...' : '发送')}
        confirmLoading={viewOnly ? false : sending}
        onCancel={() => setReplyOpen(false)}
        width={720}
        footer={viewOnly ? null : undefined}
      >
        <Card loading={detailLoading} bordered={false}>
          <Descriptions column={1} size="small">
            <Descriptions.Item label="病人姓名">{patient?.name}</Descriptions.Item>
            <Descriptions.Item label="性别">{patient?.gender}</Descriptions.Item>
            <Descriptions.Item label="年龄">{patient?.birthDate ? (new Date().getFullYear() - new Date(patient.birthDate).getFullYear()) : ''}</Descriptions.Item>
            <Descriptions.Item label="咨询时间">{detail?.createdAt}</Descriptions.Item>
            {detail?.repliedAt && <Descriptions.Item label="回复时间">{detail?.repliedAt}</Descriptions.Item>}
            <Descriptions.Item label="状态">
              <Tag color={detail?.status === 1 ? 'orange' : detail?.status === 2 ? 'green' : detail?.status === 3 ? 'blue' : 'default'}>
                {detail?.status === 1 ? '待处理' : detail?.status === 2 ? '已完成' : detail?.status === 3 ? '已评价' : '已关闭'}
              </Tag>
            </Descriptions.Item>
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
          {!viewOnly && (
            <Card size="small" title="医生回复" style={{ marginTop: 12 }}>
              <Input.TextArea rows={6} value={replyText} onChange={(e) => setReplyText(e.target.value)} />
              <Checkbox checked={notify} onChange={(e) => setNotify(e.target.checked)} style={{ marginTop: 8 }}>邮件通知病人</Checkbox>
            </Card>
          )}
          <Card size="small" title="回复历史" style={{ marginTop: 12 }}>
            {history.length === 0 ? (
              <div>暂无历史回复</div>
            ) : (
              history.map((h, idx) => (
                <Card key={idx} size="small" style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, color: '#888' }}>{h.time}</div>
                  <div style={{ whiteSpace: 'pre-wrap' }}>{h.content}</div>
                </Card>
              ))
            )}
          </Card>
        </Card>
      </Modal>
    </Card>
  );
};

export default DoctorConsultationsPage;
