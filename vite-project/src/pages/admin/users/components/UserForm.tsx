import React, { useEffect } from 'react';
import { Form, Input, Modal, Select, Upload, message, DatePicker } from 'antd';
import { useAppDispatch } from '@/store/hooks';
import { addUser, updateUser } from '@/store/slices/adminUserSlice';
import type { UserInfoDTO } from '@/types/admin/user';
import { 
  Gender, 
  RoleType, 
  UserStatus, 
  GENDER_MAP, 
  ROLE_TYPE_MAP, 
  USER_STATUS_MAP,
} from '@/constants/enums';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { uploadFile } from '@/api/common/upload';
import dayjs from 'dayjs';
import { getEnumValue1 } from '@/constants/enums';
import { getDoctors } from '@/api/admin/doctor';
import { getDoctorUserByUserId, bindDoctorUser } from '@/api/admin/doctorUser';

interface UserFormProps {
  open: boolean;
  title: string;
  initialValues?: Partial<UserInfoDTO>;
  onCancel: () => void;
  onSuccess: () => void;
}

const { Option } = Select;

const UserForm: React.FC<UserFormProps> = ({
  open,
  title,
  initialValues,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const isEdit = !!initialValues?.id;
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string>();
  const [doctorOptions, setDoctorOptions] = React.useState<Array<{label: string; value: number}>>([]);

  useEffect(() => {
    if (open && initialValues) {
      console.log('initialValues', initialValues,getEnumValue1(Gender, initialValues.gender as any))
      form.setFieldsValue({
        ...initialValues,
        gender: getEnumValue1(Gender, initialValues.gender as any) ,
        roleType: getEnumValue1(RoleType, initialValues.roleType as any),
        status:  getEnumValue1(UserStatus, initialValues.status as any),
        birthDate: initialValues.birthDate ? dayjs(initialValues.birthDate) : undefined,
      });
      setImageUrl(initialValues.avatar);
      if (getEnumValue1(RoleType, initialValues.roleType as any) === RoleType.DOCTOR) {
        getDoctors({ page: 1, size: 100 })
          .then(res => {
            const payload: any = res.data.data;
            const list = payload?.content || payload?.list || [];
            setDoctorOptions(list.map((d: any) => ({ label: `${d.name} (${d.title})`, value: d.id })));
          })
          .catch(() => {});
        if (initialValues.id) {
          getDoctorUserByUserId(initialValues.id)
            .then(res => {
              const du = res.data.data;
              if (du?.doctorId) {
                form.setFieldsValue({ boundDoctorId: du.doctorId });
              }
            })
            .catch(() => {});
        }
      }
    } else {
      form.resetFields();
      setImageUrl(undefined);
      setDoctorOptions([]);
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const userData = {
        ...values,
        avatar: imageUrl,
        birthDate: values.birthDate?.format('YYYY-MM-DD'),
      };

      if (isEdit) {
        const updated = await dispatch(updateUser({ ...userData, id: initialValues!.id })).unwrap();
        if (userData.roleType === RoleType.DOCTOR && userData.boundDoctorId) {
          await bindDoctorUser(updated.id ?? initialValues!.id!, userData.boundDoctorId);
        }
      } else {
        const created = await dispatch(addUser(userData)).unwrap();
        if (userData.roleType === RoleType.DOCTOR && userData.boundDoctorId) {
          await bindDoctorUser(created.id!, userData.boundDoctorId);
        }
      }

      onSuccess();
      form.resetFields();
    } catch (error) {
      console.error('表单验证或提交失败:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setImageUrl(undefined);
    onCancel();
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件！');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB！');
      return false;
    }
    return true;
  };

  const handleUpload = async (file: File) => {
    try {
      setLoading(true);
      const response = await uploadFile(file, 'avatars');
      if (response.data) {
        setImageUrl(response.data.data);
        message.success('上传成功！');
      }
    } catch (error) {
      message.error('上传失败，请重试！');
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </div>
  );

  return (
    <Modal
      open={open}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
      >
        {!isEdit && (
          <>
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                { required: true, message: '请输入用户名' },
                { min: 4, message: '用户名至少4个字符' },
                { max: 20, message: '用户名最多20个字符' },
              ]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6个字符' },
                { max: 20, message: '密码最多20个字符' },
              ]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
          </>
        )}

        <Form.Item
          name="realName"
          label="真实姓名"
          rules={[
            { max: 50, message: '真实姓名最多50个字符' },
          ]}
        >
          <Input placeholder="请输入真实姓名" />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { type: 'email', message: '请输入有效的邮箱地址' },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="手机号"
          rules={[
            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item
          label="头像"
        >
          <Upload
            name="file"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={({ file }) => handleUpload(file as File)}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="头像" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          name="gender"
          label="性别"
          initialValue={Gender.UNKNOWN}
        >
          <Select placeholder="请选择性别">
            {Object.values(GENDER_MAP).map(({ text, value }) => (
              <Option key={value} value={value}>{text}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="birthDate"
          label="出生日期"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="roleType"
          label="角色"
          initialValue={RoleType.USER}
        >
          <Select placeholder="请选择角色">
            {Object.values(ROLE_TYPE_MAP).map(({ text, value }) => (
              <Option key={value} value={value}>{text}</Option>
            ))}
          </Select>
        </Form.Item>
        
        {form.getFieldValue('roleType') === RoleType.DOCTOR && (
          <Form.Item
            name="boundDoctorId"
            label="绑定医生"
            rules={[{ required: true, message: '请选择绑定的医生' }]}
          >
            <Select
              placeholder="请选择医生"
              options={doctorOptions}
              showSearch
              filterOption={(input, option) => ((option?.label as string) || '').toLowerCase().includes(input.toLowerCase())}
            />
          </Form.Item>
        )}

        {isEdit && (
          <Form.Item
            name="status"
            label="状态"
            initialValue={UserStatus.NORMAL}
          >
            <Select placeholder="请选择状态">
              {Object.values(USER_STATUS_MAP).map(({ text, value }) => (
                <Option key={value} value={value}>{text}</Option>
              ))}
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default UserForm; 
