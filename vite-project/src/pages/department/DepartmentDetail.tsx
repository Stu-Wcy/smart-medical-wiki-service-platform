import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Space,
  Button,
  Image,
  Spin,
  message,
  Divider,
  List,
  Avatar,
  Empty,
} from 'antd';
import {
  ArrowLeftOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  StarOutlined,
  CustomerServiceOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import type { Department } from '@/types/department';
import type { Doctor } from '@/types/doctor';
import { getDepartment } from '@/api/department';
import { getDoctorsByDepartmentId } from '@/api/doctor';
import { getDepartmentSchedules } from '@/api/common/schedule';

const { Title, Paragraph, Text } = Typography;

// 定义排班信息类型
interface ScheduleSlot {
  scheduleId: number;
  doctorId: number;
  scheduleDate: string;
  timeSlot: number;
  timeSlotName: string;
  startTime: string;
  endTime: string;
  totalSlots: number;
  availableSlots: number;
  status: number;
}

interface DoctorWithSchedule extends Doctor {
  schedules?: ScheduleSlot[];
}

const DepartmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [doctorsLoading, setDoctorsLoading] = useState(false);
  const [department, setDepartment] = useState<Department | null>(null);
  const [doctors, setDoctors] = useState<DoctorWithSchedule[]>([]);

  // 获取科室详情
  const fetchDepartment = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await getDepartment(Number(id));
      if (response.data) {
        setDepartment(response.data.data);
      }
    } catch (error) {
      message.error('获取科室详情失败');
      console.error('获取科室详情失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 获取科室医生列表和排班信息
  const fetchDoctorsAndSchedules = async () => {
    if (!id) return;

    setDoctorsLoading(true);
    try {
      console.log('开始获取科室医生和排班信息，科室ID:', id);

      // 获取科室医生列表
      const doctorsResponse = await getDoctorsByDepartmentId(Number(id));
      console.log('科室医生API响应:', doctorsResponse);

      if (doctorsResponse.data?.code === 200) {
        const doctorsList = doctorsResponse.data.data || [];
        console.log('获取到的医生列表:', doctorsList);

        // 获取排班信息
        try {
          const schedulesResponse = await getDepartmentSchedules(Number(id));
          console.log('科室排班API响应:', schedulesResponse);

          if (schedulesResponse.data?.code === 200) {
            const schedules = schedulesResponse.data.data || [];
            console.log('获取到的排班信息:', schedules);

            // 将排班信息合并到医生数据中
            const doctorsWithSchedules = doctorsList.map((doctor: any) => ({
              ...doctor,
              schedules: schedules.filter((s: any) => s.doctorId === doctor.id)
            }));

            setDoctors(doctorsWithSchedules);
            console.log('医生和排班数据合并完成:', doctorsWithSchedules);
          } else {
            console.warn('排班API返回非成功状态，仅显示医生信息');
            setDoctors(doctorsList.map((doctor: any) => ({ ...doctor, schedules: [] })));
          }
        } catch (scheduleError) {
          console.warn('获取排班信息失败，仅显示医生信息:', scheduleError);
          setDoctors(doctorsList.map((doctor: any) => ({ ...doctor, schedules: [] })));
        }
      } else {
        console.warn('医生API返回非成功状态:', doctorsResponse.data);
        setDoctors([]);
      }
    } catch (error) {
      console.error('获取科室医生和排班信息失败:', error);
      message.error('获取医生信息失败');
    } finally {
      setDoctorsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartment();
    fetchDoctorsAndSchedules();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!department) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Card>
          <Title level={4}>科室不存在</Title>
          <Button type="primary" onClick={() => navigate('/department/list')}>
            返回科室列表
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* 返回按钮 */}
        <div style={{ marginBottom: 16 }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/department/list')}
          >
            返回科室列表
          </Button>
        </div>

        <Row gutter={24}>
          {/* 左侧：科室详细信息 */}
          <Col xs={24} lg={16}>
            {/* 科室图片 */}
            {department.images && (
              <Card style={{ marginBottom: 24 }}>
                <Title level={4}>科室图片</Title>
                <Image.PreviewGroup>
                  <Row gutter={[8, 8]}>
                    {department.images.split(',').filter(img => img.trim()).map((image, index) => (
                      <Col key={index} xs={12} sm={8} md={6}>
                        <Image
                          src={image.trim()}
                          alt={`${department.name}-${index + 1}`}
                          style={{
                            width: '100%',
                            height: 120,
                            objectFit: 'cover',
                            borderRadius: 4,
                          }}
                          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
                        />
                      </Col>
                    ))}
                  </Row>
                </Image.PreviewGroup>
              </Card>
            )}

            {/* 科室名称和标签 */}
            <Card style={{ marginBottom: 24 }}>
              <Title level={2} style={{ marginBottom: 12 }}>
                {department.name}
              </Title>
              <Space size="middle" wrap>
                <Tag color="blue" style={{ fontSize: 14, padding: '4px 12px' }}>
                  {department.categoryName}
                </Tag>
                <Tag color="green" style={{ fontSize: 14, padding: '4px 12px' }}>
                  {department.hospitalName}
                </Tag>
              </Space>
            </Card>

            {/* 科室介绍 */}
            {department.description && (
              <Card style={{ marginBottom: 24 }}>
                <Title level={4}>
                  <MedicineBoxOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                  科室介绍
                </Title>
                <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                  {department.description}
                </Paragraph>
              </Card>
            )}

            {/* 科室特色 */}
            {department.features && (
              <Card style={{ marginBottom: 24 }}>
                <Title level={4}>
                  <StarOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                  科室特色
                </Title>
                <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                  {department.features}
                </Paragraph>
              </Card>
            )}

            {/* 诊疗服务 */}
            {department.services && (
              <Card style={{ marginBottom: 24 }}>
                <Title level={4}>
                  <CustomerServiceOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                  诊疗服务
                </Title>
                <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                  {department.services}
                </Paragraph>
              </Card>
            )}

            {/* 医生团队和排班信息 */}
            <Card style={{ marginBottom: 24 }}>
              <Title level={4}>
                <UserOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                医生团队
              </Title>
              <Spin spinning={doctorsLoading}>
                {doctors.length > 0 ? (
                  <List
                    itemLayout="vertical"
                    dataSource={doctors}
                    renderItem={(doctor) => (
                      <List.Item
                        key={doctor.id}
                        style={{
                          border: '1px solid #f0f0f0',
                          borderRadius: 8,
                          padding: 16,
                          marginBottom: 16,
                          background: '#fafafa',
                        }}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              size={64}
                              src={doctor.avatar}
                              icon={<UserOutlined />}
                              style={{ backgroundColor: '#1890ff' }}
                            />
                          }
                          title={
                            <Space>
                              <span style={{ fontSize: 18, fontWeight: 'bold' }}>
                                {doctor.name}
                              </span>
                              <Tag color="blue">{doctor.title}</Tag>
                              <Tag color="green">¥{doctor.consultationFee}</Tag>
                            </Space>
                          }
                          description={
                            <div>
                              <div style={{ marginBottom: 8, color: '#666' }}>
                                <strong>专业特长：</strong>{doctor.specialties}
                              </div>
                              {doctor.introduction && (
                                <div style={{ marginBottom: 8, color: '#666' }}>
                                  <strong>医生简介：</strong>{doctor.introduction}
                                </div>
                              )}
                              {doctor.phone && (
                                <div style={{ marginBottom: 8, color: '#666' }}>
                                  <PhoneOutlined style={{ marginRight: 4 }} />
                                  {doctor.phone}
                                </div>
                              )}
                            </div>
                          }
                        />

                        {/* 排班信息 */}
                        {doctor.schedules && doctor.schedules.length > 0 && (
                          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #e8e8e8' }}>
                            <div style={{ marginBottom: 12, fontWeight: 'bold', color: '#1890ff' }}>
                              <CalendarOutlined style={{ marginRight: 4 }} />
                              近期排班
                            </div>
                            <Row gutter={[8, 8]}>
                              {doctor.schedules.map((schedule) => (
                                <Col key={schedule.scheduleId} xs={12} sm={8} md={6}>
                                  <Card
                                    
                                    style={{
                                      textAlign: 'center',
                                      border: schedule.availableSlots > 0 ? '1px solid #52c41a' : '1px solid #d9d9d9',
                                      backgroundColor: schedule.availableSlots > 0 ? '#f6ffed' : '#f5f5f5',
                                    }}
                                  >
                                    <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
                                      {schedule.scheduleDate}
                                    </div>
                                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
                                      {schedule.timeSlotName}
                                    </div>
                                    <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>
                                      <ClockCircleOutlined style={{ marginRight: 2 }} />
                                      {schedule.startTime}-{schedule.endTime}
                                    </div>
                                    <div style={{ fontSize: 12 }}>
                                      {schedule.availableSlots > 0 ? (
                                        <Tag color="success">
                                          可预约 {schedule.availableSlots}
                                        </Tag>
                                      ) : (
                                        <Tag color="default">
                                          已满号
                                        </Tag>
                                      )}
                                    </div>
                                  </Card>
                                </Col>
                              ))}
                            </Row>
                          </div>
                        )}

                        {/* 预约按钮 */}
                        <div style={{ marginTop: 16, textAlign: 'right' }}>
                          <Space>
                            <Button
                              type="default"
                              onClick={() => navigate(`/doctor/detail/${doctor.id}`)}
                            >
                              查看详情
                            </Button>
                            <Button
                              type="primary"
                              disabled={!doctor.schedules || doctor.schedules.every(s => s.availableSlots === 0)}
                              onClick={() => {
                                // 跳转到预约页面，传递医生ID和科室ID
                                navigate(`/user/appointment?hospitalId=${department.hospitalId}&departmentId=${department.id}&doctorId=${doctor.id}`);
                              }}
                            >
                              立即预约
                            </Button>
                          </Space>
                        </div>
                      </List.Item>
                    )}
                  />
                ) : (
                  <Empty description="该科室暂无医生信息" />
                )}
              </Spin>
            </Card>
          </Col>

          {/* 右侧：联系信息和操作 */}
          <Col xs={24} lg={8}>
            <Card title="科室信息" style={{ marginBottom: 16 }}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {/* 所属医院 */}
                <div>
                  <Text strong>
                    <HomeOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                    所属医院
                  </Text>
                  <div style={{ marginTop: 4, paddingLeft: 24 }}>
                    <Text>{department.hospitalName}</Text>
                  </div>
                </div>

                {/* 科室分类 */}
                <div>
                  <Text strong>
                    <MedicineBoxOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                    科室分类
                  </Text>
                  <div style={{ marginTop: 4, paddingLeft: 24 }}>
                    <Text>{department.categoryName}</Text>
                  </div>
                </div>

                {/* 科室位置 */}
                {department.location && (
                  <div>
                    <Text strong>
                      <EnvironmentOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                      科室位置
                    </Text>
                    <div style={{ marginTop: 4, paddingLeft: 24 }}>
                      <Text>{department.location}</Text>
                    </div>
                  </div>
                )}

                {/* 联系电话 */}
                {department.phone && (
                  <div>
                    <Text strong>
                      <PhoneOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                      联系电话
                    </Text>
                    <div style={{ marginTop: 4, paddingLeft: 24 }}>
                      <Text copyable>{department.phone}</Text>
                    </div>
                  </div>
                )}
              </Space>
            </Card>

            {/* 操作按钮 */}
            <Card>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Button
                  type="primary"
                  size="large"
                  style={{ width: '100%' }}
                  onClick={() => navigate(`/hospital/detail/${department.hospitalId}`)}
                >
                  查看医院详情
                </Button>
                <Button
                  size="large"
                  style={{ width: '100%' }}
                  onClick={() => navigate('/department/list', { 
                    state: { hospitalId: department.hospitalId } 
                  })}
                >
                  查看该医院其他科室
                </Button>
                <Button
                  size="large"
                  style={{ width: '100%' }}
                  onClick={() => navigate('/department/list', { 
                    state: { categoryId: department.categoryId } 
                  })}
                >
                  查看同类科室
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DepartmentDetail;
