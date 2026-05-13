package com.example.backend.modules.user.entity;

import com.example.backend.common.base.BaseEntity;
import com.example.backend.modules.user.enums.GenderEnum;
import com.example.backend.modules.user.enums.RoleTypeEnum;
import com.example.backend.modules.user.enums.UserStatusEnum;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

@Data
@Entity
@Table(name = "t_user")
@EqualsAndHashCode(callSuper = true)
public class User extends BaseEntity implements UserDetails {

    @Column(length = 50, unique = true, nullable = false)
    private String username;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 100)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(name = "real_name", length = 50)
    private String realName;

    @Column(length = 200)
    private String avatar;

    @Enumerated(EnumType.ORDINAL)
    private GenderEnum gender = GenderEnum.UNKNOWN;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "role_type", nullable = false)
    private RoleTypeEnum roleType = RoleTypeEnum.USER;

    @Enumerated(EnumType.ORDINAL)
    private UserStatusEnum status = UserStatusEnum.NORMAL;
    
    @Column(name = "password_changed_at")
    private LocalDateTime passwordChangedAt;
    
    @Column(name = "is_online")
    private Boolean isOnline = false;
    
    @Column(name = "last_active_at")
    private LocalDateTime lastActiveAt;
    //权限控制
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + roleType.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return UserStatusEnum.NORMAL.equals(status);
    }
} 
