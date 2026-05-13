package com.example.backend.common.interceptor;

import com.example.backend.modules.doctor.entity.Doctor;
import com.example.backend.modules.doctor.entity.DoctorUser;
import com.example.backend.modules.doctor.repository.DoctorUserRepository;
import com.example.backend.modules.doctor.service.impl.DoctorServiceImpl;
import com.example.backend.modules.user.entity.User;
import com.example.backend.modules.user.enums.RoleTypeEnum;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class DoctorStatusInterceptor implements HandlerInterceptor {
    private final DoctorUserRepository doctorUserRepository;
    private final com.example.backend.modules.doctor.repository.DoctorRepository doctorRepository;
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof User)) return true;
        User user = (User) auth.getPrincipal();
        if (!RoleTypeEnum.DOCTOR.equals(user.getRoleType())) return true;
        DoctorUser du = doctorUserRepository.findByUserId(user.getId()).orElse(null);
        if (du == null) return true;
        Doctor doctor = doctorRepository.findById(du.getDoctorId()).orElse(null);
        if (doctor == null) return true;
        if (doctor.getStatus() != null && doctor.getStatus() == 0) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("医生停诊状态，禁止访问管理系统");
            return false;
        }
        return true;
    }
}
