import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { setToken, setUserInfo } from '@/store/slices/authSlice';
import { login } from '@/api/auth';
import type { LoginFormData, RoleType } from '@/types/auth';
import styles from './styles.module.less';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleRedirect = (roleType: RoleType) => {
    console.log('roleType', roleType)
    // 如果有上一个路由，且不是登录相关页面，则返回上一个路由
    const previousPath = (location.state as any)?.from?.pathname;
    if (previousPath && !previousPath.startsWith('/auth')) {
      navigate(previousPath, { replace: true });
      return;
    }

    if (roleType === 'ADMIN') {
      navigate('/admin/dashboard', { replace: true });
    } else if (roleType === 'DOCTOR') {
      navigate('/doctor', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  const onFinish = async (values: LoginFormData) => {
    try {
      setLoading(true);
      console.log('values', values)
      const { data } = await login(values);
      console.log('data', data)
      if (data.code === 200 && data.data) {
        const { token, ...userInfo } = data.data;
        if (token && userInfo.roleType) {
          // 分别设置 token 和用户信息
          dispatch(setToken(token));
          dispatch(setUserInfo({
            ...userInfo,
            nickname: userInfo.nickname || userInfo.username,
          }));
          
          messageApi.success('登录成功，欢迎回来！');
          handleRedirect(userInfo.roleType);
        } else {
          messageApi.error('登录失败：未获取到必要信息');
        }
      } else {
        messageApi.error(data.message || '登录失败');
      }
    } catch (error: any) {
      messageApi.error(error.message || '登录失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <div className={styles.header}>
        <h2>欢迎回来</h2>
        <p>登录您的 MediWise 账号，开启健康之旅</p>
      </div>

      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        size="large"
        className={styles.form}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 3, message: '用户名至少3个字符' },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="请输入用户名"
            autoComplete="username"
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少6个字符' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="请输入密码"
            autoComplete="current-password"
            allowClear
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Link className="login-form-forgot" to="/auth/forgot-password">
            忘记密码？
          </Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            登录
          </Button>
        </Form.Item>

        <div className="register-link">
          还没有账号？<Link to="/auth/register">立即注册</Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage; 
