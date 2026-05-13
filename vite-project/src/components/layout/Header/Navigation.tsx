import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation } from 'react-router-dom';

interface NavigationProps {
  items: MenuProps['items'];
  onClick: MenuProps['onClick'];
}

const Navigation: React.FC<NavigationProps> = ({ items, onClick }) => {
  const location = useLocation();
  
  // 根据当前路径获取选中的菜单项
  const getSelectedKeys = () => {
    const path = location.pathname;
    if (path.startsWith('/disease')) return ['disease'];
    if (path.startsWith('/medicine')) return ['medicine'];
    if (path.startsWith('/ai')) return ['ai'];
    return [];
  };

  return (
    <Menu
      mode="horizontal"
      items={items}
      onClick={onClick}
      selectedKeys={getSelectedKeys()}
    />
  );
};

export default Navigation; 