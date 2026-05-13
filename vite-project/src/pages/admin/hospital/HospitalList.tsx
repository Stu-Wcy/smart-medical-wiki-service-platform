import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Input,
  Select,
  Form,
  Card,
  Modal,
  message,
  Popconfirm,
  Tag,
  Image,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { adminHospitalApi } from '@/api/admin/hospital';
import type {
  Hospital,
  HospitalQueryDTO,
  HospitalAddDTO,
  HospitalUpdateDTO,
} from '@/types/hospital';
import {
  HospitalLevel,
  HospitalType,
  HospitalStatus,
  HospitalLevelTextMap,
  HospitalTypeTextMap,
  HospitalStatusTextMap,
} from '@/types/hospital';
import HospitalForm from './HospitalForm';

const { Option } = Select;

const HospitalList: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // 查询参数
  const [queryParams, setQueryParams] = useState<HospitalQueryDTO>({});

  // 获取医院列表
  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const response = await adminHospitalApi.getList({
        ...queryParams,
        page: current,
        size: pageSize,
      });
      if (response.data.code === 200) {
        setHospitals(response.data.data.list);
        setTotal(response.data.data.total);
      }
    } catch (error) {
      message.error('获取医院列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 获取省份列表
  const fetchProvinces = async () => {
    try {
      const response = await adminHospitalApi.getProvinces();
      if (response.data.code === 200) {
        setProvinces(response.data.data);
      }
    } catch (error) {
      console.error('获取省份列表失败', error);
    }
  };

  // 根据省份获取城市列表
  const fetchCities = async (province: string) => {
    try {
      const response = await adminHospitalApi.getCitiesByProvince(province);
      if (response.data.code === 200) {
        setCities(response.data.data);
      }
    } catch (error) {
      console.error('获取城市列表失败', error);
    }
  };

  useEffect(() => {
    fetchHospitals();
    fetchProvinces();
  }, [current, pageSize, queryParams]);

  // 搜索
  const handleSearch = (values: any) => {
    setQueryParams(values);
    setCurrent(1);
  };

  // 重置搜索
  const handleReset = () => {
    form.resetFields();
    setQueryParams({});
    setCities([]);
    setCurrent(1);
  };

  // 省份变化
  const handleProvinceChange = (province: string) => {
    form.setFieldsValue({ city: undefined });
    setCities([]);
    if (province) {
      fetchCities(province);
    }
  };

  // 新增医院
  const handleAdd = () => {
    setEditingHospital(null);
    setModalVisible(true);
  };

  // 编辑医院
  const handleEdit = (record: Hospital) => {
    setEditingHospital(record);
    setModalVisible(true);
  };

  // 删除医院
  const handleDelete = async (id: number) => {
    try {
      const response = await adminHospitalApi.delete(id);
      if (response.data.code === 200) {
        message.success('删除成功');
        fetchHospitals();
      }
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 批量删除
  const handleBatchDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要删除的医院');
      return;
    }

    try {
      const response = await adminHospitalApi.batchDelete(selectedRowKeys as number[]);
      if (response.data.code === 200) {
        message.success('批量删除成功');
        setSelectedRowKeys([]);
        fetchHospitals();
      }
    } catch (error) {
      message.error('批量删除失败');
    }
  };

  // 表单提交
  const handleFormSubmit = async (values: HospitalAddDTO | HospitalUpdateDTO) => {
    try {
      let response;
      if (editingHospital) {
        response = await adminHospitalApi.update({ ...values, id: editingHospital.id } as HospitalUpdateDTO);
      } else {
        response = await adminHospitalApi.add(values as HospitalAddDTO);
      }

      if (response.data.code === 200) {
        message.success(editingHospital ? '更新成功' : '新增成功');
        setModalVisible(false);
        fetchHospitals();
      }
    } catch (error) {
      message.error(editingHospital ? '更新失败' : '新增失败');
    }
  };

  // 表格列定义
  const columns: ColumnsType<Hospital> = [
    {
      title: '医院图片',
      dataIndex: 'images',
      key: 'images',
      width: 80,
      render: (images: string) => {
        if (!images) return <span style={{ color: '#999' }}>无图片</span>;
        const firstImage = images.split(',')[0]?.trim();
        return firstImage ? (
          <Image
            src={firstImage}
            alt="医院图片"
            width={60}
            height={40}
            style={{ objectFit: 'cover', borderRadius: 4 }}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
          />
        ) : (
          <span style={{ color: '#999' }}>无图片</span>
        );
      },
    },
    {
      title: '医院名称',
      dataIndex: 'name',
      key: 'name',
      width: 180,
      ellipsis: true,
    },
    {
      title: '等级',
      dataIndex: 'levelDesc',
      key: 'levelDesc',
      width: 100,
      render: (levelDesc: string) => (
        <Tag color="blue">{levelDesc}</Tag>
      ),
    },
    {
      title: '类型',
      dataIndex: 'typeDesc',
      key: 'typeDesc',
      width: 120,
      render: (typeDesc: string) => (
        <Tag color="green">{typeDesc}</Tag>
      ),
    },
    {
      title: '地址',
      dataIndex: 'fullAddress',
      key: 'fullAddress',
      width: 300,
      ellipsis: true,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
      width: 80,
      render: (statusDesc: string, record: Hospital) => (
        <Tag color={record.status === HospitalStatus.NORMAL ? 'success' : 'error'}>
          {statusDesc}
        </Tag>
      ),
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 80,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个医院吗？"
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
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* 搜索表单 */}
      <Card style={{ marginBottom: 16 }}>
        <Form
          form={form}
          layout="inline"
          onFinish={handleSearch}
        >
          <Form.Item name="name" label="医院名称">
            <Input placeholder="请输入医院名称" allowClear />
          </Form.Item>
          <Form.Item name="province" label="省份">
            <Select
              placeholder="请选择省份"
              allowClear
              style={{ width: 120 }}
              onChange={handleProvinceChange}
            >
              {provinces.map(province => (
                <Option key={province} value={province}>
                  {province}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="city" label="城市">
            <Select
              placeholder="请选择城市"
              allowClear
              style={{ width: 120 }}
            >
              {cities.map(city => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="level" label="医院等级">
            <Select placeholder="请选择等级" allowClear style={{ width: 120 }}>
              {Object.entries(HospitalLevelTextMap).map(([value, text]) => (
                <Option key={value} value={Number(value)}>
                  {text}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="type" label="医院类型">
            <Select placeholder="请选择类型" allowClear style={{ width: 120 }}>
              {Object.entries(HospitalTypeTextMap).map(([value, text]) => (
                <Option key={value} value={Number(value)}>
                  {text}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select placeholder="请选择状态" allowClear style={{ width: 100 }}>
              {Object.entries(HospitalStatusTextMap).map(([value, text]) => (
                <Option key={value} value={Number(value)}>
                  {text}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                搜索
              </Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* 操作按钮 */}
      <Card style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增医院
          </Button>
          <Popconfirm
            title="确定要删除选中的医院吗？"
            onConfirm={handleBatchDelete}
            okText="确定"
            cancelText="取消"
          >
            <Button danger disabled={selectedRowKeys.length === 0}>
              批量删除
            </Button>
          </Popconfirm>
        </Space>
      </Card>

      {/* 表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={hospitals}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1200 }}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
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
            },
          }}
        />
      </Card>

      {/* 新增/编辑弹窗 */}
      <Modal
        title={editingHospital ? '编辑医院' : '新增医院'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <HospitalForm
          initialValues={editingHospital}
          onSubmit={handleFormSubmit}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default HospitalList;
