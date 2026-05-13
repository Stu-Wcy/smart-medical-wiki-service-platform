package com.example.backend.modules.doctor.repository;

import com.example.backend.modules.doctor.entity.DoctorUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorUserRepository extends JpaRepository<DoctorUser, Long> {
    Optional<DoctorUser> findByUserId(Long userId);
    boolean existsByDoctorId(Long doctorId);
    Optional<DoctorUser> findByDoctorId(Long doctorId);
}
