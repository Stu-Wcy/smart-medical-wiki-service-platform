import React, { useEffect } from 'react';
import { Form, Input, Modal, InputNumber, Select } from 'antd';
import { useAppDispatch } from '@/store/hooks';
import { addDiseaseCategory, updateDiseaseCategory } from '@/store/slices/diseaseCategorySlice';
import type { DiseaseCategoryDTO } from '@/types/admin/diseaseCategory';

interface CategoryFormProps {
  open: boolean;
  title: string;
  initialValues?: Partial<DiseaseCategoryDTO>;
  onCancel: () => void;
  onSuccess: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  open,
  title,
  initialValues,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const isEdit = !!initialValues?.id;

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isEdit) {
        await dispatch(updateDiseaseCategory({ ...values, id: initialValues!.id })).unwrap();
      } else {
        await dispatch(addDiseaseCategory(values)).unwrap();
      }
      onSuccess();
      form.resetFields();
    } catch (error) {
      console.error('表单验证或提交失败:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

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
        <Form.Item
          name="name"
          label="分类名称"
          rules={[
            { required: true, message: '请输入分类名称' },
            { max: 50, message: '分类名称最多50个字符' },
          ]}
        >
          <Input placeholder="请输入分类名称" />
        </Form.Item>

        <Form.Item
          name="description"
          label="描述"
          rules={[
            { max: 200, message: '描述最多200个字符' },
          ]}
        >
          <Input.TextArea rows={4} placeholder="请输入描述" />
        </Form.Item>

        <Form.Item
          name="sort"
          label="排序"
          rules={[
            { type: 'number', message: '请输入有效的排序数字' },
          ]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="请输入排序" min={0} />
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

export default CategoryForm; 