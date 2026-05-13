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
  Divider,
  Empty,
  List,
} from 'antd';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  MailOutlined,
  ArrowLeftOutlined,
  EyeOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { hospitalApi } from '@/api/hospital';
import { getDepartmentsByHospitalId } from '@/api/department';
import { getDoctorsByHospitalId } from '@/api/doctor';
import { getDepartmentSchedulesByHospitalId } from '@/api/common/schedule';
import type { Hospital } from '@/types/hospital';
import type { Department } from '@/types/department';
import type { Doctor } from '@/types/doctor';
import type { DepartmentSchedule } from '@/api/common/schedule';

const { Title, Paragraph, Text } = Typography;

const HospitalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [departmentsLoading, setDepartmentsLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctorsLoading, setDoctorsLoading] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departmentSchedules, setDepartmentSchedules] = useState<DepartmentSchedule[]>([]);
  const [schedulesLoading, setSchedulesLoading] = useState(false);

  // 获取医院详情
  const fetchHospitalDetail = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await hospitalApi.getDetail(Number(id));
      if (response.data.code === 200) {
        setHospital(response.data.data);
      }
    } catch (error) {
      console.error('获取医院详情失败', error);
    } finally {
      setLoading(false);
    }
  };

  // 获取医院科室列表
  const fetchDepartments = async () => {
    if (!id) return;

    setDepartmentsLoading(true);
    try {
      const response = await getDepartmentsByHospitalId(Number(id));
      if (response.data && response.data.data) {
        // 这个API直接返回科室数组
        setDepartments(response.data.data);
      }
    } catch (error) {
      console.error('获取医院科室失败', error);
    } finally {
      setDepartmentsLoading(false);
    }
  };

  // 获取医院医生列表
  const fetchDoctors = async () => {
    if (!id) return;

    setDoctorsLoading(true);
    try {
      const response = await getDoctorsByHospitalId(Number(id));
      if (response.data && response.data.data) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      console.error('获取医院医生失败', error);
    } finally {
      setDoctorsLoading(false);
    }
  };

  // 获取科室号源信息
  const fetchDepartmentSchedules = async () => {
    if (!id) return;

    setSchedulesLoading(true);
    try {
      console.log('开始获取科室号源信息，医院ID:', id);

      const response = await getDepartmentSchedulesByHospitalId(Number(id));
      console.log('科室号源API响应:', response);

      if (response.data?.code === 200) {
        setDepartmentSchedules(response.data.data || []);
        console.log('科室号源数据设置完成:', response.data.data);
      } else {
        console.warn('科室号源API返回非成功状态:', response.data);
        setDepartmentSchedules([]);
      }
    } catch (error) {
      console.error('获取科室号源失败', error);
    } finally {
      setSchedulesLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitalDetail();
    fetchDepartments();
    fetchDoctors();
    fetchDepartmentSchedules();
  }, [id]);

  // 获取科室的号源信息
  const getDepartmentScheduleInfo = (departmentId: number) => {
    return departmentSchedules.find(ds => ds.departmentId === departmentId);
  };

  // 计算科室可用号源总数
  const getAvailableSlots = (departmentSchedule: DepartmentSchedule) => {
    return departmentSchedule.doctors.reduce((total, doctor) => {
      return total + doctor.schedules.reduce((doctorTotal, schedule) => {
        return doctorTotal + schedule.availableSlots;
      }, 0);
    }, 0);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!hospital) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Empty description="医院信息不存在" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* 返回按钮 */}
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16 }}
      >
        返回
      </Button>

      <Row gutter={[24, 24]}>
        {/* 左侧：医院基本信息 */}
        <Col xs={24} lg={16}>
          <Card>
            {/* 医院图片 */}
            {hospital.images && (
              <div style={{ marginBottom: 24 }}>
                <Title level={4}>医院图片</Title>
                <Image.PreviewGroup>
                  <Row gutter={[8, 8]}>
                    {hospital.images.split(',').filter(img => img.trim()).map((image, index) => (
                      <Col key={index} xs={12} sm={8} md={6}>
                        <Image
                          src={image.trim()}
                          alt={`${hospital.name}-${index + 1}`}
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
              </div>
            )}

            {/* 医院名称和标签 */}
            <div style={{ marginBottom: 24 }}>
              <Title level={2} style={{ marginBottom: 12 }}>
                {hospital.name}
              </Title>
              <Space size="middle">
                <Tag color="blue" style={{ fontSize: 14, padding: '4px 12px' }}>
                  {hospital.levelDesc}
                </Tag>
                <Tag color="green" style={{ fontSize: 14, padding: '4px 12px' }}>
                  {hospital.typeDesc}
                </Tag>
              </Space>

              {/* 查看科室按钮 */}
              <div style={{ marginTop: 16 }}>
                <Button
                  size="large"
                  onClick={() => {
                    const element = document.getElementById('departments-section');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  查看科室
                </Button>
              </div>
            </div>

            {/* 医院简介 */}
            {hospital.description && (
              <div style={{ marginBottom: 24 }}>
                <Title level={4}>医院简介</Title>
                <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                  {hospital.description}
                </Paragraph>
              </div>
            )}
          </Card>

          {/* 科室列表 */}
          <Card id="departments-section" title="科室列表" style={{ marginTop: 24 }}>
            <Spin spinning={departmentsLoading}>
              {departments.length > 0 ? (
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 3,
                    xl: 3,
                    xxl: 4,
                  }}
                  dataSource={departments}
                  renderItem={(department) => {
                    const scheduleInfo = getDepartmentScheduleInfo(department.id);
                    const availableSlots = scheduleInfo ? getAvailableSlots(scheduleInfo) : 0;

                    return (
                      <List.Item>
                        <Card
                          hoverable
                          size="small"
                          actions={[
                            <Button
                              type="link"
                              icon={<EyeOutlined />}
                              onClick={() => navigate(`/department/detail/${department.id}`)}
                            >
                              查看详情
                            </Button>
                          ]}
                        >
                          <Card.Meta
                            title={
                              <Space>
                                <span>{department.name}</span>
                                <Tag color="blue">
                                  {department.categoryName}
                                </Tag>
                              </Space>
                            }
                            description={
                              <div>
                                {department.description && (
                                  <div style={{ marginBottom: 8, color: '#666' }}>
                                    {department.description.length > 50
                                      ? `${department.description.substring(0, 50)}...`
                                      : department.description}
                                  </div>
                                )}
                                {department.phone && (
                                  <div style={{ fontSize: '12px', color: '#999', marginBottom: 8 }}>
                                    <PhoneOutlined style={{ marginRight: 4 }} />
                                    {department.phone}
                                  </div>
                                )}

                                {/* 号源信息 */}
                                {scheduleInfo && (
                                  <div style={{ marginTop: 8, padding: '8px 0', borderTop: '1px solid #f0f0f0' }}>
                                    <div style={{ fontSize: '12px', color: '#666', marginBottom: 4 }}>
                                      近期号源：
                                    </div>
                                    <Space size="small" wrap>
                                      {availableSlots > 0 ? (
                                        <Tag color="success">
                                          可预约 {availableSlots} 个
                                        </Tag>
                                      ) : (
                                        <Tag color="default">
                                          暂无号源
                                        </Tag>
                                      )}
                                      <Tag color="processing">
                                        {scheduleInfo.doctors.length} 位医生
                                      </Tag>
                                    </Space>

                                    {/* 显示部分医生信息 */}
                                    {scheduleInfo.doctors.slice(0, 2).map(doctor => (
                                      <div key={doctor.doctorId} style={{ fontSize: '11px', color: '#999', marginTop: 4 }}>
                                        {doctor.doctorName} {doctor.doctorTitle} - ¥{doctor.consultationFee}
                                      </div>
                                    ))}
                                    {scheduleInfo.doctors.length > 2 && (
                                      <div style={{ fontSize: '11px', color: '#999', marginTop: 2 }}>
                                        还有 {scheduleInfo.doctors.length - 2} 位医生...
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* 无号源时的提示 */}
                                {!scheduleInfo && (
                                  <div style={{ marginTop: 8, padding: '8px 0', borderTop: '1px solid #f0f0f0' }}>
                                    <Tag color="default">
                                      暂无排班信息
                                    </Tag>
                                  </div>
                                )}
                              </div>
                            }
                          />
                        </Card>
                      </List.Item>
                    );
                  }}
                />
              ) : (
                <Empty description="该医院暂无科室信息" />
              )}
            </Spin>
          </Card>

          {/* 医生团队 */}
          <Card title="医生团队" style={{ marginTop: 24 }}>
            <Spin spinning={doctorsLoading}>
              {doctors.length > 0 ? (
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 3,
                    xl: 3,
                    xxl: 4,
                  }}
                  dataSource={doctors}
                  renderItem={(doctor) => (
                    <List.Item>
                      <Card
                        hoverable
                        size="small"
                        actions={[
                          <Button
                            type="link"
                            icon={<EyeOutlined />}
                            onClick={() => navigate(`/doctor/detail/${doctor.id}`)}
                          >
                            查看详情
                          </Button>
                        ]}
                      >
                        <Card.Meta
                          avatar={
                            <div style={{ textAlign: 'center' }}>
                              {doctor.avatar ? (
                                <img
                                  src={doctor.avatar}
                                  alt={doctor.name}
                                  style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                  }}
                                />
                              ) : (
                                <div
                                  style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    backgroundColor: '#f0f0f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                    color: '#999',
                                  }}
                                >
                                  {doctor.name.charAt(0)}
                                </div>
                              )}
                            </div>
                          }
                          title={
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
                                {doctor.name}
                              </div>
                              <Tag color="blue">
                                {doctor.title}
                              </Tag>
                            </div>
                          }
                          description={
                            <div style={{ textAlign: 'center' }}>
                              {doctor.departmentName && (
                                <div style={{ marginBottom: 8, color: '#666', fontSize: '12px' }}>
                                  {doctor.departmentName}
                                </div>
                              )}
                              {doctor.specialties && (
                                <div style={{ marginBottom: 8, color: '#999', fontSize: '12px' }}>
                                  {doctor.specialties.split(',').slice(0, 2).join(', ')}
                                  {doctor.specialties.split(',').length > 2 && '...'}
                                </div>
                              )}
                              {doctor.consultationFee && doctor.consultationFee > 0 && (
                                <div style={{ fontSize: '12px', color: '#f50' }}>
                                  挂号费：¥{doctor.consultationFee}
                                </div>
                              )}
                            </div>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="该医院暂无医生信息" />
              )}
            </Spin>
          </Card>
        </Col>

        {/* 右侧：联系信息和操作 */}
        <Col xs={24} lg={8}>
          <Card title="医院信息" style={{ marginBottom: 16 }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* 地址 */}
              <div>
                <Text strong>
                  <EnvironmentOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                  医院地址
                </Text>
                <div style={{ marginTop: 4, paddingLeft: 24 }}>
                  <Text>{hospital.fullAddress}</Text>
                </div>
              </div>

              {/* 电话 */}
              {hospital.phone && (
                <div>
                  <Text strong>
                    <PhoneOutlined style={{ marginRight: 8, color: '#52c41a' }} />
                    联系电话
                  </Text>
                  <div style={{ marginTop: 4, paddingLeft: 24 }}>
                    <Text copyable>{hospital.phone}</Text>
                  </div>
                </div>
              )}

              {/* 邮箱 */}
              {hospital.email && (
                <div>
                  <Text strong>
                    <MailOutlined style={{ marginRight: 8, color: '#fa8c16' }} />
                    邮箱地址
                  </Text>
                  <div style={{ marginTop: 4, paddingLeft: 24 }}>
                    <Text copyable>{hospital.email}</Text>
                  </div>
                </div>
              )}

              {/* 营业时间 */}
              {hospital.businessHours && (
                <div>
                  <Text strong>
                    <ClockCircleOutlined style={{ marginRight: 8, color: '#722ed1' }} />
                    营业时间
                  </Text>
                  <div style={{ marginTop: 4, paddingLeft: 24 }}>
                    <Text>{hospital.businessHours}</Text>
                  </div>
                </div>
              )}

              {/* 官网 */}
              {hospital.website && (
                <div>
                  <Text strong>
                    <GlobalOutlined style={{ marginRight: 8, color: '#eb2f96' }} />
                    官方网站
                  </Text>
                  <div style={{ marginTop: 4, paddingLeft: 24 }}>
                    <a
                      href={hospital.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {hospital.website}
                    </a>
                  </div>
                </div>
              )}
            </Space>
          </Card>

          {/* 操作按钮 */}
          <Card>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* 预约挂号按钮 */}
              <Button
                type="primary"
                size="large"
                block
                icon={<CalendarOutlined />}
                onClick={() => {
                  // 跳转到该医院的预约挂号页面
                  navigate(`/user/appointment?hospitalId=${hospital.id}`);
                }}
              >
                预约挂号
              </Button>

              {hospital.longitude && hospital.latitude && (
                <Button
                  size="large"
                  block
                  onClick={() => {
                    // 打开地图导航（这里可以集成第三方地图API）
                    const url = `https://uri.amap.com/marker?position=${hospital.longitude},${hospital.latitude}&name=${hospital.name}`;
                    window.open(url, '_blank');
                  }}
                >
                  地图导航
                </Button>
              )}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HospitalDetail;
