package com.example.backend.common.utils;

import com.example.backend.common.constant.CommonConstant;

public class RedisKeyUtils {

    public static String getUserKey(Long userId) {
        return CommonConstant.REDIS_USER_PREFIX + userId;
    }

    public static String getTokenKey(String token) {
        return CommonConstant.REDIS_TOKEN_PREFIX + token;
    }
} 