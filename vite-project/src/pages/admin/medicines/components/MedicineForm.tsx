import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Modal, Upload, message } from 'antd';
import { useAppDispatch } from '@/store/hooks';
import { addMedicine, updateMedicine } from '@/store/slices/adminMedicineSlice';
import type { MedicineDTO } from '@/types/admin/medicine';
import type { MedicineCategoryDTO } from '@/types/admin/medicineCategory';
import { PlusOutlined } from '@ant-design/icons';
import { uploadFile } from '@/api/common/upload';
import type { UploadFile, UploadFileStatus } from 'antd/es/upload/interface';

interface MedicineFormProps {
  open: boolean;
  title: string;
  initialValues?: Partial<MedicineDTO>;
  categories: MedicineCategoryDTO[];
  onCancel: () => void;
  onSuccess: () => void;
}

const { TextArea } = Input;
const { Option } = Select;

const MedicineForm: React.FC<MedicineFormProps> = ({
  open,
  title,
  initialValues,
  categories = [],
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const isEdit = !!initialValues?.id;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
      // 转换已有图片为文件列表格式
      if (initialValues.images) {
        const images = initialValues.images.split(',').filter(Boolean);
        setFileList(
          images.map((url, index) => ({
            uid: `-${index}`,
            name: `图片${index + 1}`,
            status: 'done',
            url,
          }))
        );
      } else {
        setFileList([]);
      }
    } else {
      setFileList([]);
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const images = fileList.map(file => file.url || '').filter(Boolean).join(',');
      
      if (isEdit) {
        const updateData = {
          id: initialValues!.id,
          ...values,
          images,
        };
        await dispatch(updateMedicine(updateData)).unwrap();
      } else {
        await dispatch(addMedicine({ ...values, images })).unwrap();
      }
      
      onSuccess();
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error('表单验证或提交失败:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
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

  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    try {
      setUploading(true);
      const response = await uploadFile(file, 'medicines');
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

  const handleRemove = (file: UploadFile) => {
    const newFileList = fileList.filter(item => item.uid !== file.uid);
    setFileList(newFileList);
  };

  return (
    <Modal
      open={open}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ status: 1 }}
      >
        <Form.Item
          name="name"
          label="药品名称"
          rules={[
            { required: true, message: '请输入药品名称' },
            { max: 100, message: '药品名称最多100个字符' },
          ]}
        >
          <Input placeholder="请输入药品名称" />
        </Form.Item>

        <Form.Item
          label="药品图片"
          extra="支持多张图片上传，每张图片不超过2MB"
        >
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
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传图片</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          name="manufacturer"
          label="生产厂家"
          rules={[
            { max: 200, message: '生产厂家最多200个字符' },
          ]}
        >
          <Input placeholder="请输入生产厂家" />
        </Form.Item>

        <Form.Item
          name="specification"
          label="规格"
          rules={[
            { max: 100, message: '规格最多100个字符' },
          ]}
        >
          <Input placeholder="请输入规格" />
        </Form.Item>

        <Form.Item
          name="price"
          label="价格"
          rules={[
            { required: true, message: '请输入价格' },
            { type: 'number', min: 0, message: '价格必须大于等于0' },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="请输入价格"
            precision={2}
            min={0}
          />
        </Form.Item>

        <Form.Item
          name="stock"
          label="库存"
          rules={[
            { required: true, message: '请输入库存' },
            { type: 'number', min: 0, message: '库存必须大于等于0' },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="请输入库存"
            precision={0}
            min={0}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="药品描述"
        >
          <TextArea rows={4} placeholder="请输入药品描述" />
        </Form.Item>

        <Form.Item
          name="usageMethod"
          label="用法用量"
        >
          <TextArea rows={3} placeholder="请输入用法用量" />
        </Form.Item>

        <Form.Item
          name="contraindication"
          label="禁忌"
        >
          <TextArea rows={3} placeholder="请输入禁忌" />
        </Form.Item>

        <Form.Item
          name="categoryId"
          label="分类"
          rules={[
            { required: true, message: '请选择分类' },
          ]}
        >
          <Select placeholder="请选择分类">
            {Array.isArray(categories) && categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="状态"
          rules={[
            { required: true, message: '请选择状态' },
          ]}
        >
          <Select placeholder="请选择状态">
            <Option value={1}>正常</Option>
            <Option value={0}>禁用</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MedicineForm; 