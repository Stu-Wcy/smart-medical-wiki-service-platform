import React from 'react';
import {Layout, Menu, Button, Dropdown, Avatar, Space} from 'antd';
import type {MenuProps} from 'antd';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {
    UserOutlined,
    ShoppingCartOutlined,
    LogoutOutlined,
    SettingOutlined,
    TeamOutlined,
    CalendarOutlined, ShoppingOutlined,
} from '@ant-design/icons';
import useAuth from '@/hooks/useAuth';
import {useAppDispatch} from '@/store/hooks';
import { logout as logoutAction } from '@/store/slices/authSlice';
import { logout as apiLogout } from '@/api/auth';
import { store } from '@/store';
import {clearAuthStorage} from '@/utils/auth';
import Logo from '@/components/Logo';
import styles from './styles.module.less';


const {Header: AntHeader} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {isLoggedIn, userInfo, isAdmin, isDoctor} = useAuth();

    const handleLogout = () => {
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
        clearAuthStorage();
        navigate('/auth/login');
    };

    const userMenuItems: MenuItem[] = [
        {
            key: 'profile',
            label: '个人资料',
            icon: <UserOutlined/>,
            onClick: () => navigate('/user/profile'),
        },
        {
            key: 'patients',
            label: '就诊人管理',
            icon: <TeamOutlined/>,
            onClick: () => navigate('/user/patients'),
        },
        {
            key: 'appointments',
            label: '我的预约',
            icon: <CalendarOutlined/>,
            onClick: () => navigate('/user/appointments'),
        },
        {
            key: 'consultHistory',
            label: '我的历史咨询',
            icon: <CalendarOutlined/>,
            onClick: () => navigate('/user/consult/history'),
        },
        {
            key: 'cart',
            label: '购物车',
            icon: <ShoppingOutlined/>,
            onClick: () => navigate('/user/cart'),
        },
        {
            key: 'orders',
            label: '我的订单',
            icon: <ShoppingCartOutlined/>,
            onClick: () => navigate('/user/order/list'),
        },
        ...(isAdmin() ? [{
            key: 'admin',
            label: '管理后台',
            icon: <SettingOutlined/>,
            onClick: () => navigate('/admin/dashboard'),
        }] : []),
        ...(isDoctor() ? [{
            key: 'doctor',
            label: '管理后台',
            icon: <SettingOutlined/>,
            onClick: () => navigate('/doctor'),
        }] : []),
        {
            type: 'divider',
        } as MenuItem,
        {
            key: 'logout',
            label: '退出登录',
            icon: <LogoutOutlined/>,
            onClick: handleLogout,
        },
    ];

    const mainMenuItems: MenuItem[] = [
        {
            key: 'home',
            label: <Link to="/">首页</Link>,
        },
        {
            key: 'hospital',
            label: <Link to="/hospital/list">热门医院</Link>,
        },
        {
            key: 'department',
            label: <Link to="/department/list">科室查询</Link>,
        },
        {
            key: 'appointment',
            label: <Link to="/user/appointment">预约挂号</Link>,
        },
        {
            key: 'medicine',
            label: <Link to="/medicine/list">药品购买</Link>,
        },
        {
            key: 'disease',
            label: <Link to="/disease/list">疾病百科</Link>,
        },
        {
            key: 'consult',
            label: <Link to="/consult/list">线上咨询</Link>,
        },
        {
            key: 'consultation',
            label: <Link to="/ai/consultation">🤖AI问诊</Link>,
        },
    ];

    // 获取当前激活的菜单项
    const getSelectedKey = () => {
        const path = location.pathname;
        if (path === '/') return 'home';
        return mainMenuItems.find(item => path.startsWith(`/${item?.key}`))?.key?.toString() || '';
    };

    return (
        <AntHeader className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">
                        <Logo/>
                    </Link>
                </div>

                <Menu
                    mode="horizontal"
                    selectedKeys={[getSelectedKey()]}
                    items={mainMenuItems}
                    className={styles.menu}
                />

                <div className={styles.actions}>
                    {isLoggedIn ? (
                        <>
                            <Dropdown
                                menu={{items: userMenuItems}}
                                placement="bottomRight"
                                arrow
                            >
                                <Space className={styles.userInfo}>
                                    <Avatar
                                        src={userInfo?.avatar}
                                        icon={<UserOutlined/>}
                                        size="small"
                                    />
                                    <span>{userInfo?.nickname || userInfo?.username}</span>
                                </Space>
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
        </AntHeader>
    );
};

export default Header; 
