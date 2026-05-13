import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';
import { useAppDispatch } from '@/store/hooks';
import { addMedicineCategory, updateMedicineCategory } from '@/store/slices/adminMedicineCategorySlice';
import type { MedicineCategoryDTO } from '@/types/admin/medicineCategory';

interface CategoryFormProps {
  open: boolean;
  title: string;
  initialValues?: Partial<MedicineCategoryDTO>;
  onCancel: () => void;
  onSuccess: () => void;
}

const { TextArea } = Input;

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
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (isEdit) {
        await dispatch(updateMedicineCategory({
          id: initialValues!.id!,
          data: values,
        })).unwrap();
      } else {
        await dispatch(addMedicineCategory(values)).unwrap();
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
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ status: 1 }}
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
          label="分类描述"
          rules={[
            { max: 200, message: '分类描述最多200个字符' },
          ]}
        >
          <TextArea rows={4} placeholder="请输入分类描述" />
        </Form.Item>

        <Form.Item
          name="sort"
          label="排序号"
          rules={[
            { type: 'number', message: '请输入有效的排序号' },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="请输入排序号"
            min={0}
            precision={0}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForm; 