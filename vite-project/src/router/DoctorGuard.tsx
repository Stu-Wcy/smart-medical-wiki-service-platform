import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

interface DoctorGuardProps {
  children: React.ReactNode;
}

const DoctorGuard: React.FC<DoctorGuardProps> = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn, userInfo } = useAppSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (userInfo?.roleType !== 'DOCTOR') {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default DoctorGuard;
