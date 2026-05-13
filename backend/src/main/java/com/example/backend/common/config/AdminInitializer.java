package com.example.backend.common.config;

import com.example.backend.modules.user.entity.User;
import com.example.backend.modules.user.enums.RoleTypeEnum;
import com.example.backend.modules.user.enums.UserStatusEnum;
import com.example.backend.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @Value("${admin.nickname}")
    private String adminNickname;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.phone}")
    private String adminPhone;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByUsername(adminUsername)) {
            User admin = new User();
            admin.setUsername(adminUsername);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRealName(adminNickname);
            admin.setEmail(adminEmail);
            admin.setPhone(adminPhone);
            admin.setRoleType(RoleTypeEnum.ADMIN);
            admin.setStatus(UserStatusEnum.NORMAL);
            
            userRepository.save(admin);
            log.info("初始化管理员账户成功");
        } else {
            log.info("管理员账户已存在，跳过初始化");
        }
    }
} 