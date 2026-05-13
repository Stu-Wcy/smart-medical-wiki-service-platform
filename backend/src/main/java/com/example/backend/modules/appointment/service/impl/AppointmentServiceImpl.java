package com.example.backend.modules.appointment.service.impl;

import com.example.backend.modules.appointment.dto.AppointmentCreateDTO;
import com.example.backend.modules.appointment.dto.AppointmentDTO;
import com.example.backend.modules.appointment.dto.AppointmentQueryDTO;
import com.example.backend.modules.appointment.entity.Appointment;
import com.example.backend.modules.appointment.enums.AppointmentStatus;
import com.example.backend.modules.appointment.repository.AppointmentRepository;
import com.example.backend.modules.appointment.service.AppointmentService;
import com.example.backend.modules.schedule.entity.AppointmentSlot;
import com.example.backend.modules.schedule.repository.AppointmentSlotRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import jakarta.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 预约订单服务实现
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentSlotRepository appointmentSlotRepository;

    @Override
    @Transactional
    public AppointmentDTO createAppointment(Long userId, AppointmentCreateDTO createDTO) {
        log.info("创建预约订单，用户ID: {}, 号源ID: {}", userId, createDTO.getSlotId());

        // 检查号源是否可用
        AppointmentSlot slot = appointmentSlotRepository.findById(createDTO.getSlotId())
                .orElseThrow(() -> new RuntimeException("号源不存在"));

        if (slot.getStatus() != 0) {
            throw new RuntimeException("号源不可预约");
        }

        // 检查是否已有预约
        if (appointmentRepository.findBySlotIdAndDeletedFalse(createDTO.getSlotId()).isPresent()) {
            throw new RuntimeException("该号源已被预约");
        }

        // 创建预约订单
        Appointment appointment = new Appointment();
        appointment.setAppointmentNo(generateAppointmentNo());
        appointment.setUserId(userId);
        appointment.setDoctorId(createDTO.getDoctorId());
        appointment.setHospitalId(createDTO.getHospitalId());
        appointment.setDepartmentId(createDTO.getDepartmentId());
        appointment.setScheduleId(createDTO.getScheduleId());
        appointment.setSlotId(createDTO.getSlotId());
        appointment.setAppointmentDate(createDTO.getAppointmentDate());
        appointment.setAppointmentTime(createDTO.getAppointmentTime());
        appointment.setTimeSlot(createDTO.getTimeSlot());
        appointment.setSlotNumber(createDTO.getSlotNumber());
        appointment.setPatientName(createDTO.getPatientName());
        appointment.setPatientPhone(createDTO.getPatientPhone());
        appointment.setPatientIdCard(createDTO.getPatientIdCard());
        appointment.setConsultationFee(createDTO.getConsultationFee());
        appointment.setStatus(AppointmentStatus.PENDING);
        appointment.setNotes(createDTO.getNotes());

        appointment = appointmentRepository.save(appointment);

        // 更新号源状态
        slot.setStatus(1); // 已预约
        slot.setUserId(userId);
        slot.setUserName(createDTO.getPatientName());
        slot.setUserPhone(createDTO.getPatientPhone());
        slot.setAppointmentNo(appointment.getAppointmentNo());
        appointmentSlotRepository.save(slot);

        // 注意：可用号源数量现在通过动态计算获得，不需要手动更新Schedule表

        log.info("预约订单创建成功，预约单号: {}", appointment.getAppointmentNo());
        return convertToDTO(appointment);
    }

    @Override
    @Transactional
    public void cancelAppointment(Long userId, Long appointmentId, String cancelReason) {
        log.info("取消预约订单，用户ID: {}, 预约ID: {}", userId, appointmentId);

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("预约订单不存在"));

        if (!appointment.getUserId().equals(userId)) {
            throw new RuntimeException("无权限操作此预约订单");
        }

        if (appointment.getStatus() != AppointmentStatus.PENDING) {
            throw new RuntimeException("只能取消待就诊状态的预约订单");
        }

        // 更新预约订单状态
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointment.setCancelReason(cancelReason);
        appointment.setCancelTime(LocalDateTime.now());
        appointmentRepository.save(appointment);

        // 释放号源
        AppointmentSlot slot = appointmentSlotRepository.findById(appointment.getSlotId())
                .orElse(null);
        if (slot != null) {
            slot.setStatus(0); // 可预约
            slot.setUserId(null);
            slot.setUserName(null);
            slot.setUserPhone(null);
            slot.setAppointmentNo(null);
            slot.setCancelReason(cancelReason);
            slot.setCancelTime(LocalDateTime.now());
            appointmentSlotRepository.save(slot);

            // 注意：可用号源数量现在通过动态计算获得，不需要手动更新Schedule表
        }

        log.info("预约订单取消成功，预约单号: {}", appointment.getAppointmentNo());
    }

    @Override
    public AppointmentDTO getAppointmentById(Long userId, Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("预约订单不存在"));

        if (!appointment.getUserId().equals(userId)) {
            throw new RuntimeException("无权限查看此预约订单");
        }

        return convertToDTO(appointment);
    }

    @Override
    public AppointmentDTO getAppointmentByNo(String appointmentNo) {
        Appointment appointment = appointmentRepository.findByAppointmentNoAndDeletedFalse(appointmentNo)
                .orElseThrow(() -> new RuntimeException("预约订单不存在"));

        return convertToDTO(appointment);
    }

    @Override
    public List<AppointmentDTO> getUserAppointments(Long userId) {
        List<Appointment> appointments = appointmentRepository.findByUserIdAndDeletedFalseOrderByCreatedTimeDesc(userId);
        return appointments.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Page<AppointmentDTO> getUserAppointmentsPage(Long userId, AppointmentQueryDTO queryDTO) {
        Pageable pageable = PageRequest.of(
                queryDTO.getPage() - 1,
                queryDTO.getSize(),
                Sort.by(Sort.Direction.DESC, "createdTime")
        );

        Specification<Appointment> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            predicates.add(criteriaBuilder.equal(root.get("deleted"), false));
            predicates.add(criteriaBuilder.equal(root.get("userId"), userId));

            if (queryDTO.getStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), queryDTO.getStatus()));
            }

            if (StringUtils.hasText(queryDTO.getPatientName())) {
                predicates.add(criteriaBuilder.like(root.get("patientName"), "%" + queryDTO.getPatientName() + "%"));
            }

            if (queryDTO.getStartDate() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("appointmentDate"), queryDTO.getStartDate()));
            }

            if (queryDTO.getEndDate() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("appointmentDate"), queryDTO.getEndDate()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        Page<Appointment> appointmentPage = appointmentRepository.findAll(spec, pageable);
        return appointmentPage.map(this::convertToDTO);
    }

    @Override
    @Transactional
    public void updateAppointmentStatus(Long appointmentId, AppointmentStatus status) {
        log.info("更新预约订单状态，预约ID: {}, 状态: {}", appointmentId, status);

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("预约订单不存在"));

        appointment.setStatus(status);
        appointmentRepository.save(appointment);

        log.info("预约订单状态更新成功");
    }

    @Override
    public Page<AppointmentDTO> getAllAppointmentsPage(AppointmentQueryDTO queryDTO) {
        Pageable pageable = PageRequest.of(
                queryDTO.getPage() - 1,
                queryDTO.getSize(),
                Sort.by(Sort.Direction.DESC, "createdTime")
        );

        Specification<Appointment> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            predicates.add(criteriaBuilder.equal(root.get("deleted"), false));

            if (queryDTO.getUserId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("userId"), queryDTO.getUserId()));
            }

            if (queryDTO.getDoctorId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("doctorId"), queryDTO.getDoctorId()));
            }

            if (queryDTO.getHospitalId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("hospitalId"), queryDTO.getHospitalId()));
            }

            if (StringUtils.hasText(queryDTO.getAppointmentNo())) {
                predicates.add(criteriaBuilder.like(root.get("appointmentNo"), "%" + queryDTO.getAppointmentNo() + "%"));
            }

            if (StringUtils.hasText(queryDTO.getPatientName())) {
                predicates.add(criteriaBuilder.like(root.get("patientName"), "%" + queryDTO.getPatientName() + "%"));
            }

            if (queryDTO.getStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), queryDTO.getStatus()));
            }

            if (queryDTO.getStartDate() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("appointmentDate"), queryDTO.getStartDate()));
            }

            if (queryDTO.getEndDate() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("appointmentDate"), queryDTO.getEndDate()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        Page<Appointment> appointmentPage = appointmentRepository.findAll(spec, pageable);
        return appointmentPage.map(this::convertToDTO);
    }

    @Override
    public AppointmentDTO getAppointmentByIdForAdmin(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("预约订单不存在"));

        return convertToDTO(appointment);
    }

    @Override
    @Transactional
    public void cancelAppointmentForAdmin(Long appointmentId, String cancelReason) {
        log.info("管理员取消预约订单，预约ID: {}", appointmentId);

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("预约订单不存在"));

        if (appointment.getStatus() != AppointmentStatus.PENDING) {
            throw new RuntimeException("只能取消待就诊状态的预约订单");
        }

        // 更新预约订单状态
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointment.setCancelReason(cancelReason);
        appointment.setCancelTime(LocalDateTime.now());
        appointmentRepository.save(appointment);

        // 释放号源
        AppointmentSlot slot = appointmentSlotRepository.findById(appointment.getSlotId())
                .orElse(null);
        if (slot != null) {
            slot.setStatus(0); // 可预约
            slot.setUserId(null);
            slot.setUserName(null);
            slot.setUserPhone(null);
            slot.setAppointmentNo(null);
            slot.setCancelReason(cancelReason);
            slot.setCancelTime(LocalDateTime.now());
            appointmentSlotRepository.save(slot);

            // 注意：可用号源数量现在通过动态计算获得，不需要手动更新Schedule表
        }

        log.info("管理员取消预约订单成功，预约单号: {}", appointment.getAppointmentNo());
    }

    @Override
    public List<AppointmentDTO> getDoctorAppointments(Long doctorId) {
        List<Appointment> appointments = appointmentRepository.findByDoctorIdAndDeletedFalseOrderByAppointmentTimeAsc(doctorId);
        return appointments.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public boolean isSlotAvailable(Long slotId) {
        AppointmentSlot slot = appointmentSlotRepository.findById(slotId).orElse(null);
        return slot != null && slot.getStatus() == 0;
    }

    @Override
    public String generateAppointmentNo() {
        return "APT" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) + 
               String.format("%03d", (int)(Math.random() * 1000));
    }

    /**
     * 转换为DTO
     */
    private AppointmentDTO convertToDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setAppointmentNo(appointment.getAppointmentNo());
        dto.setUserId(appointment.getUserId());
        dto.setDoctorId(appointment.getDoctorId());
        dto.setHospitalId(appointment.getHospitalId());
        dto.setDepartmentId(appointment.getDepartmentId());
        dto.setScheduleId(appointment.getScheduleId());
        dto.setSlotId(appointment.getSlotId());
        dto.setAppointmentDate(appointment.getAppointmentDate());
        dto.setAppointmentTime(appointment.getAppointmentTime());
        dto.setTimeSlot(appointment.getTimeSlot());
        dto.setSlotNumber(appointment.getSlotNumber());
        dto.setPatientName(appointment.getPatientName());
        dto.setPatientPhone(appointment.getPatientPhone());
        dto.setPatientIdCard(appointment.getPatientIdCard());
        dto.setConsultationFee(appointment.getConsultationFee());
        dto.setStatus(appointment.getStatus());
        dto.setCancelReason(appointment.getCancelReason());
        dto.setCancelTime(appointment.getCancelTime());
        dto.setNotes(appointment.getNotes());
        dto.setCreatedTime(appointment.getCreatedTime());
        dto.setUpdatedTime(appointment.getUpdatedTime());

        // 设置关联信息
        if (appointment.getDoctor() != null) {
            dto.setDoctorName(appointment.getDoctor().getName());
            dto.setDoctorTitle(appointment.getDoctor().getTitle());
        }
        if (appointment.getHospital() != null) {
            dto.setHospitalName(appointment.getHospital().getName());
        }
        if (appointment.getDepartment() != null) {
            dto.setDepartmentName(appointment.getDepartment().getName());
        }

        return dto;
    }
}
