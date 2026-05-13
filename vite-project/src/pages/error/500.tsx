import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const ServerError: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="500"
      title="500"
      subTitle="抱歉，服务器出现了错误。"
      extra={[
        <Button type="primary" key="retry" onClick={() => window.location.reload()}>
          重试
        </Button>,
        <Button key="back" onClick={() => navigate('/')}>
          返回首页
        </Button>,
      ]}
    />
  );
};

export default ServerError; 