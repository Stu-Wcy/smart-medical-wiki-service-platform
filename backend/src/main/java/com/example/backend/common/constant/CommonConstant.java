package com.example.backend.common.constant;

public interface CommonConstant {
    
    String API_PREFIX = "/api";
    
    String AUTH_PREFIX = API_PREFIX + "/auth";
    
    String ADMIN_PREFIX = API_PREFIX + "/admin";
    
    String TOKEN_PREFIX = "Bearer ";
    
    String DEFAULT_PAGE_NUM = "1";
    
    String DEFAULT_PAGE_SIZE = "10";
    
    String REDIS_USER_PREFIX = "user:";
    
    String REDIS_TOKEN_PREFIX = "token:";
    
    long TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000L; // 7天
    
    int MAX_PAGE_SIZE = 100;
} 