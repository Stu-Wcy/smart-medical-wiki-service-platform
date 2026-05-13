package com.example.backend.modules.user.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "password.change.crypto")
public class PasswordChangeCryptoConfig {
    private String publicKeyPem;
    private String privateKeyPem;
}
