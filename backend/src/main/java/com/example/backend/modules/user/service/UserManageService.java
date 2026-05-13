package com.example.backend.modules.user.service;

import com.example.backend.common.exception.ServiceException;
import com.example.backend.common.utils.BeanUtils;
import com.example.backend.modules.user.dto.UserAddDTO;
import com.example.backend.modules.user.dto.UserInfoDTO;
import com.example.backend.modules.user.dto.UserQueryDTO;
import com.example.backend.modules.user.dto.UserUpdateDTO;
import com.example.backend.modules.user.entity.User;
import com.example.backend.modules.user.enums.GenderEnum;
import com.example.backend.modules.user.enums.RoleTypeEnum;
import com.example.backend.modules.user.enums.UserStatusEnum;
import com.example.backend.modules.user.repository.UserRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserManageService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Page<UserInfoDTO> list(UserQueryDTO queryDTO, Integer page, Integer size) {
        // 构建查询条件
        Specification<User> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            // 用户名
            if (StringUtils.isNotBlank(queryDTO.getUsername())) {
                predicates.add(cb.like(root.get("username"), "%" + queryDTO.getUsername() + "%"));
            }
            
            // 手机号
            if (StringUtils.isNotBlank(queryDTO.getPhone())) {
                predicates.add(cb.like(root.get("phone"), "%" + queryDTO.getPhone() + "%"));
            }
            
            // 邮箱
            if (StringUtils.isNotBlank(queryDTO.getEmail())) {
                predicates.add(cb.like(root.get("email"), "%" + queryDTO.getEmail() + "%"));
            }
            
            // 真实姓名
            if (StringUtils.isNotBlank(queryDTO.getRealName())) {
                predicates.add(cb.like(root.get("realName"), "%" + queryDTO.getRealName() + "%"));
            }
            
            // 状态
            if (queryDTO.getStatus() != null) {
                predicates.add(cb.equal(root.get("status"), 
                    queryDTO.getStatus() == 0 ? UserStatusEnum.DISABLED : UserStatusEnum.NORMAL));
            }
            
            // 排除管理员
            predicates.add(cb.notEqual(root.get("roleType"), RoleTypeEnum.ADMIN));
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        // 分页查询
        Page<User> userPage = userRepository.findAll(spec, PageRequest.of(page - 1, size));
        
        // 转换为DTO
        return userPage.map(user -> {
            UserInfoDTO dto = new UserInfoDTO();
            BeanUtils.copyProperties(user, dto);
            return dto;
        });
    }

    public UserInfoDTO get(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ServiceException("用户不存在"));
        UserInfoDTO dto = new UserInfoDTO();
        BeanUtils.copyProperties(user, dto);
        return dto;
    }

    @Transactional
    public UserInfoDTO update(UserUpdateDTO updateDTO) {
        User user = userRepository.findById(updateDTO.getId())
                .orElseThrow(() -> new ServiceException("用户不存在"));

        // 不允许修改管理员
        if (RoleTypeEnum.ADMIN.equals(user.getRoleType())) {
            throw new ServiceException("不允许修改管理员信息");
        }

        BeanUtils.copyProperties(updateDTO, user);
        user.setRoleType(RoleTypeEnum.findByValue(updateDTO.getRoleType()));
        user.setGender(GenderEnum.findByValue(updateDTO.getGender()));
        user.setStatus(UserStatusEnum.findByValue(updateDTO.getStatus()));
        user = userRepository.save(user);

        UserInfoDTO dto = new UserInfoDTO();
        BeanUtils.copyProperties(user, dto);
        return dto;
    }

    @Transactional
    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ServiceException("用户不存在"));

        // 不允许删除管理员
        if (RoleTypeEnum.ADMIN.equals(user.getRoleType())) {
            throw new ServiceException("不允许删除管理员");
        }

        userRepository.delete(user);
    }

    @Transactional
    public void updateStatus(Long id, Integer status) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ServiceException("用户不存在"));

        // 不允许修改管理员状态
        if (RoleTypeEnum.ADMIN.equals(user.getRoleType())) {
            throw new ServiceException("不允许修改管理员状态");
        }

        user.setStatus(UserStatusEnum.findByValue(status));
        userRepository.save(user);
    }

    @Transactional
    public UserInfoDTO add(UserAddDTO addDTO) {
        // 验证用户名是否存在
        if (userRepository.existsByUsername(addDTO.getUsername())) {
            throw new ServiceException("用户名已存在");
        }

        // 验证手机号是否存在
        if (addDTO.getPhone() != null && userRepository.existsByPhone(addDTO.getPhone())) {
            throw new ServiceException("手机号已存在");
        }

        // 验证邮箱是否存在
        if (addDTO.getEmail() != null && userRepository.existsByEmail(addDTO.getEmail())) {
            throw new ServiceException("邮箱已存在");
        }

        // 创建用户
        User user = new User();
        BeanUtils.copyProperties(addDTO, user);
        
        // 设置密码
        user.setPassword(passwordEncoder.encode(addDTO.getPassword()));
        
        // 设置角色类型为普通用户
        user.setRoleType(RoleTypeEnum.USER);
        
        // 设置性别
        if (addDTO.getGender() != null) {
            user.setGender(addDTO.getGender() == 0 ? GenderEnum.UNKNOWN :
                          addDTO.getGender() == 1 ? GenderEnum.MALE : GenderEnum.FEMALE);
        } else {
            user.setGender(GenderEnum.UNKNOWN);
        }
        
        // 设置状态为正常
        user.setStatus(UserStatusEnum.NORMAL);

        user = userRepository.save(user);

        // 转换为DTO
        UserInfoDTO dto = new UserInfoDTO();
        BeanUtils.copyProperties(user, dto);
        return dto;
    }
} 