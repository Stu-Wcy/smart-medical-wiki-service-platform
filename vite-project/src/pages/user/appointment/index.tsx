import React, { useState, useEffect } from 'react';
import {
  Card,
  Steps,
  Button,
  message,
  Spin,
  Row,
  Col,
  Typography,
  Divider,
  Space,
  Tag
} from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import HospitalSelection from './components/HospitalSelection';
import DoctorSelection from './components/DoctorSelection';
import TimeSelection from './components/TimeSelection';
import PatientSelection from './components/PatientSelection';
import AppointmentConfirm from './components/AppointmentConfirm';
import type { Hospital } from '@/types/hospital';
import type { DepartmentSchedule, DoctorScheduleInfo, ScheduleSlot, AppointmentCreateDTO } from '@/types/appointment';
import type { Patient } from '@/types/patient';
import { createAppointment } from '@/api/appointment';
import { hospitalApi } from '@/api/hospital';
import { getDepartment } from '@/api/department';
import { getDoctor } from '@/api/doctor';

const { Title } = Typography;

interface AppointmentData {
  hospital?: Hospital;
  department?: DepartmentSchedule;
  doctor?: DoctorScheduleInfo;
  schedule?: ScheduleSlot;
  patient?: Patient;
  slotId?: number;
  slotNumber?: number;
  appointmentTime?: string; // 具体的预约时间
  notes?: string;
}

