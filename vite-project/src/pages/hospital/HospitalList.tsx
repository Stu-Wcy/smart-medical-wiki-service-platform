import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Input,
  Select,
  Button,
  Space,
  Pagination,
  Empty,
  Spin,
  Tag,
  Rate,
  Image,
} from 'antd';
import {
  SearchOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { hospitalApi } from '@/api/hospital';
import type { Hospital, HospitalQueryDTO } from '@/types/hospital';
import {
  HospitalLevel,
  HospitalType,
  HospitalLevelTextMap,
  HospitalTypeTextMap,
} from '@/types/hospital';

const { Option } = Select;
const { Search } = Input;

const HospitalList: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize] = useState(12);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // 查询参数
  const [queryParams, setQueryParams] = useState<HospitalQueryDTO>({});

  // 获取医院列表
  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const response = await hospitalApi.getList({
        ...queryParams,
        page: current,
        size: pageSize,
      });
      if (response.data.code === 200) {
        setHospitals(response.data.data.list);
        setTotal(response.data.data.total);
      }
    } catch (error) {
      console.error('获取医院列表失败', error);
    } finally {
      setLoading(false);
    }
  };

  // 获取省份列表
  const fetchProvinces = async () => {
    try {
      const response = await hospitalApi.getProvinces();
      if (response.data.code === 200) {
        setProvinces(response.data.data);
      }
    } catch (error) {
      console.error('获取省份列表失败', error);
    }
  };

  // 根据省份获取城市列表
  const fetchCities = async (province: string) => {
    try {
      const response = await hospitalApi.getCitiesByProvince(province);
      if (response.data.code === 200) {
        setCities(response.data.data);
      }
    } catch (error) {
      console.error('获取城市列表失败', error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, [current, queryParams]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  // 搜索医院
  const handleSearch = (value: string) => {
    setQueryParams({ ...queryParams, name: value });
    setCurrent(1);
  };

  // 省份变化
  const handleProvinceChange = (province: string) => {
    setQueryParams({ ...queryParams, province, city: undefined });
    setCities([]);
    setCurrent(1);
    if (province) {
      fetchCities(province);
    }
  };

  // 城市变化
  const handleCityChange = (city: string) => {
    setQueryParams({ ...queryParams, city });
    setCurrent(1);
  };

  // 等级筛选
  const handleLevelChange = (level: HospitalLevel) => {
    setQueryParams({ ...queryParams, level });
    setCurrent(1);
  };

  // 类型筛选
  const handleTypeChange = (type: HospitalType) => {
    setQueryParams({ ...queryParams, type });
    setCurrent(1);
  };

  // 重置筛选
  const handleReset = () => {
    setQueryParams({});
    setCities([]);
    setCurrent(1);
  };

  // 查看医院详情
  const handleViewDetail = (id: number) => {
    navigate(`/hospital/detail/${id}`);
  };

  // 医院卡片组件
  const HospitalCard: React.FC<{ hospital: Hospital }> = ({ hospital }) => (
    <Card
      hoverable
      style={{ height: '100%' }}
      cover={
        hospital.images ? (
          <Image
            alt={hospital.name}
            src={hospital.images.split(',')[0]?.trim()}
            height={200}
            style={{ objectFit: 'cover' }}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
          />
        ) : (
          <div
            style={{
              height: 200,
              background: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
            }}
          >
            暂无图片
          </div>
        )
      }
      actions={[
        <Button type="primary" onClick={() => handleViewDetail(hospital.id)}>
          查看详情
        </Button>,
      ]}
    >
      <Card.Meta
        title={
          <div>
            <div style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
              {hospital.name}
            </div>
            <Space>
              <Tag color="blue">{hospital.levelDesc}</Tag>
              <Tag color="green">{hospital.typeDesc}</Tag>
            </Space>
          </div>
        }
        description={
          <div>
            <div style={{ marginBottom: 8 }}>
              <EnvironmentOutlined style={{ marginRight: 4 }} />
              {hospital.fullAddress}
            </div>
            {hospital.phone && (
              <div style={{ marginBottom: 8 }}>
                <PhoneOutlined style={{ marginRight: 4 }} />
                {hospital.phone}
              </div>
            )}
            {hospital.businessHours && (
              <div style={{ marginBottom: 8 }}>
                <ClockCircleOutlined style={{ marginRight: 4 }} />
                {hospital.businessHours}
              </div>
            )}
            {hospital.website && (
              <div style={{ marginBottom: 8 }}>
                <GlobalOutlined style={{ marginRight: 4 }} />
                <a href={hospital.website} target="_blank" rel="noopener noreferrer">
                  官网
                </a>
              </div>
            )}
            {hospital.description && (
              <div
                style={{
                  color: '#666',
                  fontSize: 12,
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {hospital.description}
              </div>
            )}
          </div>
        }
      />
    </Card>
  );

  return (
    <div style={{ padding: '24px' }}>
      {/* 搜索和筛选 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="搜索医院名称"
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
            />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Select
              placeholder="选择省份"
              allowClear
              size="large"
              style={{ width: '100%' }}
              onChange={handleProvinceChange}
              value={queryParams.province}
            >
              {provinces.map(province => (
                <Option key={province} value={province}>
                  {province}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Select
              placeholder="选择城市"
              allowClear
              size="large"
              style={{ width: '100%' }}
              onChange={handleCityChange}
              value={queryParams.city}
              disabled={!queryParams.province}
            >
              {cities.map(city => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Select
              placeholder="医院等级"
              allowClear
              size="large"
              style={{ width: '100%' }}
              onChange={handleLevelChange}
              value={queryParams.level}
            >
              {Object.entries(HospitalLevelTextMap).map(([value, text]) => (
                <Option key={value} value={Number(value)}>
                  {text}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Select
              placeholder="医院类型"
              allowClear
              size="large"
              style={{ width: '100%' }}
              onChange={handleTypeChange}
              value={queryParams.type}
            >
              {Object.entries(HospitalTypeTextMap).map(([value, text]) => (
                <Option key={value} value={Number(value)}>
                  {text}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row style={{ marginTop: 16 }}>
          <Col>
            <Button onClick={handleReset}>重置筛选</Button>
          </Col>
        </Row>
      </Card>

      {/* 医院列表 */}
      <Spin spinning={loading}>
        {hospitals.length > 0 ? (
          <>
            <Row gutter={[16, 16]}>
              {hospitals.map(hospital => (
                <Col key={hospital.id} xs={24} sm={12} md={8} lg={6}>
                  <HospitalCard hospital={hospital} />
                </Col>
              ))}
            </Row>
            
            {/* 分页 */}
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Pagination
                current={current}
                pageSize={pageSize}
                total={total}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total) => `共 ${total} 家医院`}
                onChange={(page) => setCurrent(page)}
              />
            </div>
          </>
        ) : (
          <Empty description="暂无医院数据" />
        )}
      </Spin>
    </div>
  );
};

export default HospitalList;
