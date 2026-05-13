package com.example.backend.modules.user.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.user.dto.UserAddDTO;
import com.example.backend.modules.user.dto.UserInfoDTO;
import com.example.backend.modules.user.dto.UserQueryDTO;
import com.example.backend.modules.user.dto.UserUpdateDTO;
import com.example.backend.modules.user.enums.UserStatusEnum;
import com.example.backend.modules.user.service.UserManageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "用户管理接口")
@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@SecurityRequirement(name = "Bearer")
public class UserManageController {

    private final UserManageService userManageService;

    @Operation(summary = "分页查询用户列表")
    @GetMapping
    public Result<PageResult<UserInfoDTO>> list(
            UserQueryDTO queryDTO,
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer size) {
        Page<UserInfoDTO> userPage = userManageService.list(queryDTO, page, size);
        return Result.success(PageResult.build(userPage));
    }

    @Operation(summary = "获取用户详情")
    @GetMapping("/{id}")
    public Result<UserInfoDTO> get(@PathVariable Long id) {
        return Result.success(userManageService.get(id));
    }

    @Operation(summary = "更新用户信息")
    @PutMapping
    public Result<UserInfoDTO> update(@Valid @RequestBody UserUpdateDTO updateDTO) {
        return Result.success(userManageService.update(updateDTO));
    }

    @Operation(summary = "删除用户")
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        userManageService.delete(id);
        return Result.success();
    }

    @Operation(summary = "启用用户")
    @PutMapping("/{id}/enable")
    public Result<Void> enable(@PathVariable Long id) {
        userManageService.updateStatus(id, UserStatusEnum.NORMAL.getValue());
        return Result.success();
    }

    @Operation(summary = "禁用用户")
    @PutMapping("/{id}/disable")
    public Result<Void> disable(@PathVariable Long id) {
        userManageService.updateStatus(id,  UserStatusEnum.DISABLED.getValue());
        return Result.success();
    }

    @Operation(summary = "新增用户")
    @PostMapping
    public Result<UserInfoDTO> add(@Valid @RequestBody UserAddDTO addDTO) {
        return Result.success(userManageService.add(addDTO));
    }
} 