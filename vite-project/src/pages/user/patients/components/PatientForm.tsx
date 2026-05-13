import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  message,
  Row,
  Col,
  Switch,
  Space
} from 'antd';
import { createPatient, updatePatient } from '@/api/patient';
import type { Patient, PatientCreateDTO, PatientUpdateDTO } from '@/types/patient';
import { 
  GENDER_OPTIONS, 
  RELATIONSHIP_OPTIONS,
  RelationshipEnum 
} from '@/types/patient';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

interface PatientFormProps {
  patient?: Patient | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (patient) {
      // 编辑模式，填充表单数据
      form.setFieldsValue({
        ...patient,
        birthDate: patient.birthDate ? dayjs(patient.birthDate) : null,
      });
    } else {
      // 新增模式，设置默认值
      form.setFieldsValue({
        relationship: RelationshipEnum.SELF,
        isDefault: false,
      });
    }
  }, [patient, form]);

  // 提交表单
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const formData = {
        ...values,
        birthDate: values.birthDate ? values.birthDate.format('YYYY-MM-DD') : null,
      };

      let response;
      if (patient) {
        // 编辑模式
        const updateData: PatientUpdateDTO = {
          id: patient.id,
          ...formData,
        };
        response = await updatePatient(updateData);
      } else {
        // 新增模式
        const createData: PatientCreateDTO = formData;
        response = await createPatient(createData);
      }

      if (response.data && response.data.code === 200) {
        message.success(patient ? '更新成功' : '添加成功');
        onSuccess();
      } else {
        message.error(response.data?.message || '操作失败');
      }
    } catch (error: any) {
      console.error('提交表单失败:', error);
      message.error(error.response?.data?.message || '操作失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="就诊人姓名"
            rules={[
              { required: true, message: '请输入就诊人姓名' },
              { min: 2, max: 50, message: '姓名长度应在2-50个字符之间' }
            ]}
          >
            <Input placeholder="请输入就诊人姓名" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Select placeholder="请选择性别">
              {GENDER_OPTIONS.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式' }
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="relationship"
            label="与用户关系"
            rules={[{ required: true, message: '请选择关系' }]}
          >
            <Select placeholder="请选择关系">
              {RELATIONSHIP_OPTIONS.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="idCard"
            label="身份证号"
            rules={[
              { pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的身份证号格式' }
            ]}
          >
            <Input placeholder="请输入身份证号（选填）" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="birthDate"
            label="出生日期"
          >
            <DatePicker 
              placeholder="请选择出生日期"
              style={{ width: '100%' }}
              disabledDate={(current) => current && current > dayjs().endOf('day')}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="emergencyContact"
            label="紧急联系人"
          >
            <Input placeholder="请输入紧急联系人姓名（选填）" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="emergencyPhone"
            label="紧急联系人电话"
            rules={[
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的紧急联系人电话格式' }
            ]}
          >
            <Input placeholder="请输入紧急联系人电话（选填）" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="address"
        label="联系地址"
      >
        <Input placeholder="请输入联系地址（选填）" />
      </Form.Item>

      <Form.Item
        name="medicalHistory"
        label="病史信息"
      >
        <TextArea 
          rows={3} 
          placeholder="请输入病史信息（选填）"
          maxLength={500}
          showCount
        />
      </Form.Item>

      <Form.Item
        name="allergies"
        label="过敏史"
      >
        <TextArea 
          rows={2} 
          placeholder="请输入过敏史信息（选填）"
          maxLength={500}
          showCount
        />
      </Form.Item>

      <Form.Item
        name="isDefault"
        label="设为默认就诊人"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
        <Space>
          <Button onClick={onCancel}>
            取消
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
          >
            {patient ? '更新' : '添加'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default PatientForm;
