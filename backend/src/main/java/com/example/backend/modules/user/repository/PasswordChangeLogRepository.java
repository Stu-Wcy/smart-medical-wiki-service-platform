package com.example.backend.modules.user.repository;

import com.example.backend.modules.user.entity.PasswordChangeLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordChangeLogRepository extends JpaRepository<PasswordChangeLog, Long> {
}
