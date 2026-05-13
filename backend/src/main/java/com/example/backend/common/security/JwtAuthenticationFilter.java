package com.example.backend.common.security;

import com.example.backend.common.constant.CommonConstant;
import com.example.backend.modules.user.entity.User;
import com.example.backend.modules.user.repository.UserRepository;
import com.example.backend.modules.user.service.TokenService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith(CommonConstant.TOKEN_PREFIX)) {
                String token = authHeader;
                
                if (tokenService.validateToken(token)) {
                    Long userId = tokenService.getUserIdFromToken(token);
                    User user = userRepository.findById(userId).orElse(null);
                    
                    if (user != null) {
                        Claims claims = tokenService.getClaims(token);
                        if (user.getPasswordChangedAt() != null && claims.getIssuedAt() != null) {
                            if (claims.getIssuedAt().toInstant().isBefore(user.getPasswordChangedAt().atZone(java.time.ZoneId.systemDefault()).toInstant())) {
                                filterChain.doFilter(request, response);
                                return;
                            }
                        }
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            user, null, user.getAuthorities());
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
        } catch (Exception e) {
            logger.error("无法设置用户认证", e);
        }
        
        filterChain.doFilter(request, response);
    }
} 
