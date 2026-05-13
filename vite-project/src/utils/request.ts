import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
const errorRateLimit: Record<string, number> = {};
import { store } from '@/store';

// 不需要携带 token 的白名单路径
const whiteList = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/disease',
  '/api/medicine',
  '/api/public',
  '/api/public/doctors',
  '/api/schedules',
  '/api/hospitals',
  '/api/departments',
  '/api/doctors',
];

// 判断是否在白名单中
const isInWhiteList = (url: string) => {
  return whiteList.some(path => url.startsWith(path));
};

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 如果不在白名单中，且存在 token，则携带 token
    if (!isInWhiteList(config.url || '') && store.getState().auth.token) {
      config.headers = config.headers || {};
      const token = store.getState().auth.token!;
      // 如果token已经包含Bearer前缀，直接使用；否则添加Bearer前缀
      config.headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }

    // 如果是 FormData，删除 Content-Type 让浏览器自动设置
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    // 这里可以根据后端的响应结构进行调整
    if (data.code === 200) {
      return response;
    }
    console.log('response', data)
    message.error(data.message || '请求失败');
    return Promise.reject(new Error(data.message || '请求失败'));
  },
  (error) => {
    console.error('API请求错误:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未登录或 token 过期
          console.error('401错误 - 未授权访问:', error.config?.url);
          // 仅在认证接口返回401时触发登录跳转，避免后台操作误触发退出
          {
            const url = error.config?.url || '';
            if (url.includes('/auth/')) {
              message.error('认证失效，请重新登录');
              store.dispatch({ type: 'auth/logout' });
              window.location.href = '/auth/login';
            } else {
              // 后台接口返回401时仅提示，不自动跳转
              {
                const key = `401:${error.config?.method}:${url}`;
                const now = Date.now();
                if (!errorRateLimit[key] || now - errorRateLimit[key] > 1000) {
                  errorRateLimit[key] = now;
                  message.error('未授权，请检查权限或登录状态');
                }
              }
              console.warn('API需要认证，但不自动跳转:', url);
            }
          }
          break;
        case 403:
          console.error('403错误 - 权限不足:', error.config?.url);
          {
            const url = error.config?.url || '';
            const key = `403:${error.config?.method}:${url}`;
            const now = Date.now();
            if (!errorRateLimit[key] || now - errorRateLimit[key] > 1000) {
              errorRateLimit[key] = now;
              message.error('没有权限访问');
            }
          }
          break;
        case 404:
          console.error('404错误 - 资源不存在:', error.config?.url);
          {
            const url = error.config?.url || '';
            const key = `404:${error.config?.method}:${url}`;
            const now = Date.now();
            if (!errorRateLimit[key] || now - errorRateLimit[key] > 1000) {
              errorRateLimit[key] = now;
              message.error('请求的资源不存在');
            }
          }
          break;
        case 500:
          console.error('500错误 - 服务器错误:', error.config?.url);
          {
            const url = error.config?.url || '';
            const key = `500:${error.config?.method}:${url}`;
            const now = Date.now();
            if (!errorRateLimit[key] || now - errorRateLimit[key] > 1000) {
              errorRateLimit[key] = now;
              message.error('服务器错误');
            }
          }
          break;
        default:
          console.error('其他HTTP错误:', error.response.status, error.config?.url);
          {
            const url = error.config?.url || '';
            const key = `XX:${error.config?.method}:${url}`;
            const now = Date.now();
            if (!errorRateLimit[key] || now - errorRateLimit[key] > 1000) {
              errorRateLimit[key] = now;
              message.error('网络错误');
            }
          }
      }
    } else {
      console.error('网络连接错误:', error.message);
      const key = `NET:${error.message}`;
      const now = Date.now();
      if (!errorRateLimit[key] || now - errorRateLimit[key] > 1000) {
        errorRateLimit[key] = now;
        message.error('网络错误');
      }
    }
    return Promise.reject(error);
  }
);

export default instance; 
