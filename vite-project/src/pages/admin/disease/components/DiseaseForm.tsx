import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, Upload, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addDisease, updateDisease } from '@/store/slices/diseaseSlice';
import type { DiseaseDTO } from '@/types/admin/disease';
import type { UploadFile } from 'antd/es/upload/interface';
import { uploadFile } from '@/api/files';

interface DiseaseFormProps {
  open: boolean;
  title: string;
  initialValues?: Partial<DiseaseDTO>;
  onCancel: () => void;
  onSuccess: () => void;
}

const { TextArea } = Input;

const DiseaseForm: React.FC<DiseaseFormProps> = ({
  open,
  title,
  initialValues,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const isEdit = !!initialValues?.id;
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { list: categories } = useAppSelector((state) => state.diseaseCategory);

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
      if (initialValues.images) {
        const images = initialValues.images.split(',').map((url, index) => ({
          uid: `-${index}`,
          name: `image-${index}`,
          status: 'done' as any,
          url,
        })) as any;
        setFileList(images as UploadFile[]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const images = fileList.map(file => file.url || '').filter(Boolean).join(',');
      const data = { ...values, images };

      if (isEdit) {
        await dispatch(updateDisease({ ...data, id: initialValues!.id })).unwrap();
      } else {
        await dispatch(addDisease(data)).unwrap();
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

  const handleUpload = async (file: File) => {
    try {
      setLoading(true);
      const response = await uploadFile(file, 'diseases');
      if (response.data) {
        const newFile = {
          uid: `${Date.now()}`,
          name: file.name,
          status: 'done',
          url: response.data.data,
        } as UploadFile;
        setFileList([...fileList, newFile]);
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
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

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
      >
        <Form.Item
          name="name"
          label="疾病名称"
          rules={[
            { required: true, message: '请输入疾病名称' },
            { max: 100, message: '疾病名称最多100个字符' },
          ]}
        >
          <Input placeholder="请输入疾病名称" />
        </Form.Item>

        <Form.Item
          name="categoryId"
          label="所属分类"
          rules={[
            { required: true, message: '请选择所属分类' },
          ]}
        >
          <Select placeholder="请选择所属分类">
            {categories.map(category => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="symptoms"
          label="症状描述"
          rules={[
            { max: 1000, message: '症状描述最多1000个字符' },
          ]}
        >
          <TextArea rows={4} placeholder="请输入症状描述" />
        </Form.Item>

        <Form.Item
          name="causes"
          label="病因"
          rules={[
            { max: 1000, message: '病因最多1000个字符' },
          ]}
        >
          <TextArea rows={4} placeholder="请输入病因" />
        </Form.Item>

        <Form.Item
          name="treatment"
          label="治疗方案"
          rules={[
            { max: 1000, message: '治疗方案最多1000个字符' },
          ]}
        >
          <TextArea rows={4} placeholder="请输入治疗方案" />
        </Form.Item>

        <Form.Item
          name="prevention"
          label="预防措施"
          rules={[
            { max: 1000, message: '预防措施最多1000个字符' },
          ]}
        >
          <TextArea rows={4} placeholder="请输入预防措施" />
        </Form.Item>

        <Form.Item
          label="疾病图片"
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            customRequest={({ file }) => handleUpload(file as File)}
            onRemove={(file) => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFileList(newFileList);
            }}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>

        {isEdit && (
          <Form.Item
            name="status"
            label="状态"
            initialValue={1}
          >
            <Select>
              <Select.Option value={1}>正常</Select.Option>
              <Select.Option value={0}>禁用</Select.Option>
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default DiseaseForm; 
