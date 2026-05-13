package com.example.backend.modules.doctor.controller;

import com.example.backend.common.base.Result;
import com.example.backend.common.exception.ServiceException;
import com.example.backend.modules.doctor.entity.DoctorUser;
import com.example.backend.modules.doctor.repository.DoctorUserRepository;
import com.example.backend.modules.user.dto.UserInfoDTO;
import com.example.backend.modules.user.entity.User;
import com.example.backend.modules.user.enums.RoleTypeEnum;
import com.example.backend.modules.user.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Tag(name = "管理员医生账户管理")
@RestController
@RequestMapping("/api/admin/doctor-users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminDoctorUserController {
    private final UserRepository userRepository;
    private final DoctorUserRepository doctorUserRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Data
    public static class DoctorUserCreateDTO {
        @NotBlank
        private String username;
        @NotBlank
        private String password;
        @NotNull
        private Long doctorId;
        private String email;
        private String phone;
        private String realName;
    }
    
  @Operation(summary = "创建医生账户并建立关联")
  @PostMapping
  public Result<UserInfoDTO> createDoctorUser(@RequestBody DoctorUserCreateDTO dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new ServiceException("用户名已存在");
        }
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setRealName(dto.getRealName());
        user.setRoleType(RoleTypeEnum.DOCTOR);
        user = userRepository.save(user);
        
        DoctorUser du = new DoctorUser();
        du.setUserId(user.getId());
        du.setDoctorId(dto.getDoctorId());
        doctorUserRepository.save(du);
        
        UserInfoDTO info = new UserInfoDTO();
        info.setId(user.getId());
        info.setUsername(user.getUsername());
        info.setEmail(user.getEmail());
        info.setPhone(user.getPhone());
        info.setRealName(user.getRealName());
    return Result.success(info);
  }
  
  @Data
  public static class DoctorUserBindDTO {
    @NotNull
    private Long userId;
    @NotNull
    private Long doctorId;
  }
  
  @Operation(summary = "绑定/更新医生关联（已有用户）")
  @PostMapping("/bind")
  public Result<Void> bindDoctorUser(@RequestBody DoctorUserBindDTO dto) {
    User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new ServiceException("用户不存在"));
    user.setRoleType(RoleTypeEnum.DOCTOR);
    userRepository.save(user);
    DoctorUser du = doctorUserRepository.findByUserId(dto.getUserId()).orElse(new DoctorUser());
    du.setUserId(dto.getUserId());
    du.setDoctorId(dto.getDoctorId());
    doctorUserRepository.save(du);
    return Result.success();
  }
  
  @Operation(summary = "根据用户ID查询医生关联")
  @GetMapping("/by-user/{userId}")
  public Result<DoctorUser> getByUserId(@PathVariable Long userId) {
    DoctorUser du = doctorUserRepository.findByUserId(userId).orElse(null);
    return Result.success(du);
  }
}
