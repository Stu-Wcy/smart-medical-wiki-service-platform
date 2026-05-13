import React from 'react';
import { Typography } from 'antd';
import styles from './styles.module.less';

const { Text } = Typography;

interface LogoProps {
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
  theme?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({
  showText = true,
  size = 'medium',
  theme = 'light'
}) => {
  return (
    <div className={`${styles.logo} ${styles[size]} ${styles[theme]}`}>
      <div className={styles.iconContainer}>
        <svg className={styles.icon} viewBox="0 0 48 48" fill="none">
          {/* 医疗十字 */}
          <rect x="20" y="8" width="8" height="32" rx="2" className={styles.cross} />
          <rect x="12" y="16" width="24" height="8" rx="2" className={styles.cross} />

          {/* 心跳线 */}
          <path
            d="M4 24 L8 24 L12 16 L16 32 L20 12 L24 28 L28 20 L32 24 L36 24 L40 16 L44 24"
            stroke="url(#heartbeat)"
            strokeWidth="2"
            fill="none"
            className={styles.heartbeat}
          />

          {/* 渐变定义 */}
          <defs>
            <linearGradient id="crossGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4facfe" />
              <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>
            <linearGradient id="heartbeat" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="50%" stopColor="#ee5a24" />
              <stop offset="100%" stopColor="#ff6b6b" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {showText && (
        <div className={styles.textContainer}>
          <Text className={styles.text}>
            <span className={styles.wise}>Chip</span>
            <span className={styles.medi}>GrdMd</span>
          </Text>
          <Text className={styles.tagline}>芯护医疗</Text>
        </div>
      )}
    </div>
  );
};

export default Logo;