package com.example.backend.common.config;

import com.example.backend.modules.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Configuration
@Slf4j
public class AuditConfig {

    @Bean
    public AuditorAware<Long> auditorProvider() {
        return () -> {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // 防御性检查1：认证基础检查
            if (authentication == null
                || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {
                return Optional.empty();
            }

            // 防御性检查2：Principal 类型验证
            if (!(authentication.getPrincipal() instanceof User)) {
                log.warn("Unexpected principal type: {}", authentication.getPrincipal().getClass());
                return Optional.empty();
            }

            User user = (User) authentication.getPrincipal();

            // 防御性检查3：用户对象空检查
            if (user == null) {
                return Optional.empty();
            }

            // 最终返回带空安全的 Optional
            return Optional.ofNullable(user.getId());
        };
    }
} 