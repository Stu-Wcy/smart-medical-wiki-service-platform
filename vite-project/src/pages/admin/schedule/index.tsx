import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Input,
  Select,
  DatePicker,
  message,
  Popconfirm,
  Tag,
  Switch,
} from 'antd';
import { PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { getSchedules, deleteSchedule, updateScheduleStatus } from '@/api/admin/schedule';
import { getDoctors } from '@/api/admin/doctor';
import { getHospitals } from '@/api/admin/hospital';
import { getDepartments } from '@/api/admin/department';
import type { Schedule, ScheduleQuery } from '@/api/admin/schedule';
import type { Doctor } from '@/types/doctor';
import type { Hospital } from '@/types/hospital';
import type { Department } from '@/types/department';
import ScheduleForm from './components/ScheduleForm';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ScheduleManagement: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // 表单相关状态
  const [formVisible, setFormVisible] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  
  // 筛选条件
  const [query, setQuery] = useState<ScheduleQuery>({});
  
  // 基础数据
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  // 获取基础数据
  useEffect(() => {
    fetchBasicData();
  }, []);

  // 获取排班列表
  useEffect(() => {
    fetchSchedules();
  }, [current, pageSize, query]);

  const fetchBasicData = async () => {
    try {
      console.log('开始获取基础数据...');

      const [doctorRes, hospitalRes, departmentRes] = await Promise.all([
        getDoctors({ page: 1, size: 1000 }),
        getHospitals({ page: 1, size: 1000 }),
        getDepartments({ page: 1, size: 1000 })
      ]);

      console.log('API响应:', { doctorRes, hospitalRes, departmentRes });

      if (doctorRes.data?.code === 200) {
        const doctorData = doctorRes.data.data;
        setDoctors(((doctorData as any)?.list) || ((doctorData as any)?.records) || []);
        console.log('医生数据设置完成:', doctorData);
      } else {
        console.warn('医生API返回非成功状态:', doctorRes.data);
        setDoctors([]);
      }

      if (hospitalRes.data?.code === 200) {
        const hospitalData = hospitalRes.data.data;
        setHospitals(hospitalData?.list || (hospitalData as any)?.records || []);
        console.log('医院数据设置完成:', hospitalData);
      } else {
        console.warn('医院API返回非成功状态:', hospitalRes.data);
        setHospitals([]);
      }

      if (departmentRes.data?.code === 200) {
        const departmentData = departmentRes.data.data;
        setDepartments(departmentData?.list || (departmentData as any)?.records || []);
        console.log('科室数据设置完成:', departmentData);
      } else {
        console.warn('科室API返回非成功状态:', departmentRes.data);
        setDepartments([]);
      }
    } catch (error) {
      console.error('获取基础数据失败:', error);
      message.error('获取基础数据失败');
      // 设置空数组，避免组件报错
      setDoctors([]);
      setHospitals([]);
      setDepartments([]);
    }
  };

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      console.log('开始获取排班列表...');

      const params = {
        ...query,
        page: current,
        size: pageSize,
      };

      console.log('排班查询参数:', params);
      const response = await getSchedules(params);
      console.log('排班API响应:', response);

      if (response.data?.code === 200) {
        const data = response.data.data;
        setSchedules(data?.list || (data as any)?.records || []);
        setTotal(data?.total || 0);
        console.log('排班列表设置完成:', data);
      } else {
        console.warn('排班API返回非成功状态:', response.data);
        message.error(response.data?.message || '获取排班列表失败');
        setSchedules([]);
        setTotal(0);
      }
    } catch (error) {
      console.error('获取排班列表失败:', error);
      message.error('获取排班列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 搜索
  const handleSearch = () => {
    setCurrent(1);
    fetchSchedules();
  };

  // 重置
  const handleReset = () => {
    setQuery({});
    setCurrent(1);
  };

  // 新增排班
  const handleAdd = () => {
    setEditingSchedule(null);
    setFormVisible(true);
  };

  // 编辑排班
  const handleEdit = (record: Schedule) => {
    setEditingSchedule(record);
    setFormVisible(true);
  };

  // 删除排班
  const handleDelete = async (id: number) => {
    try {
      const response = await deleteSchedule(id);
      console.log('删除排班API响应:', response);

      if (response.data?.code === 200) {
        message.success('删除成功');
        fetchSchedules();
      } else {
        console.warn('删除API返回非成功状态:', response.data);
        message.error(response.data?.message || '删除失败');
      }
    } catch (error) {
      console.error('删除排班失败:', error);
      message.error('删除失败');
    }
  };

  // 更新状态
  const handleStatusChange = async (id: number, status: number) => {
    try {
      const response = await updateScheduleStatus(id, status);
      console.log('状态更新API响应:', response);

      if (response.data?.code === 200) {
        message.success('状态更新成功');
        fetchSchedules();
      } else {
        console.warn('状态更新API返回非成功状态:', response.data);
        message.error(response.data?.message || '状态更新失败');
      }
    } catch (error) {
      console.error('状态更新失败:', error);
      message.error('状态更新失败');
    }
  };

  // 表单提交成功
  const handleFormSuccess = () => {
    setFormVisible(false);
    fetchSchedules();
  };

  // 获取时间段标签
  const getTimeSlotTag = (timeSlot: number) => {
    const config = {
      1: { color: 'blue', text: '上午' },
      2: { color: 'orange', text: '下午' },
      3: { color: 'purple', text: '晚上' },
    };
    const item = config[timeSlot as keyof typeof config];
    return <Tag color={item?.color}>{item?.text}</Tag>;
  };

  // 获取状态标签
  const getStatusTag = (status: number) => {
    return status === 1 ? 
      <Tag color="success">正常</Tag> : 
      <Tag color="error">停诊</Tag>;
  };

  // 表格列配置
  const columns: ColumnsType<Schedule> = [
    {
      title: '排班日期',
      dataIndex: 'scheduleDate',
      key: 'scheduleDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '时间段',
      dataIndex: 'timeSlot',
      key: 'timeSlot',
      render: (timeSlot: number) => getTimeSlotTag(timeSlot),
    },
    {
      title: '时间',
      key: 'time',
      render: (_, record) => `${record.startTime} - ${record.endTime}`,
    },
    {
      title: '医生',
      key: 'doctor',
      render: (_, record) => (
        <div>
          <div>{record.doctorName}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.doctorTitle}</div>
        </div>
      ),
    },
    {
      title: '医院',
      dataIndex: 'hospitalName',
      key: 'hospitalName',
    },
    {
      title: '科室',
      dataIndex: 'departmentName',
      key: 'departmentName',
    },
    {
      title: '号源',
      key: 'slots',
      render: (_, record) => (
        <div>
          <div>总数: {record.totalSlots}</div>
          <div style={{ color: record.availableSlots > 0 ? '#52c41a' : '#ff4d4f' }}>
            可用: {record.availableSlots}
          </div>
        </div>
      ),
    },
    {
      title: '挂号费',
      dataIndex: 'consultationFee',
      key: 'consultationFee',
      render: (fee: number) => `¥${fee}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: number, record) => (
        <Switch
          checked={status === 1}
          onChange={(checked) => handleStatusChange(record.id, checked ? 1 : 0)}
          checkedChildren="正常"
          unCheckedChildren="停诊"
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个排班吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Space wrap>
            <Select
              placeholder="选择医院"
              style={{ width: 200 }}
              allowClear
              value={query.hospitalId}
              onChange={(value) => setQuery({ ...query, hospitalId: value })}
            >
              {hospitals.map(hospital => (
                <Option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </Option>
              ))}
            </Select>
            
            <Select
              placeholder="选择科室"
              style={{ width: 200 }}
              allowClear
              value={query.departmentId}
              onChange={(value) => setQuery({ ...query, departmentId: value })}
            >
              {departments.map(dept => (
                <Option key={dept.id} value={dept.id}>
                  {dept.name}
                </Option>
              ))}
            </Select>
            
            <Select
              placeholder="选择医生"
              style={{ width: 200 }}
              allowClear
              value={query.doctorId}
              onChange={(value) => setQuery({ ...query, doctorId: value })}
            >
              {doctors.map(doctor => (
                <Option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.title}
                </Option>
              ))}
            </Select>
            
            <RangePicker
              placeholder={['开始日期', '结束日期']}
              onChange={(dates) => {
                if (dates) {
                  setQuery({
                    ...query,
                    startDate: dates[0]?.format('YYYY-MM-DD'),
                    endDate: dates[1]?.format('YYYY-MM-DD'),
                  });
                } else {
                  setQuery({
                    ...query,
                    startDate: undefined,
                    endDate: undefined,
                  });
                }
              }}
            />
            
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
              搜索
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              重置
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              新增排班
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={schedules}
          rowKey="id"
          loading={loading}
          pagination={{
            current,
            pageSize,
            total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
            onChange: (page, size) => {
              setCurrent(page);
              setPageSize(size);
            },
          }}
        />
      </Card>

      <ScheduleForm
        visible={formVisible}
        schedule={editingSchedule}
        hospitals={hospitals}
        departments={departments}
        doctors={doctors}
        onCancel={() => setFormVisible(false)}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
};

export default ScheduleManagement;
