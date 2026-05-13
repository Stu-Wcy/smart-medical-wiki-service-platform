import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Modal,
  message,
  Empty,
  Typography,
  List,
  Tag,
  Space,
  Popconfirm,
  Spin
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  PhoneOutlined,
  StarFilled,
  StarOutlined
} from '@ant-design/icons';
import { getUserPatients, deletePatient, setDefaultPatient } from '@/api/patient';
import type { Patient } from '@/types/patient';
import { getGenderLabel, getRelationshipLabel } from '@/types/patient';
import PatientForm from './components/PatientForm';

const { Title, Text } = Typography;

const UserPatients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);

  // 获取就诊人列表
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

  useEffect(() => {
    fetchPatients();
  }, []);

  // 添加就诊人
  const handleAdd = () => {
    setEditingPatient(null);
    setModalVisible(true);
  };

  // 编辑就诊人
  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setModalVisible(true);
  };

  // 删除就诊人
  const handleDelete = async (id: number) => {
    try {
      const response = await deletePatient(id);
      if (response.data && response.data.code === 200) {
        message.success('删除成功');
        fetchPatients();
      } else {
        message.error('删除失败');
      }
    } catch (error) {
      console.error('删除就诊人失败:', error);
      message.error('删除失败');
    }
  };

  // 设置默认就诊人
  const handleSetDefault = async (id: number) => {
    try {
      const response = await setDefaultPatient(id);
      if (response.data && response.data.code === 200) {
        message.success('设置默认就诊人成功');
        fetchPatients();
      } else {
        message.error('设置默认就诊人失败');
      }
    } catch (error) {
      console.error('设置默认就诊人失败:', error);
      message.error('设置默认就诊人失败');
    }
  };

  // 表单提交成功回调
  const handleFormSuccess = () => {
    setModalVisible(false);
    setEditingPatient(null);
    fetchPatients();
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingPatient(null);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Title level={3}>就诊人管理</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            添加就诊人
          </Button>
        </div>

        <Spin spinning={loading}>
          {patients.length === 0 ? (
            <Empty
              description="暂无就诊人信息"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button type="primary" onClick={handleAdd}>
                添加第一个就诊人
              </Button>
            </Empty>
          ) : (
            <List
              dataSource={patients}
              renderItem={(patient) => (
                <List.Item
                  actions={[
                    <Button
                      key="edit"
                      type="link"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(patient)}
                    >
                      编辑
                    </Button>,
                    <Button
                      key="default"
                      type="link"
                      icon={patient.isDefault ? <StarFilled /> : <StarOutlined />}
                      onClick={() => !patient.isDefault && handleSetDefault(patient.id)}
                      disabled={patient.isDefault}
                    >
                      {patient.isDefault ? '默认' : '设为默认'}
                    </Button>,
                    <Popconfirm
                      key="delete"
                      title="确定要删除这个就诊人吗？"
                      onConfirm={() => handleDelete(patient.id)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                      >
                        删除
                      </Button>
                    </Popconfirm>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                    title={
                      <Space>
                        <span>{patient.name}</span>
                        <Tag color={patient.gender === 'MALE' ? 'blue' : 'pink'}>
                          {getGenderLabel(patient.gender)}
                        </Tag>
                        <Tag>{getRelationshipLabel(patient.relationship)}</Tag>
                        {patient.isDefault && (
                          <Tag color="gold" icon={<StarFilled />}>
                            默认
                          </Tag>
                        )}
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size="small">
                        <Space>
                          <PhoneOutlined />
                          <Text>{patient.phone}</Text>
                        </Space>
                        {patient.age && <Text>年龄：{patient.age}岁</Text>}
                        {patient.address && <Text>地址：{patient.address}</Text>}
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Spin>
      </Card>

      <Modal
        title={editingPatient ? '编辑就诊人' : '添加就诊人'}
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        destroyOnClose
      >
        <PatientForm
          patient={editingPatient}
          onSuccess={handleFormSuccess}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default UserPatients;
