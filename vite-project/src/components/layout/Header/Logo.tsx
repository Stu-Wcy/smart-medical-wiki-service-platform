import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

const HeaderLogo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/')}>
      <Logo showText={true} size="medium" theme="light" />
    </div>
  );
};

export default HeaderLogo;