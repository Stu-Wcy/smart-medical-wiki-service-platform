package com.example.backend.modules.schedule.service;

import com.example.backend.common.exception.ServiceException;
import com.example.backend.modules.schedule.dto.*;
import com.example.backend.modules.schedule.entity.Schedule;
import com.example.backend.modules.schedule.entity.AppointmentSlot;
import com.example.backend.modules.schedule.repository.ScheduleRepository;
import com.example.backend.modules.schedule.repository.AppointmentSlotRepository;
import com.example.backend.modules.doctor.repository.DoctorRepository;
import com.example.backend.modules.hospital.repository.HospitalRepository;
import com.example.backend.modules.department.repository.DepartmentRepository;
import com.example.backend.modules.doctor.entity.Doctor;
import com.example.backend.modules.hospital.entity.Hospital;
import com.example.backend.modules.department.entity.Department;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final AppointmentSlotRepository appointmentSlotRepository;
    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;
    private final DepartmentRepository departmentRepository;

    /**
     * 新增排班
     */
    @Transactional
    public void addSchedule(ScheduleAddDTO dto) {
        // 检查医生是否存在
        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new ServiceException("医生不存在"));

        // 检查医院是否存在
        Hospital hospital = hospitalRepository.findById(dto.getHospitalId())
                .orElseThrow(() -> new ServiceException("医院不存在"));

        // 检查科室是否存在（如果提供了科室ID）
        if (dto.getDepartmentId() != null) {
            departmentRepository.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new ServiceException("科室不存在"));
        }

        // 检查是否存在冲突的排班
        Optional<Schedule> conflictSchedule = scheduleRepository.findConflictSchedule(
                dto.getDoctorId(), dto.getScheduleDate(), dto.getTimeSlot(), null);
        if (conflictSchedule.isPresent()) {
            throw new ServiceException("该医生在此时间段已有排班");
        }

        // 创建排班
        Schedule schedule = new Schedule();
        schedule.setDoctorId(dto.getDoctorId());
        schedule.setHospitalId(dto.getHospitalId());
        schedule.setDepartmentId(dto.getDepartmentId());
        schedule.setScheduleDate(dto.getScheduleDate());
        schedule.setTimeSlot(dto.getTimeSlot());
        schedule.setStartTime(dto.getStartTime());
        schedule.setEndTime(dto.getEndTime());
        schedule.setTotalSlots(dto.getTotalSlots());
        schedule.setAvailableSlots(dto.getTotalSlots());
        schedule.setConsultationFee(dto.getConsultationFee());
        schedule.setStatus(1); // 默认正常状态
        schedule.setNotes(dto.getNotes());

        schedule = scheduleRepository.save(schedule);

        // 生成号源
        generateAppointmentSlots(schedule);
    }

    /**
     * 更新排班
     */
    @Transactional
    public void updateSchedule(Long id, ScheduleAddDTO dto) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("排班不存在"));

        // 更新排班信息
        schedule.setDoctorId(dto.getDoctorId());
        schedule.setHospitalId(dto.getHospitalId());
        schedule.setDepartmentId(dto.getDepartmentId());
        schedule.setScheduleDate(dto.getScheduleDate());
        schedule.setTimeSlot(dto.getTimeSlot());
        schedule.setStartTime(dto.getStartTime());
        schedule.setEndTime(dto.getEndTime());
        schedule.setTotalSlots(dto.getTotalSlots());
        schedule.setConsultationFee(dto.getConsultationFee());
        schedule.setNotes(dto.getNotes());

        // 重新计算可用号源数量
        schedule.setAvailableSlots(dto.getTotalSlots());

        scheduleRepository.save(schedule);

        // 先查询现有号源
        List<AppointmentSlot> existingSlots = appointmentSlotRepository.findByScheduleIdAndDeletedFalseOrderBySlotNumber(id);

        // 删除现有号源
        if (!existingSlots.isEmpty()) {
            appointmentSlotRepository.deleteAll(existingSlots);
            // 强制刷新，确保删除操作立即执行
            appointmentSlotRepository.flush();
        }

        // 重新生成号源
        generateAppointmentSlots(schedule);
    }

    /**
     * 生成号源
     */
    private void generateAppointmentSlots(Schedule schedule) {
        List<AppointmentSlot> slots = new ArrayList<>();
        LocalTime startTime = schedule.getStartTime();
        LocalTime endTime = schedule.getEndTime();
        int totalSlots = schedule.getTotalSlots();

        // 计算每个号源的时间间隔（分钟）
        long totalMinutes = java.time.Duration.between(startTime, endTime).toMinutes();
        long intervalMinutes = totalMinutes / totalSlots;

        for (int i = 1; i <= totalSlots; i++) {
            AppointmentSlot slot = new AppointmentSlot();
            slot.setScheduleId(schedule.getId());
            slot.setSlotNumber(i);
            
            // 计算每个号源的具体时间
            LocalTime slotTime = startTime.plusMinutes((i - 1) * intervalMinutes);
            LocalDateTime appointmentTime = LocalDateTime.of(schedule.getScheduleDate(), slotTime);
            slot.setAppointmentTime(appointmentTime);
            slot.setStatus(0); // 可预约状态
            
            slots.add(slot);
        }

        appointmentSlotRepository.saveAll(slots);
    }

    /**
     * 根据医院ID获取科室号源信息
     */
    public List<DepartmentScheduleDTO> getDepartmentSchedulesByHospitalId(Long hospitalId) {
        // 获取未来7天的排班数据
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusDays(7);
        
        List<Schedule> schedules = scheduleRepository.findByHospitalIdAndDateRange(hospitalId, startDate, endDate);
        
        // 按科室分组
        Map<Long, List<Schedule>> departmentScheduleMap = schedules.stream()
                .filter(s -> s.getDepartmentId() != null)
                .collect(Collectors.groupingBy(Schedule::getDepartmentId));

        List<DepartmentScheduleDTO> result = new ArrayList<>();
        
        for (Map.Entry<Long, List<Schedule>> entry : departmentScheduleMap.entrySet()) {
            Long departmentId = entry.getKey();
            List<Schedule> departmentSchedules = entry.getValue();
            
            // 获取科室信息
            Optional<Department> departmentOpt = departmentRepository.findById(departmentId);
            if (departmentOpt.isEmpty()) continue;
            
            Department department = departmentOpt.get();
            DepartmentScheduleDTO dto = new DepartmentScheduleDTO();
            dto.setDepartmentId(departmentId);
            dto.setDepartmentName(department.getName());
            dto.setDepartmentDescription(department.getDescription());
            
            // 处理科室图片
            if (department.getImages() != null && !department.getImages().isEmpty()) {
                dto.setDepartmentImages(Arrays.asList(department.getImages().split(",")));
            }
            
            // 按医生分组
            Map<Long, List<Schedule>> doctorScheduleMap = departmentSchedules.stream()
                    .collect(Collectors.groupingBy(Schedule::getDoctorId));
            
            List<DepartmentScheduleDTO.DoctorScheduleInfo> doctors = new ArrayList<>();
            
            for (Map.Entry<Long, List<Schedule>> doctorEntry : doctorScheduleMap.entrySet()) {
                Long doctorId = doctorEntry.getKey();
                List<Schedule> doctorSchedules = doctorEntry.getValue();
                
                // 获取医生信息
                Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
                if (doctorOpt.isEmpty()) continue;
                
                Doctor doctor = doctorOpt.get();
                DepartmentScheduleDTO.DoctorScheduleInfo doctorInfo = new DepartmentScheduleDTO.DoctorScheduleInfo();
                doctorInfo.setDoctorId(doctorId);
                doctorInfo.setDoctorName(doctor.getName());
                doctorInfo.setDoctorTitle(doctor.getTitle());
                doctorInfo.setDoctorAvatar(doctor.getAvatar());
                doctorInfo.setDoctorSpecialties(doctor.getSpecialties());
                
                // 获取挂号费（取第一个排班的费用）
                if (!doctorSchedules.isEmpty()) {
                    doctorInfo.setConsultationFee(doctorSchedules.get(0).getConsultationFee());
                }
                
                // 转换排班信息
                List<DepartmentScheduleDTO.ScheduleSlot> scheduleSlots = doctorSchedules.stream()
                        .map(this::convertToScheduleSlot)
                        .collect(Collectors.toList());
                doctorInfo.setSchedules(scheduleSlots);
                
                doctors.add(doctorInfo);
            }
            
            dto.setDoctors(doctors);
            result.add(dto);
        }
        
        return result;
    }

    /**
     * 转换排班信息
     */
    private DepartmentScheduleDTO.ScheduleSlot convertToScheduleSlot(Schedule schedule) {
        DepartmentScheduleDTO.ScheduleSlot slot = new DepartmentScheduleDTO.ScheduleSlot();
        slot.setScheduleId(schedule.getId());
        slot.setDoctorId(schedule.getDoctorId());
        slot.setScheduleDate(schedule.getScheduleDate());
        slot.setTimeSlot(schedule.getTimeSlot());
        slot.setTimeSlotName(getTimeSlotName(schedule.getTimeSlot()));
        slot.setStartTime(schedule.getStartTime());
        slot.setEndTime(schedule.getEndTime());
        slot.setTotalSlots(schedule.getTotalSlots());

        // 动态计算可用号源数量
        int availableSlots = calculateAvailableSlots(schedule.getId());
        slot.setAvailableSlots(availableSlots);

        slot.setStatus(schedule.getStatus());
        return slot;
    }

    /**
     * 计算排班的可用号源数量
     */
    private int calculateAvailableSlots(Long scheduleId) {
        // 查询该排班下状态为0（可预约）的号源数量
        return appointmentSlotRepository.countByScheduleIdAndStatusAndDeletedFalse(scheduleId, 0);
    }

    /**
     * 根据科室ID获取排班信息
     */
    public List<DepartmentScheduleDTO.ScheduleSlot> getDepartmentSchedules(Long departmentId) {
        // 获取未来7天的排班数据
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusDays(7);

        List<Schedule> schedules = scheduleRepository.findByDepartmentIdAndDateRange(departmentId, startDate, endDate);

        return schedules.stream()
                .map(this::convertToScheduleSlot)
                .collect(Collectors.toList());
    }

    /**
     * 获取时间段名称
     */
    private String getTimeSlotName(Integer timeSlot) {
        switch (timeSlot) {
            case 1: return "上午";
            case 2: return "下午";
            case 3: return "晚上";
            default: return "未知";
        }
    }

    /**
     * 分页查询排班
     */
    public Page<ScheduleDTO> getSchedules(Long hospitalId, Long departmentId, Long doctorId,
                                        LocalDate startDate, LocalDate endDate, Pageable pageable) {
        Page<Schedule> schedulePage = scheduleRepository.findSchedulesWithConditions(
                hospitalId, departmentId, doctorId, startDate, endDate, pageable);
        
        return schedulePage.map(this::convertToScheduleDTO);
    }

    /**
     * 转换为ScheduleDTO
     */
    private ScheduleDTO convertToScheduleDTO(Schedule schedule) {
        ScheduleDTO dto = new ScheduleDTO();
        dto.setId(schedule.getId());
        dto.setDoctorId(schedule.getDoctorId());
        dto.setHospitalId(schedule.getHospitalId());
        dto.setDepartmentId(schedule.getDepartmentId());
        dto.setScheduleDate(schedule.getScheduleDate());
        dto.setTimeSlot(schedule.getTimeSlot());
        dto.setTimeSlotName(getTimeSlotName(schedule.getTimeSlot()));
        dto.setStartTime(schedule.getStartTime());
        dto.setEndTime(schedule.getEndTime());
        dto.setTotalSlots(schedule.getTotalSlots());
        // 动态计算可用号源数量
        int availableSlots = calculateAvailableSlots(schedule.getId());
        dto.setAvailableSlots(availableSlots);
        dto.setConsultationFee(schedule.getConsultationFee());
        dto.setStatus(schedule.getStatus());
        dto.setNotes(schedule.getNotes());

        // 设置关联信息
        if (schedule.getDoctor() != null) {
            dto.setDoctorName(schedule.getDoctor().getName());
            dto.setDoctorTitle(schedule.getDoctor().getTitle());
        }
        if (schedule.getHospital() != null) {
            dto.setHospitalName(schedule.getHospital().getName());
        }
        if (schedule.getDepartment() != null) {
            dto.setDepartmentName(schedule.getDepartment().getName());
        }

        return dto;
    }

    /**
     * 删除排班
     */
    @Transactional
    public void deleteSchedule(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new ServiceException("排班不存在"));

        // 检查是否有已预约的号源
        Integer bookedSlots = appointmentSlotRepository.countBookedSlots(id);
        if (bookedSlots > 0) {
            throw new ServiceException("该排班已有预约记录，无法删除");
        }

        // 软删除排班
        schedule.setDeleted(true);
        scheduleRepository.save(schedule);

        // 软删除相关号源
        List<AppointmentSlot> slots = appointmentSlotRepository.findByScheduleIdAndDeletedFalseOrderBySlotNumber(id);
        slots.forEach(slot -> slot.setDeleted(true));
        appointmentSlotRepository.saveAll(slots);
    }

    /**
     * 更新排班状态
     */
    @Transactional
    public void updateScheduleStatus(Long id, Integer status) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new ServiceException("排班不存在"));

        schedule.setStatus(status);
        scheduleRepository.save(schedule);
    }



    /**
     * 根据医生ID获取排班信息
     */
    public List<DepartmentScheduleDTO.ScheduleSlot> getDoctorSchedules(Long doctorId) {
        // 获取未来7天的排班数据
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusDays(7);

        List<Schedule> schedules = scheduleRepository.findByDoctorIdAndDateRange(doctorId, startDate, endDate);

        return schedules.stream()
                .map(this::convertToScheduleSlot)
                .collect(Collectors.toList());
    }

    /**
     * 根据排班ID获取号源列表
     */
    public List<AppointmentSlotDTO> getScheduleSlots(Long scheduleId) {
        List<AppointmentSlot> slots = appointmentSlotRepository.findByScheduleIdAndDeletedFalseOrderBySlotNumber(scheduleId);

        return slots.stream()
                .map(this::convertToAppointmentSlotDTO)
                .collect(Collectors.toList());
    }

    /**
     * 转换为AppointmentSlotDTO
     */
    private AppointmentSlotDTO convertToAppointmentSlotDTO(AppointmentSlot slot) {
        AppointmentSlotDTO dto = new AppointmentSlotDTO();
        dto.setId(slot.getId());
        dto.setScheduleId(slot.getScheduleId());
        dto.setSlotNumber(slot.getSlotNumber());
        dto.setAppointmentTime(slot.getAppointmentTime());
        dto.setStatus(slot.getStatus());
        dto.setUserId(slot.getUserId());
        dto.setUserName(slot.getUserName());
        dto.setUserPhone(slot.getUserPhone());
        dto.setAppointmentNo(slot.getAppointmentNo());
        return dto;
    }

}
