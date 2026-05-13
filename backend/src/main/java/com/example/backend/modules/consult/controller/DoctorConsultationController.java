package com.example.backend.modules.consult.controller;

import com.example.backend.common.base.Result;
import com.example.backend.modules.consult.dto.ConsultationReplyDTO;
import com.example.backend.modules.consult.entity.OnlineConsultation;
import com.example.backend.modules.consult.service.OnlineConsultationService;
import com.example.backend.modules.doctor.entity.DoctorUser;
import com.example.backend.modules.doctor.repository.DoctorUserRepository;
import com.example.backend.modules.patient.dto.PatientDTO;
import com.example.backend.modules.patient.entity.Patient;
import com.example.backend.modules.patient.repository.PatientRepository;
import com.example.backend.modules.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor/consultations")
@RequiredArgsConstructor
@PreAuthorize("hasRole('DOCTOR')")
public class DoctorConsultationController {
    private final OnlineConsultationService consultationService;
    private final DoctorUserRepository doctorUserRepository;
    private final PatientRepository patientRepository;
    
    private Long currentDoctorId(User user) {
        DoctorUser du = doctorUserRepository.findByUserId(user.getId()).orElseThrow();
        return du.getDoctorId();
    }
    
    @Operation(summary = "医生待处理咨询列表")
    @GetMapping
    public Result<List<OnlineConsultation>> list(@AuthenticationPrincipal User user) {
        Long doctorId = currentDoctorId(user);
        return Result.success(consultationService.listDoctor(doctorId));
    }
    
    @Operation(summary = "获取咨询详情")
    @GetMapping("/{id}")
    public Result<OnlineConsultation> get(@PathVariable Long id) {
        return Result.success(consultationService.get(id));
    }
    
    @Operation(summary = "医生回复咨询")
    @PostMapping("/{id}/reply")
    public Result<OnlineConsultation> reply(@AuthenticationPrincipal User user, @PathVariable Long id, @RequestBody ConsultationReplyDTO dto) {
        Long doctorId = currentDoctorId(user);
        return Result.success(consultationService.reply(doctorId, id, dto));
    }
    
    @Operation(summary = "获取咨询关联病人基本信息")
    @GetMapping("/{id}/patient")
    public Result<PatientDTO> getConsultationPatient(@AuthenticationPrincipal User user, @PathVariable Long id) {
        Long doctorId = currentDoctorId(user);
        OnlineConsultation oc = consultationService.get(id);
        if (oc == null || !doctorId.equals(oc.getDoctorId())) {
            return Result.error("就诊人不存在或无权限");
        }
        Patient p = patientRepository.findById(oc.getPatientId()).orElse(null);
        if (p == null) {
            return Result.error("就诊人不存在");
        }
        PatientDTO dto = new PatientDTO();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setGender(p.getGender());
        dto.setBirthDate(p.getBirthDate());
        dto.setAge(p.getAge());
        dto.setPhone(p.getPhone());
        dto.setRelationship(p.getRelationship());
        return Result.success(dto);
    }
}
