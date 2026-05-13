import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Space,
  message,
  Modal,
  Image,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { getFeedbackList, getFeedbackDetail, replyFeedback } from '@/api/admin/feedback';
import type { FeedbackVO, FeedbackQueryDTO } from '@/types/feedback';
import styles from './styles.module.less';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

// 反馈类型映射
const FEEDBACK_TYPE_MAP = {
  1: '功能建议',
  2: '界面优化',
  3: '性能问题',
  4: '使用咨询',
  5: '其他',
};

// 处理状态映射
const FEEDBACK_STATUS_MAP = {
  0: '待处理',
  1: '已回复',
};

const FeedbackList: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FeedbackVO[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<FeedbackVO | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [replying, setReplying] = useState(false);

  // 获取列表数据
  const fetchList = async (page = current, size = pageSize) => {
    try {
      setLoading(true);
      const values = form.getFieldsValue();
      const { startTime, endTime } = values.timeRange || {};
      const params = {
        queryDTO: {
          ...values,
          startTime: startTime?.format('YYYY-MM-DD HH:mm:ss'),
          endTime: endTime?.format('YYYY-MM-DD HH:mm:ss'),
        },
        page,
        size,
      };
      const res = await getFeedbackList(params);
      const payload: any = (res as any).data?.data;
      setData(payload.list || []);
      setTotal(payload.total ?? 0);
      setCurrent(page);
      setPageSize(size);
    } catch (error) {
      console.error('获取意见反馈列表失败:', error);
      message.error('获取意见反馈列表失败');
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

  // 处理回复
  const handleReply = async (record: FeedbackVO) => {
    try {
      const res = await getFeedbackDetail(record.id);
      setCurrentFeedback(((res as any).data?.data) as any);
      setReplyModalVisible(true);
    } catch (error) {
      console.error('获取意见反馈详情失败:', error);
      message.error('获取意见反馈详情失败');
    }
  };

  // 提交回复
  const handleSubmitReply = async () => {
    if (!currentFeedback) return;
    try {
      setReplying(true);
      await replyFeedback(currentFeedback.id, { reply: replyContent });
      message.success('回复成功');
      setReplyModalVisible(false);
      setReplyContent('');
      fetchList();
    } catch (error) {
      console.error('回复意见反馈失败:', error);
      message.error('回复意见反馈失败');
    } finally {
      setReplying(false);
    }
  };

  const columns: ColumnsType<FeedbackVO> = [
    {
      title: '反馈ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      width: 80,
    },
    {
      title: '反馈类型',
      dataIndex: 'typeDesc',
      width: 100,
    },
    {
      title: '反馈内容',
      dataIndex: 'content',
      ellipsis: true,
    },
    {
      title: '图片',
      dataIndex: 'images',
      width: 100,
      render: (images: string) => {
        if (!images) return null;
        const imageList = images.split(',');
        return (
          <Image.PreviewGroup>
            {imageList.map((url, index) => (
              <Image
                key={index}
                src={url}
                width={50}
                height={50}
                style={{ objectFit: 'cover', marginRight: 8 }}
              />
            ))}
          </Image.PreviewGroup>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'statusDesc',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      width: 180,
      render: (time: string) => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => handleReply(record)}
            disabled={record.status === 1}
          >
            回复
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.feedbackList}>
      <Card bordered={false}>
        <Form
          form={form}
          layout="inline"
          className={styles.searchForm}
          onFinish={handleSearch}
        >
          <Form.Item name="type" label="反馈类型">
            <Select
              style={{ width: 120 }}
              allowClear
              placeholder="请选择"
              options={Object.entries(FEEDBACK_TYPE_MAP).map(([value, label]) => ({
                value: Number(value),
                label,
              }))}
            />
          </Form.Item>
          <Form.Item name="status" label="处理状态">
            <Select
              style={{ width: 120 }}
              allowClear
              placeholder="请选择"
              options={Object.entries(FEEDBACK_STATUS_MAP).map(([value, label]) => ({
                value: Number(value),
                label,
              }))}
            />
          </Form.Item>
          <Form.Item name="userId" label="用户ID">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item name="timeRange" label="创建时间">
            <RangePicker showTime />
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
        title="回复意见反馈"
        open={replyModalVisible}
        onOk={handleSubmitReply}
        onCancel={() => {
          setReplyModalVisible(false);
          setReplyContent('');
        }}
        confirmLoading={replying}
      >
        {currentFeedback && (
          <div className={styles.replyModal}>
            <div className={styles.feedbackInfo}>
              <p>
                <strong>反馈类型：</strong>
                {currentFeedback.typeDesc}
              </p>
              <p>
                <strong>反馈内容：</strong>
                {currentFeedback.content}
              </p>
              {currentFeedback.images && (
                <div className={styles.images}>
                  <strong>相关图片：</strong>
                  <Image.PreviewGroup>
                    {currentFeedback.images.split(',').map((url, index) => (
                      <Image
                        key={index}
                        src={url}
                        width={80}
                        height={80}
                        style={{ objectFit: 'cover', marginRight: 8 }}
                      />
                    ))}
                  </Image.PreviewGroup>
                </div>
              )}
            </div>
            <div className={styles.replyForm}>
              <p>
                <strong>回复内容：</strong>
              </p>
              <TextArea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="请输入回复内容"
                maxLength={1000}
                showCount
                rows={4}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FeedbackList; 
