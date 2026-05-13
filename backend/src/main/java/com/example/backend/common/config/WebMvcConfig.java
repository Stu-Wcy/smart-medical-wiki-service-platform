package com.example.backend.common.config;

import com.example.backend.common.interceptor.DoctorStatusInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {
    private final DoctorStatusInterceptor doctorStatusInterceptor;
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(doctorStatusInterceptor)
            .addPathPatterns("/api/admin/**", "/api/doctor/**");
    }
}
