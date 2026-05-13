import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Input,
  Select,
  Form,
  Modal,
  message,
  Popconfirm,
  Tag,
  Avatar,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ReloadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { getDoctorList, deleteDoctor, updateDoctorStatus } from '@/api/admin/doctor';
import { adminHospitalApi } from '@/api/admin/hospital';
import { getDepartmentList } from '@/api/admin/department';
import type { Doctor, DoctorQueryDTO } from '@/types/doctor';
import type { Hospital } from '@/types/hospital';
import type { Department } from '@/types/department';
import DoctorForm from './components/DoctorForm';

const { Option } = Select;

const DoctorManagement: React.FC = () => {
  console.log('DoctorManagement 组件开始渲染...');

  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  // 表单相关状态
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  // 查询条件
  const [queryParams, setQueryParams] = useState<DoctorQueryDTO>({});

  // 获取医生列表
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      console.log('开始获取医生列表...', {
        queryParams,
        page: current,
        size: pageSize,
      });

      const response = await getDoctorList({
        ...queryParams,
        page: current,
        size: pageSize,
      });

      console.log('医生列表API响应:', response);
      console.log('响应数据:', response.data);
      console.log('医生数据示例:', response.data?.data?.records?.[0]);

      if (response.data && response.data.code === 200) {
        const responseData = response.data.data;
        console.log('API返回的data字段:', responseData);
        console.log('data字段类型:', typeof responseData);
        console.log('data是否为数组:', Array.isArray(responseData));

        let doctorList: Doctor[] = [];
        let totalCount = 0;

        // 处理不同的数据结构
        if (Array.isArray(responseData)) {
          // 如果data直接是数组
          doctorList = responseData;
          totalCount = responseData.length;
          console.log('✅ 数据是直接数组，长度:', totalCount);
        } else if (responseData && typeof responseData === 'object') {
          // 如果data是对象，可能包含records字段
          if (Array.isArray(responseData.records)) {
            doctorList = responseData.records;
            totalCount = responseData.total || responseData.records.length;

          } else if (Array.isArray((responseData as any).list)) {
            doctorList = (responseData as any).list;
            totalCount = (responseData as any).total || (responseData as any).list.length;

          } else {

          }
        } else {

        }



        // 后端已经返回了hospitalName和departmentName，直接使用
        console.log('后端返回的医生数据:', doctorList);
        console.log('第一个医生的hospitalName:', doctorList[0]?.hospitalName);
        console.log('第一个医生的departmentName:', doctorList[0]?.departmentName);

        setDoctors(doctorList);
        setTotal(totalCount);



        // 数据加载完成，不需要提示
      } else {
        console.error('❌ API返回错误:', response.data);
        message.error(response.data?.message || '获取医生列表失败');
        setDoctors([]);
        setTotal(0);
      }
    } catch (error) {
      console.error('❌ 获取医生列表异常:', error);
      message.error('获取医生列表失败');
      setDoctors([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // 获取医院列表
  const fetchHospitals = async () => {
    try {
      console.log('🏥 开始获取医院列表...');
      const response = await adminHospitalApi.getList({ page: 1, size: 1000 });
      console.log('🏥 医院列表API响应:', response);
      console.log('🏥 响应状态:', response.status);
      console.log('🏥 响应数据结构:', response.data);

      if (response.data && response.data.code === 200) {
        // 尝试不同的数据结构
        let hospitalData = [];
        if (response.data.data) {
          const payload: any = response.data.data;
          if (Array.isArray(payload?.records)) {
            hospitalData = payload.records;
          } else if (Array.isArray(response.data.data.list)) {
            hospitalData = response.data.data.list;
          } else if (Array.isArray(response.data.data)) {
            hospitalData = response.data.data;
          }
        }

        console.log('🏥 解析后的医院数据:', hospitalData);
        console.log('🏥 医院数据长度:', hospitalData.length);
        setHospitals(hospitalData);
        return hospitalData;
      } else {
        console.error('🏥 医院列表API返回错误:', response.data);
        setHospitals([]);
        return [];
      }
    } catch (error: any) {
      console.error('🏥 获取医院列表失败:', error);
      console.error('🏥 错误详情:', error?.response || error?.message);
      setHospitals([]);
      return [];
    }
  };

  // 获取科室列表
  const fetchDepartments = async () => {
    try {
      console.log('🏢 开始获取科室列表...');
      const response = await getDepartmentList({ page: 1, size: 1000 });
      console.log('🏢 科室列表API响应:', response);
      console.log('🏢 响应状态:', response.status);
      console.log('🏢 响应数据结构:', response.data);

      if (response.data && response.data.code === 200) {
        // 尝试不同的数据结构
        let departmentData = [];
        if (response.data.data) {
          const payload: any = response.data.data;
          if (Array.isArray(payload?.records)) {
            departmentData = payload.records;
          } else if (Array.isArray(response.data.data.list)) {
            departmentData = response.data.data.list;
          } else if (Array.isArray(response.data.data)) {
            departmentData = response.data.data;
          }
        }

        console.log('🏢 解析后的科室数据:', departmentData);
        console.log('🏢 科室数据长度:', departmentData.length);
        setDepartments(departmentData);
        return departmentData;
      } else {
        console.error('🏢 科室列表API返回错误:', response.data);
        setDepartments([]);
        return [];
      }
    } catch (error: any) {
      console.error('🏢 获取科室列表失败:', error);
      console.error('🏢 错误详情:', error?.response || error?.message);
      setDepartments([]);
      return [];
    }
  };

  // 初始化数据加载
  useEffect(() => {
    console.log('组件挂载，开始初始化...');
    initializeData();
  }, []);

  // 分页变化时重新加载医生数据
  useEffect(() => {
    if (hospitals.length > 0 && departments.length > 0) {
      fetchDoctors();
    }
  }, [current, pageSize, hospitals, departments, queryParams]);

  // 初始化数据加载函数
  const initializeData = async () => {
    try {
      console.log('🚀 开始初始化数据...');
      // 先并行加载医院和科室数据
      const [hospitalData, departmentData] = await Promise.all([
        fetchHospitals(),
        fetchDepartments()
      ]);
      console.log('🚀 医院数据加载完成:', hospitalData.length, '条');
      console.log('🚀 科室数据加载完成:', departmentData.length, '条');

      // 然后加载医生数据
      await fetchDoctors();
      console.log('🚀 数据初始化完成');
    } catch (error) {
      console.error('🚀 初始化数据失败:', error);
    }
  };

  // 医院选择变化处理
  const handleHospitalChange = (hospitalId: number | undefined) => {
    const currentValues = searchForm.getFieldsValue();
    const newValues = { ...currentValues, hospitalId };
    setQueryParams(newValues);
    setCurrent(1);
  };

  // 搜索
  const handleSearch = (values: any) => {
    setQueryParams(values);
    setCurrent(1);
  };

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    setQueryParams({});
    setCurrent(1);
  };

  // 删除医生
  const handleDelete = async (id: number) => {
    try {
      await deleteDoctor(id);
      message.success('删除成功');
      fetchDoctors();
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 更新医生状态
  const handleStatusChange = async (id: number, status: number) => {
    try {
      await updateDoctorStatus(id, status);
      message.success('状态更新成功');
      fetchDoctors();
    } catch (error) {
      message.error('状态更新失败');
    }
  };

  // 表格列配置
  const columns: ColumnsType<Doctor> = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      render: (avatar: string, record: Doctor) => (
        <Avatar
          src={avatar}
          icon={<UserOutlined />}
          size={40}
        />
      ),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      render: (name: string) => (
        <span style={{ fontWeight: 'bold' }}>{name}</span>
      ),
    },
    {
      title: '职称',
      dataIndex: 'title',
      key: 'title',
      width: 120,
      render: (title: string) => (
        <Tag color="blue">{title}</Tag>
      ),
    },
    {
      title: '所属医院',
      dataIndex: 'hospitalName',
      key: 'hospitalName',
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (hospitalName: string) => (
        <Tooltip placement="topLeft" title={hospitalName}>
          {hospitalName}
        </Tooltip>
      ),
    },
    {
      title: '所属科室',
      dataIndex: 'departmentName',
      key: 'departmentName',
      width: 120,
      render: (departmentName: string) => departmentName || '-',
    },
    {
      title: '专长',
      dataIndex: 'specialties',
      key: 'specialties',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (specialties: string) => (
        <Tooltip placement="topLeft" title={specialties}>
          {specialties || '-'}
        </Tooltip>
      ),
    },
    {
      title: '咨询费用',
      dataIndex: 'consultationFee',
      key: 'consultationFee',
      width: 100,
      render: (fee: number) => fee ? `¥${fee}` : '-',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
      render: (phone: string) => phone || '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: number, record: Doctor) => (
        <Tag color={status === 1 ? 'green' : 'red'}>
          {status === 1 ? '正常' : '停诊'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
      width: 180,
      render: (time: string) => time ? new Date(time).toLocaleString() : '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (_, record: Doctor) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingDoctor(record);
              setModalVisible(true);
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => handleStatusChange(record.id, record.status === 1 ? 0 : 1)}
          >
            {record.status === 1 ? '停诊' : '启用'}
          </Button>
          <Popconfirm
            title="确定要删除这个医生吗？"
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

  // 渲染前的调试信息
  console.log('🎨 渲染时的状态:', {
    hospitalsCount: hospitals.length,
    departmentsCount: departments.length,
    doctorsCount: doctors.length,
    hospitals: hospitals.slice(0, 2), // 只显示前2个
    departments: departments.slice(0, 2) // 只显示前2个
  });

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        {/* 搜索表单 */}
        <Form
          form={searchForm}
          layout="inline"
          onFinish={handleSearch}
          style={{ marginBottom: '16px' }}
        >
          <Form.Item name="name" label="医生姓名">
            <Input placeholder="请输入医生姓名" allowClear />
          </Form.Item>
          <Form.Item name="title" label="职称">
            <Select placeholder="请选择职称" allowClear style={{ width: 120 }}>
              <Option value="主任医师">主任医师</Option>
              <Option value="副主任医师">副主任医师</Option>
              <Option value="主治医师">主治医师</Option>
              <Option value="住院医师">住院医师</Option>
            </Select>
          </Form.Item>
          <Form.Item name="hospitalId" label="所属医院">
            <Select
              placeholder="请选择医院"
              allowClear
              style={{ width: 200 }}
              onChange={handleHospitalChange}
            >
              {hospitals.length === 0 && <Option disabled value="">加载中...</Option>}
              {hospitals.map(hospital => (
                <Option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="departmentId" label="所属科室">
            <Select placeholder="请选择科室" allowClear style={{ width: 150 }}>
              {departments.length === 0 && <Option disabled value="">加载中...</Option>}
              {departments.map(department => (
                <Option key={department.id} value={department.id}>
                  {department.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select placeholder="请选择状态" allowClear style={{ width: 100 }}>
              <Option value={1}>正常</Option>
              <Option value={0}>停诊</Option>
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

        {/* 操作按钮 */}
        <div style={{ marginBottom: '16px' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingDoctor(null);
              setModalVisible(true);
            }}
          >
            新增医生
          </Button>
        </div>



        {/* 表格 */}
        <Table
          columns={columns}
          dataSource={doctors}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1400 }}
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

      {/* 医生表单弹窗 */}
      <DoctorForm
        visible={modalVisible}
        doctor={editingDoctor}
        hospitals={hospitals}
        departments={departments}
        onCancel={() => setModalVisible(false)}
        onSuccess={() => {
          setModalVisible(false);
          fetchDoctors();
        }}
      />
    </div>
  );
};

export default DoctorManagement;
