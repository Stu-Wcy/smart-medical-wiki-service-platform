import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Space } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  CalendarOutlined,
  MedicineBoxOutlined,
  BugOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, selectCurrentUser } from '@/store/slices/authSlice';
import Logo from '@/components/Logo';
import styles from './styles.module.less';

const { Header, Sider, Content } = Layout;

const DoctorLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const menuItems = [
    {
      key: '/doctor/appointments',
      icon: <CalendarOutlined />,
      label: '我的预约',
    },
    {
      key: '/doctor/consultations',
      icon: <CommentOutlined />,
      label: '咨询管理',
    },
    {
      key: '/doctor/medicines',
      icon: <MedicineBoxOutlined />,
      label: '药品管理',
    },
    {
      key: '/doctor/diseases',
      icon: <BugOutlined />,
      label: '疾病管理',
    },
  ];

  const userMenuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '回到前台',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const getSelectedKey = () => [location.pathname];

  const handleMenuClick = (key: string) => navigate(key);

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      dispatch(logout());
      navigate('/auth/login');
    } else if (key === 'home') {
      navigate('/');
    }
  };

  return (
    <Layout className={styles.adminLayout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo}>
          {collapsed ? (
            <Logo showText={false} size="small" theme="dark" />
          ) : (
            <Logo showText={true} size="small" theme="dark" />
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKey()}
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.headerLeft}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: styles.trigger,
              onClick: () => setCollapsed(!collapsed),
            })}
          </div>
          <div className={styles.headerRight}>
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick,
              }}
              placement="bottomRight"
            >
              <Space className={styles.userInfo}>
                <Avatar src={currentUser?.avatar} icon={<UserOutlined />} />
                <span className={styles.username}>{currentUser?.username}</span>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DoctorLayout;
