package com.example.backend.modules.ai.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "tongyi")
public class TongYiConfig {
    private String apiKey;
    private String model;
    private Integer maxTokens;
    private Float temperature;
    private Boolean enableStream;
} 
