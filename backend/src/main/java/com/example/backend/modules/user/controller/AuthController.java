package com.example.backend.modules.user.controller;

import com.example.backend.common.base.Result;
import com.example.backend.modules.user.dto.ChangePasswordDTO;
import com.example.backend.modules.user.dto.LoginDTO;
import com.example.backend.modules.user.dto.RegisterDTO;
import com.example.backend.modules.user.dto.UserInfoDTO;
import com.example.backend.modules.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.example.backend.modules.user.entity.User;

@Slf4j
@Tag(name = "认证接口")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @Operation(summary = "用户注册")
    @PostMapping("/register")
    public Result<UserInfoDTO> register(@Valid @RequestBody RegisterDTO registerDTO) {
        return Result.success(userService.register(registerDTO));
    }

    @Operation(summary = "用户登录")
    @PostMapping("/login")
    public Result<UserInfoDTO> login(@Valid @RequestBody LoginDTO loginDTO) {
        return Result.success(userService.login(loginDTO));
    }
    @Operation(summary = "获取当前用户信息")
    @GetMapping("/current")
    public Result<UserInfoDTO> getCurrentUserInfo() {
        return Result.success(userService.getCurrentUserInfo());
    }

    @Operation(summary = "更新当前用户信息")
    @PutMapping("/current")
    public Result<UserInfoDTO> updateCurrentUserInfo(@RequestBody UserInfoDTO userInfoDTO) {
        return Result.success(userService.updateCurrentUserInfo(userInfoDTO));
    }
    
    @Operation(summary = "获取密码加密公钥")
    @GetMapping("/pubkey")
    public Result<String> getPasswordChangePublicKey() {
        return Result.success(userService.getPasswordChangePublicKey());
    }
    
    @Operation(summary = "修改密码")
    @PostMapping("/password/change")
    public Result<Boolean> changePassword(@RequestBody ChangePasswordDTO dto) {
        return Result.success(userService.changePassword(dto));
    }
    
    @Operation(summary = "退出登录，设为离线")
    @PostMapping("/logout")
    public Result<Void> logout(@AuthenticationPrincipal User user) {
        if (user != null) {
            log.info("{}退出登录",user.getUsername());
            userService.updateOnlineStatus(user.getId(), false);
        }
        return Result.success();
    }
} 
