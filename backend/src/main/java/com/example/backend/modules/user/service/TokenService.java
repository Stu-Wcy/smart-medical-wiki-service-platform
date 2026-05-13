package com.example.backend.modules.user.service;

import com.example.backend.common.utils.JwtUtils;
import com.example.backend.modules.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final JwtUtils jwtUtils;

    /**
     * 生成token
     */
    public String generateToken(User user) {
        return jwtUtils.generateToken(user.getId(), user.getUsername());
    }

    /**
     * 从token中获取用户ID
     */
    public Long getUserIdFromToken(String token) {
        return jwtUtils.getUserIdFromToken(token);
    }

    /**
     * 验证token是否有效
     */
    public boolean validateToken(String token) {
        return jwtUtils.validateToken(token);
    }
    
    public Claims getClaims(String token) {
        return jwtUtils.getClaims(token);
    }
} 
