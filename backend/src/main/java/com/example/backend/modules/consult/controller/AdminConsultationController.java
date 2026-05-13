package com.example.backend.modules.consult.controller;

import com.example.backend.common.base.Result;
import com.example.backend.modules.consult.entity.OnlineConsultation;
import com.example.backend.modules.consult.repository.OnlineConsultationRepository;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/consultations")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminConsultationController {
    private final OnlineConsultationRepository repository;
    
    @Operation(summary = "管理员查询咨询记录（支持筛选）")
    @GetMapping
    public Result<List<OnlineConsultation>> list(
        @RequestParam(required = false) Long doctorId,
        @RequestParam(required = false) Long patientId,
        @RequestParam(required = false) Integer status,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime start,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime end
    ) {
        Specification<OnlineConsultation> spec = (root, query, cb) -> {
            java.util.List<jakarta.persistence.criteria.Predicate> ps = new java.util.ArrayList<>();
            if (doctorId != null) ps.add(cb.equal(root.get("doctorId"), doctorId));
            if (patientId != null) ps.add(cb.equal(root.get("patientId"), patientId));
            if (status != null) ps.add(cb.equal(root.get("status"), status));
            if (start != null) ps.add(cb.greaterThanOrEqualTo(root.get("createdAt"), start));
            if (end != null) ps.add(cb.lessThanOrEqualTo(root.get("createdAt"), end));
            return cb.and(ps.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
        return Result.success(repository.findAll(spec));
    }
    
    @Operation(summary = "管理员获取咨询详情")
    @GetMapping("/{id}")
    public Result<OnlineConsultation> get(@PathVariable Long id) {
        OnlineConsultation oc = repository.findById(id).orElse(null);
        if (oc == null) {
            return Result.error("记录不存在");
        }
        return Result.success(oc);
    }
}
