package com.example.backend.modules.user.security;

import com.example.backend.modules.user.entity.User;
import com.example.backend.modules.user.enums.RoleTypeEnum;
import com.example.backend.modules.user.repository.UserRepository;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user;
        try {
            // 尝试通过ID查找(token验证)
            Long userId = Long.valueOf(username);
            user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("用户不存在"));
        } catch (NumberFormatException e) {
            // 通过用户名查找(用户名密码登录)
            user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("用户不存在"));
        }
        return new LoginUser(user, Collections.singleton(new SimpleGrantedAuthority(user.getRoleType().equals(
            RoleTypeEnum.ADMIN)? "ROLE_ADMIN" : "ROLE_USER")));
    }
} 