import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Input,
  Select,
  Form,
  message,
  Popconfirm,
  Tag,
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  DeleteOutlined,
  StarFilled,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { getAllPatientsPage, deletePatientForAdmin } from '@/api/patient';
import type { Patient, PatientQueryDTO } from '@/types/patient';
import {
  GENDER_OPTIONS,
  RELATIONSHIP_OPTIONS,
  getGenderLabel,
  getRelationshipLabel,
  getPatientStatusLabel
} from '@/types/patient';

const { Option } = Select;

const AdminPatients: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Patient[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchParams, setSearchParams] = useState<PatientQueryDTO>({});

  const [form] = Form.useForm();

  // 获取数据
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        ...searchParams,
        page: current,
        size: pageSize,
      };
      console.log('请求参数:', params);
      const response = await getAllPatientsPage(params);
      console.log('API响应:', response);
      if (response.data && response.data.code === 200) {
        const result = response.data.data;
        console.log('解析后的数据:', result);
        setDataSource(result.list || []);
        setTotal(result.total || 0);
      } else {
        console.error('API返回错误:', response.data);
        message.error(response.data?.message || '获取数据失败');
      }
    } catch (error: any) {
      console.error('获取就诊人数据失败:', error);
      console.error('错误详情:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      message.error(error.response?.data?.message || '获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [current, pageSize, searchParams]);

  // 搜索
  const handleSearch = (values: any) => {
    setSearchParams(values);
    setCurrent(1);
  };

  // 重置
  const handleReset = () => {
    form.resetFields();
    setSearchParams({});
    setCurrent(1);
  };

  // 删除
  const handleDelete = async (id: number) => {
    try {
      const response = await deletePatientForAdmin(id);
      if (response.data && response.data.code === 200) {
        message.success('删除成功');
        fetchData();
      } else {
        message.error('删除失败');
      }
    } catch (error) {
      console.error('删除就诊人失败:', error);
      message.error('删除失败');
    }
  };

  // 表格列定义
  const columns: ColumnsType<Patient> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '就诊人姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      render: (text: string, record: Patient) => (
        <Space>
          <span>{text}</span>
          {record.isDefault && (
            <StarFilled style={{ color: '#faad14' }} />
          )}
        </Space>
      ),
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
      render: (gender: string) => (
        <Tag color={gender === 'MALE' ? 'blue' : 'pink'}>
          {getGenderLabel(gender as any)}
        </Tag>
      ),
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
      key: 'idCard',
      width: 180,
      render: (text: string) => text || '-',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
      render: (age: number) => age ? `${age}岁` : '-',
    },
    {
      title: '关系',
      dataIndex: 'relationship',
      key: 'relationship',
      width: 100,
      render: (relationship: string) => getRelationshipLabel(relationship as any),
    },
    {
      title: '所属用户',
      dataIndex: 'userName',
      key: 'userName',
      width: 120,
      render: (text: string) => text || '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>
          {getPatientStatusLabel(status as any)}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
      width: 180,
      render: (text: string) => text ? new Date(text).toLocaleString() : '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record: Patient) => (
        <Popconfirm
          title="确定要删除这个就诊人吗？"
          onConfirm={() => handleDelete(record.id)}
          okText="确定"
          cancelText="取消"
        >
          <Button
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
          >
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        {/* 搜索表单 */}
        <Form
          form={form}
          layout="inline"
          onFinish={handleSearch}
          style={{ marginBottom: '16px' }}
        >
          <Form.Item name="name" label="就诊人姓名">
            <Input placeholder="请输入就诊人姓名" allowClear />
          </Form.Item>
          <Form.Item name="phone" label="手机号">
            <Input placeholder="请输入手机号" allowClear />
          </Form.Item>
          <Form.Item name="gender" label="性别">
            <Select placeholder="请选择性别" allowClear style={{ width: 100 }}>
              {GENDER_OPTIONS.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="relationship" label="关系">
            <Select placeholder="请选择关系" allowClear style={{ width: 120 }}>
              {RELATIONSHIP_OPTIONS.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                搜索
              </Button>
              <Button onClick={handleReset} icon={<ReloadOutlined />}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>

        {/* 数据表格 */}
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1200 }}
          pagination={{
            current,
            pageSize,
            total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
            onChange: (page, size) => {
              setCurrent(page);
              setPageSize(size || 10);
            },
          }}
        />
      </Card>
    </div>
  );
};

export default AdminPatients;
