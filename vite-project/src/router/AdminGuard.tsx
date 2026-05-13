import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn, userInfo } = useAppSelector((state) => state.auth);

  if (!isLoggedIn) {
    // 未登录时重定向到登录页，并记录当前路径
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (userInfo?.roleType !== 'ADMIN') {
    // 非管理员重定向到403页面
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default AdminGuard; 