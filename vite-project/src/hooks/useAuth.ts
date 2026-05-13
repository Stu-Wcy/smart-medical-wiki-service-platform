import { useAppSelector } from '@/store/hooks';
import { RoleType } from '@/types/auth';

export const useAuth = () => {
  const { isLoggedIn, userInfo } = useAppSelector((state) => state.auth);

  const hasRole = (roles: RoleType | RoleType[]): boolean => {
    if (!isLoggedIn || !userInfo) return false;
    
    const rolesToCheck = Array.isArray(roles) ? roles : [roles];
    return userInfo?.roleType ? rolesToCheck.includes(userInfo.roleType) : false;
  };

  const isAdmin = (): boolean => {
    return hasRole('ADMIN');
  };
  const isDoctor = (): boolean => {
        return hasRole('DOCTOR');
    };
  const isUser = (): boolean => {
    return hasRole(['USER', 'ADMIN']); // 管理员也具有普通用户权限
  };

  return {
    isLoggedIn,
    userInfo,
    hasRole,
    isAdmin,
    isUser, isDoctor
  };
};

export default useAuth; 
