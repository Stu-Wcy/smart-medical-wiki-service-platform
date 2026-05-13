package com.example.backend.modules.user.controller;

import com.example.backend.common.base.Result;
import com.example.backend.modules.user.entity.User;
import com.example.backend.modules.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserActivityController {
    private final UserService userService;
    
    @Operation(summary = "心跳，更新活跃与在线状态")
    @PostMapping("/heartbeat")
    public Result<Void> heartbeat(@AuthenticationPrincipal User user) {
        if (user != null) {
            userService.heartbeat(user.getId());
        }
        return Result.success();
    }
}
