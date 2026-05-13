package com.example.backend.modules.doctor.controller;

import com.example.backend.common.base.Result;
import com.example.backend.common.utils.SecurityUtils;
import com.example.backend.modules.doctor.entity.Doctor;
import com.example.backend.modules.doctor.dto.DoctorDTO;
import com.example.backend.modules.doctor.entity.DoctorUser;
import com.example.backend.modules.doctor.repository.DoctorRepository;
import com.example.backend.modules.doctor.repository.DoctorUserRepository;
import com.example.backend.modules.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "医生个人信息")
@RestController
@RequestMapping("/api/doctor/profile")
@RequiredArgsConstructor
@PreAuthorize("hasRole('DOCTOR')")
public class DoctorProfileController {
    private final DoctorRepository doctorRepository;
    private final DoctorUserRepository doctorUserRepository;
    
    private Long getCurrentDoctorId() {
        User user = SecurityUtils.getCurrentUser();
        DoctorUser du = doctorUserRepository.findByUserId(user.getId())
            .orElseThrow(() -> new RuntimeException("医生账户未建立关联"));
        return du.getDoctorId();
    }
    
    @Operation(summary = "获取个人信息")
    @GetMapping
    public Result<DoctorDTO> getProfile() {
        Long doctorId = getCurrentDoctorId();
        Doctor doctor = doctorRepository.findByIdWithDetails(doctorId);
        if (doctor == null) {
            doctor = doctorRepository.findById(doctorId).orElseThrow();
        }
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
        return Result.success(dto);
    }
    
    @Operation(summary = "更新个人信息（不含排班）")
    @PutMapping
    public Result<Doctor> updateProfile(@RequestBody Doctor update) {
        Long doctorId = getCurrentDoctorId();
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow();
        doctor.setName(update.getName());
        doctor.setTitle(update.getTitle());
        doctor.setSpecialties(update.getSpecialties());
        doctor.setIntroduction(update.getIntroduction());
        doctor.setAvatar(update.getAvatar());
        doctor.setPhone(update.getPhone());
        doctor.setEmail(update.getEmail());
        doctor.setEducation(update.getEducation());
        doctor.setExperience(update.getExperience());
        doctor.setAchievements(update.getAchievements());
        doctor.setConsultationFee(update.getConsultationFee());
        doctorRepository.save(doctor);
        return Result.success(doctor);
    }
}
