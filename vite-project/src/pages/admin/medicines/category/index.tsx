import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Space, Input, Popconfirm, Tag } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchMedicineCategoryList,
  deleteMedicineCategory,
  updateMedicineCategoryStatus,
  setName,
  setCurrentPage,
  setPageSize,
  selectMedicineCategoryList,
  selectMedicineCategoryTotal,
  selectMedicineCategoryLoading,
  selectMedicineCategoryCurrentPage,
  selectMedicineCategoryPageSize,
  selectMedicineCategoryName,
} from '@/store/slices/adminMedicineCategorySlice';
import type { MedicineCategoryDTO } from '@/types/admin/medicineCategory';
import CategoryForm from '../components/CategoryForm';

const CategoryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectMedicineCategoryList);
  const total = useAppSelector(selectMedicineCategoryTotal);
  const loading = useAppSelector(selectMedicineCategoryLoading);
  const currentPage = useAppSelector(selectMedicineCategoryCurrentPage);
  const pageSize = useAppSelector(selectMedicineCategoryPageSize);
  const name = useAppSelector(selectMedicineCategoryName);

  const [formVisible, setFormVisible] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [currentCategory, setCurrentCategory] = useState<Partial<MedicineCategoryDTO>>();

  useEffect(() => {
    loadData();
  }, [currentPage, pageSize, name]);

  const loadData = () => {
    dispatch(fetchMedicineCategoryList({
      page: currentPage,
      size: pageSize,
      name,
    }));
  };

  const handleAdd = () => {
    setFormTitle('添加分类');
    setCurrentCategory(undefined);
    setFormVisible(true);
  };

  const handleEdit = (record: MedicineCategoryDTO) => {
    setFormTitle('编辑分类');
    setCurrentCategory(record);
    setFormVisible(true);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteMedicineCategory(id)).unwrap();
    loadData();
  };

  const handleStatusChange = async (id: number, status: number) => {
    await dispatch(updateMedicineCategoryStatus({ id, status: status === 1 ? 0 : 1 })).unwrap();
    loadData();
  };

  const handleSearch = (value: string) => {
    dispatch(setName(value));
    dispatch(setCurrentPage(1));
  };

  const handleReset = () => {
    dispatch(setName(''));
    dispatch(setCurrentPage(1));
  };

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 300,
    },
    {
      title: '排序号',
      dataIndex: 'sort',
      key: 'sort',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: number) => (
        <Tag color={status === 1 ? 'success' : 'default'}>
          {status === 1 ? '正常' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: MedicineCategoryDTO) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除该分类吗？"
            onConfirm={() => handleDelete(record.id!)}
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
          <Popconfirm
            title={`确定要${record.status === 1 ? '禁用' : '启用'}该分类吗？`}
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
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="分类名称"
          allowClear
          value={name}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <Button icon={<ReloadOutlined />} onClick={handleReset}>
          重置
        </Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加分类
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize,
          total,
          onChange: (page, size) => {
            dispatch(setCurrentPage(page));
            if (size !== pageSize) {
              dispatch(setPageSize(size));
            }
          },
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />

      <CategoryForm
        open={formVisible}
        title={formTitle}
        initialValues={currentCategory}
        onCancel={() => setFormVisible(false)}
        onSuccess={() => {
          setFormVisible(false);
          loadData();
        }}
      />
    </Card>
  );
};

export default CategoryList; 