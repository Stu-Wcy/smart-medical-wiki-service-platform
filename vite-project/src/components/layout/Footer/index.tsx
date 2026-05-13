import React from 'react';
import { Layout } from 'antd';
import './styles.less';

const { Footer } = Layout;

const FooterComponent: React.FC = () => {
  return (
    <Footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>关于我们</h3>
          <p>MediWise 致力于为用户提供专业的医疗咨询和药品服务</p>
        </div>
        <div className="footer-section">
          <h3>联系方式</h3>
          <p>电话：400-123-4567</p>
          <p>邮箱：support@mediwise.com</p>
        </div>
        <div className="footer-section">
          <h3>快速链接</h3>
          <ul>
            <li>使用指南</li>
            <li>隐私政策</li>
            <li>服务条款</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MediWise. All rights reserved.</p>
      </div>
    </Footer>
  );
};

export default FooterComponent; 