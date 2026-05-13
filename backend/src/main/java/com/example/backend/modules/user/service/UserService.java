package com.example.backend.modules.user.service;

import com.example.backend.common.constant.CommonConstant;
import com.example.backend.common.exception.ServiceException;
import com.example.backend.common.utils.BeanUtils;
import com.example.backend.common.utils.SecurityUtils;
import com.example.backend.modules.user.config.PasswordChangeCryptoConfig;
import com.example.backend.modules.user.dto.ChangePasswordDTO;
import com.example.backend.modules.user.dto.LoginDTO;
import com.example.backend.modules.user.dto.RegisterDTO;
import com.example.backend.modules.user.dto.UserInfoDTO;
import com.example.backend.modules.user.entity.PasswordChangeLog;
import com.example.backend.modules.user.entity.User;
import com.example.backend.modules.user.enums.GenderEnum;
import com.example.backend.modules.user.repository.UserRepository;
import com.example.backend.modules.user.repository.PasswordChangeLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Cipher;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final PasswordChangeLogRepository passwordChangeLogRepository;
    private final PasswordChangeCryptoConfig cryptoConfig;
    private final RedisTemplate<String, Object> redisTemplate;

    @Transactional
    public UserInfoDTO register(RegisterDTO registerDTO) {
        // 验证密码
        if (!registerDTO.getPassword().equals(registerDTO.getConfirmPassword())) {
            throw new ServiceException("两次密码不一致");
        }

        // 验证用户名是否存在
        if (userRepository.existsByUsername(registerDTO.getUsername())) {
            throw new ServiceException("用户名已存在");
        }

        // 验证手机号是否存在
        if (registerDTO.getPhone() != null && userRepository.existsByPhone(registerDTO.getPhone())) {
            throw new ServiceException("手机号已存在");
        }

        // 验证邮箱是否存在
        if (registerDTO.getEmail() != null && userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new ServiceException("邮箱已存在");
        }

        // 创建用户
        User user = new User();
        BeanUtils.copyProperties(registerDTO, user);
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user = userRepository.save(user);

        // 生成token
        String token = tokenService.generateToken(user);

        // 返回用户信息
        UserInfoDTO userInfoDTO = new UserInfoDTO();
        BeanUtils.copyProperties(user, userInfoDTO);
        userInfoDTO.setToken(token);
        return userInfoDTO;
    }

    public UserInfoDTO login(LoginDTO loginDTO) {
        // 认证
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
        );

        // 获取用户信息
        User user = userRepository.findByUsername(loginDTO.getUsername())
            .orElseThrow(() -> new ServiceException("用户不存在"));

        // 更新在线状态
        user.setIsOnline(true);
        user.setLastActiveAt(java.time.LocalDateTime.now());
        userRepository.save(user);
        // 生成token
        String token = tokenService.generateToken(user);

        // 返回用户信息
        UserInfoDTO userInfoDTO = new UserInfoDTO();
        BeanUtils.copyProperties(user, userInfoDTO);
        userInfoDTO.setToken(token);
        userInfoDTO.setIsOnline(true);
        return userInfoDTO;
    }
    
    @Transactional
    public void updateOnlineStatus(Long userId, boolean online) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException("用户不存在"));
        user.setIsOnline(online);
        if (online) {
            user.setLastActiveAt(java.time.LocalDateTime.now());
        }
        userRepository.save(user);
    }
    
    @Transactional
    public void heartbeat(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException("用户不存在"));
        user.setIsOnline(true);
        user.setLastActiveAt(java.time.LocalDateTime.now());
        userRepository.save(user);
    }

    /**
     * 获取当前用户信息
     */
    public UserInfoDTO getCurrentUserInfo() {
        User user = SecurityUtils.getCurrentUser();
        UserInfoDTO userInfoDTO = new UserInfoDTO();
        BeanUtils.copyProperties(user, userInfoDTO);
        return userInfoDTO;
    }

    /**
     * 更新当前用户信息
     */
    @Transactional
    public UserInfoDTO updateCurrentUserInfo(UserInfoDTO userInfoDTO) {
        // 获取当前用户
        User user = SecurityUtils.getCurrentUser();
        
        // 验证手机号唯一性
        if (userInfoDTO.getPhone() != null && !userInfoDTO.getPhone().equals(user.getPhone())) {
            if (userRepository.existsByPhoneAndIdNot(userInfoDTO.getPhone(), user.getId())) {
                throw new ServiceException("手机号已被使用");
            }
        }

        // 验证邮箱唯一性
        if (userInfoDTO.getEmail() != null && !userInfoDTO.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmailAndIdNot(userInfoDTO.getEmail(), user.getId())) {
                throw new ServiceException("邮箱已被使用");
            }
        }

        // 验证性别枚举值
        if (userInfoDTO.getGender() != null) {
            GenderEnum genderEnum = userInfoDTO.getGender();
            if (genderEnum == null) {
                throw new ServiceException("无效的性别值");
            }
        }

        user.setRealName(userInfoDTO.getRealName());
        user.setPhone(userInfoDTO.getPhone());
        user.setEmail(userInfoDTO.getEmail());
        user.setGender(userInfoDTO.getGender());
        user.setBirthDate(userInfoDTO.getBirthDate());
        user.setAvatar(userInfoDTO.getAvatar());

        // 更新用户信息
        user = userRepository.save(user);

        // 返回更新后的用户信息
        UserInfoDTO updatedUserInfo = new UserInfoDTO();
        BeanUtils.copyProperties(user, updatedUserInfo);
        return updatedUserInfo;
    }
    
    public String getPasswordChangePublicKey() {
        return null;
    }
    
    @Transactional
    public Boolean changePassword(ChangePasswordDTO dto) {
        User user = SecurityUtils.getCurrentUser();
        String key = "pwd_change_limit:" + user.getId() + ":" + LocalDateTime.now().getHour();
        Long count = redisTemplate.opsForValue().increment(key);
        if (count != null && count == 1L) {
            redisTemplate.expire(key, 2, TimeUnit.HOURS);
        }
        if (count != null && count > 5) {
            logChange(user.getId(), "FAIL", "频率受限");
            throw new ServiceException("操作过于频繁，请稍后再试");
        }
        String current = dto.getCurrentPassword();
        String next = dto.getNewPassword();
        String confirm = dto.getConfirmPassword();
        if (!isComplex(next)) {
            logChange(user.getId(), "FAIL", "复杂度不符合要求");
            throw new ServiceException("新密码不符合复杂度要求");
        }
        if (!next.equals(confirm)) {
            logChange(user.getId(), "FAIL", "两次密码不一致");
            throw new ServiceException("两次密码不一致");
        }
        if (!passwordEncoder.matches(current, user.getPassword())) {
            logChange(user.getId(), "FAIL", "当前密码错误");
            throw new ServiceException("当前密码错误");
        }
        user.setPassword(passwordEncoder.encode(next));
        user.setPasswordChangedAt(LocalDateTime.now());
        userRepository.save(user);
        logChange(user.getId(), "SUCCESS", null);
        return true;
    }
    
    private void logChange(Long userId, String result, String reason) {
        PasswordChangeLog log = new PasswordChangeLog();
        log.setUserId(userId);
        log.setResult(result);
        log.setReason(reason);
        passwordChangeLogRepository.save(log);
    }
    
    private String decrypt(String encrypted, String privatePem) {
        return encrypted;
    }
    
    private boolean isComplex(String pwd) {
        if (pwd == null || pwd.length() < 8) return false;
        boolean hasUpper = pwd.chars().anyMatch(Character::isUpperCase);
        boolean hasLower = pwd.chars().anyMatch(Character::isLowerCase);
        boolean hasDigit = pwd.chars().anyMatch(Character::isDigit);
        return hasUpper && hasLower && hasDigit;
    }
} 
