import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Input,
  Select,
  message,
  Modal,
  Tag,
  Popconfirm,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
// import { PageContainer } from '@ant-design/pro-components';
import type { DepartmentCategory } from '@/types/department';
import { DepartmentStatus, DepartmentStatusTextMap } from '@/types/department';
import {
  getDepartmentCategoryList,
  deleteDepartmentCategory,
  batchDeleteDepartmentCategories,
} from '@/api/admin/departmentCategory';
import DepartmentCategoryForm from './components/DepartmentCategoryForm';

const { Search } = Input;
const { Option } = Select;

const DepartmentCategoryList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<DepartmentCategory[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  
  // 查询条件
  const [searchParams, setSearchParams] = useState({
    name: '',
    status: undefined as number | undefined,
  });

  // 表单相关
  const [formVisible, setFormVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DepartmentCategory | null>(null);

  // 获取数据
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        ...searchParams,
        page: current,
        size: pageSize,
      };
      const response = await getDepartmentCategoryList(params);
      if (response.data && response.data.data) {
        // 后端返回的是list，不是records
        const records = response.data.data.list || (response.data.data as any).records || [];
        setDataSource(records);
        setTotal(response.data.data.total || 0);
      }
    } catch (error) {
      message.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [current, pageSize]);

  // 搜索
  const handleSearch = () => {
    setCurrent(1);
    fetchData();
  };

  // 重置
  const handleReset = () => {
    setSearchParams({
      name: '',
      status: undefined,
    });
    setCurrent(1);
    setTimeout(() => {
      fetchData();
    }, 0);
  };

  // 新增
  const handleAdd = () => {
    setEditingRecord(null);
    setFormVisible(true);
  };

  // 编辑
  const handleEdit = (record: DepartmentCategory) => {
    setEditingRecord(record);
    setFormVisible(true);
  };

  // 删除
  const handleDelete = async (id: number) => {
    try {
      await deleteDepartmentCategory(id);
      message.success('删除成功');
      fetchData();
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 批量删除
  const handleBatchDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要删除的记录');
      return;
    }

    Modal.confirm({
      title: '确认删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 条记录吗？`,
      onOk: async () => {
        try {
          await batchDeleteDepartmentCategories(selectedRowKeys as number[]);
          message.success('批量删除成功');
          setSelectedRowKeys([]);
          fetchData();
        } catch (error) {
          message.error('批量删除失败');
        }
      },
    });
  };

  // 表单提交成功
  const handleFormSuccess = () => {
    setFormVisible(false);
    fetchData();
  };

  // 表格列定义
  const columns: ColumnsType<DepartmentCategory> = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '分类描述',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      ellipsis: true,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      width: 100,
      render: (icon: string) => icon || '-',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 80,
      sorter: true,
    },
    {
      title: '状态',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
      width: 80,
      render: (statusDesc: string, record: DepartmentCategory) => (
        <Tag color={record.status === DepartmentStatus.NORMAL ? 'success' : 'error'}>
          {statusDesc}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
      width: 180,
      render: (time: string) => new Date(time).toLocaleString(),
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
            title="确定要删除这个分类吗？"
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
    <div style={{ padding: '24px' }}>
      <Card>
        {/* 搜索栏 */}
        <div style={{ marginBottom: 16 }}>
          <Space size="middle">
            <Search
              placeholder="请输入分类名称"
              value={searchParams.name}
              onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })}
              onSearch={handleSearch}
              style={{ width: 200 }}
            />
            <Select
              placeholder="请选择状态"
              value={searchParams.status}
              onChange={(value) => setSearchParams({ ...searchParams, status: value })}
              style={{ width: 120 }}
              allowClear
            >
              {Object.entries(DepartmentStatusTextMap).map(([value, text]) => (
                <Option key={value} value={Number(value)}>
                  {text}
                </Option>
              ))}
            </Select>
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
              搜索
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              重置
            </Button>
          </Space>
        </div>

        {/* 操作栏 */}
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              新增分类
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleBatchDelete}
              disabled={selectedRowKeys.length === 0}
            >
              批量删除
            </Button>
          </Space>
        </div>

        {/* 表格 */}
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          loading={loading}
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
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* 表单弹窗 */}
      <DepartmentCategoryForm
        open={formVisible}
        initialValues={editingRecord}
        onSuccess={handleFormSuccess}
        onCancel={() => setFormVisible(false)}
      />
    </div>
  );
};

export default DepartmentCategoryList;
