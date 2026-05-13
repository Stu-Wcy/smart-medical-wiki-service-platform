import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Input, Space, Popconfirm, Tag } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchDiseaseCategoryList,
  deleteDiseaseCategory,
  enableDiseaseCategory,
  disableDiseaseCategory,
  setCurrentPage,
  setPageSize,
  setQueryDTO,
} from '@/store/slices/diseaseCategorySlice';
import type { DiseaseCategoryDTO } from '@/types/admin/diseaseCategory';
import CategoryForm from './components/CategoryForm';

const DiseaseCategory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, total, loading, currentPage, pageSize, queryDTO } = useAppSelector(
    (state) => state.diseaseCategory
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentItem, setCurrentItem] = useState<DiseaseCategoryDTO>();

  useEffect(() => {
    dispatch(fetchDiseaseCategoryList());
  }, [dispatch, currentPage, pageSize, queryDTO]);

  const handleSearch = (value: string) => {
    dispatch(setQueryDTO({ name: value }));
  };

  const handleAdd = () => {
    setModalTitle('新增疾病分类');
    setCurrentItem(undefined);
    setModalVisible(true);
  };

  const handleEdit = (record: DiseaseCategoryDTO) => {
    setModalTitle('编辑疾病分类');
    setCurrentItem(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteDiseaseCategory(id));
  };

  const handleStatusChange = async (id: number, status: number) => {
    if (status === 1) {
      await dispatch(disableDiseaseCategory(id));
    } else {
      await dispatch(enableDiseaseCategory(id));
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: 100,
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
      render: (_: any, record: DiseaseCategoryDTO) => (
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
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增
        </Button>
        <Input
          placeholder="请输入分类名称"
          allowClear
          suffix={<SearchOutlined />}
          style={{ width: 200 }}
          onPressEnter={(e) => handleSearch(e.currentTarget.value)}
        />
      </Space>

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

      <CategoryForm
        open={modalVisible}
        title={modalTitle}
        initialValues={currentItem}
        onCancel={() => setModalVisible(false)}
        onSuccess={() => setModalVisible(false)}
      />
    </Card>
  );
};

export default DiseaseCategory; 