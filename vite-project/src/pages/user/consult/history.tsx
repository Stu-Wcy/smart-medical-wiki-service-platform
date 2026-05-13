import React, { useEffect, useState } from 'react';
import { Card, Tabs, List, Tag, Button, message } from 'antd';
import { listMyConsultations, evaluateConsultation } from '@/api/consult';

const HistoryPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await listMyConsultations();
      setItems(res.data.data || []);
    } catch (e: any) {
      message.error(e?.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = (key: string) => {
    switch (key) {
      case 'pending': return items.filter(i => i.status === 1);
      case 'toEvaluate': return items.filter(i => i.status === 2);
      case 'evaluated': return items.filter(i => i.status === 3);
      default: return items;
    }
  };

  const renderList = (data: any[]) => (
    <List
      itemLayout="vertical"
      dataSource={data}
      renderItem={(it: any) => (
        <List.Item
          actions={[
            it.status === 2 ? (
              <>
                <Button type="link" onClick={async () => { await evaluateConsultation(it.id, 1); message.success('评价成功'); load(); }}>满意</Button>
                <Button type="link" danger onClick={async () => { await evaluateConsultation(it.id, 2); message.success('评价成功'); load(); }}>不满意</Button>
              </>
            ) : null
          ]}
        >
          <List.Item.Meta title={<span>咨询ID：{it.id} <Tag color="blue">医生ID：{it.doctorId}</Tag></span>} />
          <div>
            <div><b>病情：</b>{it.patientCondition}</div>
            {it.doctorReply && <div><b>答复：</b>{it.doctorReply}</div>}
            <div><b>状态：</b>{
              it.status === 1 ? '待答复' : it.status === 2 ? '已答复（待评价）' : it.status === 3 ? '已评价' : '已关闭'
            }</div>
          </div>
        </List.Item>
      )}
    />
  );

  return (
    <Card title="我的历史咨询" loading={loading}>
      <Tabs
        items={[
          { key: 'all', label: '全部咨询信息', children: renderList(filtered('all')) },
          { key: 'pending', label: '待回复', children: renderList(filtered('pending')) },
          { key: 'toEvaluate', label: '待评价', children: renderList(filtered('toEvaluate')) },
          { key: 'evaluated', label: '已评价', children: renderList(filtered('evaluated')) },
        ]}
      />
    </Card>
  );
};

export default HistoryPage;
