import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Radio,
  Space,
  Tag,
  Empty,
  message,
  Modal,
  Form,
  Input,
  Select,
  DatePicker
} from 'antd';
import { PlusOutlined, UserOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getUserPatients, createPatient } from '@/api/patient';
import type { Patient, PatientCreateDTO } from '@/types/patient';
import { GENDER_OPTIONS, RELATIONSHIP_OPTIONS } from '@/types/patient';

const { Title, Text } = Typography;
const { Option } = Select;

interface PatientSelectionProps {
  onSelect: (patient: Patient) => void;
}

const PatientSelection: React.FC<PatientSelectionProps> = ({ onSelect }) => {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await getUserPatients();
      if (response.data && response.data.code === 200) {
        setPatients(response.data.data || []);
      } else {
        message.error('获取就诊人列表失败');
      }
    } catch (error) {
      console.error('获取就诊人列表失败:', error);
      message.error('获取就诊人列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleConfirm = () => {
    if (selectedPatient) {
      onSelect(selectedPatient);
    }
  };

  const handleAddPatient = () => {
    setAddModalVisible(true);
    form.resetFields();
  };

  const handleAddSubmit = async (values: any) => {
    try {
      const createData: PatientCreateDTO = {
        name: values.name,
        gender: values.gender,
        birthDate: values.birthDate.format('YYYY-MM-DD'),
        phone: values.phone,
        idCard: values.idCard,
        relationship: values.relationship,
        address: values.address,
        emergencyContact: values.emergencyContact,
        emergencyPhone: values.emergencyPhone,
        isDefault: patients.length === 0 // 如果是第一个就诊人，设为默认
      };

      const response = await createPatient(createData);
      if (response.data && response.data.code === 200) {
        message.success('添加就诊人成功');
        setAddModalVisible(false);
        fetchPatients(); // 重新获取列表
      } else {
        message.error(response.data?.message || '添加就诊人失败');
      }
    } catch (error: any) {
      console.error('添加就诊人失败:', error);
      message.error(error.response?.data?.message || '添加就诊人失败');
    }
  };

  const getGenderText = (gender: string) => {
    const option = GENDER_OPTIONS.find(opt => opt.value === gender);
    return option?.label || '未知';
  };

  const getRelationshipText = (relationship: string) => {
    const option = RELATIONSHIP_OPTIONS.find(opt => opt.value === relationship);
    return option?.label || '未知';
  };

  const calculateAge = (birthDate: string) => {
    return dayjs().diff(dayjs(birthDate), 'year');
  };

  return (
    <div>
      <Title level={4}>选择就诊人</Title>
      <Text type="secondary">请选择就诊人或添加新的就诊人</Text>

      {/* 添加就诊人按钮 */}
      <div style={{ marginTop: '16px', marginBottom: '16px' }}>
        <Button 
          type="dashed" 
          icon={<PlusOutlined />} 
          onClick={handleAddPatient}
          style={{ width: '100%', height: '60px' }}
        >
          添加新就诊人
        </Button>
      </div>

      {/* 就诊人列表 */}
      {patients.length === 0 ? (
        <Empty description="暂无就诊人，请先添加" />
      ) : (
        <Radio.Group 
          value={selectedPatient?.id} 
          onChange={(e) => {
            const patient = patients.find(p => p.id === e.target.value);
            if (patient) handlePatientSelect(patient);
          }}
          style={{ width: '100%' }}
        >
          <Row gutter={[16, 16]}>
            {patients.map(patient => (
              <Col span={12} key={patient.id}>
                <Card
                  hoverable
                  className={selectedPatient?.id === patient.id ? 'selected-patient-card' : ''}
                  style={{
                    border: selectedPatient?.id === patient.id ? '2px solid #1890ff' : '1px solid #d9d9d9'
                  }}
                >
                  <Radio value={patient.id} style={{ marginBottom: '12px' }}>
                    <Text strong style={{ fontSize: '16px' }}>{patient.name}</Text>
                    {patient.isDefault && (
                      <Tag color="gold" style={{ marginLeft: '8px' }}>默认</Tag>
                    )}
                  </Radio>

                  <div style={{ marginLeft: '24px' }}>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div>
                        <UserOutlined style={{ marginRight: '8px', color: '#666' }} />
                        <Text type="secondary">
                          {getGenderText(patient.gender)} | {calculateAge(patient.birthDate || '')}岁 | {getRelationshipText(patient.relationship)}
                        </Text>
                      </div>
                      
                      <div>
                        <PhoneOutlined style={{ marginRight: '8px', color: '#666' }} />
                        <Text type="secondary">{patient.phone}</Text>
                      </div>
                      
                      {patient.idCard && (
                        <div>
                          <IdcardOutlined style={{ marginRight: '8px', color: '#666' }} />
                          <Text type="secondary">
                            {patient.idCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2')}
                          </Text>
                        </div>
                      )}
                    </Space>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Radio.Group>
      )}

      {/* 确认按钮 */}
      {selectedPatient && (
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Button type="primary" size="large" onClick={handleConfirm}>
            确认就诊人：{selectedPatient.name}
          </Button>
        </div>
      )}

      {/* 添加就诊人弹窗 */}
      <Modal
        title="添加就诊人"
        open={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="姓名"
                name="name"
                rules={[{ required: true, message: '请输入姓名' }]}
              >
                <Input placeholder="请输入真实姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="性别"
                name="gender"
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
                label="出生日期"
                name="birthDate"
                rules={[{ required: true, message: '请选择出生日期' }]}
              >
                <DatePicker 
                  style={{ width: '100%' }}
                  placeholder="请选择出生日期"
                  disabledDate={(current) => current && current > dayjs()}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="与本人关系"
                name="relationship"
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
                label="手机号"
                name="phone"
                rules={[
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                ]}
              >
                <Input placeholder="请输入手机号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="身份证号"
                name="idCard"
                rules={[
                  { pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的身份证号' }
                ]}
              >
                <Input placeholder="请输入身份证号（选填）" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="地址" name="address">
            <Input placeholder="请输入地址（选填）" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="紧急联系人" name="emergencyContact">
                <Input placeholder="请输入紧急联系人（选填）" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="紧急联系电话"
                name="emergencyPhone"
                rules={[
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                ]}
              >
                <Input placeholder="请输入紧急联系电话（选填）" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setAddModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                确认添加
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      
    </div>
  );
};

export default PatientSelection;
