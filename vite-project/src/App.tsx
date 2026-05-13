import React, { useEffect, useRef } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, App as AntApp, message } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import router from './router';
import { useAppSelector } from './store/hooks';
import { heartbeat } from './api/user';
import { logout } from './api/auth';
import { store } from './store';

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const hbTimerRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (isLoggedIn) {
      const sendHeartbeat = () => {
        heartbeat().catch(() => {});
      };
      sendHeartbeat();
      hbTimerRef.current = window.setInterval(sendHeartbeat, 2 * 60 * 1000);
      
      const onUnload = () => {
        try {
          const token = store.getState().auth.token || '';
          fetch('/api/auth/logout', {
            method: 'POST',
            keepalive: true,
            headers: token ? { Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}` } : {},
          }).catch(() => {});
        } catch {
          logout().catch(() => {});
        }
      };
      window.addEventListener('beforeunload', onUnload);
      return () => {
        if (hbTimerRef.current) {
          clearInterval(hbTimerRef.current);
          hbTimerRef.current = null;
        }
        window.removeEventListener('beforeunload', onUnload);
      };
    }
    return;
  }, [isLoggedIn]);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
        components: {
          Message: {
            zIndexPopup: 1100,
          },
        },
      }}
    >
      <AntApp>

        {contextHolder}
        <RouterProvider router={router} />
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
