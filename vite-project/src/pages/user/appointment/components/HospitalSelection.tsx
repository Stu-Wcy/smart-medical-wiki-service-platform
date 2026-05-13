import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Input,
  Select,
  Typography,
  Tag,
  Space,
  Spin,
  Empty,
  Button,
  message
} from 'antd';
import { SearchOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import { hospitalApi } from '@/api/hospital';
import type { Hospital, HospitalQueryDTO } from '@/types/hospital';

const { Title, Text } = Typography;
const { Option } = Select;

interface HospitalSelectionProps {
  onSelect: (hospital: Hospital) => void;
}

const HospitalSelection: React.FC<HospitalSelectionProps> = ({ onSelect }) => {
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchParams, setSearchParams] = useState<HospitalQueryDTO>({});
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  useEffect(() => {
    fetchHospitals();
  }, [searchParams]);

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const response = await hospitalApi.getList({
        page: 1,
        size: 20,
        ...searchParams
      });
      if (response.data && response.data.code === 200) {
        setHospitals(response.data.data.list || []);
      } else {
        message.error('获取医院列表失败');
      }
    } catch (error) {
      console.error('获取医院列表失败:', error);
      message.error('获取医院列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchParams(prev => ({ ...prev, name: value }));
  };

  const handleProvinceChange = (province: string) => {
    setSearchParams(prev => ({ ...prev, province, city: undefined }));
  };

  const handleCityChange = (city: string) => {
    setSearchParams(prev => ({ ...prev, city }));
  };

  const handleLevelChange = (level: number) => {
    setSearchParams(prev => ({ ...prev, level }));
  };

  const handleHospitalClick = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    // 直接跳转到下一步
    onSelect(hospital);
  };



  const getLevelText = (level: number) => {
    switch (level) {
      case 1: return '一级';
      case 2: return '二级';
      case 3: return '三级';
      default: return '未知';
    }
  };

  const getTypeText = (type: number) => {
    switch (type) {
      case 1: return '综合医院';
      case 2: return '专科医院';
      case 3: return '中医医院';
      default: return '未知';
    }
  };

  return (
    <div>
      <Title level={4}>选择就诊医院</Title>
      
      {/* 搜索筛选 */}
      <Card style={{ marginBottom: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Input
              placeholder="搜索医院名称"
              prefix={<SearchOutlined />}
              allowClear
              onPressEnter={(e) => handleSearch(e.currentTarget.value)}
              onBlur={(e) => handleSearch(e.target.value)}
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="选择省份"
              allowClear
              style={{ width: '100%' }}
              onChange={handleProvinceChange}
            >
              <Option value="北京市">北京市</Option>
              <Option value="上海市">上海市</Option>
              <Option value="广东省">广东省</Option>
              <Option value="浙江省">浙江省</Option>
              <Option value="江苏省">江苏省</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="选择城市"
              allowClear
              style={{ width: '100%' }}
              onChange={handleCityChange}
              disabled={!searchParams.province}
            >
              {searchParams.province === '北京市' && (
                <>
                  <Option value="东城区">东城区</Option>
                  <Option value="西城区">西城区</Option>
                  <Option value="朝阳区">朝阳区</Option>
                  <Option value="海淀区">海淀区</Option>
                </>
              )}
              {searchParams.province === '上海市' && (
                <>
                  <Option value="黄浦区">黄浦区</Option>
                  <Option value="徐汇区">徐汇区</Option>
                  <Option value="长宁区">长宁区</Option>
                  <Option value="静安区">静安区</Option>
                </>
              )}
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="医院等级"
              allowClear
              style={{ width: '100%' }}
              onChange={handleLevelChange}
            >
              <Option value={3}>三级</Option>
              <Option value={2}>二级</Option>
              <Option value={1}>一级</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={() => fetchHospitals()}>
              搜索
            </Button>
          </Col>
        </Row>
      </Card>

      {/* 医院列表 */}
      <Spin spinning={loading}>
        {hospitals.length === 0 ? (
          <Empty description="暂无医院数据" />
        ) : (
          <Row gutter={[16, 16]}>
            {hospitals.map(hospital => (
              <Col span={12} key={hospital.id}>
                <Card
                  hoverable
                  onClick={() => handleHospitalClick(hospital)}
                  style={{
                    border: selectedHospital?.id === hospital.id ? '2px solid #1890ff' : '1px solid #d9d9d9',
                    boxShadow: selectedHospital?.id === hospital.id ? '0 4px 12px rgba(24, 144, 255, 0.15)' : undefined,
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    {/* 上部分：医院图片和基本信息 */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
                      {hospital.images && (
                        <img
                          src={hospital.images.split(',')[0]}
                          alt={hospital.name}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginRight: '16px'
                          }}
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: '8px' }}>
                          <Text strong style={{ fontSize: '16px' }}>{hospital.name}</Text>
                          <div style={{ marginTop: '4px' }}>
                            <Tag color="blue">{getLevelText(hospital.level)}</Tag>
                            <Tag>{getTypeText(hospital.type)}</Tag>
                          </div>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <EnvironmentOutlined style={{ marginRight: '4px', color: '#666' }} />
                          <Text type="secondary">{hospital.address}</Text>
                        </div>
                        <div>
                          <PhoneOutlined style={{ marginRight: '4px', color: '#666' }} />
                          <Text type="secondary">{hospital.phone}</Text>
                        </div>
                      </div>
                    </div>

                    {/* 下部分：医院简介 */}
                    <div style={{
                      paddingTop: '12px',
                      borderTop: '1px solid #f0f0f0'
                    }}>
                      <div style={{ marginBottom: '8px' }}>
                        <Text strong style={{ color: '#666', fontSize: '14px' }}>医院简介</Text>
                      </div>
                      <div style={{
                        fontSize: '13px',
                        lineHeight: '1.6',
                        color: '#666',
                        wordBreak: 'break-all',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {hospital.description || '暂无医院简介信息'}
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Spin>






    </div>
  );
};

export default HospitalSelection;
