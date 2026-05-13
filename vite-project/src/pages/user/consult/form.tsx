import React, { useEffect, useState } from 'react';
import { Card, Form, Select, Input, Upload, Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { createConsultation } from '@/api/consult';
import { uploadFile } from '@/api/files';
import { getMyPatients } from '@/api/patient';

const { Dragger } = Upload;

const ConsultFormPage: React.FC = () => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const doctorId = Number(searchParams.get('doctorId'));

  useEffect(() => {
    form.setFieldsValue({ doctorId });
    // 加载就诊人列表
    getMyPatients().then(res => {
      const list = res.data.data || [];
      const options = list.map((p: any) => ({ label: `${p.name}（${p.phone || ''}）`, value: p.id }));
      form.setFieldsValue({ patientId: options[0]?.value });
      setPatientOptions(options);
    }).catch(() => {});
  }, [doctorId]);

  const customUpload = async ({ file }: any) => {
    try {
      if (file.size > 5 * 1024 * 1024) {
        message.error('单张图片不能超过5MB');
        return;
      }
      const res = await uploadFile(file, 'consult');
      const url = res.data?.data;
      if (url) {
        setImages(prev => [...prev, url]);
        message.success('上传成功');
      }
    } catch {
      message.error('上传失败');
    }
  };

  const submit = async () => {
    try {
      const values = await form.validateFields();
      await createConsultation({
        patientId: values.patientId,
        doctorId: values.doctorId,
        patientCondition: values.patientCondition,
        picUrls: images,
      });
      message.success('提交成功，待答复');
      navigate('/user/consult/history');
    } catch (e: any) {
      message.error(e?.message || '提交失败');
    }
  };

  const [patientOptions, setPatientOptions] = useState<Array<{label: string; value: number}>>([]);
  return (
    <Card title="发起咨询">
      <Form form={form} layout="vertical">
        <Form.Item name="doctorId" label="医生" rules={[{ required: true }]}>
          <Select disabled options={[{ label: `医生ID：${doctorId}`, value: doctorId }]} />
        </Form.Item>
        <Form.Item name="patientId" label="就诊人" rules={[{ required: true }]}>
          <Select placeholder="选择就诊人" options={patientOptions} />
        </Form.Item>
        <Form.Item name="patientCondition" label="病情描述" rules={[{ required: true }]}>
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item label="症状图片上传">
          <Dragger multiple accept="image/*" customRequest={customUpload}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽图片至此上传（单张≤5MB）</p>
          </Dragger>
          <div style={{ marginTop: 8 }}>{images.map((u) => <img key={u} src={u} style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 6 }} />)}</div>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={submit}>提交</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ConsultFormPage;
