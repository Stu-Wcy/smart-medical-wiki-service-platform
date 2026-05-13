import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Row,
  Col,
} from 'antd';
import type { UploadFile, UploadFileStatus } from 'antd/es/upload/interface';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import type { 
  Department, 
  DepartmentCategory, 
  DepartmentAddDTO, 
  DepartmentUpdateDTO 
} from '@/types/department';
import type { Hospital } from '@/types/hospital';
import { DepartmentStatus, DepartmentStatusTextMap } from '@/types/department';
import {
  addDepartment,
  updateDepartment,
} from '@/api/admin/department';
import { uploadFile } from '@/api/common/upload';

const { TextArea } = Input;
const { Option } = Select;

interface DepartmentFormProps {
  open: boolean;
  initialValues?: Department | null;
  categories: DepartmentCategory[];
  hospitals: Hospital[];
  onSuccess: () => void;
  onCancel: () => void;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  open,
  initialValues,
  categories,
  hospitals,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const isEdit = !!initialValues;
  const title = isEdit ? '编辑科室' : '新增科室';

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
        });

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
        } else {
          setFileList([]);
        }
      } else {
        form.resetFields();
        form.setFieldsValue({
          status: DepartmentStatus.NORMAL,
          sort: 0,
        });
        setFileList([]);
      }
    }
  }, [open, initialValues, form]);

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
    const { file, onSuccess: uploadSuccess, onError } = options;
    try {
      setUploading(true);
      const response = await uploadFile(file, 'departments');
      if (response.data) {
        const url = response.data.data;
        const newFile: UploadFile = {
          uid: file.uid,
          name: file.name,
          status: 'done' as UploadFileStatus,
          url: url,
        };
        setFileList(prev => [...prev, newFile]);
        uploadSuccess(response, file);
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

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // 将图片列表转换为逗号分隔的字符串
      const images = fileList.map(file => file.url).filter(url => url).join(',');
      const submitData = {
        ...values,
        images: images || undefined,
      };

      if (isEdit) {
        const updateData: DepartmentUpdateDTO = {
          id: initialValues!.id,
          ...submitData,
        };
        await updateDepartment(updateData);
        message.success('更新成功');
      } else {
        const addData: DepartmentAddDTO = submitData;
        await addDepartment(addData);
        message.success('新增成功');
      }

      onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error(isEdit ? '更新失败' : '新增失败');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={title}
      open={open}
      onOk={handleSubmit}
      onCancel={onCancel}
      confirmLoading={loading}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        preserve={true}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="科室名称"
              rules={[
                { required: true, message: '请输入科室名称' },
                { max: 100, message: '科室名称最多100个字符' },
              ]}
            >
              <Input placeholder="请输入科室名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="categoryId"
              label="科室分类"
              rules={[
                { required: true, message: '请选择科室分类' },
              ]}
            >
              <Select placeholder="请选择科室分类">
                {categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="hospitalId"
              label="所属医院"
              rules={[
                { required: true, message: '请选择所属医院' },
              ]}
            >
              <Select 
                placeholder="请选择所属医院"
                showSearch
                filterOption={(input, option) =>
                  ((option?.children as unknown as string))?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {hospitals.map((hospital) => (
                  <Option key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="location"
              label="科室位置"
              rules={[
                { max: 200, message: '科室位置最多200个字符' },
              ]}
            >
              <Input placeholder="请输入科室位置" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="联系电话"
              rules={[
                { max: 20, message: '联系电话最多20个字符' },
                { pattern: /^[\d-+()（）\s]*$/, message: '请输入有效的电话号码' },
              ]}
            >
              <Input placeholder="请输入联系电话" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="sort"
              label="排序"
              rules={[
                { required: true, message: '请输入排序值' },
                { type: 'number', min: 0, message: '排序值不能小于0' },
              ]}
            >
              <InputNumber
                placeholder="请输入排序值"
                style={{ width: '100%' }}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="status"
              label="状态"
              rules={[
                { required: true, message: '请选择状态' },
              ]}
            >
              <Select placeholder="请选择状态">
                {Object.entries(DepartmentStatusTextMap).map(([value, text]) => (
                  <Option key={value} value={Number(value)}>
                    {text}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="科室介绍"
          rules={[
            { max: 1000, message: '科室介绍最多1000个字符' },
          ]}
        >
          <TextArea
            placeholder="请输入科室介绍"
            rows={3}
            maxLength={1000}
            showCount
          />
        </Form.Item>

        <Form.Item
          name="features"
          label="科室特色"
          rules={[
            { max: 1000, message: '科室特色最多1000个字符' },
          ]}
        >
          <TextArea
            placeholder="请输入科室特色"
            rows={3}
            maxLength={1000}
            showCount
          />
        </Form.Item>

        <Form.Item
          name="services"
          label="诊疗服务"
          rules={[
            { max: 1000, message: '诊疗服务最多1000个字符' },
          ]}
        >
          <TextArea
            placeholder="请输入诊疗服务"
            rows={3}
            maxLength={1000}
            showCount
          />
        </Form.Item>

        <Form.Item label="科室图片" extra="支持多张图片上传，每张图片不超过5MB">
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
      </Form>
    </Modal>
  );
};

export default DepartmentForm;
