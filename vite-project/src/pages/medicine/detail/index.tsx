import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Image,
  Tag,
  Button,
  Carousel,
  Empty,
  Spin,
  InputNumber,
  message,
  Space,
  Row,
  Col,
  Divider,
  Rate,
  Breadcrumb,
} from 'antd';
import {
  LeftOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  HeartOutlined,
  ShareAltOutlined,
  SafetyCertificateOutlined,
  TruckOutlined,
  CustomerServiceOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { getMedicineDetail } from '@/api/medicine';
import type { MedicineDTO } from '@/types/medicine';
import { addToCart } from '@/utils/cart';
import styles from './styles.module.less';

const MedicineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [medicine, setMedicine] = useState<MedicineDTO>();
  const [quantity, setQuantity] = useState(1);

  const fetchMedicineDetail = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await getMedicineDetail(parseInt(id));
      setMedicine(res.data.data);
    } catch (error) {
      console.error('获取药品详情失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicineDetail();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleQuantityChange = (value: number | null) => {
    if (value && value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!medicine) return;
    
    const images = medicine.images?.split(',').filter(Boolean) || [];
    const firstImage = images[0];

    addToCart({
      id: medicine.id!,
      name: medicine.name,
      image: firstImage || '/images/fallback.png',
      price: medicine.price!,
      quantity,
      stock: medicine.stock!,
    });

    message.success('已添加到购物车');
  };

  const handleBuyNow = () => {
    if (!medicine) return;
    
    const images = medicine.images?.split(',').filter(Boolean) || [];
    const firstImage = images[0];

    addToCart({
      id: medicine.id!,
      name: medicine.name,
      image: firstImage || '/images/fallback.png',
      price: medicine.price!,
      quantity,
      stock: medicine.stock!,
    });

    navigate('/user/cart');
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  if (!medicine) {
    return (
      <Card className={styles.medicineDetail}>
        <Empty description="暂无药品信息" />
      </Card>
    );
  }

  const images = medicine.images?.split(',').filter(Boolean) || [];

  return (
    <div className={styles.medicineDetail}>
      {/* 面包屑导航 */}
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <HomeOutlined />
            <span onClick={() => navigate('/')} className={styles.breadcrumbLink}>首页</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span onClick={() => navigate('/medicine')} className={styles.breadcrumbLink}>药品商城</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{medicine.categoryName}</Breadcrumb.Item>
          <Breadcrumb.Item>{medicine.name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* 主要内容区域 */}
      <Card className={styles.mainCard}>
        <Row gutter={[32, 32]}>
          {/* 左侧图片区域 */}
          <Col xs={24} lg={12}>
            <div className={styles.gallery}>
              {images.length > 0 ? (
                <div className={styles.imageContainer}>
                  <Carousel autoplay className={styles.carousel} dots={{ className: styles.carouselDots }}>
                    {images.map((image, index) => (
                      <div key={index} className={styles.imageWrapper}>
                        <Image
                          src={image}
                          alt={`${medicine.name}-${index + 1}`}
                          className={styles.image}
                          fallback="/images/fallback.png"
                          preview={{
                            mask: '点击预览'
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                  {/* 图片数量指示器 */}
                  <div className={styles.imageCount}>
                    {images.length} 张图片
                  </div>
                </div>
              ) : (
                <div className={styles.noImage}>
                  <Empty description="暂无图片" />
                </div>
              )}
            </div>

            {/* 图片下方的药品信息 */}
            <div className={styles.medicineInfoBelow}>
              {/* 药品描述 */}
              <div className={styles.descriptionSection}>
                <h3 className={styles.sectionTitle}>
                  <MedicineBoxOutlined className={styles.sectionIcon} />
                  药品描述
                </h3>
                <div className={styles.descriptionContent}>
                  {medicine.description || '暂无详细描述信息'}
                </div>
              </div>

              {/* 用法用量 */}
              <div className={styles.usageSection}>
                <h3 className={styles.sectionTitle}>
                  <ExperimentOutlined className={styles.sectionIcon} />
                  用法用量
                </h3>
                <div className={styles.usageContent}>
                  {(medicine as any).usage || '请遵医嘱使用，或按药品说明书使用'}
                </div>
              </div>

              {/* 注意事项 */}
              <div className={styles.warningSection}>
                <h3 className={styles.sectionTitle}>
                  <ExclamationCircleOutlined className={styles.sectionIcon} />
                  注意事项
                </h3>
                <div className={styles.warningContent}>
                  {(medicine as any).precautions || '使用前请仔细阅读说明书，如有不适请及时就医'}
                </div>
              </div>
            </div>
          </Col>

          {/* 右侧购买信息区域 */}
          <Col xs={24} lg={12}>
            <div className={styles.productInfo}>
              {/* 药品标题 */}
              <div className={styles.titleSection}>
                <h1 className={styles.productTitle}>{medicine.name}</h1>
                <div className={styles.titleActions}>
                  <Button type="text" icon={<HeartOutlined />} className={styles.actionBtn}>
                    收藏
                  </Button>
                  <Button type="text" icon={<ShareAltOutlined />} className={styles.actionBtn}>
                    分享
                  </Button>
                </div>
              </div>

              {/* 评分和标签 */}
              <div className={styles.ratingSection}>
                <Rate disabled defaultValue={4.5} allowHalf className={styles.rating} />
                <span className={styles.ratingText}>4.5分 (128条评价)</span>
                <Tag color="green" className={styles.categoryTag}>{medicine.categoryName}</Tag>
              </div>

              {/* 价格区域 */}
              <div className={styles.priceSection}>
                <div className={styles.currentPrice}>
                  <span className={styles.priceSymbol}>￥</span>
                  <span className={styles.priceAmount}>{medicine.price?.toFixed(2)}</span>
                </div>
                <div className={styles.priceInfo}>
                  <span className={styles.originalPrice}>原价：￥{(medicine.price! * 1.2).toFixed(2)}</span>
                  <Tag color="red" className={styles.discountTag}>限时优惠</Tag>
                </div>
              </div>

              {/* 基本信息 */}
              <div className={styles.basicInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>生产厂家：</span>
                  <span className={styles.infoValue}>{medicine.manufacturer}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>药品规格：</span>
                  <span className={styles.infoValue}>{medicine.specification}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>库存数量：</span>
                  <span className={`${styles.infoValue} ${medicine.stock! > 10 ? styles.stockHigh : styles.stockLow}`}>
                    {medicine.stock}件
                  </span>
                </div>
              </div>

              {/* 购买选项 */}
              <div className={styles.purchaseSection}>
                <div className={styles.quantitySelector}>
                  <span className={styles.quantityLabel}>购买数量：</span>
                  <InputNumber
                    min={1}
                    max={medicine.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className={styles.quantityInput}
                    size="large"
                  />
                  <span className={styles.quantityUnit}>件</span>
                </div>

                <div className={styles.totalPrice}>
                  <span className={styles.totalLabel}>小计：</span>
                  <span className={styles.totalAmount}>￥{(medicine.price! * quantity).toFixed(2)}</span>
                </div>

                <div className={styles.actionButtons}>
                  <Button
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    className={styles.addToCartBtn}
                  >
                    加入购物车
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingOutlined />}
                    onClick={handleBuyNow}
                    className={styles.buyNowBtn}
                    danger
                  >
                    立即购买
                  </Button>
                </div>
              </div>

              {/* 服务保障 */}
              <div className={styles.serviceSection}>
                <div className={styles.serviceItem}>
                  <SafetyCertificateOutlined className={styles.serviceIcon} />
                  <span>正品保障</span>
                </div>
                <div className={styles.serviceItem}>
                  <TruckOutlined className={styles.serviceIcon} />
                  <span>快速配送</span>
                </div>
                <div className={styles.serviceItem}>
                  <CustomerServiceOutlined className={styles.serviceIcon} />
                  <span>专业服务</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 详细信息区域 */}
      <div className={styles.detailSection}>
        <Card className={styles.detailCard}>
          <div className={styles.detailTabs}>
            <div className={styles.tabHeader}>
              <h3>药品详情</h3>
            </div>

            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                {medicine.description && (
                  <div className={styles.detailItem}>
                    <h4 className={styles.detailTitle}>
                      <span className={styles.detailIcon}>📋</span>
                      药品描述
                    </h4>
                    <div className={styles.detailContent}>{medicine.description}</div>
                  </div>
                )}

                {medicine.usageMethod && (
                  <div className={styles.detailItem}>
                    <h4 className={styles.detailTitle}>
                      <span className={styles.detailIcon}>💊</span>
                      用法用量
                    </h4>
                    <div className={styles.detailContent}>{medicine.usageMethod}</div>
                  </div>
                )}
              </Col>

              <Col xs={24} lg={12}>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailTitle}>
                    <span className={styles.detailIcon}>ℹ️</span>
                    基本信息
                  </h4>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoGridItem}>
                      <span className={styles.gridLabel}>药品名称</span>
                      <span className={styles.gridValue}>{medicine.name}</span>
                    </div>
                    <div className={styles.infoGridItem}>
                      <span className={styles.gridLabel}>药品分类</span>
                      <span className={styles.gridValue}>
                        <Tag color="blue">{medicine.categoryName}</Tag>
                      </span>
                    </div>
                    <div className={styles.infoGridItem}>
                      <span className={styles.gridLabel}>生产厂家</span>
                      <span className={styles.gridValue}>{medicine.manufacturer}</span>
                    </div>
                    <div className={styles.infoGridItem}>
                      <span className={styles.gridLabel}>药品规格</span>
                      <span className={styles.gridValue}>{medicine.specification}</span>
                    </div>
                  </div>
                </div>

                {medicine.contraindication && (
                  <div className={`${styles.detailItem} ${styles.warningItem}`}>
                    <h4 className={styles.detailTitle}>
                      <span className={styles.detailIcon}>⚠️</span>
                      用药禁忌
                    </h4>
                    <div className={styles.detailContent}>{medicine.contraindication}</div>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </Card>
      </div>

      {/* 返回顶部按钮 */}
      <div className={styles.backToTop}>
        <Button
          type="primary"
          shape="circle"
          icon={<LeftOutlined />}
          onClick={handleBack}
          size="large"
          className={styles.backBtn}
        />
      </div>
    </div>
  );
};

export default MedicineDetail; 
