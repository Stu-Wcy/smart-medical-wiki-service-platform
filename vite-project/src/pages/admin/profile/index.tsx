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
} from 'antd';
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';
import dayjs from 'dayjs';
import { getCurrentUser, updateCurrentUser } from '@/api/auth';
import { uploadFile } from '@/api/common/upload';
import type { UserInfoDTO } from '@/types/auth';
import { useAppDispatch } from '@/store/hooks';
import { updateUserInfo } from '@/store/slices/authSlice';
import styles from './styles.module.less';

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [uploading, setUploading] = useState(false);

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
    <Card className={styles.profile} loading={loading}>
      <div className={styles.avatar}>
        <Upload
          name="file"
          listType="picture-circle"
          showUploadList={false}
          customRequest={customRequest}
          beforeUpload={beforeUpload}
        >
          {imageUrl ? (
            <Avatar
              size={100}
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
          <Space>
            <Button type="primary" htmlType="submit">
              保存
            </Button>

          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Profile; 