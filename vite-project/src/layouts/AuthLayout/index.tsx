import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import { Outlet } from 'react-router-dom';
import './styles.less';

const { Content } = Layout;

const AuthLayout: React.FC = () => {
  return (
    <Layout className="auth-layout">
      <Content className="auth-content">
        <Suspense fallback={<div className="loading"><Spin size="large" /></div>}>
          <Outlet />
        </Suspense>
      </Content>
    </Layout>
  );
};

export default AuthLayout; 