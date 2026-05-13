import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Space, Input, Select, Popconfirm, Tag, Image } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchMedicineList,
  deleteMedicine,
  enableMedicine,
  disableMedicine,
  setCurrentPage,
  setPageSize,
  setQueryDTO,
  selectMedicineList,
  selectMedicineTotal,
  selectMedicineLoading,
  selectMedicineCurrentPage,
  selectMedicinePageSize,
  selectMedicineQueryDTO,
} from '@/store/slices/adminMedicineSlice';
import { fetchAllMedicineCategories, selectAllMedicineCategories } from '@/store/slices/adminMedicineCategorySlice';
import type { MedicineDTO } from '@/types/admin/medicine';
import MedicineForm from '../components/MedicineForm';

const { Option } = Select;

const MedicineList: React.FC = () => {
  const dispatch = useAppDispatch();
  const medicines = useAppSelector(selectMedicineList);
  const total = useAppSelector(selectMedicineTotal);
  const loading = useAppSelector(selectMedicineLoading);
  const currentPage = useAppSelector(selectMedicineCurrentPage);
  const pageSize = useAppSelector(selectMedicinePageSize);
  const queryDTO = useAppSelector(selectMedicineQueryDTO);
  const categories = useAppSelector(selectAllMedicineCategories);

  const [formVisible, setFormVisible] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [currentMedicine, setCurrentMedicine] = useState<Partial<MedicineDTO>>();

  useEffect(() => {
    dispatch(fetchAllMedicineCategories());
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [currentPage, pageSize, queryDTO]);

  const loadData = () => {
    dispatch(fetchMedicineList({
      page: currentPage,
      size: pageSize,
      queryDTO,
    }));
  };

  const handleAdd = () => {
    setFormTitle('添加药品');
    setCurrentMedicine(undefined);
    setFormVisible(true);
  };

  const handleEdit = (record: MedicineDTO) => {
    setFormTitle('编辑药品');
    setCurrentMedicine(record);
    setFormVisible(true);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteMedicine(id)).unwrap();
    loadData();
  };

  const handleStatusChange = async (id: number, status: number) => {
    if (status === 1) {
      await dispatch(disableMedicine(id)).unwrap();
    } else {
      await dispatch(enableMedicine(id)).unwrap();
    }
    loadData();
  };

  const handleReset = () => {
    dispatch(setQueryDTO({
      name: undefined,
      categoryId: undefined,
      manufacturer: undefined,
      status: undefined,
    }));
    dispatch(setCurrentPage(1));
  };

  const handleSearch = (values: any) => {
    const queryDTO = {
      name: values.name || undefined,
      categoryId: values.categoryId || undefined,
      manufacturer: values.manufacturer || undefined,
      status: values.status || undefined,
    };
    dispatch(setQueryDTO(queryDTO));
    dispatch(setCurrentPage(1));
  };

  const columns = [
    {
      title: '药品图片',
      dataIndex: 'images',
      key: 'images',
      width: 120,
      render: (images: string) => {
        if (!images) return null;
        const imageList = images.split(',').filter(Boolean);
        return imageList.length > 0 ? (
          <Image.PreviewGroup>
            <Image
              src={imageList[0]}
              alt="药品图片"
              width={80}
              height={80}
              style={{ objectFit: 'cover' }}
              preview={{
                icons: undefined,
                mask: `${imageList.length > 1 ? `+${imageList.length - 1}` : ''}`
              }}
            />
          </Image.PreviewGroup>
        ) : null;
      },
    },
    {
      title: '药品名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '生产厂家',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
      width: 200,
    },
    {
      title: '规格',
      dataIndex: 'specification',
      key: 'specification',
      width: 120,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      width: 100,
    },
    {
      title: '分类',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
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
      render: (_: any, record: MedicineDTO) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button
            type="link"
            onClick={() => handleStatusChange(record.id!, record.status === 1 ? 0 : 1)}
          >
            {record.status === 1 ? '下架' : '上架'}
          </Button>
          <Popconfirm
            title="确定要删除该药品吗？"
            onConfirm={() => handleDelete(record.id!)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
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
          placeholder="药品名称"
          allowClear
          value={queryDTO.name}
          onChange={(e) => handleSearch({ ...queryDTO, name: e.target.value })}
          style={{ width: 200 }}
        />
        <Input
          placeholder="生产厂家"
          allowClear
          value={queryDTO.manufacturer}
          onChange={(e) => handleSearch({ ...queryDTO, manufacturer: e.target.value })}
          style={{ width: 200 }}
        />
        <Select
          placeholder="分类"
          allowClear
          value={queryDTO.categoryId}
          onChange={(value) => handleSearch({ ...queryDTO, categoryId: value })}
          style={{ width: 200 }}
        >
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="状态"
          allowClear
          value={queryDTO.status}
          onChange={(value) => handleSearch({ ...queryDTO, status: value })}
          style={{ width: 200 }}
        >
          <Option value={1}>正常</Option>
          <Option value={0}>禁用</Option>
        </Select>
        <Button icon={<ReloadOutlined />} onClick={handleReset}>
          重置
        </Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加药品
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={medicines}
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

      <MedicineForm
        open={formVisible}
        title={formTitle}
        initialValues={currentMedicine}
        categories={categories}
        onCancel={() => setFormVisible(false)}
        onSuccess={() => {
          setFormVisible(false);
          loadData();
        }}
      />
    </Card>
  );
};

export default MedicineList;