package com.example.backend.modules.consult.controller;

import com.example.backend.common.base.Result;
import com.example.backend.modules.consult.dto.ConsultationCreateDTO;
import com.example.backend.modules.consult.entity.OnlineConsultation;
import com.example.backend.modules.consult.service.OnlineConsultationService;
import com.example.backend.modules.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.backend.common.utils.OSSUtil;
import com.example.backend.modules.consult.repository.OnlineConsultationRepository;
import com.example.backend.modules.patient.repository.PatientRepository;
import com.example.backend.modules.patient.entity.Patient;

import java.util.List;

@RestController
@RequestMapping("/api/user/consultations")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('USER','ADMIN','DOCTOR')")
public class UserConsultationController {
    private final OnlineConsultationService consultationService;
    private final OSSUtil ossUtil;
    private final OnlineConsultationRepository consultationRepository;
    private final PatientRepository patientRepository;
    
    @Operation(summary = "用户发起咨询")
    @PostMapping
    public Result<OnlineConsultation> create(@AuthenticationPrincipal User user, @RequestBody ConsultationCreateDTO dto) {
        return Result.success(consultationService.create(user.getId(), dto));
    }
    
    @Operation(summary = "用户咨询历史")
    @GetMapping
    public Result<List<OnlineConsultation>> list(@AuthenticationPrincipal User user) {
        return Result.success(consultationService.listUser(user.getId()));
    }
    
    @Operation(summary = "用户评价咨询")
    @PostMapping("/{id}/evaluate")
    public Result<OnlineConsultation> evaluate(@AuthenticationPrincipal User user, @PathVariable Long id, @RequestParam Integer evaluation) {
        return Result.success(consultationService.evaluate(user.getId(), id, evaluation));
    }
    
    @Operation(summary = "上传咨询图片并更新记录")
    @PostMapping("/{id}/pictures")
    public Result<OnlineConsultation> uploadPictures(
        @AuthenticationPrincipal User user,
        @PathVariable Long id,
        @RequestParam("files") List<MultipartFile> files,
        @RequestParam(defaultValue = "append") String mode
    ) {
        OnlineConsultation oc = consultationRepository.findById(id).orElse(null);
        if (oc == null) return Result.error("记录不存在");
        Patient p = patientRepository.findById(oc.getPatientId()).orElse(null);
        if (p == null || p.getUser() == null || !p.getUser().getId().equals(user.getId())) {
            return Result.error("无权限");
        }
        if (files == null || files.isEmpty()) {
            return Result.error("未选择文件");
        }
        java.util.List<String> urls = new java.util.ArrayList<>();
        for (MultipartFile f : files) {
            if (f == null || f.isEmpty()) continue;
            long maxSize = 5 * 1024 * 1024;
            if (f.getSize() > maxSize) {
                return Result.error("文件过大，限制为5MB");
            }
            String ct = f.getContentType();
            String name = f.getOriginalFilename() != null ? f.getOriginalFilename().toLowerCase() : "";
            boolean typeOk = ct != null && ct.startsWith("image/");
            boolean extOk = name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png") || name.endsWith(".gif");
            if (!(typeOk && extOk)) {
                return Result.error("仅支持图片格式：JPG/PNG/GIF");
            }
            try {
                String url = ossUtil.uploadFile(f, "consult");
                urls.add(url);
            } catch (Exception e) {
                return Result.error("上传失败：" + e.getMessage());
            }
        }
        if (urls.isEmpty()) {
            return Result.error("没有可用的上传文件");
        }
        if ("replace".equalsIgnoreCase(mode)) {
            oc.setPicPath(String.join(",", urls));
        } else {
            String existing = oc.getPicPath();
            java.util.List<String> merged = new java.util.ArrayList<>();
            if (existing != null && !existing.isEmpty()) {
                for (String s : existing.split(",")) {
                    if (s != null && !s.isEmpty()) merged.add(s);
                }
            }
            merged.addAll(urls);
            oc.setPicPath(String.join(",", merged));
        }
        consultationRepository.save(oc);
        return Result.success(oc);
    }
}
