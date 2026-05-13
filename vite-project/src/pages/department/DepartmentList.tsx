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

} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { Department, DepartmentCategory } from '@/types/department';
import type { Hospital } from '@/types/hospital';
import {
  getDepartmentList,
  getDepartmentCategories,
} from '@/api/department';
import { hospitalApi } from '@/api/hospital';

const { Search } = Input;
const { Option } = Select;

const DepartmentList: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [categories, setCategories] = useState<DepartmentCategory[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize] = useState(12);

  // 查询参数
  const [queryParams, setQueryParams] = useState({
    name: '',
    categoryId: undefined as number | undefined,
    hospitalId: undefined as number | undefined,
  });

  // 获取科室分类
  const fetchCategories = async () => {
    try {
      const response = await getDepartmentCategories();
      if (response.data && response.data.data) {
        setCategories(response.data.data || []);
      }
    } catch (error) {
      console.error('获取科室分类失败:', error);
    }
  };

  // 获取医院列表
  const fetchHospitals = async () => {
    try {
      const response = await hospitalApi.getList({ status: 1, page: 1, size: 1000 });
      if (response.data && response.data.data) {
        // 后端返回的是list，不是records
        const records = response.data.data.list || (response.data.data as any).records || [];
        setHospitals(records);
      }
    } catch (error) {
      console.error('获取医院列表失败:', error);
    }
  };

  // 获取科室列表
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const params = {
        ...queryParams,
        page: current,
        size: pageSize,
      };
      const response = await getDepartmentList(params);
      if (response.data && response.data.data) {
        // 后端返回的是list，不是records
        const records = response.data.data.list || (response.data.data as any).records || [];
        setDepartments(records);
        setTotal(response.data.data.total || 0);
      }
    } catch (error) {
      console.error('获取科室列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchHospitals();
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [current, queryParams]);

  // 搜索
  const handleSearch = (value: string) => {
    setQueryParams({ ...queryParams, name: value });
    setCurrent(1);
  };

  // 分类筛选
  const handleCategoryChange = (categoryId: number | undefined) => {
    setQueryParams({ ...queryParams, categoryId });
    setCurrent(1);
  };

  // 医院筛选
  const handleHospitalChange = (hospitalId: number | undefined) => {
    setQueryParams({ ...queryParams, hospitalId });
    setCurrent(1);
  };

  // 重置筛选
  const handleReset = () => {
    setQueryParams({
      name: '',
      categoryId: undefined,
      hospitalId: undefined,
    });
    setCurrent(1);
  };

  // 查看详情
  const handleViewDetail = (id: number) => {
    navigate(`/department/detail/${id}`);
  };

  // 分页变化
  const handlePageChange = (page: number) => {
    setCurrent(page);
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* 页面标题 */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 'bold', color: '#1890ff', marginBottom: 8 }}>
            科室浏览
          </h1>
          <p style={{ color: '#666', fontSize: 16 }}>
            查找您需要的医院科室，了解科室详细信息
          </p>
        </div>

        {/* 筛选栏 */}
        <Card style={{ marginBottom: 24 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Search
                placeholder="搜索科室名称"
                value={queryParams.name}
                onChange={(e) => setQueryParams({ ...queryParams, name: e.target.value })}
                onSearch={handleSearch}
                enterButton={<SearchOutlined />}
                size="large"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="选择科室分类"
                size="large"
                style={{ width: '100%' }}
                onChange={handleCategoryChange}
                value={queryParams.categoryId}
                allowClear
              >
                {categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="选择医院"
                size="large"
                style={{ width: '100%' }}
                onChange={handleHospitalChange}
                value={queryParams.hospitalId}
                allowClear
                showSearch
                filterOption={(input, option) =>
                  ((option?.children as unknown as string))?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {hospitals.map((hospital) => (
                  <Option key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleReset}
                size="large"
                style={{ width: '100%' }}
              >
                重置
              </Button>
            </Col>
          </Row>
        </Card>

        {/* 科室列表 */}
        <Spin spinning={loading}>
          {departments && departments.length > 0 ? (
            <>
              <Row gutter={[16, 16]}>
                {departments.map((department) => (
                  <Col key={department.id} xs={24} sm={12} lg={8} xl={6}>
                    <Card
                      hoverable
                      style={{ height: '100%' }}
                      actions={[
                        <Button
                          type="primary"
                          icon={<EyeOutlined />}
                          onClick={() => handleViewDetail(department.id)}
                        >
                          查看详情
                        </Button>,
                      ]}
                    >
                      <Card.Meta
                        title={
                          <div>
                            <div style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>
                              {department.name}
                            </div>
                            <Space size="small">
                              <Tag color="blue">{department.categoryName}</Tag>
                            </Space>
                          </div>
                        }
                        description={
                          <div>
                            <div style={{ marginBottom: 8, color: '#666' }}>
                              {department.hospitalName}
                            </div>
                            {department.location && (
                              <div style={{ marginBottom: 4, fontSize: 12, color: '#999' }}>
                                <EnvironmentOutlined style={{ marginRight: 4 }} />
                                {department.location}
                              </div>
                            )}
                            {department.phone && (
                              <div style={{ fontSize: 12, color: '#999' }}>
                                <PhoneOutlined style={{ marginRight: 4 }} />
                                {department.phone}
                              </div>
                            )}
                            {department.description && (
                              <div
                                style={{
                                  marginTop: 8,
                                  fontSize: 12,
                                  color: '#666',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                }}
                              >
                                {department.description}
                              </div>
                            )}
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>

              {/* 分页 */}
              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <Pagination
                  current={current}
                  pageSize={pageSize}
                  total={total}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showQuickJumper
                  showTotal={(total) => `共 ${total} 个科室`}
                />
              </div>
            </>
          ) : (
            <Card>
              <Empty
                description="暂无科室数据"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </Card>
          )}
        </Spin>
      </div>
    </div>
  );
};

export default DepartmentList;
