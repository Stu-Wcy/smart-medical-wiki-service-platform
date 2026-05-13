import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from 'antd';
import type { DepartmentCategory, DepartmentCategoryAddDTO, DepartmentCategoryUpdateDTO } from '@/types/department';
import { DepartmentStatus, DepartmentStatusTextMap } from '@/types/department';
import {
  addDepartmentCategory,
  updateDepartmentCategory,
} from '@/api/admin/departmentCategory';

const { TextArea } = Input;
const { Option } = Select;

interface DepartmentCategoryFormProps {
  open: boolean;
  initialValues?: DepartmentCategory | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const DepartmentCategoryForm: React.FC<DepartmentCategoryFormProps> = ({
  open,
  initialValues,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const isEdit = !!initialValues;
  const title = isEdit ? '编辑科室分类' : '新增科室分类';

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          status: DepartmentStatus.NORMAL,
          sort: 0,
        });
      }
    }
  }, [open, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (isEdit) {
        const updateData: DepartmentCategoryUpdateDTO = {
          id: initialValues!.id,
          ...values,
        };
        await updateDepartmentCategory(updateData);
        message.success('更新成功');
      } else {
        const addData: DepartmentCategoryAddDTO = values;
        await addDepartmentCategory(addData);
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
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        preserve={false}
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
          <TextArea
            placeholder="请输入分类描述"
            rows={3}
            maxLength={200}
            showCount
          />
        </Form.Item>

        <Form.Item
          name="icon"
          label="分类图标"
          rules={[
            { max: 100, message: '图标名称最多100个字符' },
          ]}
        >
          <Input placeholder="请输入图标名称（如：medical-box）" />
        </Form.Item>

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
      </Form>
    </Modal>
  );
};

export default DepartmentCategoryForm;
