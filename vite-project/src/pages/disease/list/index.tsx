import React, { useEffect, useState } from 'react';
import { Card, Input, Select, Space, Tag, Image, Pagination, Empty, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getDiseaseList, getDiseaseCategoryList } from '@/api/disease';
import type { DiseaseDTO, DiseaseCategoryDTO } from '@/types/disease';
import styles from './styles.module.less';

const { Search } = Input;
const { Option } = Select;

const DiseaseList: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState<number>();
  const [categories, setCategories] = useState<DiseaseCategoryDTO[]>([]);
  const [list, setList] = useState<DiseaseDTO[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 获取疾病分类
  const fetchCategories = async () => {
    try {
      const res = await getDiseaseCategoryList();
      setCategories(res.data.data);
    } catch (error) {
      console.error('获取疾病分类失败:', error);
    }
  };

  // 获取疾病列表
  const fetchDiseases = async (page = current) => {
    setLoading(true);
    try {
      const res = await getDiseaseList({
        keyword,
        categoryId,
        page,
        size: pageSize,
      });
      setList(res.data.data.list);
      setTotal(res.data.data.total);
      setCurrent(page);
    } catch (error) {
      console.error('获取疾病列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchDiseases(1);
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
    fetchDiseases(page);
  };

  const renderDiseaseCard = (item: DiseaseDTO) => {
    const images = item.images?.split(',').filter(Boolean) || [];
    const firstImage = images[0];

    return (
      <Col xs={24} sm={24} md={12} lg={12} key={item.id}>
        <Card
          hoverable
          className={styles.diseaseCard}
          onClick={() => navigate(`/disease/detail/${item.id}`)}
        >
          <div className={styles.cardContent}>
            <div className={styles.cardBody}>
              {firstImage && (
                <div className={styles.cardImage}>
                  <Image
                    src={firstImage}
                    alt={item.name}
                    width={200}
                    height={150}
                    fallback="/images/fallback.png"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <div className={styles.cardInfo}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{item.name}</h3>
                  <Tag color="blue">{item.categoryName}</Tag>
                </div>
                {item.symptoms && (
                  <div className={styles.cardSection}>
                    <strong>症状：</strong>
                    <p>{item.symptoms}</p>
                  </div>
                )}
                {item.causes && (
                  <div className={styles.cardSection}>
                    <strong>病因：</strong>
                    <p>{item.causes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Col>
    );
  };

  return (
    <Card className={styles.diseaseList}>
      <div className={styles.header}>
        <Space size="large">
          <Search
            placeholder="搜索疾病名称、症状、病因"
            allowClear
            enterButton
            style={{ width: 300 }}
            onSearch={handleSearch}
          />
          <Select
            placeholder="选择疾病分类"
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
        <Empty description="暂无相关疾病" />
      ) : (
        <Row gutter={[16, 16]} className={styles.diseaseGrid}>
          {list.map(renderDiseaseCard)}
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

export default DiseaseList; 