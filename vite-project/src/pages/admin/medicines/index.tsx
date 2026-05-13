import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Space, Input, Select, Popconfirm, Tag } from 'antd';
import { PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchMedicineList,
  deleteMedicine,
  enableMedicine,
  disableMedicine,
  setQueryDTO,
  setCurrentPage,
  setPageSize,
  selectMedicineList,
  selectMedicineTotal,
  selectMedicineLoading,
  selectMedicineCurrentPage,
  selectMedicinePageSize,
  selectMedicineQueryDTO,
} from '@/store/slices/adminMedicineSlice';
import type { MedicineInfoDTO } from '@/types/admin/medicine';
import MedicineForm from './components/MedicineForm';

const { Option } = Select;

const MedicineList: React.FC = () => {
  const dispatch = useAppDispatch();
  const medicines = useAppSelector(selectMedicineList);
  const total = useAppSelector(selectMedicineTotal);
  const loading = useAppSelector(selectMedicineLoading);
  const currentPage = useAppSelector(selectMedicineCurrentPage);
  const pageSize = useAppSelector(selectMedicinePageSize);
  const queryDTO = useAppSelector(selectMedicineQueryDTO);

  const [formVisible, setFormVisible] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [currentMedicine, setCurrentMedicine] = useState<Partial<MedicineInfoDTO>>();

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

  const handleEdit = (record: MedicineInfoDTO) => {
    setFormTitle('编辑药品');
    setCurrentMedicine(record);
    setFormVisible(true);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteMedicine(id)).unwrap();
    loadData();
  };

  const handleStatusChange = async (id: number, status: number) => {
    if (status === 0) {
      await dispatch(enableMedicine(id)).unwrap();
    } else {
      await dispatch(disableMedicine(id)).unwrap();
    }
    loadData();
  };

  const handleSearch = (values: any) => {
    dispatch(setQueryDTO(values));
    dispatch(setCurrentPage(1));
  };

  const handleReset = () => {
    dispatch(setQueryDTO({}));
    dispatch(setCurrentPage(1));
  };

  const columns = [
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
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
      width: 100,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: number) => (
        <Tag color={status === 1 ? 'success' : 'default'}>
          {status === 1 ? '已上架' : '已下架'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: MedicineInfoDTO) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除该药品吗？"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
          <Popconfirm
            title={`确定要${record.status === 0 ? '上架' : '下架'}该药品吗？`}
            onConfirm={() => handleStatusChange(record.id, record.status)}
          >
            <Button type="link">
              {record.status === 0 ? '上架' : '下架'}
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
          <Option value="处方药">处方药</Option>
          <Option value="非处方药">非处方药</Option>
          <Option value="中药">中药</Option>
          <Option value="保健品">保健品</Option>
        </Select>
        <Select
          placeholder="状态"
          allowClear
          value={queryDTO.status}
          onChange={(value) => handleSearch({ ...queryDTO, status: value })}
          style={{ width: 200 }}
        >
          <Option value={1}>已上架</Option>
          <Option value={0}>已下架</Option>
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
        dataSource={medicines as any}
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
        categories={[]}
        open={formVisible}
        title={formTitle}
        initialValues={currentMedicine}
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
