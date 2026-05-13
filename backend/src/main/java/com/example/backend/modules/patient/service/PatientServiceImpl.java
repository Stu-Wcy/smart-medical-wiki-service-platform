package com.example.backend.modules.patient.service;

import com.example.backend.modules.patient.dto.*;
import com.example.backend.modules.patient.entity.Patient;
import com.example.backend.modules.patient.enums.PatientStatusEnum;
import com.example.backend.modules.patient.repository.PatientRepository;
import com.example.backend.modules.user.entity.User;
import com.example.backend.modules.user.repository.UserRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public PatientDTO createPatient(Long userId, PatientCreateDTO createDTO) {
        log.info("创建就诊人，用户ID: {}, 就诊人信息: {}", userId, createDTO);

        // 验证用户是否存在
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        // 验证身份证号是否已存在
        if (StringUtils.hasText(createDTO.getIdCard()) && 
            isIdCardExists(createDTO.getIdCard(), null)) {
            throw new RuntimeException("身份证号已存在");
        }

        // 验证手机号是否已存在
        if (isPhoneExists(createDTO.getPhone(), null)) {
            throw new RuntimeException("手机号已存在");
        }

        // 如果设置为默认就诊人，先清除其他默认设置
        if (Boolean.TRUE.equals(createDTO.getIsDefault())) {
            patientRepository.clearDefaultPatientByUserId(userId);
        }

        // 创建就诊人实体
        Patient patient = new Patient();
        BeanUtils.copyProperties(createDTO, patient);
        patient.setUser(user);

        // 保存就诊人
        patient = patientRepository.save(patient);
        log.info("就诊人创建成功，ID: {}", patient.getId());

        return convertToDTO(patient);
    }

    @Override
    @Transactional
    public PatientDTO updatePatient(Long userId, PatientUpdateDTO updateDTO) {
        log.info("更新就诊人，用户ID: {}, 就诊人ID: {}", userId, updateDTO.getId());

        // 查找就诊人
        Patient patient = patientRepository.findByIdAndUserIdAndDeletedFalse(updateDTO.getId(), userId)
                .orElseThrow(() -> new RuntimeException("就诊人不存在或无权限"));

        // 验证身份证号是否已存在（排除当前记录）
        if (StringUtils.hasText(updateDTO.getIdCard()) && 
            isIdCardExists(updateDTO.getIdCard(), patient.getId())) {
            throw new RuntimeException("身份证号已存在");
        }

        // 验证手机号是否已存在（排除当前记录）
        if (isPhoneExists(updateDTO.getPhone(), patient.getId())) {
            throw new RuntimeException("手机号已存在");
        }

        // 如果设置为默认就诊人，先清除其他默认设置
        if (Boolean.TRUE.equals(updateDTO.getIsDefault())) {
            patientRepository.clearDefaultPatientByUserId(userId);
        }

        // 更新就诊人信息
        BeanUtils.copyProperties(updateDTO, patient, "id", "user");

        patient = patientRepository.save(patient);
        log.info("就诊人更新成功，ID: {}", patient.getId());

        return convertToDTO(patient);
    }

    @Override
    @Transactional
    public void deletePatient(Long userId, Long patientId) {
        log.info("删除就诊人，用户ID: {}, 就诊人ID: {}", userId, patientId);

        Patient patient = patientRepository.findByIdAndUserIdAndDeletedFalse(patientId, userId)
                .orElseThrow(() -> new RuntimeException("就诊人不存在或无权限"));

        // 软删除
        patient.setDeleted(true);
        patientRepository.save(patient);
        log.info("就诊人删除成功，ID: {}", patientId);
    }

    @Override
    public PatientDTO getPatientById(Long userId, Long patientId) {
        Patient patient = patientRepository.findByIdAndUserIdAndDeletedFalse(patientId, userId)
                .orElseThrow(() -> new RuntimeException("就诊人不存在或无权限"));
        return convertToDTO(patient);
    }

    @Override
    public List<PatientDTO> getUserPatients(Long userId) {
        List<Patient> patients = patientRepository.findByUserIdAndDeletedFalseOrderByIsDefaultDescCreatedTimeDesc(userId);
        return patients.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Page<PatientDTO> getUserPatientsPage(Long userId, PatientQueryDTO queryDTO) {
        Pageable pageable = PageRequest.of(
                queryDTO.getPage() - 1, 
                queryDTO.getSize(),
                Sort.by(Sort.Direction.DESC, "isDefault", "createdTime")
        );

        Specification<Patient> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            predicates.add(criteriaBuilder.equal(root.get("user").get("id"), userId));
            predicates.add(criteriaBuilder.equal(root.get("deleted"), false));
            
            if (StringUtils.hasText(queryDTO.getName())) {
                predicates.add(criteriaBuilder.like(root.get("name"), "%" + queryDTO.getName() + "%"));
            }
            
            if (StringUtils.hasText(queryDTO.getPhone())) {
                predicates.add(criteriaBuilder.like(root.get("phone"), "%" + queryDTO.getPhone() + "%"));
            }
            
            if (queryDTO.getGender() != null) {
                predicates.add(criteriaBuilder.equal(root.get("gender"), queryDTO.getGender()));
            }
            
            if (queryDTO.getRelationship() != null) {
                predicates.add(criteriaBuilder.equal(root.get("relationship"), queryDTO.getRelationship()));
            }
            
            if (queryDTO.getStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), queryDTO.getStatus()));
            }
            
            if (queryDTO.getIsDefault() != null) {
                predicates.add(criteriaBuilder.equal(root.get("isDefault"), queryDTO.getIsDefault()));
            }
            
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        Page<Patient> patientPage = patientRepository.findAll(spec, pageable);
        return patientPage.map(this::convertToDTO);
    }

    @Override
    public PatientDTO getDefaultPatient(Long userId) {
        return patientRepository.findByUserIdAndIsDefaultTrueAndDeletedFalse(userId)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    @Transactional
    public void setDefaultPatient(Long userId, Long patientId) {
        log.info("设置默认就诊人，用户ID: {}, 就诊人ID: {}", userId, patientId);

        // 验证就诊人是否存在且属于该用户
        patientRepository.findByIdAndUserIdAndDeletedFalse(patientId, userId)
                .orElseThrow(() -> new RuntimeException("就诊人不存在或无权限"));

        // 清除该用户的所有默认设置
        patientRepository.clearDefaultPatientByUserId(userId);
        
        // 设置新的默认就诊人
        patientRepository.setDefaultPatient(patientId, userId, true);
        log.info("默认就诊人设置成功");
    }

    @Override
    @Transactional
    public void updatePatientStatus(Long userId, Long patientId, Integer status) {
        log.info("更新就诊人状态，用户ID: {}, 就诊人ID: {}, 状态: {}", userId, patientId, status);

        Patient patient = patientRepository.findByIdAndUserIdAndDeletedFalse(patientId, userId)
                .orElseThrow(() -> new RuntimeException("就诊人不存在或无权限"));

        patient.setStatus(PatientStatusEnum.fromCode(status));
        patientRepository.save(patient);
        log.info("就诊人状态更新成功");
    }

    @Override
    public Page<PatientDTO> getAllPatientsPage(PatientQueryDTO queryDTO) {
        Pageable pageable = PageRequest.of(
                queryDTO.getPage() - 1,
                queryDTO.getSize(),
                Sort.by(Sort.Direction.DESC, "createdTime")
        );

        Specification<Patient> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            predicates.add(criteriaBuilder.equal(root.get("deleted"), false));

            if (queryDTO.getUserId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("user").get("id"), queryDTO.getUserId()));
            }

            if (StringUtils.hasText(queryDTO.getName())) {
                predicates.add(criteriaBuilder.like(root.get("name"), "%" + queryDTO.getName() + "%"));
            }

            if (StringUtils.hasText(queryDTO.getPhone())) {
                predicates.add(criteriaBuilder.like(root.get("phone"), "%" + queryDTO.getPhone() + "%"));
            }

            if (StringUtils.hasText(queryDTO.getIdCard())) {
                predicates.add(criteriaBuilder.like(root.get("idCard"), "%" + queryDTO.getIdCard() + "%"));
            }

            if (queryDTO.getGender() != null) {
                predicates.add(criteriaBuilder.equal(root.get("gender"), queryDTO.getGender()));
            }

            // 暂时跳过关系字段筛选，避免枚举转换问题
            // if (queryDTO.getRelationship() != null) {
            //     predicates.add(criteriaBuilder.equal(root.get("relationship"), queryDTO.getRelationship()));
            // }

            if (queryDTO.getStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), queryDTO.getStatus()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        Page<Patient> patientPage = patientRepository.findAll(spec, pageable);
        return patientPage.map(this::convertToDTO);
    }

    @Override
    public PatientDTO getPatientByIdForAdmin(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .filter(p -> !p.getDeleted())
                .orElseThrow(() -> new RuntimeException("就诊人不存在"));
        return convertToDTO(patient);
    }

    @Override
    @Transactional
    public PatientDTO updatePatientForAdmin(PatientUpdateDTO updateDTO) {
        log.info("管理员更新就诊人，就诊人ID: {}", updateDTO.getId());

        Patient patient = patientRepository.findById(updateDTO.getId())
                .filter(p -> !p.getDeleted())
                .orElseThrow(() -> new RuntimeException("就诊人不存在"));

        // 验证身份证号是否已存在（排除当前记录）
        if (StringUtils.hasText(updateDTO.getIdCard()) &&
            isIdCardExists(updateDTO.getIdCard(), patient.getId())) {
            throw new RuntimeException("身份证号已存在");
        }

        // 验证手机号是否已存在（排除当前记录）
        if (isPhoneExists(updateDTO.getPhone(), patient.getId())) {
            throw new RuntimeException("手机号已存在");
        }

        // 如果设置为默认就诊人，先清除该用户的其他默认设置
        if (Boolean.TRUE.equals(updateDTO.getIsDefault())) {
            patientRepository.clearDefaultPatientByUserId(patient.getUser().getId());
        }

        // 更新就诊人信息
        BeanUtils.copyProperties(updateDTO, patient, "id", "user");
        patient = patientRepository.save(patient);
        log.info("管理员更新就诊人成功，ID: {}", patient.getId());

        return convertToDTO(patient);
    }

    @Override
    @Transactional
    public void deletePatientForAdmin(Long patientId) {
        log.info("管理员删除就诊人，就诊人ID: {}", patientId);

        Patient patient = patientRepository.findById(patientId)
                .filter(p -> !p.getDeleted())
                .orElseThrow(() -> new RuntimeException("就诊人不存在"));

        // 软删除
        patient.setDeleted(true);
        patientRepository.save(patient);
        log.info("管理员删除就诊人成功，ID: {}", patientId);
    }

    @Override
    public boolean isIdCardExists(String idCard, Long excludeId) {
        if (!StringUtils.hasText(idCard)) {
            return false;
        }

        return patientRepository.findByIdCardAndDeletedFalse(idCard)
                .filter(patient -> excludeId == null || !patient.getId().equals(excludeId))
                .isPresent();
    }

    @Override
    public boolean isPhoneExists(String phone, Long excludeId) {
        if (!StringUtils.hasText(phone)) {
            return false;
        }

        return patientRepository.findByPhoneAndDeletedFalse(phone)
                .filter(patient -> excludeId == null || !patient.getId().equals(excludeId))
                .isPresent();
    }

    /**
     * 将Patient实体转换为PatientDTO
     */
    private PatientDTO convertToDTO(Patient patient) {
        PatientDTO dto = new PatientDTO();
        BeanUtils.copyProperties(patient, dto);

        // 设置用户信息
        if (patient.getUser() != null) {
            dto.setUserId(patient.getUser().getId());
            dto.setUserName(patient.getUser().getUsername());
        }

        // 设置枚举描述
        if (patient.getGender() != null) {
            dto.setGenderName(patient.getGender().getDescription());
        }

        if (patient.getRelationship() != null) {
            dto.setRelationshipName(patient.getRelationship().getDescription());
        }

        if (patient.getStatus() != null) {
            dto.setStatusName(patient.getStatus().getDescription());
        }

        return dto;
    }
}
