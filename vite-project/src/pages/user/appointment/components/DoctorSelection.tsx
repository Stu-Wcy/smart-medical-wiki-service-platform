import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Typography,
  Tag,
  Button,
  Avatar,
  Spin,
  Empty,
  message,
  Collapse,
  Space
} from 'antd';
import { UserOutlined, DollarOutlined } from '@ant-design/icons';
import { getDepartmentSchedulesByHospitalId } from '@/api/schedule';
import type { Hospital } from '@/types/hospital';
import type { DepartmentSchedule, DoctorScheduleInfo } from '@/types/appointment';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface DoctorSelectionProps {
  hospital: Hospital;
  onSelect: (department: DepartmentSchedule, doctor: DoctorScheduleInfo) => void;
}

const DoctorSelection: React.FC<DoctorSelectionProps> = ({ hospital, onSelect }) => {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<DepartmentSchedule[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<{
    department: DepartmentSchedule;
    doctor: DoctorScheduleInfo;
  } | null>(null);

  useEffect(() => {
    fetchDepartments();
  }, [hospital.id]);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await getDepartmentSchedulesByHospitalId(hospital.id);
      if (response.data && response.data.code === 200) {
        setDepartments(response.data.data || []);
      } else {
        message.error('获取科室信息失败');
      }
    } catch (error) {
      console.error('获取科室信息失败:', error);
      message.error('获取科室信息失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorClick = (department: DepartmentSchedule, doctor: DoctorScheduleInfo) => {
    setSelectedDoctor({ department, doctor });
  };

  const handleConfirm = () => {
    if (selectedDoctor) {
      onSelect(selectedDoctor.department, selectedDoctor.doctor);
    }
  };

  const getAvailableSlots = (doctor: DoctorScheduleInfo) => {
    return doctor.schedules.reduce((total, schedule) => total + schedule.availableSlots, 0);
  };

  return (
    <div>
      <Title level={4}>选择科室和医生</Title>
      <Text type="secondary">医院：{hospital.name}</Text>

      <Spin spinning={loading}>
        {departments.length === 0 ? (
          <Empty description="暂无可预约的科室" style={{ marginTop: '40px' }} />
        ) : (
          <div style={{ marginTop: '16px' }}>
            <Collapse defaultActiveKey={departments.map((_, index) => index.toString())}>
              {departments.map((department, deptIndex) => (
                <Panel
                  header={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <Text strong style={{ fontSize: '16px' }}>{department.departmentName}</Text>
                        <Text type="secondary" style={{ marginLeft: '12px' }}>
                          {department.doctors.length} 位医生可预约
                        </Text>
                      </div>
                    </div>
                  }
                  key={deptIndex.toString()}
                >
                  {department.departmentDescription && (
                    <Paragraph type="secondary" style={{ marginBottom: '16px' }}>
                      {department.departmentDescription}
                    </Paragraph>
                  )}

                  <Row gutter={[16, 16]}>
                    {department.doctors.map((doctor, doctorIndex) => (
                      <Col span={12} key={doctorIndex}>
                        <Card
                          hoverable
                          className={
                            selectedDoctor?.doctor.doctorId === doctor.doctorId 
                              ? 'selected-doctor-card' 
                              : ''
                          }
                          onClick={() => handleDoctorClick(department, doctor)}
                          style={{
                            border: selectedDoctor?.doctor.doctorId === doctor.doctorId 
                              ? '2px solid #1890ff' 
                              : '1px solid #d9d9d9'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Avatar
                              size={64}
                              src={doctor.doctorAvatar}
                              icon={<UserOutlined />}
                              style={{ marginRight: '16px' }}
                            />
                            <div style={{ flex: 1 }}>
                              <div style={{ marginBottom: '8px' }}>
                                <Text strong style={{ fontSize: '16px' }}>
                                  {doctor.doctorName}
                                </Text>
                                <Tag color="blue" style={{ marginLeft: '8px' }}>
                                  {doctor.doctorTitle}
                                </Tag>
                              </div>

                              {doctor.doctorSpecialties && (
                                <div style={{ marginBottom: '8px' }}>
                                  <Text type="secondary" style={{ fontSize: '12px' }}>
                                    专长：{doctor.doctorSpecialties}
                                  </Text>
                                </div>
                              )}

                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                  <DollarOutlined style={{ color: '#ff4d4f', marginRight: '4px' }} />
                                  <Text strong style={{ color: '#ff4d4f' }}>
                                    ¥{doctor.consultationFee}
                                  </Text>
                                </div>
                                <div>
                                  <Text type="secondary" style={{ fontSize: '12px' }}>
                                    可约：{getAvailableSlots(doctor)} 个号源
                                  </Text>
                                </div>
                              </div>

                              {/* 显示可预约的时间段 */}
                              <div style={{ marginTop: '8px' }}>
                                <Space size={4} wrap>
                                  {doctor.schedules
                                    .filter(schedule => schedule.availableSlots > 0)
                                    .slice(0, 3)
                                    .map((schedule, scheduleIndex) => (
                                      <Tag key={scheduleIndex}>
                                        {schedule.scheduleDate} {schedule.timeSlotName}
                                      </Tag>
                                    ))}
                                  {doctor.schedules.filter(s => s.availableSlots > 0).length > 3 && (
                                    <Tag>...</Tag>
                                  )}
                                </Space>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Panel>
              ))}
            </Collapse>
          </div>
        )}
      </Spin>

      {/* 确认按钮 */}
      {selectedDoctor && (
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Button type="primary" size="large" onClick={handleConfirm}>
            确认选择：{selectedDoctor.department.departmentName} - {selectedDoctor.doctor.doctorName}
          </Button>
        </div>
      )}

      
    </div>
  );
};

export default DoctorSelection;
