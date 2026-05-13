import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Button, Carousel, Statistic, Form, Input, Select, message, Tag, Image, Spin } from 'antd';
import {
  RobotOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  BankOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { createFeedback } from '@/api/feedback';
import { hospitalApi } from '@/api/hospital';
import type { Hospital } from '@/types/hospital';

import styles from './styles.module.less';

// 导入图片
import banner1 from '../../assets/images/banner/banner1.png';
import banner2 from '../../assets/images/banner/banner2.png';
import banner3 from '../../assets/images/banner/banner3.png';
import banner4 from '../../assets/images/banner/banner4.png';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [hospitalsLoading, setHospitalsLoading] = useState(false);

  // 轮播图数据
  const bannerItems = [
    {
      title: '智能问诊',
      desc: '24小时AI智能问诊，快速获取专业建议',
      image: banner4,
      link: '/ai/consultation',
    },
    {
      title: '医院查询',
      desc: '全国优质医院信息，助您找到合适的医疗机构',
      image: banner2,
      link: '/hospital/list',
    },
    {
      title: '药品查询',
      desc: '全面的药品信息库，助您了解用药知识',
      image: banner3,
      link: '/medicine/list',
    },
    {
      title: '疾病查询',
      desc: '专业的疾病信息，帮助您了解病症',
      image: banner1,
      link: '/disease/list',
    },
  ];

  // 平台数据统计
  const statistics = [
    { title: '注册用户', value: '10000+', prefix: <TeamOutlined /> },
    { title: '合作医院', value: '500+', prefix: <BankOutlined /> },
    { title: '在线问诊', value: '5000+', prefix: <RobotOutlined /> },
    { title: '药品数量', value: '2000+', prefix: <MedicineBoxOutlined /> },
  ];

  // 获取热门医院数据
  const fetchHotHospitals = async () => {
    setHospitalsLoading(true);
    try {
      const response = await hospitalApi.getList({
        page: 1,
        size: 6, // 获取6个医院
      });
      if (response.data.code === 200) {
        setHospitals(response.data.data.list);
      }
    } catch (error) {
      console.error('获取热门医院失败:', error);
    } finally {
      setHospitalsLoading(false);
    }
  };

  // 页面加载时获取热门医院
  useEffect(() => {
    fetchHotHospitals();
  }, []);

  // 处理反馈提交
  const handleFeedbackSubmit = async (values: any) => {
    try {
      setSubmitting(true);
      await createFeedback(values);
      message.success('感谢您的反馈！');
      form.resetFields();
    } catch (error) {
      message.error('提交失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.homePage}>
      {/* Banner区域 */}
      <section className={styles.banner}>
        <Carousel autoplay>
          {bannerItems.map((item, index) => (
            <div key={index}>
              <div className={styles.bannerItem} style={{ backgroundImage: `url(${item.image})` }}>
                <div className={styles.bannerContent}>
                  <Title level={2}> <i className="el-icon-star-on"></i>{item.title}</Title>
                  <Paragraph type="warning"> <i className="el-icon-edit"></i> {item.desc}</Paragraph>
                  <Link to={item.link}>
                    <Button type="primary" size="large">
                        <i className="el-icon-check"></i>
                      立即体验
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* 数据统计 */}
      <section className={styles.statistics}>
        <Row gutter={[24, 24]} justify="center">
          {statistics.map((stat, index) => (
            <Col key={index} xs={12} sm={6}>
              <Card>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={stat.prefix}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* 热门医院 */}
      <section className={styles.hospitals}>
        <Title level={2} className={styles.sectionTitle}>热门医院</Title>
        <Spin spinning={hospitalsLoading}>
          <Row gutter={[24, 24]}>
          {hospitals.map((hospital) => {
            const images = hospital.images?.split(',').filter(Boolean) || [];
            const firstImage = images[0];

            return (
              <Col key={hospital.id} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  className={styles.hospitalCard}
                  onClick={() => navigate(`/hospital/detail/${hospital.id}`)}
                  cover={
                    firstImage ? (
                      <div className={styles.hospitalImage}>
                        <Image
                          src={firstImage}
                          alt={hospital.name}
                          width="100%"
                          height={200}
                          fallback="/images/fallback.png"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ) : (
                      <div className={styles.hospitalImagePlaceholder}>
                        <BankOutlined style={{ fontSize: 48, color: '#ccc' }} />
                      </div>
                    )
                  }
                >
                  <Card.Meta
                    title={
                      <div className={styles.hospitalTitle}>
                        <div className={styles.hospitalName}>{hospital.name}</div>
                        <div className={styles.hospitalTags}>
                          <Tag color="blue">{hospital.levelDesc}</Tag>
                          <Tag color="green">{hospital.typeDesc}</Tag>
                        </div>
                      </div>
                    }
                    description={
                      <div className={styles.hospitalInfo}>
                        <div className={styles.hospitalAddress}>
                          <EnvironmentOutlined style={{ marginRight: 4 }} />
                          {hospital.fullAddress}
                        </div>
                        {hospital.phone && (
                          <div className={styles.hospitalPhone}>
                            <PhoneOutlined style={{ marginRight: 4 }} />
                            {hospital.phone}
                          </div>
                        )}
                        {hospital.description && (
                          <div className={styles.hospitalDesc}>
                            {hospital.description}
                          </div>
                        )}
                      </div>
                    }
                  />
                </Card>
              </Col>
            );
          })}
          </Row>
        </Spin>
      </section>

      {/* 意见反馈 */}
      <section className={styles.feedback}>
        <Title level={2} className={styles.sectionTitle}>意见反馈</Title>
        <Row>
          <Col span={24}>
            <Card className={styles.feedbackCard}>
              <Row gutter={[24, 0]}>
                <Col xs={24} md={8}>
                  <div className={styles.feedbackInfo}>
                    <Title level={3}>您的建议</Title>
                    <Paragraph>
                      我们期待听到您的声音！无论是产品建议、功能异常还是使用咨询，您的反馈都将帮助我们提供更好的服务。
                    </Paragraph>
                    <ul className={styles.feedbackTips}>
                      <li>详细描述您的问题或建议</li>
                      <li>选择合适的反馈类型</li>
                      <li>我们会认真处理每一条反馈</li>
                    </ul>
                  </div>
                </Col>
                <Col xs={24} md={16}>
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFeedbackSubmit}
                    className={styles.feedbackForm}
                  >
                    <Form.Item
                      name="type"
                      label="反馈类型"
                      rules={[{ required: true, message: '请选择反馈类型' }]}
                    >
                      <Select placeholder="请选择反馈类型">
                        <Option value={1}>产品建议</Option>
                        <Option value={2}>功能异常</Option>
                        <Option value={3}>使用咨询</Option>
                        <Option value={4}>其他</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="content"
                      label="反馈内容"
                      rules={[
                        { required: true, message: '请输入反馈内容' },
                        { max: 1000, message: '反馈内容最多1000字' }
                      ]}
                    >
                      <TextArea
                        placeholder="请详细描述您的问题或建议..."
                        rows={6}
                        maxLength={1000}
                        showCount
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" loading={submitting} size="large">
                        提交反馈
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default HomePage; 