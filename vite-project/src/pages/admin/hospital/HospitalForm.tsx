import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Space,
  Row,
  Col,
  InputNumber,
  message,
  Upload,
} from 'antd';
import type { UploadFile, UploadFileStatus } from 'antd/es/upload/interface';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { adminHospitalApi } from '@/api/admin/hospital';
import { uploadFile } from '@/api/common/upload';
import type {
  Hospital,
  HospitalAddDTO,
  HospitalUpdateDTO,
} from '@/types/hospital';
import {
  HospitalLevel,
  HospitalType,
  HospitalStatus,
  HospitalLevelTextMap,
  HospitalTypeTextMap,
  HospitalStatusTextMap,
} from '@/types/hospital';

const { Option } = Select;
const { TextArea } = Input;

interface HospitalFormProps {
  initialValues?: Hospital | null;
  onSubmit: (values: HospitalAddDTO | HospitalUpdateDTO) => void;
  onCancel: () => void;
}

const HospitalForm: React.FC<HospitalFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // 获取省份列表
  const fetchProvinces = async () => {
    try {
      const response = await adminHospitalApi.getProvinces();
      if (response.data.code === 200) {
        setProvinces(response.data.data);
      }
    } catch (error) {
      console.error('获取省份列表失败', error);
    }
  };

  // 根据省份获取城市列表
  const fetchCities = async (province: string) => {
    try {
      const response = await adminHospitalApi.getCitiesByProvince(province);
      if (response.data.code === 200) {
        setCities(response.data.data);
      }
    } catch (error) {
      console.error('获取城市列表失败', error);
    }
  };

  useEffect(() => {
    fetchProvinces();

    // 如果是编辑模式，设置初始值
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        level: initialValues.level,
        type: initialValues.type,
        status: initialValues.status,
      });

      // 如果有省份，获取对应的城市列表
      if (initialValues.province) {
        fetchCities(initialValues.province);
      }

      // 设置图片列表
      if (initialValues.images) {
        const images = initialValues.images.split(',').filter(img => img.trim());
        const imageFiles: UploadFile[] = images.map((url, index) => ({
          uid: `${index}`,
          name: `image-${index}`,
          status: 'done' as UploadFileStatus,
          url: url.trim(),
        }));
        setFileList(imageFiles);
      }
    } else {
      // 新增模式，设置默认值
      form.setFieldsValue({
        level: HospitalLevel.LEVEL_ONE,
        type: HospitalType.GENERAL,
        status: HospitalStatus.NORMAL,
        sort: 0,
      });
    }
  }, [initialValues, form]);

  // 省份变化
  const handleProvinceChange = (province: string) => {
    form.setFieldsValue({ city: undefined });
    setCities([]);
    if (province) {
      fetchCities(province);
    }
  };

  // 图片上传前验证
  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件！');
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('图片大小不能超过 5MB！');
      return false;
    }
    return true;
  };

  // 自定义上传
  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    try {
      setUploading(true);
      const response = await uploadFile(file, 'hospitals');
      if (response.data) {
        const url = response.data.data;
        const newFile: UploadFile = {
          uid: file.uid,
          name: file.name,
          status: 'done' as UploadFileStatus,
          url: url,
        };
        setFileList(prev => [...prev, newFile]);
        onSuccess(response, file);
        message.success('上传成功！');
      }
    } catch (error) {
      onError(error);
      message.error('上传失败，请重试！');
    } finally {
      setUploading(false);
    }
  };

  // 移除图片
  const handleRemove = (file: UploadFile) => {
    const newFileList = fileList.filter(item => item.uid !== file.uid);
    setFileList(newFileList);
  };

  // 表单提交
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // 将图片列表转换为逗号分隔的字符串
      const images = fileList.map(file => file.url).filter(url => url).join(',');
      const submitData = {
        ...values,
        images: images || undefined,
      };
      await onSubmit(submitData);
    } catch (error) {
      message.error('操作失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        level: HospitalLevel.LEVEL_ONE,
        type: HospitalType.GENERAL,
        status: HospitalStatus.NORMAL,
        sort: 0,
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="医院名称"
            rules={[{ required: true, message: '请输入医院名称' }]}
          >
            <Input placeholder="请输入医院名称" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="level"
            label="医院等级"
            rules={[{ required: true, message: '请选择医院等级' }]}
          >
            <Select placeholder="请选择医院等级">
              {Object.entries(HospitalLevelTextMap).map(([value, text]) => (
                <Option key={value} value={Number(value)}>
                  {text}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="type"
            label="医院类型"
            rules={[{ required: true, message: '请选择医院类型' }]}
          >
            <Select placeholder="请选择医院类型">
              {Object.entries(HospitalTypeTextMap).map(([value, text]) => (
                <Option key={value} value={Number(value)}>
                  {text}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="province"
            label="省份"
            rules={[{ required: true, message: '请选择省份' }]}
          >
            <Select
              placeholder="请选择省份"
              onChange={handleProvinceChange}
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {provinces.map(province => (
                <Option key={province} value={province}>
                  {province}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="city"
            label="城市"
            rules={[{ required: true, message: '请选择城市' }]}
          >
            <Select
              placeholder="请选择城市"
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {cities.map(city => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="district"
            label="区县"
            rules={[{ required: true, message: '请输入区县' }]}
          >
            <Input placeholder="请输入区县" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="address"
        label="详细地址"
        rules={[{ required: true, message: '请输入详细地址' }]}
      >
        <Input placeholder="请输入详细地址" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="phone"
            label="联系电话"
            rules={[
              { pattern: /^[\d-]+$/, message: '请输入正确的电话号码' }
            ]}
          >
            <Input placeholder="请输入联系电话" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { type: 'email', message: '请输入正确的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="website" label="官网地址">
            <Input placeholder="请输入官网地址" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="businessHours" label="营业时间">
            <Input placeholder="如：08:00-17:00" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="longitude" label="经度">
            <InputNumber
              placeholder="请输入经度"
              precision={7}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="latitude" label="纬度">
            <InputNumber
              placeholder="请输入纬度"
              precision={7}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="status" label="状态">
            <Select>
              {Object.entries(HospitalStatusTextMap).map(([value, text]) => (
                <Option key={value} value={Number(value)}>
                  {text}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="sort" label="排序">
            <InputNumber
              placeholder="请输入排序值"
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="description" label="医院简介">
        <TextArea
          placeholder="请输入医院简介"
          rows={4}
          maxLength={1000}
          showCount
        />
      </Form.Item>

      <Form.Item label="医院图片" extra="支持多张图片上传，每张图片不超过5MB">
        <Upload
          listType="picture-card"
          fileList={fileList}
          customRequest={handleUpload}
          beforeUpload={beforeUpload}
          onRemove={handleRemove}
          multiple
        >
          {fileList.length >= 8 ? null : (
            <div>
              {uploading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>上传图片</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            {initialValues ? '更新' : '新增'}
          </Button>
          <Button onClick={onCancel}>取消</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default HospitalForm;
