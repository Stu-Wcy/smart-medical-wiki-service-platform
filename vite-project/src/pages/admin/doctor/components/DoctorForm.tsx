import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  message,
  Row,
  Col,
  Upload,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { addDoctor, updateDoctor } from '@/api/admin/doctor';
import { uploadFile } from '@/api/common/upload';
import type { Doctor, DoctorAddDTO, DoctorUpdateDTO } from '@/types/doctor';
import type { Hospital } from '@/types/hospital';
import type { Department } from '@/types/department';

const { Option } = Select;
const { TextArea } = Input;

interface DoctorFormProps {
  visible: boolean;
  doctor: Doctor | null;
  hospitals: Hospital[];
  departments: Department[];
  onCancel: () => void;
  onSuccess: () => void;
}

const DoctorForm: React.FC<DoctorFormProps> = ({
  visible,
  doctor,
  hospitals,
  departments,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | undefined>();
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  // 根据选择的医院过滤科室
  const filteredDepartments = departments.filter(dept => 
    !selectedHospitalId || dept.hospitalId === selectedHospitalId
  );

  useEffect(() => {
    if (visible) {
      if (doctor) {
        // 编辑模式
        form.setFieldsValue({
          ...doctor,
          specialties: doctor.specialties?.split(',').join('\n'),
        });
        setSelectedHospitalId(doctor.hospitalId);
        setAvatarUrl(doctor.avatar || '');
      } else {
        // 新增模式
        form.resetFields();
        setSelectedHospitalId(undefined);
        setAvatarUrl('');
      }
    }
  }, [visible, doctor, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // 处理专长字段
      if (values.specialties) {
        values.specialties = values.specialties.split('\n').filter((s: string) => s.trim()).join(',');
      }

      if (doctor) {
        // 更新
        const updateData: DoctorUpdateDTO = {
          id: doctor.id,
          ...values,
        };
        await updateDoctor(updateData);
        message.success('更新成功');
      } else {
        // 新增
        const addData: DoctorAddDTO = values;
        await addDoctor(addData);
        message.success('添加成功');
      }

      onSuccess();
    } catch (error) {
      message.error(doctor ? '更新失败' : '添加失败');
    } finally {
      setLoading(false);
    }
  };

  const handleHospitalChange = (hospitalId: number) => {
    setSelectedHospitalId(hospitalId);
    // 清空科室选择
    form.setFieldValue('departmentId', undefined);
  };

  // 头像上传前的验证
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

  // 处理头像上传
  const handleAvatarUpload = async (file: File) => {
    try {
      setUploading(true);
      const response = await uploadFile(file, 'avatars');
      if (response.data) {
        const url = response.data.data;
        setAvatarUrl(url);
        form.setFieldValue('avatar', url);
        message.success('头像上传成功！');
      }
    } catch (error) {
      message.error('头像上传失败，请重试！');
    } finally {
      setUploading(false);
    }
  };

  // 上传按钮
  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </div>
  );

  return (
    <Modal
      title={doctor ? '编辑医生' : '新增医生'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          status: 1,
          sort: 0,
          consultationFee: 0,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="医生姓名"
              rules={[{ required: true, message: '请输入医生姓名' }]}
            >
              <Input placeholder="请输入医生姓名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="title"
              label="职称"
              rules={[{ required: true, message: '请输入职称' }]}
            >
              <Input placeholder="请输入职称" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="hospitalId"
              label="所属医院"
              rules={[{ required: true, message: '请选择所属医院' }]}
            >
              <Select
                placeholder="请选择所属医院"
                onChange={handleHospitalChange}
              >
                {hospitals.map(hospital => (
                  <Option key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="departmentId" label="所属科室">
              <Select placeholder="请选择所属科室" allowClear>
                {filteredDepartments.map(dept => (
                  <Option key={dept.id} value={dept.id}>
                    {dept.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="specialties"
          label="专长领域"
          help="每行一个专长，系统会自动处理"
        >
          <TextArea
            rows={3}
            placeholder="请输入专长领域，每行一个"
          />
        </Form.Item>

        <Form.Item name="introduction" label="医生简介">
          <TextArea
            rows={4}
            placeholder="请输入医生简介"
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="phone" label="联系电话">
              <Input placeholder="请输入联系电话" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="邮箱">
              <Input placeholder="请输入邮箱" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="education" label="教育背景">
          <Input placeholder="请输入教育背景" />
        </Form.Item>

        <Form.Item name="experience" label="工作经历">
          <TextArea
            rows={3}
            placeholder="请输入工作经历"
          />
        </Form.Item>

        <Form.Item name="achievements" label="主要成就">
          <TextArea
            rows={3}
            placeholder="请输入主要成就"
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="consultationFee" label="挂号费用">
              <InputNumber
                min={0}
                precision={2}
                style={{ width: '100%' }}
                placeholder="请输入挂号费用"
                addonAfter="元"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="status" label="状态">
              <Select>
                <Option value={1}>正常</Option>
                <Option value={0}>停诊</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="sort" label="排序">
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="请输入排序"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="avatar" label="头像">
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={({ file }) => handleAvatarUpload(file as File)}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="头像"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DoctorForm;
