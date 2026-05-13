import React, { useEffect, useRef } from 'react';
import { Card, Form, Input, InputNumber, Button, message } from 'antd';
import { getDoctorProfile, updateDoctorProfile } from '@/api/doctor';

const DoctorProfile: React.FC = () => {
  const [form] = Form.useForm();
  const calledRef = useRef(false);
  const [messageApi, contextHolder] = message.useMessage();

  const load = async () => {
    try {
      const res = await getDoctorProfile();
      form.setFieldsValue(res.data.data);
    } catch (e: any) {
      // 错误提示由拦截器处理
    }
  };

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    load();
  }, []);

  const submit = async () => {
    try {
      const values = await form.validateFields();
      await updateDoctorProfile(values);
      messageApi.success('保存成功');
      load();
    } catch (e: any) {
      if (e?.errorFields) return;
      // 错误提示由拦截器处理
    }
  };

  return (
    <Card title="个人信息">
      {contextHolder}
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="title" label="职称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="specialties" label="专长">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="introduction" label="简介">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="avatar" label="头像URL">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="联系电话">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input />
        </Form.Item>
        <Form.Item name="education" label="教育背景">
          <Input />
        </Form.Item>
        <Form.Item name="experience" label="工作经历">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="achievements" label="主要成就">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="consultationFee" label="挂号费用">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={submit}>保存</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DoctorProfile;
