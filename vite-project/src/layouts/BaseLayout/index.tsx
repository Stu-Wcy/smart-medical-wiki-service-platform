import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './styles.less';

const { Content } = Layout;

const BaseLayout: React.FC = () => {
  return (
    <Layout className="base-layout">
      <Header />
      <Content className="content">
        <div className="container">
          <React.Suspense
            fallback={
              <div className="loading">
                <span>加载中...</span>
              </div>
            }
          >
            <Outlet />
          </React.Suspense>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default BaseLayout; 