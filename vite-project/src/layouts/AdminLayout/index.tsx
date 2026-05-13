import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Space } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  BugOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingOutlined,
  HomeOutlined,
  CommentOutlined,
  RobotOutlined,
  BankOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, selectCurrentUser } from '@/store/slices/authSlice';
import Logo from '@/components/Logo';
import styles from './styles.module.less';

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  // 菜单项配置
  const menuItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: '首页',
    },
    {
      key: 'hospitals',
      icon: <BankOutlined />,
      label: '医院管理',
      children: [
        {
          key: '/admin/hospitals',
          label: '医院列表',
        },
        {
          key: '/admin/departments',
          label: '科室管理',
        },
        {
          key: '/admin/department/categories',
          label: '科室分类',
        },
        {
          key: '/admin/doctors',
          label: '医生管理',
        },
        {
          key: '/admin/patients',
          label: '就诊人管理',
        },
        {
          key: '/admin/schedules',
          label: '排班管理',
        },
        {
          key: '/admin/appointments',
          label: '预约管理',
        },
      ],
    },
    {
      key: 'medicines',
      icon: <MedicineBoxOutlined />,
      label: '药品管理',
      children: [
        {
          key: '/admin/medicines',
          label: '药品列表',
        },
        {
          key: '/admin/medicines/categories',
          label: '药品分类',
        },
        {
      key: '/admin/orders',
      
      label: '订单管理',
    },
      ],
    },
    {
      key: 'diseases',
      icon: <BugOutlined />,
      label: '疾病管理',
      children: [
        {
          key: '/admin/diseases',
          label: '疾病列表',
        },
        {
          key: '/admin/disease/categories',
          label: '疾病分类',
        },
      ],
    },
    
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: '用户管理',
    },
    {
      key: '/admin/feedbacks',
      icon: <CommentOutlined />,
      label: '意见反馈',
    },
    {
      key: '/admin/consultations',
     icon: <CommentOutlined />,
     label: '咨询记录查看',
    },
    {
      key: '/',
     icon: <ArrowLeftOutlined />,
     label: '返回前台',

    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人信息',
    },
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

  // 获取当前选中的菜单项
  const getSelectedKey = () => {
    return [location.pathname];
  };

  // 处理菜单点击
  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      dispatch(logout());
      navigate('/auth/login');
    } else if (key === 'profile') {
      navigate('/admin/profile');
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
                <Avatar 
                  src={currentUser?.avatar}
                  icon={<UserOutlined />}
                />
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

export default AdminLayout; 
