import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  message,
  Modal,
  Typography,
  DatePicker,
  Form,
  Select,
  Empty,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  getMyConsultationList,
  getConsultationDetail,
  getConsultationMessages,
} from '@/api/ai/consultation';
import type { ConsultationVO, ConsultationMessageVO } from '@/types/consultation';
import styles from './styles.module.less';

const { RangePicker } = DatePicker;
const { Text } = Typography;

// 状态映射
const STATUS_MAP = {
  IN_PROGRESS: { text: '进行中', color: 'processing' },
  COMPLETED: { text: '已完成', color: 'success' },
  FAILED: { text: '失败', color: 'error' },
};

const ConsultationHistory: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ConsultationVO[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentConsultation, setCurrentConsultation] = useState<ConsultationVO | null>(null);
  const [messages, setMessages] = useState<ConsultationMessageVO[]>([]);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // 获取列表数据
  const fetchList = async (page = current, size = pageSize) => {
    try {
      setLoading(true);
      const values = form.getFieldsValue();
      const { timeRange, ...rest } = values;
      const params = {
        queryDTO: {
          ...rest,
          startTime: timeRange?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
          endTime: timeRange?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
        },
        page,
        size,
      };
      const { data } = await getMyConsultationList(params);
      setData(data.data.list);
      setTotal(data.data.total);
      setCurrent(page);
      setPageSize(size);
    } catch (error) {
      console.error('获取问诊记录列表失败:', error);
      message.error('获取问诊记录列表失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // 处理搜索
  const handleSearch = () => {
    fetchList(1);
  };

  // 处理重置
  const handleReset = () => {
    form.resetFields();
    fetchList(1);
  };

  // 查看详情
  const handleViewDetail = async (record: ConsultationVO) => {
    try {
      setLoadingDetail(true);
      const [detailRes, messagesRes] = await Promise.all([
        getConsultationDetail(record.id),
        getConsultationMessages(record.id),
      ]);
      setCurrentConsultation(detailRes.data.data);
      setMessages(messagesRes.data.data);
      setDetailModalVisible(true);
    } catch (error) {
      console.error('获取问诊记录详情失败:', error);
      message.error('获取问诊记录详情失败，请稍后重试');
    } finally {
      setLoadingDetail(false);
    }
  };

  // 继续问诊
  const handleContinue = (record: ConsultationVO) => {
    navigate(`/ai/consultation?id=${record.id}`);
  };

  const columns: ColumnsType<ConsultationVO> = [
    {
      title: '症状描述',
      dataIndex: 'symptoms',
      ellipsis: true,
      width: '20%',
    },
    {
      title: '诊断结果',
      dataIndex: 'diagnosis',
      ellipsis: true,
      width: '20%',
    },
    {
      title: '建议',
      dataIndex: 'suggestions',
      ellipsis: true,
      width: '20%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: keyof typeof STATUS_MAP, record: ConsultationVO) => (
        <Tag color={STATUS_MAP[status].color}>
          {record.statusDesc || STATUS_MAP[status].text}
        </Tag>
      ),
    },
    {
      title: '耗时(秒)',
      dataIndex: 'duration',
      width: 100,
      render: (duration: number) => (
        <span>{duration || '-'}</span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      width: 180,
      render: (time: string) => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
      sorter: (a, b) => dayjs(a.createdTime).unix() - dayjs(b.createdTime).unix(),
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleViewDetail(record)}>
            查看详情
          </Button>
          {record.status === 'IN_PROGRESS' && (
            <Button type="link" onClick={() => handleContinue(record)}>
              继续问诊
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.consultationHistory}>
      <Card bordered={false}>
        <Form
          form={form}
          layout="inline"
          className={styles.searchForm}
          onFinish={handleSearch}
        >
          <Form.Item name="status" label="状态">
            <Select
              style={{ width: 120 }}
              allowClear
              placeholder="请选择"
              options={Object.entries(STATUS_MAP).map(([value, { text }]) => ({
                value,
                label: text,
              }))}
            />
          </Form.Item>
          <Form.Item name="timeRange" label="创建时间">
            <RangePicker 
              showTime 
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={['开始时间', '结束时间']}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </Form.Item>
        </Form>

        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1200 }}
          pagination={{
            current,
            pageSize,
            total,
            onChange: (page, size) => fetchList(page, size),
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          className={styles.table}
        />
      </Card>

      <Modal
        title={
          <Space>
            <span>问诊记录详情</span>
            {currentConsultation && (
              <Tag color={STATUS_MAP[currentConsultation.status].color}>
                {currentConsultation.statusDesc || STATUS_MAP[currentConsultation.status].text}
              </Tag>
            )}
          </Space>
        }
        open={detailModalVisible}
        onCancel={() => {
          setDetailModalVisible(false);
          setCurrentConsultation(null);
          setMessages([]);
        }}
        footer={
          currentConsultation?.status === 'IN_PROGRESS' ? (
            <Button type="primary" onClick={() => handleContinue(currentConsultation)}>
              继续问诊
            </Button>
          ) : null
        }
        width={800}
      >
        {loadingDetail ? (
          <div className={styles.loading}>加载中...</div>
        ) : (
          currentConsultation && (
            <div className={styles.detailModal}>
              <div className={styles.basicInfo}>
                <div className={styles.header}>
                  <h3>基本信息</h3>
                </div>
                <div className={styles.content}>
                  <div className={styles.item}>
                    <Text type="secondary">创建时间：</Text>
                    <Text>
                      {dayjs(currentConsultation.createdTime).format('YYYY-MM-DD HH:mm:ss')}
                    </Text>
                  </div>
                  <div className={styles.item}>
                    <Text type="secondary">耗时：</Text>
                    <Text>{currentConsultation.duration ? `${currentConsultation.duration}秒` : '-'}</Text>
                  </div>
                </div>
              </div>

              <div className={styles.consultation}>
                <h3>问诊内容</h3>
                <div className={styles.section}>
                  <Text type="secondary">症状描述：</Text>
                  <Text>{currentConsultation.symptoms || '-'}</Text>
                </div>
                <div className={styles.section}>
                  <Text type="secondary">诊断结果：</Text>
                  <Text>{currentConsultation.diagnosis || '-'}</Text>
                </div>
                <div className={styles.section}>
                  <Text type="secondary">建议：</Text>
                  <Text>{currentConsultation.suggestions || '-'}</Text>
                </div>
              </div>

              <div className={styles.messages}>
                <h3>对话记录</h3>
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`${styles.message} ${
                        message.type === 'USER' ? styles.user : styles.ai
                      }`}
                    >
                      <div className={styles.messageHeader}>
                        <Text type="secondary">{message.typeDesc}</Text>
                        <Text type="secondary">
                          {dayjs(message.createdTime).format('HH:mm:ss')}
                        </Text>
                      </div>
                      <div className={styles.messageContent}>{message.content}</div>
                    </div>
                  ))
                ) : (
                  <Empty description="暂无对话记录" />
                )}
              </div>
            </div>
          )
        )}
      </Modal>
    </div>
  );
};

export default ConsultationHistory; 