import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Progress, Spin, DatePicker, Select, Typography, Divider } from 'antd';
import {
  UserOutlined,
  MedicineBoxOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  BankOutlined,
  TeamOutlined,
  FileSearchOutlined,
  RobotOutlined,
  MessageOutlined,
  LineChartOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Line, Column, Pie } from '@ant-design/plots';
import { getStatistics, type StatisticsData } from '@/api/admin/statistics';
import styles from './styles.module.less';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [dateRange, setDateRange] = useState<string>('30');

  // 获取统计数据
  const fetchStatistics = async () => {
    setLoading(true);
    try {
      // 使用模拟数据
      const mockData: StatisticsData = {
        // 基础统计
        totalUsers: 12456,
        totalHospitals: 156,
        totalDoctors: 2341,
        totalDepartments: 89,
        totalMedicines: 1567,
        totalDiseases: 234,
        totalOrders: 3456,
        totalRevenue: 234567.89,
        totalConsultations: 5678,
        totalFeedbacks: 123,

        // 今日统计
        todayUsers: 45,
        todayOrders: 67,
        todayRevenue: 3456.78,
        todayConsultations: 89,

        // 本月统计
        monthUsers: 1234,
        monthOrders: 2345,
        monthRevenue: 45678.90,
        monthConsultations: 3456,

        // 趋势数据
        userTrend: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          count: Math.floor(Math.random() * 100) + 20
        })),
        orderTrend: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          count: Math.floor(Math.random() * 50) + 10,
          revenue: Math.floor(Math.random() * 5000) + 1000
        })),
        consultationTrend: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          count: Math.floor(Math.random() * 80) + 30
        })),

        // 分布数据
        hospitalDistribution: [
          { province: '北京', count: 25 },
          { province: '上海', count: 20 },
          { province: '广东', count: 18 },
          { province: '江苏', count: 15 },
          { province: '浙江', count: 12 },
          { province: '其他', count: 66 }
        ],
        orderStatusDistribution: [
          { status: '已完成', count: 2100, percentage: 60.8 },
          { status: '进行中', count: 800, percentage: 23.1 },
          { status: '已取消', count: 356, percentage: 10.3 },
          { status: '待付款', count: 200, percentage: 5.8 }
        ],
        medicineTypeDistribution: [
          { type: '处方药', count: 890, percentage: 56.8 },
          { type: '非处方药', count: 456, percentage: 29.1 },
          { type: '中成药', count: 221, percentage: 14.1 }
        ],
        diseaseTypeDistribution: [
          { type: '内科', count: 89, percentage: 38.0 },
          { type: '外科', count: 67, percentage: 28.6 },
          { type: '妇科', count: 45, percentage: 19.2 },
          { type: '儿科', count: 33, percentage: 14.1 }
        ],

        // 排行数据
        topHospitals: [
          { id: 1, name: '北京协和医院', orderCount: 234, revenue: 45678.90 },
          { id: 2, name: '上海华山医院', orderCount: 198, revenue: 38901.23 },
          { id: 3, name: '广州中山医院', orderCount: 167, revenue: 32456.78 },
          { id: 4, name: '深圳人民医院', orderCount: 145, revenue: 28901.45 },
          { id: 5, name: '杭州第一医院', orderCount: 123, revenue: 24567.89 }
        ],
        topMedicines: [
          { id: 1, name: '阿莫西林胶囊', orderCount: 456, revenue: 12345.67 },
          { id: 2, name: '布洛芬缓释胶囊', orderCount: 389, revenue: 9876.54 },
          { id: 3, name: '头孢克肟胶囊', orderCount: 234, revenue: 7654.32 },
          { id: 4, name: '感冒灵颗粒', orderCount: 198, revenue: 5432.10 },
          { id: 5, name: '维生素C片', orderCount: 167, revenue: 4321.98 }
        ],
        topDiseases: [
          { id: 1, name: '感冒', searchCount: 1234 },
          { id: 2, name: '高血压', searchCount: 987 },
          { id: 3, name: '糖尿病', searchCount: 765 },
          { id: 4, name: '胃炎', searchCount: 543 },
          { id: 5, name: '失眠', searchCount: 432 }
        ]
      };

      setStatistics(mockData);
    } catch (error) {
      console.error('获取统计数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [dateRange]);

  if (loading || !statistics) {
    return (
      <div className={styles.dashboard}>
        <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }} />
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <Title level={2}>数据分析统计</Title>
        <div className={styles.controls}>
          <Select
            value={dateRange}
            onChange={setDateRange}
            style={{ width: 120, marginRight: 16 }}
          >
            <Option value="7">近7天</Option>
            <Option value="30">近30天</Option>
            <Option value="90">近90天</Option>
          </Select>
        </div>
      </div>

      {/* 核心指标统计 */}
      <Row gutter={[24, 24]} className={styles.statsRow}>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statCard}>
            <Statistic
              title="总用户数"
              value={statistics.totalUsers}
              prefix={<UserOutlined className={styles.statIcon} />}
              suffix={
                <div className={styles.statExtra}>
                  <span className={styles.todayCount}>今日新增: {statistics.todayUsers}</span>
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statCard}>
            <Statistic
              title="合作医院"
              value={statistics.totalHospitals}
              prefix={<BankOutlined className={styles.statIcon} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statCard}>
            <Statistic
              title="在线医生"
              value={statistics.totalDoctors}
              prefix={<TeamOutlined className={styles.statIcon} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statCard}>
            <Statistic
              title="药品种类"
              value={statistics.totalMedicines}
              prefix={<MedicineBoxOutlined className={styles.statIcon} />}
            />
          </Card>
        </Col>
      </Row>

      {/* 业务数据统计 */}
      <Row gutter={[24, 24]} className={styles.businessRow}>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statCard}>
            <Statistic
              title="总订单数"
              value={statistics.totalOrders}
              prefix={<ShoppingCartOutlined className={styles.statIcon} />}
              suffix={
                <div className={styles.statExtra}>
                  <span className={styles.todayCount}>今日: {statistics.todayOrders}</span>
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statCard}>
            <Statistic
              title="总收入"
              value={statistics.totalRevenue}
              precision={2}
              prefix={<DollarOutlined className={styles.statIcon} />}
              suffix={
                <div className={styles.statExtra}>
                  <span className={styles.todayCount}>今日: ¥{statistics.todayRevenue}</span>
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statCard}>
            <Statistic
              title="AI问诊次数"
              value={statistics.totalConsultations}
              prefix={<RobotOutlined className={styles.statIcon} />}
              suffix={
                <div className={styles.statExtra}>
                  <span className={styles.todayCount}>今日: {statistics.todayConsultations}</span>
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statCard}>
            <Statistic
              title="用户反馈"
              value={statistics.totalFeedbacks}
              prefix={<MessageOutlined className={styles.statIcon} />}
            />
          </Card>
        </Col>
      </Row>

      {/* 趋势图表 */}
      <Row gutter={[24, 24]} className={styles.chartsRow}>
        <Col xs={24} lg={12}>
          <Card title="用户增长趋势" className={styles.chartCard}>
            <Line
              data={statistics.userTrend}
              xField="date"
              yField="count"
              smooth
              color="#1890ff"
              point={{ size: 3 }}
              height={300}
              xAxis={{
                type: 'time',
                tickCount: 5
              }}
              yAxis={{
                label: {
                  formatter: (v: number) => `${v}人`
                }
              }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="订单趋势" className={styles.chartCard}>
            <Line
              data={statistics.orderTrend}
              xField="date"
              yField="count"
              smooth
              color="#52c41a"
              point={{ size: 3 }}
              height={300}
              xAxis={{
                type: 'time',
                tickCount: 5
              }}
              yAxis={{
                label: {
                  formatter: (v: number) => `${v}单`
                }
              }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className={styles.chartsRow}>
        <Col xs={24} lg={12}>
          <Card title="AI问诊趋势" className={styles.chartCard}>
            <Line
              data={statistics.consultationTrend}
              xField="date"
              yField="count"
              smooth
              color="#722ed1"
              point={{ size: 3 }}
              height={300}
              xAxis={{
                type: 'time',
                tickCount: 5
              }}
              yAxis={{
                label: {
                  formatter: (v: number) => `${v}次`
                }
              }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="医院地区分布" className={styles.chartCard}>
            <Column
              data={statistics.hospitalDistribution}
              xField="province"
              yField="count"
              color="#13c2c2"
              height={300}
              columnWidthRatio={0.6}
              label={{
                position: 'top',
                style: {
                  fill: '#666',
                  fontSize: 12
                }
              }}
              yAxis={{
                label: {
                  formatter: (v: number) => `${v}家`
                }
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* 分布统计 */}
      <Row gutter={[24, 24]} className={styles.distributionRow}>
        <Col xs={24} lg={8}>
          <Card title="订单状态分布" className={styles.pieCard}>
            <Pie
              data={statistics.orderStatusDistribution}
              angleField="count"
              colorField="status"
              radius={0.8}
              height={250}
              label={{
                type: 'outer',
                content: '{name}: {percentage}%'
              }}
              legend={{
                position: 'bottom'
              }}
              interactions={[{ type: 'element-active' }]}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="药品类型分布" className={styles.pieCard}>
            <Pie
              data={statistics.medicineTypeDistribution}
              angleField="count"
              colorField="type"
              radius={0.8}
              height={250}
              label={{
                type: 'outer',
                content: '{name}: {percentage}%'
              }}
              legend={{
                position: 'bottom'
              }}
              interactions={[{ type: 'element-active' }]}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="疾病类型分布" className={styles.pieCard}>
            <Pie
              data={statistics.diseaseTypeDistribution}
              angleField="count"
              colorField="type"
              radius={0.8}
              height={250}
              label={{
                type: 'outer',
                content: '{name}: {percentage}%'
              }}
              legend={{
                position: 'bottom'
              }}
              interactions={[{ type: 'element-active' }]}
            />
          </Card>
        </Col>
      </Row>

      {/* 排行榜 */}
      <Row gutter={[24, 24]} className={styles.rankingRow}>
        <Col xs={24} lg={8}>
          <Card title="优选医院排行" className={styles.rankingCard}>
            <Table
              dataSource={statistics.topHospitals}
              pagination={false}
              size="small"
              columns={[
                {
                  title: '排名',
                  key: 'rank',
                  width: 60,
                  render: (_, __, index) => (
                    <span className={`${styles.rank} ${index < 3 ? styles.topRank : ''}`}>
                      {index + 1}
                    </span>
                  )
                },
                {
                  title: '医院名称',
                  dataIndex: 'name',
                  key: 'name',
                  ellipsis: true
                },
                {
                  title: '订单数',
                  dataIndex: 'orderCount',
                  key: 'orderCount',
                  width: 80,
                  align: 'right'
                }
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="热门药品排行" className={styles.rankingCard}>
            <Table
              dataSource={statistics.topMedicines}
              pagination={false}
              size="small"
              columns={[
                {
                  title: '排名',
                  key: 'rank',
                  width: 60,
                  render: (_, __, index) => (
                    <span className={`${styles.rank} ${index < 3 ? styles.topRank : ''}`}>
                      {index + 1}
                    </span>
                  )
                },
                {
                  title: '药品名称',
                  dataIndex: 'name',
                  key: 'name',
                  ellipsis: true
                },
                {
                  title: '销量',
                  dataIndex: 'orderCount',
                  key: 'orderCount',
                  width: 80,
                  align: 'right'
                }
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="热门疾病排行" className={styles.rankingCard}>
            <Table
              dataSource={statistics.topDiseases}
              pagination={false}
              size="small"
              columns={[
                {
                  title: '排名',
                  key: 'rank',
                  width: 60,
                  render: (_, __, index) => (
                    <span className={`${styles.rank} ${index < 3 ? styles.topRank : ''}`}>
                      {index + 1}
                    </span>
                  )
                },
                {
                  title: '疾病名称',
                  dataIndex: 'name',
                  key: 'name',
                  ellipsis: true
                },
                {
                  title: '搜索次数',
                  dataIndex: 'searchCount',
                  key: 'searchCount',
                  width: 80,
                  align: 'right'
                }
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage; 
