package com.example.backend.common.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ApplicationStartupListener implements ApplicationListener<ApplicationStartedEvent> {

    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {
        Environment env = event.getApplicationContext().getEnvironment();
        String port = env.getProperty("server.port", "9090");
        String contextPath = env.getProperty("server.servlet.context-path", "");
        String jwtSecret = env.getProperty("jwt.secret");
        String dbUsername = env.getProperty("spring.datasource.username");
        String dbPassword = env.getProperty("spring.datasource.password");
        if (jwtSecret == null || jwtSecret.isBlank()) {
            throw new IllegalStateException("缺少 jwt.secret，请通过环境变量 JWT_SECRET 注入");
        }
        if (dbUsername == null || dbUsername.isBlank() || dbPassword == null || dbPassword.isBlank()) {
            throw new IllegalStateException("缺少数据库凭据，请通过环境变量 DB_USERNAME、DB_PASSWORD 注入");
        }
        
        log.info("\n----------------------------------------------------------\n" +
                "\t应用启动成功!\n" +
                "\tSwagger文档: \thttp://localhost:{}{}/doc.html\n" +
                "\tKnife4j增强文档: \thttp://localhost:{}{}/doc.html\n" +
                "----------------------------------------------------------",
            port, contextPath, port, contextPath);
    }
} 
