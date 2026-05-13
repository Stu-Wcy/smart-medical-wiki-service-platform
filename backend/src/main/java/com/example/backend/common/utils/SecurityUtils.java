package com.example.backend.common.utils;

import com.example.backend.common.exception.ServiceException;
import com.example.backend.modules.user.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    public static Long getCurrentUserId() {
        return getCurrentUser().getId();
    }

    public static User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ServiceException("用户未登录");
        }
        User loginUser = (User) authentication.getPrincipal();
        return loginUser;
    }

    public static String getCurrentUsername() {
        return getCurrentUser().getUsername();
    }


} 