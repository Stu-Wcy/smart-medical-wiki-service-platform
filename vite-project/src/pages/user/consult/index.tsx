import React, { useEffect, useState } from 'react';
import { Card, List, Avatar, Tag, Select, Button, message } from 'antd';
import { listOnlineDoctors, createConsultation } from '@/api/consult';
import { useNavigate } from 'react-router-dom';

const UserConsultPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [filterDept, setFilterDept] = useState<number | undefined>(undefined);
  const [filterTitle, setFilterTitle] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const res = await listOnlineDoctors({ departmentId: filterDept, title: filterTitle });
      setDoctors(res.data.data || []);
    } catch (e: any) {
      message.error(e?.message || '加载医生失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filterDept, filterTitle]);

  return (
    <Card title="在线医生列表" loading={loading} extra={<Button onClick={() => navigate('/user/consult/history')}>我的历史咨询</Button>}>
      <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
        <Select
          placeholder="按科室筛选"
          style={{ width: 200 }}
          allowClear
          onChange={(v) => setFilterDept(v)}
          options={[]}
        />
        <Select
          placeholder="按职称筛选"
          style={{ width: 200 }}
          allowClear
          onChange={(v) => setFilterTitle(v)}
          options={[
            { label: '主任医师', value: '主任医师' },
            { label: '副主任医师', value: '副主任医师' },
            { label: '主治医师', value: '主治医师' },
          ]}
        />
      </div>
      <List
        itemLayout="horizontal"
        dataSource={doctors}
        renderItem={(doc: any) => {
          const online = doc.statusDesc === '在线';
          return (
            <List.Item
              actions={[
                <Button type="primary" disabled={!online} onClick={() => navigate(`/user/consult/form?doctorId=${doc.id}`)}>
                  免费咨询
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={doc.avatar} />}
                title={<span>{doc.name} <Tag color="blue">{doc.title}</Tag></span>}
                description={<span>{doc.specialties} <Tag color={online ? 'green' : 'default'}>{online ? '在线' : '离线'}</Tag></span>}
              />
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default UserConsultPage;
