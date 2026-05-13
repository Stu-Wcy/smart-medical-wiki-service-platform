import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Input, Space, Popconfirm, Tag, Select, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchDiseaseList,
  deleteDisease,
  enableDisease,
  disableDisease,
  setCurrentPage,
  setPageSize,
  setQueryDTO,
} from '@/store/slices/diseaseSlice';
import { fetchDiseaseCategoryList } from '@/store/slices/diseaseCategorySlice';
import type { DiseaseDTO } from '@/types/admin/disease';
import DiseaseForm from '../components/DiseaseForm';

const { Search } = Input;

const DiseaseList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, total, loading, currentPage, pageSize, queryDTO } = useAppSelector(
    (state) => state.disease
  );
  const { list: categories } = useAppSelector((state) => state.diseaseCategory);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentItem, setCurrentItem] = useState<DiseaseDTO>();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchDiseaseCategoryList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDiseaseList());
  }, [dispatch, currentPage, pageSize, queryDTO]);

  const handleSearch = () => {
    const values = form.getFieldsValue();
    dispatch(setQueryDTO(values));
  };

  const handleReset = () => {
    form.resetFields();
    dispatch(setQueryDTO({}));
  };

  const handleAdd = () => {
    setModalTitle('新增疾病');
    setCurrentItem(undefined);
    setModalVisible(true);
  };

  const handleEdit = (record: DiseaseDTO) => {
    setModalTitle('编辑疾病');
    setCurrentItem(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteDisease(id));
  };

  const handleStatusChange = async (id: number, status: number) => {
    if (status === 1) {
      await dispatch(disableDisease(id));
    } else {
      await dispatch(enableDisease(id));
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '疾病名称',
      dataIndex: 'name',
      width: 150,
      ellipsis: true,
    },
    {
      title: '所属分类',
      dataIndex: 'categoryName',
      width: 120,
    },
    {
      title: '症状描述',
      dataIndex: 'symptoms',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: number) => (
        <Tag color={status === 1 ? 'success' : 'error'}>
          {status === 1 ? '正常' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: DiseaseDTO) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除该疾病吗？"
            onConfirm={() => handleDelete(record.id!)}
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
          <Popconfirm
            title={`确定要${record.status === 1 ? '禁用' : '启用'}该疾病吗？`}
            onConfirm={() => handleStatusChange(record.id!, record.status!)}
          >
            <Button type="link">
              {record.status === 1 ? '禁用' : '启用'}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Form
        form={form}
        layout="inline"
        style={{ marginBottom: 16 }}
      >
        <Form.Item name="name">
          <Input
            placeholder="请输入疾病名称"
            allowClear
            style={{ width: 200 }}
          />
        </Form.Item>
        <Form.Item name="categoryId">
          <Select
            placeholder="请选择分类"
            allowClear
            style={{ width: 200 }}
          >
            {categories.map(category => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="symptom">
          <Input
            placeholder="请输入症状"
            allowClear
            style={{ width: 200 }}
          />
        </Form.Item>
        <Form.Item name="cause">
          <Input
            placeholder="请输入病因"
            allowClear
            style={{ width: 200 }}
          />
        </Form.Item>
        <Form.Item name="status">
          <Select
            placeholder="请选择状态"
            allowClear
            style={{ width: 120 }}
          >
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={0}>禁用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleSearch}>
              搜索
            </Button>
            <Button onClick={handleReset}>重置</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              新增
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Table
        columns={columns}
        dataSource={list}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (page, size) => {
            if (size !== pageSize) {
              dispatch(setPageSize(size));
            }
            dispatch(setCurrentPage(page));
          },
        }}
      />

      <DiseaseForm
        open={modalVisible}
        title={modalTitle}
        initialValues={currentItem}
        onCancel={() => setModalVisible(false)}
        onSuccess={() => setModalVisible(false)}
      />
    </Card>
  );
};

export default DiseaseList; 