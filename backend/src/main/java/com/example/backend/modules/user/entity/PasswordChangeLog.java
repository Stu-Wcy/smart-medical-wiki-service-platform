package com.example.backend.modules.user.entity;

import com.example.backend.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "t_password_change_log")
@EqualsAndHashCode(callSuper = true)
public class PasswordChangeLog extends BaseEntity {
    @Column(name = "user_id", nullable = false)
    private Long userId;
    @Column(length = 50)
    private String ip;
    @Column(length = 20)
    private String result;
    @Column(length = 200)
    private String reason;
}
