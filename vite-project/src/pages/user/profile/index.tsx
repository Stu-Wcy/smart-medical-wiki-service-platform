import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  message,
  Radio,
  DatePicker,
  Upload,
  Avatar,
  Space,
  Modal,
} from 'antd';
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';
import dayjs from 'dayjs';
import { getCurrentUser, updateCurrentUser } from '@/api/auth';
import { uploadFile } from '@/api/common/upload';
import type { UserInfoDTO } from '@/types/auth';
import { useAppDispatch } from '@/store/hooks';
import { updateUserInfo } from '@/store/slices/authSlice';
import { changePassword } from '@/api/auth';
import styles from './styles.module.less';

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [uploading, setUploading] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [pwdForm] = Form.useForm();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const res = await getCurrentUser();
      const userInfo = res.data.data;
      form.setFieldsValue({
        ...userInfo,
        birthDate: userInfo.birthDate ? dayjs(userInfo.birthDate) : undefined,
      });
      setImageUrl(userInfo.avatar);
    } catch (error) {
      console.error('获取用户信息失败:', error);
      message.error('获取用户信息失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const data: Partial<UserInfoDTO> = {
        ...values,
        avatar: imageUrl,
        birthDate: values.birthDate?.format('YYYY-MM-DD'),
      };
      const res = await updateCurrentUser(data);
      message.success('更新成功');
      dispatch(updateUserInfo(res.data.data));
    } catch (error) {
      console.error('更新用户信息失败:', error);
      message.error('更新用户信息失败');
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const customRequest = async (options: any) => {
    const { file, onSuccess, onError } = options;
    try {
      setUploading(true);
      const res = await uploadFile(file, 'avatar');
      setImageUrl(res.data.data);
      onSuccess(res, file);
    } catch (error) {
      console.error('上传头像失败:', error);
      message.error('上传头像失败');
      onError(error);
    } finally {
      setUploading(false);
    }
  };

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </div>
  );

  return (
    <div className={styles.profile}>
      <Card title="个人资料" bordered={false}>
        <div className={styles.avatar}>
          <Upload
            name="file"
            listType="picture-circle"
            showUploadList={false}
            customRequest={customRequest}
            beforeUpload={beforeUpload}
            className={styles.uploadAvatar}
          >
            {imageUrl ? (
              <Avatar
                size={128}
                src={imageUrl}
                icon={<UserOutlined />}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className={styles.form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="真实姓名"
            name="realName"
            rules={[{ required: true, message: '请输入真实姓名' }]}
          >
            <Input placeholder="请输入真实姓名" />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱格式' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            label="性别"
            name="gender"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Radio.Group>
              <Radio value="MALE">男</Radio>
              <Radio value="FEMALE">女</Radio>
              <Radio value="UNKNOWN">保密</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="出生日期"
            name="birthDate"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Space size="middle">
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={() => setPasswordModalVisible(true)}>
                修改密码
              </Button>

            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        title="修改密码"
        open={passwordModalVisible}
        onCancel={() => setPasswordModalVisible(false)}
        onOk={async () => {
          try {
            const values = await pwdForm.validateFields();
            await changePassword({
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
              confirmPassword: values.confirmPassword,
            });
            message.success('密码修改成功，请重新登录');
            dispatch(updateUserInfo({ token: undefined } as any));
            window.location.href = '/auth/login';
          } catch (err: any) {
            if (err?.errorFields) return;
            message.error(err?.message || '密码修改失败');
          }
        }}
        okText="提交"
        cancelText="取消"
      >
        <Form form={pwdForm} layout="vertical">
          <Form.Item
            label="当前密码"
            name="currentPassword"
            rules={[{ required: true, message: '请输入当前密码' }]}
          >
            <Input.Password placeholder="请输入当前密码" />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              { required: true, message: '请输入新密码' },
              { validator: (_, value) => {
                const ok = value && value.length >= 8
                  && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value);
                return ok ? Promise.resolve() : Promise.reject('至少8位，包含大小写字母和数字');
              } }
            ]}
          >
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>
          <Form.Item
            label="确认新密码"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '请确认新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次输入的新密码不一致');
                },
              }),
            ]}
          >
            <Input.Password placeholder="请再次输入新密码" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}; 

export default Profile; 
