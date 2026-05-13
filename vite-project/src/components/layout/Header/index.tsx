import React from 'react';
import { Layout, Badge, Space, Button, Avatar, Dropdown } from 'antd';
import { 
  ShoppingCartOutlined, 
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ShoppingOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout as logoutAction } from '@/store/slices/authSlice';
import { logout as apiLogout } from '@/api/auth';
import { store } from '@/store';
import Logo from './Logo';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import './styles.less';

 

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const cartCount = useAppSelector((state) => (state as any).cart?.totalItems ?? 0);

  // 导航菜单项
  const menuItems = [
    {
      key: 'disease',
      label: '疾病查询',
      children: [
        { key: 'disease-search', label: '疾病搜索' },
        { key: 'disease-category', label: '疾病分类' },
        { key: 'common-disease', label: '常见疾病' }
      ]
    },
    {
      key: 'medicine',
      label: '药品商城',
      children: [
        { key: 'medicine-search', label: '药品搜索' },
        { key: 'medicine-category', label: '药品分类' },
        { key: 'hot-medicine', label: '热销药品' }
      ]
    },
    {
      key: 'ai',
      label: 'AI问诊',
      disabled: !isLoggedIn
    }
  ];

  // 用户下拉菜单
  const userMenu = {
    items: [
      {
        key: 'profile',
        label: '个人中心',
        icon: <ProfileOutlined />,
        onClick: () => navigate('/user/profile')
      },
      {
        key: 'orders',
        label: '我的订单',
        icon: <ShoppingOutlined />,
        onClick: () => navigate('/user/orders')
      },
      {
        key: 'consultHistory',
        label: '我的历史咨询',
        icon: <ProfileOutlined />,
        onClick: () => navigate('/user/consult/history')
      },
      {
        key: 'favorites',
        label: '我的收藏',
        icon: <HeartOutlined />,
        onClick: () => navigate('/user/favorites')
      },
      {
        type: 'divider'
      },
      {
        key: 'logout',
        label: '退出登录',
        icon: <LogoutOutlined />,
        onClick: () => {
            try {
              const token = store.getState().auth.token || '';
              fetch('/api/auth/logout', {
                method: 'POST',
                keepalive: true,
                headers: token ? { Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}` } : {},
              }).catch(() => apiLogout().catch(() => {}));
            } catch {
              apiLogout().catch(() => {});
            }
            dispatch(logoutAction());
          navigate('/');
        }
      }
    ]
  };

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'disease-search':
        navigate('/disease/search');
        break;
      case 'disease-category':
        navigate('/disease/category');
        break;
      case 'medicine-search':
        navigate('/medicine/search');
        break;
      case 'medicine-category':
        navigate('/medicine/category');
        break;
      case 'ai':
        if (isLoggedIn) {
          navigate('/ai/consultation');
        } else {
          navigate('/auth/login');
        }
        break;
      default:
        break;
    }
  };

  return (
    <Header className="header">
      <div className="header-content">
        <Logo />
        
        <Navigation 
          items={menuItems} 
          onClick={handleMenuClick} 
        />
        
        <SearchBar />
        
        <div className="header-right">
          {isLoggedIn ? (
            <>
              <Badge count={cartCount} size="small">
                <ShoppingCartOutlined
                  className="cart-icon"
                  onClick={() => navigate('/user/cart')}
                />
              </Badge>
              <Dropdown menu={userMenu as any} placement="bottomRight">
                <div className="user-info">
                  <Avatar src={userInfo?.avatar} icon={<UserOutlined />} />
                  <span className="username">
                    {userInfo?.username}
                    <span style={{
                      display: 'inline-block',
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      marginLeft: 6,
                      backgroundColor: userInfo?.isOnline ? '#52c41a' : '#bfbfbf'
                    }} />
                  </span>
                </div>
              </Dropdown>
            </>
          ) : (
            <Space>
              <Button type="link" onClick={() => navigate('/auth/login')}>
                登录
              </Button>
              <Button type="primary" onClick={() => navigate('/auth/register')}>
                注册
              </Button>
            </Space>
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent; 
