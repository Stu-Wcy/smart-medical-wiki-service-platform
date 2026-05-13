import React, { useState } from 'react';
import {
  Card,
  Descriptions,
  Button,
  Typography,
  Space,
  Tag,
  Input,
  Divider,
  Alert,
  Checkbox
} from 'antd';
import { 
  CalendarOutlined, 
  UserOutlined, 
  PhoneOutlined, 
  DollarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Patient } from '@/types/patient';
import type { Hospital } from '@/types/hospital';
import type { DepartmentSchedule, DoctorScheduleInfo, ScheduleSlot } from '@/types/appointment';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface AppointmentData {
  hospital?: Hospital;
  department?: DepartmentSchedule;
  doctor?: DoctorScheduleInfo;
  schedule?: ScheduleSlot;
  patient?: Patient;
  appointmentTime?: string;
  notes?: string;
}

interface AppointmentConfirmProps {
  appointmentData: AppointmentData;
  onConfirm: (notes?: string) => void;
  loading: boolean;
}

const AppointmentConfirm: React.FC<AppointmentConfirmProps> = ({ 
  appointmentData, 
  onConfirm, 
  loading 
}) => {
  const [notes, setNotes] = useState('');
  const [agreed, setAgreed] = useState(false);

  const { hospital, department, doctor, schedule, patient } = appointmentData;

  const handleConfirm = () => {
    onConfirm(notes);
  };

  const getTimeSlotText = (timeSlot: number) => {
    switch (timeSlot) {
      case 1: return '上午';
      case 2: return '下午';
      case 3: return '晚上';
      default: return '未知';
    }
  };

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'MALE': return '男';
      case 'FEMALE': return '女';
      default: return '未知';
    }
  };

  const getRelationshipText = (relationship: string) => {
    switch (relationship) {
      case 'SELF': return '本人';
      case 'FATHER': return '父亲';
      case 'MOTHER': return '母亲';
      case 'SPOUSE': return '配偶';
      case 'CHILD': return '子女';
      case 'OTHER': return '其他';
      default: return '未知';
    }
  };

  const calculateAge = (birthDate: string) => {
    return dayjs().diff(dayjs(birthDate), 'year');
  };

  return (
    <div>
      <Title level={4}>确认预约信息</Title>
      <Text type="secondary">请仔细核对预约信息，确认无误后提交预约</Text>

      {/* 预约信息卡片 */}
      <Card 
        title="预约信息" 
        style={{ marginTop: '16px' }}
        extra={<Tag color="blue">待确认</Tag>}
      >
        <Descriptions column={2} bordered>
          <Descriptions.Item label="就诊医院" span={2}>
            <Space>
              <EnvironmentOutlined style={{ color: '#1890ff' }} />
              <Text strong>{hospital?.name}</Text>
            </Space>
          </Descriptions.Item>
          
          <Descriptions.Item label="就诊科室">
            {department?.departmentName}
          </Descriptions.Item>
          
          <Descriptions.Item label="就诊医生">
            <Space>
              <Text strong>{doctor?.doctorName}</Text>
              <Tag color="blue">{doctor?.doctorTitle}</Tag>
            </Space>
          </Descriptions.Item>
          
          <Descriptions.Item label="就诊日期">
            <Space>
              <CalendarOutlined style={{ color: '#52c41a' }} />
              <Text strong>{schedule?.scheduleDate}</Text>
            </Space>
          </Descriptions.Item>
          
          <Descriptions.Item label="就诊时间">
            <Space>
              <ClockCircleOutlined style={{ color: '#fa8c16' }} />
              <Text strong>
                {appointmentData.appointmentTime ? dayjs(appointmentData.appointmentTime).format('HH:mm') :
                 `${getTimeSlotText(schedule?.timeSlot || 0)} ${schedule?.startTime} - ${schedule?.endTime}`}
              </Text>
            </Space>
          </Descriptions.Item>
          
          <Descriptions.Item label="挂号费" span={2}>
            <Space>
              <DollarOutlined style={{ color: '#ff4d4f' }} />
              <Text strong style={{ color: '#ff4d4f', fontSize: '16px' }}>
                ¥{doctor?.consultationFee}
              </Text>
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 就诊人信息卡片 */}
      <Card title="就诊人信息" style={{ marginTop: '16px' }}>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="姓名">
            <Space>
              <UserOutlined style={{ color: '#1890ff' }} />
              <Text strong>{patient?.name}</Text>
              {patient?.isDefault && <Tag color="gold">默认</Tag>}
            </Space>
          </Descriptions.Item>
          
          <Descriptions.Item label="性别/年龄">
            {getGenderText(patient?.gender || '')} / {calculateAge(patient?.birthDate || '')}岁
          </Descriptions.Item>
          
          <Descriptions.Item label="手机号">
            <Space>
              <PhoneOutlined style={{ color: '#52c41a' }} />
              {patient?.phone}
            </Space>
          </Descriptions.Item>
          
          <Descriptions.Item label="与本人关系">
            <Tag>{getRelationshipText(patient?.relationship || '')}</Tag>
          </Descriptions.Item>
          
          {patient?.idCard && (
            <Descriptions.Item label="身份证号" span={2}>
              {patient.idCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2')}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>

      {/* 备注信息 */}
      <Card title="备注信息" style={{ marginTop: '16px' }}>
        <TextArea
          placeholder="请输入症状描述或其他备注信息（选填）"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={500}
          showCount
        />
      </Card>

      {/* 注意事项 */}
      <Card title="注意事项" style={{ marginTop: '16px' }}>
        <Alert
          message="预约须知"
          description={
            <div>
              <Paragraph>
                1. 请提前15分钟到达医院，携带有效身份证件；
              </Paragraph>
              <Paragraph>
                2. 如需取消预约，请至少提前2小时操作；
              </Paragraph>
              <Paragraph>
                3. 预约成功后，请按时就诊，逾期号源将自动释放；
              </Paragraph>
              <Paragraph>
                4. 挂号费支付成功后，如因个人原因取消预约，费用不予退还；
              </Paragraph>
              <Paragraph style={{ marginBottom: 0 }}>
                5. 如有疑问，请联系医院客服：{hospital?.phone}。
              </Paragraph>
            </div>
          }
          type="info"
          showIcon
        />
      </Card>

      {/* 协议确认 */}
      <div style={{ marginTop: '16px' }}>
        <Checkbox 
          checked={agreed} 
          onChange={(e) => setAgreed(e.target.checked)}
        >
          我已阅读并同意《预约挂号服务协议》和《隐私政策》
        </Checkbox>
      </div>

      {/* 确认按钮 */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <Space size="large">
          <Button size="large">
            返回修改
          </Button>
          <Button 
            type="primary" 
            size="large" 
            loading={loading}
            disabled={!agreed}
            onClick={handleConfirm}
            style={{ minWidth: '120px' }}
          >
            确认预约
          </Button>
        </Space>
      </div>

      {/* 费用说明 */}
      <Card 
        size="small" 
        style={{ 
          marginTop: '16px', 
          backgroundColor: '#fff7e6', 
          border: '1px solid #ffd591' 
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            本次预约总费用：
          </Text>
          <Text strong style={{ color: '#ff4d4f', fontSize: '18px', marginLeft: '8px' }}>
            ¥{doctor?.consultationFee}
          </Text>
          <Text type="secondary" style={{ fontSize: '12px', marginLeft: '8px' }}>
            （挂号费）
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default AppointmentConfirm;
