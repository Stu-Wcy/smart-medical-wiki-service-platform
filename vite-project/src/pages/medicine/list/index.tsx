import React, { useEffect, useState } from 'react';
import { Card, Input, Select, List, Space, Tag, Image, Pagination, Empty, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getMedicineList, getMedicineCategoryList } from '@/api/medicine';
import type { MedicineDTO, MedicineCategoryDTO } from '@/types/medicine';
import styles from './styles.module.less';

const { Search } = Input;
const { Option } = Select;

const MedicineList: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState<number>();
  const [categories, setCategories] = useState<MedicineCategoryDTO[]>([]);
  const [list, setList] = useState<MedicineDTO[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 获取药品分类
  const fetchCategories = async () => {
    try {
      const res = await getMedicineCategoryList();
      setCategories(res.data.data);
    } catch (error) {
      console.error('获取药品分类失败:', error);
    }
  };

  // 获取药品列表
  const fetchMedicines = async (page = current) => {
    setLoading(true);
    try {
      const res = await getMedicineList({
        keyword,
        categoryId,
        page,
        size: pageSize,
      });
      setList(res.data.data.list);
      setTotal(res.data.data.total);
      setCurrent(page);
    } catch (error) {
      console.error('获取药品列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMedicines(1);
  }, [keyword, categoryId, pageSize]);

  const handleSearch = (value: string) => {
    setKeyword(value);
  };

  const handleCategoryChange = (value: number) => {
    setCategoryId(value);
  };

  const handlePageChange = (page: number, size?: number) => {
    if (size && size !== pageSize) {
      setPageSize(size);
      return;
    }
    fetchMedicines(page);
  };

  const renderMedicineCard = (item: MedicineDTO) => {
    const images = item.images?.split(',').filter(Boolean) || [];
    const firstImage = images[0];

    return (
      <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
        <Card
          hoverable
          className={styles.medicineCard}
          onClick={() => navigate(`/medicine/detail/${item.id}`)}
          cover={
            firstImage ? (
              <div className={styles.cardImage}>
                <Image
                  src={firstImage}
                  alt={item.name}
                  width="100%"
                  height={180}
                  fallback="/images/fallback.png"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ) : (
              <div className={styles.cardImagePlaceholder}>
                <span>暂无图片</span>
              </div>
            )
          }
        >
          <Card.Meta
            title={
              <div className={styles.cardTitle}>
                <div className={styles.name}>{item.name}</div>
                <Tag color="blue">{item.categoryName}</Tag>
              </div>
            }
            description={
              <div className={styles.cardContent}>
                <div className={styles.price}>
                  <span className={styles.priceSymbol}>￥</span>
                  <span className={styles.priceAmount}>{item.price?.toFixed(2)}</span>
                </div>
                {item.manufacturer && (
                  <div className={styles.manufacturer}>
                    <strong>生产厂家：</strong>
                    <span>{item.manufacturer}</span>
                  </div>
                )}
                {item.specification && (
                  <div className={styles.specification}>
                    <strong>规格：</strong>
                    <span>{item.specification}</span>
                  </div>
                )}
              </div>
            }
          />
        </Card>
      </Col>
    );
  };

  return (
    <Card className={styles.medicineList}>
      <div className={styles.header}>
        <Space size="large">
          <Search
            placeholder="搜索药品名称、生产厂家"
            allowClear
            enterButton
            style={{ width: 300 }}
            onSearch={handleSearch}
          />
          <Select
            placeholder="选择药品分类"
            allowClear
            style={{ width: 200 }}
            onChange={handleCategoryChange}
          >
            {categories.map(category => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Space>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Empty description="加载中..." />
        </div>
      ) : list.length === 0 ? (
        <Empty description="暂无相关药品" />
      ) : (
        <Row gutter={[16, 16]} className={styles.medicineGrid}>
          {list.map(renderMedicineCard)}
        </Row>
      )}

      <div className={styles.pagination}>
        <Pagination
          current={current}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `共 ${total} 条`}
          onChange={handlePageChange}
        />
      </div>
    </Card>
  );
};

export default MedicineList; 