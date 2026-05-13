import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Calendar,
  Badge,
  Space,
  Tag,
  Empty,
  message,
  Modal,
  List
} from 'antd';
import { ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { getDoctorSchedules, getScheduleSlots } from '@/api/schedule';
import type { DoctorScheduleInfo, ScheduleSlot, AppointmentSlot } from '@/types/appointment';

const { Title, Text } = Typography;

interface TimeSelectionProps {
  doctor: DoctorScheduleInfo;
  onSelect: (schedule: ScheduleSlot, slotId: number, slotNumber: number, appointmentTime: string) => void;
  refreshTrigger?: number; // 用于触发数据刷新
}

// 使用后端的 AppointmentSlot 类型
type SlotDetail = AppointmentSlot;

const TimeSelection: React.FC<TimeSelectionProps> = ({ doctor, onSelect, refreshTrigger }) => {
  const [schedules, setSchedules] = useState<ScheduleSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleSlot | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SlotDetail | null>(null);
  const [slotModalVisible, setSlotModalVisible] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<SlotDetail[]>([]);

  useEffect(() => {
    fetchSchedules();
  }, [doctor.doctorId, refreshTrigger]);

  const fetchSchedules = async () => {
    try {
      const response = await getDoctorSchedules(doctor.doctorId);
      if (response.data && response.data.code === 200) {
        setSchedules(response.data.data || []);
      } else {
        message.error('获取排班信息失败');
      }
    } catch (error) {
      console.error('获取排班信息失败:', error);
      message.error('获取排班信息失败');
    }
  };

  // 获取日期的排班数据
  const getDateSchedules = (date: string) => {
    return schedules.filter(schedule => schedule.scheduleDate === date);
  };

  // 日历单元格渲染
  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    const dateSchedules = getDateSchedules(dateStr);
    
    if (dateSchedules.length === 0) return null;

    const totalAvailable = dateSchedules.reduce((sum, schedule) => sum + schedule.availableSlots, 0);
    
    return (
      <div>
        {dateSchedules.map((schedule, index) => (
          <Badge
            key={index}
            status={schedule.availableSlots > 0 ? 'success' : 'default'}
            text={
              <span style={{ fontSize: '10px' }}>
                {schedule.timeSlotName}: {schedule.availableSlots}
              </span>
            }
          />
        ))}
      </div>
    );
  };

  // 选择日期
  const handleDateSelect = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    const dateSchedules = getDateSchedules(dateStr);
    
    if (dateSchedules.length === 0) {
      message.warning('该日期无可预约时段');
      return;
    }

    setSelectedDate(dateStr);
  };

  // 选择时间段
  const handleScheduleSelect = async (schedule: ScheduleSlot) => {
    if (schedule.availableSlots === 0) {
      message.warning('该时段已无可预约号源');
      return;
    }

    setSelectedSchedule(schedule);

    try {
      // 调用API获取该排班的具体号源列表
      const response = await getScheduleSlots(schedule.scheduleId);
      if (response.data && response.data.code === 200) {
        const allSlots = response.data.data || [];
        // 只显示可预约的号源
        const availableSlots = allSlots.filter(slot => slot.status === 0);
        setAvailableSlots(availableSlots);
        setSlotModalVisible(true);
      } else {
        message.error('获取号源信息失败');
      }
    } catch (error) {
      console.error('获取号源信息失败:', error);
      message.error('获取号源信息失败');
    }
  };

  // 选择具体号源
  const handleSlotSelect = (slot: SlotDetail) => {
    setSelectedSlot(slot);
    setSlotModalVisible(false);
  };

  // 确认选择
  const handleConfirm = () => {
    if (selectedSchedule && selectedSlot) {
      onSelect(selectedSchedule, selectedSlot.id, selectedSlot.slotNumber, selectedSlot.appointmentTime);
    }
  };

  // 禁用过去的日期
  const disabledDate = (current: Dayjs) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <div>
      <Title level={4}>选择就诊时间</Title>
      <Text type="secondary">
        医生：{doctor.doctorName} ({doctor.doctorTitle}) | 挂号费：¥{doctor.consultationFee}
      </Text>

      <Row gutter={24} style={{ marginTop: '16px' }}>
        {/* 日历选择 */}
        <Col span={16}>
          <Card title="选择就诊日期" style={{ height: '500px' }}>
            <Calendar
              fullscreen={false}
              dateCellRender={dateCellRender}
              onSelect={handleDateSelect}
              disabledDate={disabledDate}
            />
          </Card>
        </Col>

        {/* 时间段选择 */}
        <Col span={8}>
          <Card title="选择时间段" style={{ height: '500px' }}>
            {!selectedDate ? (
              <Empty 
                description="请先选择日期" 
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ marginTop: '100px' }}
              />
            ) : (
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <CalendarOutlined style={{ marginRight: '8px' }} />
                  <Text strong>{selectedDate}</Text>
                </div>
                
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  {getDateSchedules(selectedDate).map((schedule, index) => (
                    <Card
                      key={index}
                      size="small"
                      hoverable
                      className={selectedSchedule?.scheduleId === schedule.scheduleId ? 'selected-time-card' : ''}
                      onClick={() => handleScheduleSelect(schedule)}
                      style={{
                        border: selectedSchedule?.scheduleId === schedule.scheduleId 
                          ? '2px solid #1890ff' 
                          : '1px solid #d9d9d9',
                        cursor: schedule.availableSlots > 0 ? 'pointer' : 'not-allowed',
                        opacity: schedule.availableSlots > 0 ? 1 : 0.5
                      }}
                    >
                      <div>
                        <div style={{ marginBottom: '8px' }}>
                          <Tag color="blue">{schedule.timeSlotName}</Tag>
                          <Text strong>{schedule.startTime} - {schedule.endTime}</Text>
                        </div>
                        <div>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            可约：{schedule.availableSlots}/{schedule.totalSlots}
                          </Text>
                        </div>
                      </div>
                    </Card>
                  ))}
                </Space>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* 已选择的信息 */}
      {selectedSlot && (
        <Card style={{ marginTop: '16px', backgroundColor: '#f6ffed', border: '1px solid #b7eb8f' }}>
          <div>
            <Text strong>已选择：</Text>
            <Space>
              <Tag color="green">{selectedDate}</Tag>
              <Tag color="blue">{selectedSchedule?.timeSlotName}</Tag>
              <Tag>{dayjs(selectedSlot.appointmentTime).format('HH:mm')}</Tag>
              <Text>第{selectedSlot.slotNumber}号</Text>
            </Space>
          </div>
        </Card>
      )}

      {/* 确认按钮 */}
      {selectedSlot && (
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Button type="primary" size="large" onClick={handleConfirm}>
            确认时间：{dayjs(selectedSlot.appointmentTime).format('MM月DD日 HH:mm')}
          </Button>
        </div>
      )}

      {/* 号源选择弹窗 */}
      <Modal
        title="选择具体时间"
        open={slotModalVisible}
        onCancel={() => setSlotModalVisible(false)}
        footer={null}
        width={400}
      >
        <div style={{ marginBottom: '16px' }}>
          <Text>
            {selectedDate} {selectedSchedule?.timeSlotName} 
            ({selectedSchedule?.startTime} - {selectedSchedule?.endTime})
          </Text>
        </div>
        
        <List
          dataSource={availableSlots}
          renderItem={(slot) => (
            <List.Item
              style={{ cursor: 'pointer', padding: '8px 12px' }}
              onClick={() => handleSlotSelect(slot)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>
                  <ClockCircleOutlined style={{ marginRight: '8px' }} />
                  {dayjs(slot.appointmentTime).format('HH:mm')}
                </span>
                <span>第{slot.slotNumber}号</span>
              </div>
            </List.Item>
          )}
        />
      </Modal>

      
    </div>
  );
};

export default TimeSelection;
