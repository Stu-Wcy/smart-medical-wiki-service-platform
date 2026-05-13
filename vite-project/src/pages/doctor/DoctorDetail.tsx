import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Space,
  Button,
  Spin,
  Empty,
  Divider,
  Avatar,
} from 'antd';
import {
  ArrowLeftOutlined,
  PhoneOutlined,
  MailOutlined,
  BankOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoctor } from '@/api/doctor';
import type { Doctor } from '@/types/doctor';

const { Title, Paragraph, Text } = Typography;

const DoctorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  // 获取医生详情
  const fetchDoctorDetail = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const response = await getDoctor(Number(id));
      if (response.data.code === 200) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.error('获取医生详情失败', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorDetail();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Empty description="医生信息不存在" />
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
        {/* 左侧：医生基本信息 */}
        <Col xs={24} lg={16}>
          <Card>
            {/* 医生头像和基本信息 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
              <div style={{ marginRight: 24 }}>
                {doctor.avatar ? (
                  <Avatar
                    size={120}
                    src={doctor.avatar}
                    alt={doctor.name}
                  />
                ) : (
                  <Avatar
                    size={120}
                    icon={<UserOutlined />}
                    style={{ backgroundColor: '#f0f0f0', color: '#999' }}
                  />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <Title level={2} style={{ marginBottom: 8 }}>
                  {doctor.name}
                </Title>
                <Space size="middle" style={{ marginBottom: 16 }}>
                  <Tag color="blue" style={{ fontSize: 14, padding: '4px 12px' }}>
                    {doctor.title}
                  </Tag>
                  {doctor.departmentName && (
                    <Tag color="green" style={{ fontSize: 14, padding: '4px 12px' }}>
                      {doctor.departmentName}
                    </Tag>
                  )}
                  <Tag color={doctor.status === 1 ? 'success' : 'error'}>
                    {doctor.statusDesc}
                  </Tag>
                </Space>
                <div>
                  <Text strong>所属医院：</Text>
                  <Text>{doctor.hospitalName}</Text>
                </div>
                {doctor.consultationFee && doctor.consultationFee > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <Text strong>挂号费用：</Text>
                    <Text style={{ color: '#f50', fontSize: 16, fontWeight: 'bold' }}>
                      ¥{doctor.consultationFee}
                    </Text>
                  </div>
                )}
              </div>
            </div>

            <Divider />

            {/* 专长领域 */}
            {doctor.specialties && (
              <div style={{ marginBottom: 24 }}>
                <Title level={4}>专长领域</Title>
                <div>
                  {doctor.specialties.split(',').map((specialty, index) => (
                    <Tag key={index} color="blue" style={{ marginBottom: 8 }}>
                      {specialty.trim()}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {/* 医生简介 */}
            {doctor.introduction && (
              <div style={{ marginBottom: 24 }}>
                <Title level={4}>医生简介</Title>
                <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                  {doctor.introduction}
                </Paragraph>
              </div>
            )}

            {/* 教育背景 */}
            {doctor.education && (
              <div style={{ marginBottom: 24 }}>
                <Title level={4}>教育背景</Title>
                <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                  {doctor.education}
                </Paragraph>
              </div>
            )}

            {/* 工作经历 */}
            {doctor.experience && (
              <div style={{ marginBottom: 24 }}>
                <Title level={4}>工作经历</Title>
                <Paragraph style={{ fontSize: 16, lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {doctor.experience}
                </Paragraph>
              </div>
            )}

            {/* 主要成就 */}
            {doctor.achievements && (
              <div style={{ marginBottom: 24 }}>
                <Title level={4}>主要成就</Title>
                <Paragraph style={{ fontSize: 16, lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {doctor.achievements}
                </Paragraph>
              </div>
            )}
          </Card>
        </Col>

        {/* 右侧：联系信息和操作 */}
        <Col xs={24} lg={8}>
          <Card title="联系信息" style={{ marginBottom: 16 }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* 电话 */}
              {doctor.phone && (
                <div>
                  <Text strong>
                    <PhoneOutlined style={{ marginRight: 8, color: '#52c41a' }} />
                    联系电话
                  </Text>
                  <div style={{ marginTop: 4, paddingLeft: 24 }}>
                    <Text copyable>{doctor.phone}</Text>
                  </div>
                </div>
              )}

              {/* 邮箱 */}
              {doctor.email && (
                <div>
                  <Text strong>
                    <MailOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                    邮箱地址
                  </Text>
                  <div style={{ marginTop: 4, paddingLeft: 24 }}>
                    <Text copyable>{doctor.email}</Text>
                  </div>
                </div>
              )}

              {/* 所属医院 */}
              <div>
                <Text strong>
                  <BankOutlined style={{ marginRight: 8, color: '#722ed1' }} />
                  所属医院
                </Text>
                <div style={{ marginTop: 4, paddingLeft: 24 }}>
                  <Button
                    type="link"
                    style={{ padding: 0 }}
                    onClick={() => navigate(`/hospital/detail/${doctor.hospitalId}`)}
                  >
                    {doctor.hospitalName}
                  </Button>
                </div>
              </div>

              {/* 所属科室 */}
              {doctor.departmentName && (
                <div>
                  <Text strong>
                    <MedicineBoxOutlined style={{ marginRight: 8, color: '#fa8c16' }} />
                    所属科室
                  </Text>
                  <div style={{ marginTop: 4, paddingLeft: 24 }}>
                    <Text>{doctor.departmentName}</Text>
                  </div>
                </div>
              )}

              {/* 挂号费用 */}
              {doctor.consultationFee && doctor.consultationFee > 0 && (
                <div>
                  <Text strong>
                    <DollarOutlined style={{ marginRight: 8, color: '#f50' }} />
                    挂号费用
                  </Text>
                  <div style={{ marginTop: 4, paddingLeft: 24 }}>
                    <Text style={{ color: '#f50', fontSize: 16, fontWeight: 'bold' }}>
                      ¥{doctor.consultationFee}
                    </Text>
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
                block
                disabled={doctor.status !== 1}
                onClick={() => {
                  // 这里可以跳转到预约挂号页面
                  console.log('预约挂号', doctor.id);
                }}
              >
                {doctor.status === 1 ? '预约挂号' : '医生已停诊'}
              </Button>
              <Button
                size="large"
                block
                onClick={() => navigate(`/hospital/detail/${doctor.hospitalId}`)}
              >
                查看医院详情
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DoctorDetail;