const AppointmentBooking: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 从URL参数获取初始数据
  useEffect(() => {
    const hospitalId = searchParams.get('hospitalId');
    const doctorId = searchParams.get('doctorId');
    const departmentId = searchParams.get('departmentId');

    if (hospitalId && doctorId && departmentId) {
      // 如果有完整的参数，直接跳转到时间选择步骤
      fetchCompleteDataAndProceed(Number(hospitalId), Number(departmentId), Number(doctorId));
    } else if (hospitalId) {
      // 如果只有医院ID，自动获取医院信息并跳转到医生选择步骤
      fetchHospitalAndProceed(Number(hospitalId));
    }
  }, [searchParams]);

  // 获取医院信息并自动进入下一步
  const fetchHospitalAndProceed = async (hospitalId: number) => {
    try {
      setLoading(true);
      const response = await hospitalApi.getDetail(hospitalId);
      if (response.data.code === 200) {
        const hospital = response.data.data;
        setAppointmentData(prev => ({ ...prev, hospital }));
        // 自动跳转到医生选择步骤
        setCurrent(1);
        message.success(`已选择医院：${hospital.name}`);
      } else {
        message.error('获取医院信息失败');
      }
    } catch (error) {
      console.error('获取医院信息失败:', error);
      message.error('获取医院信息失败');
    } finally {
      setLoading(false);
    }
  };

  // 获取完整信息并直接跳转到时间选择步骤
  const fetchCompleteDataAndProceed = async (hospitalId: number, departmentId: number, doctorId: number) => {
    try {
      setLoading(true);

      // 并行获取医院、科室、医生信息
      const [hospitalResponse, departmentResponse, doctorResponse] = await Promise.all([
        hospitalApi.getDetail(hospitalId),
        getDepartment(departmentId),
        getDoctor(doctorId)
      ]);

      if (hospitalResponse.data.code === 200 &&
          departmentResponse.data.code === 200 &&
          doctorResponse.data.code === 200) {

        const hospital = hospitalResponse.data.data;
        const departmentData = departmentResponse.data.data;
        const doctorData = doctorResponse.data.data;

        // 构造DepartmentSchedule和DoctorScheduleInfo格式的数据
        const department: DepartmentSchedule = {
          departmentId: departmentData.id,
          departmentName: departmentData.name,
          doctors: [] // 这里暂时为空，在TimeSelection组件中会重新获取
        };

        const doctor: DoctorScheduleInfo = {
          doctorId: doctorData.id,
          doctorName: doctorData.name,
          doctorTitle: doctorData.title,
          consultationFee: doctorData.consultationFee,
          schedules: [] // 这里暂时为空，在TimeSelection组件中会重新获取
        };

        setAppointmentData(prev => ({
          ...prev,
          hospital,
          department,
          doctor
        }));

        // 直接跳转到时间选择步骤
        setCurrent(2);
        message.success(`已选择医生：${doctorData.name}`);
      } else {
        message.error('获取信息失败');
      }
    } catch (error) {
      console.error('获取信息失败:', error);
      message.error('获取信息失败');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: '选择医院',
      description: '选择就诊医院'
    },
    {
      title: '选择医生',
      description: '选择科室和医生'
    },
    {
      title: '选择时间',
      description: '选择就诊时间'
    },
    {
      title: '选择就诊人',
      description: '选择就诊人信息'
    },
    {
      title: '确认预约',
      description: '确认预约信息'
    }
  ];

  const handleNext = () => {
    const nextStep = current + 1;
    setCurrent(nextStep);
    // 如果进入时间选择步骤，触发数据刷新
    if (nextStep === 2) {
      setRefreshTrigger(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    const prevStep = current - 1;
    setCurrent(prevStep);
    // 如果进入时间选择步骤，触发数据刷新
    if (prevStep === 2) {
      setRefreshTrigger(prev => prev + 1);
    }
  };

  const handleHospitalSelect = (hospital: Hospital) => {
    setAppointmentData(prev => ({ ...prev, hospital }));
    handleNext();
  };

  const handleDoctorSelect = (department: DepartmentSchedule, doctor: DoctorScheduleInfo) => {
    setAppointmentData(prev => ({ ...prev, department, doctor }));
    handleNext();
  };

  const handleTimeSelect = (schedule: ScheduleSlot, slotId: number, slotNumber: number, appointmentTime: string) => {
    setAppointmentData(prev => ({
      ...prev,
      schedule,
      slotId,
      slotNumber,
      appointmentTime
    }));
    handleNext();
  };

  const handlePatientSelect = (patient: Patient) => {
    setAppointmentData(prev => ({ ...prev, patient }));
    handleNext();
  };

  const handleConfirm = async (notes?: string) => {
    if (!appointmentData.hospital || !appointmentData.doctor || !appointmentData.schedule || !appointmentData.patient || !appointmentData.slotId || !appointmentData.slotNumber || !appointmentData.appointmentTime) {
      message.error('预约信息不完整');
      return;
    }

    setLoading(true);
    try {
      const createData: AppointmentCreateDTO = {
        doctorId: appointmentData.doctor.doctorId,
        hospitalId: appointmentData.hospital.id,
        departmentId: appointmentData.department?.departmentId,
        scheduleId: appointmentData.schedule.scheduleId,
        slotId: appointmentData.slotId,
        appointmentDate: appointmentData.schedule.scheduleDate,
        appointmentTime: appointmentData.appointmentTime,
        timeSlot: appointmentData.schedule.timeSlot,
        slotNumber: appointmentData.slotNumber,
        patientName: appointmentData.patient.name,
        patientPhone: appointmentData.patient.phone,
        patientIdCard: appointmentData.patient.idCard,
        consultationFee: appointmentData.doctor.consultationFee,
        notes
      };

      const response = await createAppointment(createData);
      if (response.data && response.data.code === 200) {
        message.success('预约成功！');
        navigate('/user/appointments');
      } else {
        message.error(response.data?.message || '预约失败');
      }
    } catch (error: any) {
      console.error('预约失败:', error);
      message.error(error.response?.data?.message || '预约失败');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (current) {
      case 0:
        return <HospitalSelection onSelect={handleHospitalSelect} />;
      case 1:
        return (
          <DoctorSelection 
            hospital={appointmentData.hospital!}
            onSelect={handleDoctorSelect}
          />
        );
      case 2:
        return (
          <TimeSelection
            doctor={appointmentData.doctor!}
            onSelect={handleTimeSelect}
            refreshTrigger={refreshTrigger}
          />
        );
      case 3:
        return <PatientSelection onSelect={handlePatientSelect} />;
      case 4:
        return (
          <AppointmentConfirm 
            appointmentData={appointmentData}
            onConfirm={handleConfirm}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <Space>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate(-1)}
            >
              返回
            </Button>
            <Title level={3} style={{ margin: 0 }}>在线预约挂号</Title>
          </Space>
        </div>

        <Steps current={current} items={steps} style={{ marginBottom: '32px' }} />

        <div style={{ minHeight: '400px' }}>
          {renderStepContent()}
        </div>

        {current > 0 && current < 4 && (
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Space>
              <Button onClick={handlePrev}>
                上一步
              </Button>
              {current < 3 && (
                <Button type="primary" onClick={handleNext}>
                  下一步
                </Button>
              )}
            </Space>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AppointmentBooking;
