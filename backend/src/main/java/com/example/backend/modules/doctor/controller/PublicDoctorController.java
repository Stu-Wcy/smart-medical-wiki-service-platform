package com.example.backend.modules.doctor.controller;

import com.example.backend.common.base.Result;
import com.example.backend.modules.doctor.dto.DoctorDTO;
import com.example.backend.modules.doctor.entity.Doctor;
import com.example.backend.modules.doctor.repository.DoctorRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "公开医生接口")
@RestController
@RequestMapping("/api/public/doctors")
@RequiredArgsConstructor
public class PublicDoctorController {
    private final DoctorRepository doctorRepository;
    private final com.example.backend.modules.doctor.repository.DoctorUserRepository doctorUserRepository;
    private final com.example.backend.modules.user.repository.UserRepository userRepository;

    @Operation(summary = "获取医生详情")
    @GetMapping("/{id}")
    public Result<DoctorDTO> getDoctorById(@PathVariable Long id) {
        Doctor doctor = doctorRepository.findByIdWithDetails(id);
        if (doctor == null) {
            doctor = doctorRepository.findById(id).orElse(null);
        }
        if (doctor == null) {
            return Result.error("医生不存在");
        }
        return Result.success(toDTO(doctor));
    }

    @Operation(summary = "根据医院ID获取医生列表")
    @GetMapping("/hospital/{hospitalId}")
    public Result<List<DoctorDTO>> getDoctorsByHospitalId(@PathVariable Long hospitalId) {
        List<Doctor> list = doctorRepository.findByHospitalIdWithDetails(hospitalId, 1);
        return Result.success(list.stream().map(this::toDTO).collect(Collectors.toList()));
    }

    @Operation(summary = "根据科室ID获取医生列表")
    @GetMapping("/department/{departmentId}")
    public Result<List<DoctorDTO>> getDoctorsByDepartmentId(@PathVariable Long departmentId) {
        List<Doctor> list = doctorRepository.findByDepartmentIdWithDetails(departmentId, 1);
        return Result.success(list.stream().map(this::toDTO).collect(Collectors.toList()));
    }

    private DoctorDTO toDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setId(doctor.getId());
        dto.setName(doctor.getName());
        dto.setTitle(doctor.getTitle());
        dto.setSpecialties(doctor.getSpecialties());
        dto.setIntroduction(doctor.getIntroduction());
        dto.setAvatar(doctor.getAvatar());
        dto.setHospitalId(doctor.getHospitalId());
        dto.setDepartmentId(doctor.getDepartmentId());
        dto.setPhone(doctor.getPhone());
        dto.setEmail(doctor.getEmail());
        dto.setEducation(doctor.getEducation());
        dto.setExperience(doctor.getExperience());
        dto.setAchievements(doctor.getAchievements());
        dto.setConsultationFee(doctor.getConsultationFee());
        dto.setStatus(doctor.getStatus());
        dto.setSort(doctor.getSort());
        dto.setCreatedTime(doctor.getCreatedTime());
        dto.setUpdatedTime(doctor.getUpdatedTime());
        dto.setHospitalName(doctor.getHospital() != null ? doctor.getHospital().getName() : null);
        dto.setDepartmentName(doctor.getDepartment() != null ? doctor.getDepartment().getName() : null);
        // 附加在线状态
        doctorUserRepository.findByDoctorId(doctor.getId()).ifPresent(du -> {
            userRepository.findById(du.getUserId()).ifPresent(u -> {
                dto.setStatusDesc(Boolean.TRUE.equals(u.getIsOnline()) ? "在线" : "离线");
            });
        });
        return dto;
    }
    
    @Operation(summary = "获取在线医生列表")
    @GetMapping("/online")
    public Result<List<DoctorDTO>> onlineDoctors() {
        List<Doctor> list = doctorRepository.findAll().stream().filter(d -> d.getStatus() != null && d.getStatus() == 1).collect(Collectors.toList());
        return Result.success(list.stream().map(this::toDTO).collect(Collectors.toList()));
    }
}
