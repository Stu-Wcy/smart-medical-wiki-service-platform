import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
  Input,
  message,
  Row,
  Col,
} from 'antd';
import dayjs from 'dayjs';
import { addSchedule, updateSchedule } from '@/api/admin/schedule';
import type { Schedule, ScheduleAddDTO } from '@/api/admin/schedule';
import type { Doctor } from '@/types/doctor';
import type { Hospital } from '@/types/hospital';
import type { Department } from '@/types/department';

const { Option } = Select;
const { TextArea } = Input;

interface ScheduleFormProps {
  visible: boolean;
  schedule: Schedule | null;
  hospitals: Hospital[];
  departments: Department[];
  doctors: Doctor[];
  onCancel: () => void;
  onSuccess: () => void;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  visible,
  schedule,
  hospitals,
  departments,
  doctors,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | undefined>();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | undefined>();

  // 根据选择的医院过滤科室
  const filteredDepartments = departments.filter(dept =>
    !selectedHospitalId || dept.hospitalId === selectedHospitalId
  );

  // 根据选择的医院和科室过滤医生
  const filteredDoctors = doctors.filter(doctor => {
    // 首先按医院过滤
    if (selectedHospitalId && doctor.hospitalId !== selectedHospitalId) {
      return false;
    }
    // 然后按科室过滤
    if (selectedDepartmentId && doctor.departmentId !== selectedDepartmentId) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (visible) {
      console.log('ScheduleForm 打开，数据:', {
        schedule,
        hospitals: hospitals.length,
        departments: departments.length,
        doctors: doctors.length
      });

      if (schedule) {
        // 编辑模式
        console.log('编辑模式，设置表单值:', schedule);
        form.setFieldsValue({
          ...schedule,
          scheduleDate: dayjs(schedule.scheduleDate),
          startTime: dayjs(schedule.startTime, 'HH:mm:ss'),
          endTime: dayjs(schedule.endTime, 'HH:mm:ss'),
        });
        setSelectedHospitalId(schedule.hospitalId);
        setSelectedDepartmentId(schedule.departmentId);
      } else {
        // 新增模式
        console.log('新增模式，重置表单');
        form.resetFields();
        setSelectedHospitalId(undefined);
        setSelectedDepartmentId(undefined);
        // 设置默认值
        form.setFieldsValue({
          timeSlot: 1,
          totalSlots: 20,
          consultationFee: 100,
        });
      }
    }
  }, [visible, schedule, form, hospitals, departments, doctors]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const submitData: ScheduleAddDTO = {
        ...values,
        scheduleDate: values.scheduleDate.format('YYYY-MM-DD'),
        startTime: values.startTime.format('HH:mm:ss'),
        endTime: values.endTime.format('HH:mm:ss'),
      };

      console.log('提交的数据:', submitData);
      console.log('是否为编辑模式:', !!schedule);
      if (schedule) {
        console.log('编辑的排班ID:', schedule.id);
      }

      let response;
      if (schedule) {
        // 编辑模式，调用更新API
        console.log('调用更新API:', `/admin/schedules/${schedule.id}`);
        response = await updateSchedule(schedule.id, submitData);
      } else {
        // 新增模式，调用新增API
        console.log('调用新增API:', '/admin/schedules');
        response = await addSchedule(submitData);
      }

      console.log('排班提交API响应:', response);

      if (response.data?.code === 200) {
        message.success(schedule ? '更新成功' : '添加成功');
        onSuccess();
      } else {
        console.warn('排班提交API返回非成功状态:', response.data);
        message.error(response.data?.message || (schedule ? '更新失败' : '添加失败'));
      }
    } catch (error: any) {
      console.error('提交排班失败:', error);
      console.error('错误详情:', {
        message: error.message,
        response: error.response,
        config: error.config
      });

      // 显示更具体的错误信息
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else if (error.message) {
        message.error(error.message);
      } else {
        message.error(schedule ? '更新失败' : '添加失败');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleHospitalChange = (hospitalId: number) => {
    setSelectedHospitalId(hospitalId);
    setSelectedDepartmentId(undefined);
    // 清空科室和医生选择
    form.setFieldsValue({
      departmentId: undefined,
      doctorId: undefined,
    });
  };

  const handleDepartmentChange = (departmentId: number) => {
    setSelectedDepartmentId(departmentId);
    // 清空医生选择
    form.setFieldsValue({
      doctorId: undefined,
    });
  };

  // 时间段选项
  const timeSlotOptions = [
    { value: 1, label: '上午' },
    { value: 2, label: '下午' },
    { value: 3, label: '晚上' },
  ];

  return (
    <Modal
      title={schedule ? '编辑排班' : '新增排班'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          timeSlot: 1,
          totalSlots: 20,
          consultationFee: 100,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="hospitalId"
              label="所属医院"
              rules={[{ required: true, message: '请选择所属医院' }]}
            >
              <Select
                placeholder="请选择所属医院"
                onChange={handleHospitalChange}
              >
                {hospitals.map(hospital => (
                  <Option key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="departmentId" label="所属科室">
              <Select
                placeholder="请选择所属科室"
                allowClear
                onChange={handleDepartmentChange}
              >
                {filteredDepartments.map(dept => (
                  <Option key={dept.id} value={dept.id}>
                    {dept.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="doctorId"
          label="医生"
          rules={[{ required: true, message: '请选择医生' }]}
        >
          <Select placeholder="请选择医生">
            {filteredDoctors.map(doctor => (
              <Option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="scheduleDate"
              label="排班日期"
              rules={[{ required: true, message: '请选择排班日期' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="请选择排班日期"
                disabledDate={(current) => current && current < dayjs().startOf('day')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="timeSlot"
              label="时间段"
              rules={[{ required: true, message: '请选择时间段' }]}
            >
              <Select placeholder="请选择时间段">
                {timeSlotOptions.map(option => (
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
              name="startTime"
              label="开始时间"
              rules={[{ required: true, message: '请选择开始时间' }]}
            >
              <TimePicker
                style={{ width: '100%' }}
                placeholder="请选择开始时间"
                format="HH:mm"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="endTime"
              label="结束时间"
              rules={[{ required: true, message: '请选择结束时间' }]}
            >
              <TimePicker
                style={{ width: '100%' }}
                placeholder="请选择结束时间"
                format="HH:mm"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="totalSlots"
              label="总号源数量"
              rules={[
                { required: true, message: '请输入总号源数量' },
                { type: 'number', min: 1, message: '号源数量必须大于0' },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="请输入总号源数量"
                min={1}
                max={100}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="consultationFee"
              label="挂号费用"
              rules={[
                { required: true, message: '请输入挂号费用' },
                { type: 'number', min: 0, message: '挂号费用不能为负数' },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="请输入挂号费用"
                min={0}
                precision={2}
                addonAfter="元"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="notes" label="备注信息">
          <TextArea
            rows={3}
            placeholder="请输入备注信息"
            maxLength={500}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ScheduleForm;
