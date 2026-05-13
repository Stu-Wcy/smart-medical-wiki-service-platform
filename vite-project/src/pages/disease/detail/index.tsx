import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Breadcrumb, Tag, Image, Divider, Skeleton, Empty } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { getDiseaseDetail } from '@/api/disease';
import type { DiseaseDTO } from '@/types/disease';
import styles from './styles.module.less';

const DiseaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [disease, setDisease] = useState<DiseaseDTO>();

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await getDiseaseDetail(Number(id));
        setDisease(res.data.data);
      } catch (error) {
        console.error('获取疾病详情失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <Card className={styles.diseaseDetail}>
        <Skeleton active paragraph={{ rows: 10 }} />
      </Card>
    );
  }

  if (!disease) {
    return (
      <Card className={styles.diseaseDetail}>
        <Empty description="未找到相关疾病信息" />
      </Card>
    );
  }

  const images = disease.images?.split(',').filter(Boolean) || [];

  return (
    <div className={styles.diseaseDetail}>
      <Card>
        <div className={styles.header}>
          <Breadcrumb
            items={[
              {
                title: (
                  <a onClick={() => navigate('/disease/list')}>
                    <LeftOutlined /> 返回列表
                  </a>
                ),
              },
              {
                title: disease.name,
              },
            ]}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.title}>
            <h1>{disease.name}</h1>
            <Tag color="blue">{disease.categoryName}</Tag>
          </div>

          {images.length > 0 && (
            <div className={styles.images}>
              <Image.PreviewGroup>
                {images.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt={`${disease.name}-${index + 1}`}
                    width={250}
                    height={180}
                    style={{ objectFit: 'cover' }}
                    fallback="/images/fallback.png"
                  />
                ))}
              </Image.PreviewGroup>
            </div>
          )}

          {disease.symptoms && (
            <div className={styles.section}>
              <Divider orientation="left">症状描述</Divider>
              <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: disease.symptoms.replace(/\n/g, '<br/>') }} />
            </div>
          )}

          {disease.causes && (
            <div className={styles.section}>
              <Divider orientation="left">病因分析</Divider>
              <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: disease.causes.replace(/\n/g, '<br/>') }} />
            </div>
          )}

          {disease.treatment && (
            <div className={styles.section}>
              <Divider orientation="left">治疗方案</Divider>
              <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: disease.treatment.replace(/\n/g, '<br/>') }} />
            </div>
          )}

          {disease.prevention && (
            <div className={styles.section}>
              <Divider orientation="left">预防措施</Divider>
              <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: disease.prevention.replace(/\n/g, '<br/>') }} />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DiseaseDetail;