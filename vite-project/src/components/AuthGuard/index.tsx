import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { RoleType } from '@/types/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: RoleType[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRoles }) => {
  const location = useLocation();
  const { isLoggedIn, userInfo, token } = useAppSelector((state) => state.auth);

  // 检查是否登录 - 只要有token就认为已登录
  if (!isLoggedIn && !token) {
    console.log('AuthGuard: 用户未登录，跳转到登录页');
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // 如果有token但没有userInfo，暂时允许通过（可能是页面刷新导致的）
  if (token && !userInfo) {
    console.log('AuthGuard: 有token但无用户信息，允许通过');
  }

  // 检查角色权限
  if (requiredRoles && requiredRoles.length > 0 && userInfo && userInfo.roleType) {
      // 此时 roleType 已确定是 RoleType 类型，无 undefined 风险
    const hasRequiredRole = requiredRoles.includes(userInfo.roleType);
    if (!hasRequiredRole) {
      console.log('AuthGuard: 权限不足，跳转到403页面');
      return <Navigate to="/403" replace />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard; 