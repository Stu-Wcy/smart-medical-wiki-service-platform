import React from 'react';
import { Modal, Descriptions, Avatar, Tag } from 'antd';
import type { UserInfoDTO } from '@/types/admin/user';
import { 
  Gender, 
  RoleType, 
  UserStatus, 
  GENDER_MAP, 
  ROLE_TYPE_MAP, 
  USER_STATUS_MAP,
  getEnumText,
} from '@/constants/enums';
import dayjs from 'dayjs';

interface UserDetailProps {
  open: boolean;
  user?: UserInfoDTO;
  onCancel: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ open, user, onCancel }) => {
  if (!user) return null;

  const roleColorMap = {
    [RoleType.ADMIN]: 'red', [RoleType.DOCTOR]: 'red',
    [RoleType.USER]: 'blue', [RoleType.VISITOR]: 'default',
  };


  return (
    <Modal
      open={open}
      title="用户详情"
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Avatar
          src={user.avatar}
          size={100}
          style={{ marginBottom: 16 }}
        >
          {!user.avatar && user.username?.charAt(0).toUpperCase()}
        </Avatar>
        <h2>{user.username}</h2>
        {user.nickname && <p style={{ color: '#666' }}>{user.nickname}</p>}
      </div>

      <Descriptions bordered column={2}>
        <Descriptions.Item label="用户ID" span={2}>
          {user.id}
        </Descriptions.Item>
        <Descriptions.Item label="真实姓名" span={2}>
          {user.realName || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="邮箱" span={2}>
          {user.email || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="手机号" span={2}>
          {user.phone || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="性别">
          {getEnumText(GENDER_MAP, Gender[user.gender])}
        </Descriptions.Item>
        <Descriptions.Item label="角色">
          <Tag color={roleColorMap[user.roleType]}>
            {getEnumText(ROLE_TYPE_MAP, RoleType[user.roleType])}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="状态">
          <Tag color={getEnumText(USER_STATUS_MAP, UserStatus[user.status])=='正常' ? 'success' : 'error'}>
            {getEnumText(USER_STATUS_MAP, UserStatus[user.status])}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="出生日期">
          {user.birthDate ? dayjs(user.birthDate).format('YYYY-MM-DD') : '-'}
        </Descriptions.Item>

      </Descriptions>
    </Modal>
  );
};

export default UserDetail; 