import React from 'react';
import { Layout, Typography } from 'antd';
import styles from './styles.module.less';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter className={styles.footer}>
      <div className={styles.content}>
        <Text type="secondary">
          © 2025 智慧医疗平台. All rights reserved.
        </Text>
      </div>
    </AntFooter>
  );
};

export default Footer;