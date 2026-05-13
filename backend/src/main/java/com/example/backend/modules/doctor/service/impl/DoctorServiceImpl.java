package com.example.backend.modules.doctor.service.impl;

import com.example.backend.common.base.PageResult;
import com.example.backend.modules.doctor.dto.*;
import com.example.backend.modules.doctor.entity.Doctor;
import com.example.backend.modules.doctor.repository.DoctorRepository;
import com.example.backend.modules.doctor.service.DoctorService;
import com.example.backend.modules.hospital.repository.HospitalRepository;
import com.example.backend.modules.department.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 医生信息服务实现类
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    public PageResult<DoctorDTO> getDoctorList(DoctorQueryDTO queryDTO, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        
        Specification<Doctor> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            if (StringUtils.hasText(queryDTO.getName())) {
                predicates.add(criteriaBuilder.like(root.get("name"), "%" + queryDTO.getName() + "%"));
            }
            
            if (StringUtils.hasText(queryDTO.getTitle())) {
                predicates.add(criteriaBuilder.like(root.get("title"), "%" + queryDTO.getTitle() + "%"));
            }
            
            if (queryDTO.getHospitalId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("hospitalId"), queryDTO.getHospitalId()));
            }
            
            if (queryDTO.getDepartmentId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("departmentId"), queryDTO.getDepartmentId()));
            }
            
            if (queryDTO.getStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), queryDTO.getStatus()));
            }
            
            if (StringUtils.hasText(queryDTO.getSpecialties())) {
                predicates.add(criteriaBuilder.like(root.get("specialties"), "%" + queryDTO.getSpecialties() + "%"));
            }
            
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
        
        Page<Doctor> doctorPage = doctorRepository.findAll(spec, pageable);
        List<DoctorDTO> doctorDTOs = doctorPage.getContent().stream()
                .map(this::convertToDTOWithNames)
                .collect(Collectors.toList());

        PageResult<DoctorDTO> result = new PageResult<>();
        result.setTotal(doctorPage.getTotalElements());
        result.setList(doctorDTOs);
        result.setPages(doctorPage.getTotalPages());
        result.setPageNum(page);
        result.setPageSize(size);
        return result;
    }

    @Override
    public List<DoctorDTO> getDoctorsByHospitalId(Long hospitalId) {
        List<Doctor> doctors = doctorRepository.findByHospitalIdWithDetails(hospitalId, 1);
        return doctors.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DoctorDTO> getDoctorsByDepartmentId(Long departmentId) {
        List<Doctor> doctors = doctorRepository.findByDepartmentIdWithDetails(departmentId, 1);
        return doctors.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DoctorDTO getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findByIdWithDetails(id);
        if (doctor == null) {
            throw new RuntimeException("医生不存在");
        }
        return convertToDTO(doctor);
    }

    @Override
    @Transactional
    public DoctorDTO addDoctor(DoctorAddDTO addDTO) {
        // 验证医院是否存在
        if (!hospitalRepository.existsById(addDTO.getHospitalId())) {
            throw new RuntimeException("医院不存在");
        }
        
        // 验证科室是否存在（如果提供了科室ID）
        if (addDTO.getDepartmentId() != null && !departmentRepository.existsById(addDTO.getDepartmentId())) {
            throw new RuntimeException("科室不存在");
        }
        
        Doctor doctor = new Doctor();
        BeanUtils.copyProperties(addDTO, doctor);
        
        Doctor savedDoctor = doctorRepository.save(doctor);
        return convertToDTO(savedDoctor);
    }

    @Override
    @Transactional
    public DoctorDTO updateDoctor(DoctorUpdateDTO updateDTO) {
        Doctor existingDoctor = doctorRepository.findById(updateDTO.getId())
                .orElseThrow(() -> new RuntimeException("医生不存在"));
        
        // 验证医院是否存在
        if (!hospitalRepository.existsById(updateDTO.getHospitalId())) {
            throw new RuntimeException("医院不存在");
        }
        
        // 验证科室是否存在（如果提供了科室ID）
        if (updateDTO.getDepartmentId() != null && !departmentRepository.existsById(updateDTO.getDepartmentId())) {
            throw new RuntimeException("科室不存在");
        }
        
        BeanUtils.copyProperties(updateDTO, existingDoctor, "createdTime");
        
        Doctor savedDoctor = doctorRepository.save(existingDoctor);
        return convertToDTO(savedDoctor);
    }

    @Override
    @Transactional
    public void deleteDoctor(Long id) {
        if (!doctorRepository.existsById(id)) {
            throw new RuntimeException("医生不存在");
        }
        doctorRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteDoctors(List<Long> ids) {
        doctorRepository.deleteAllById(ids);
    }

    @Override
    @Transactional
    public void updateDoctorStatus(Long id, Integer status) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("医生不存在"));
        doctor.setStatus(status);
        doctorRepository.save(doctor);
    }

    /**
     * 转换为DTO
     */
    private DoctorDTO convertToDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        BeanUtils.copyProperties(doctor, dto);
        dto.setStatusDesc(doctor.getStatusDesc());

        // 设置医院和科室名称
        if (doctor.getHospital() != null) {
            dto.setHospitalName(doctor.getHospital().getName());
        }
        if (doctor.getDepartment() != null) {
            dto.setDepartmentName(doctor.getDepartment().getName());
        }

        return dto;
    }

    /**
     * 转换为DTO（主动查询医院和科室名称）
     */
    private DoctorDTO convertToDTOWithNames(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        BeanUtils.copyProperties(doctor, dto);
        dto.setStatusDesc(doctor.getStatusDesc());

        // 主动查询医院名称
        if (doctor.getHospitalId() != null) {
            try {
                hospitalRepository.findById(doctor.getHospitalId())
                        .ifPresentOrElse(
                            hospital -> {
                                dto.setHospitalName(hospital.getName());
                                log.info("找到医院: {} -> {}", doctor.getHospitalId(), hospital.getName());
                            },
                            () -> {
                                dto.setHospitalName("未知医院");
                                log.warn("未找到医院ID: {}", doctor.getHospitalId());
                            }
                        );
            } catch (Exception e) {
                dto.setHospitalName("未知医院");
                log.error("查询医院失败: {}", doctor.getHospitalId(), e);
            }
        } else {
            dto.setHospitalName("未知医院");
        }

        // 主动查询科室名称
        if (doctor.getDepartmentId() != null) {
            try {
                departmentRepository.findById(doctor.getDepartmentId())
                        .ifPresentOrElse(
                            department -> {
                                dto.setDepartmentName(department.getName());
                                log.info("找到科室: {} -> {}", doctor.getDepartmentId(), department.getName());
                            },
                            () -> {
                                dto.setDepartmentName("未知科室");
                                log.warn("未找到科室ID: {}", doctor.getDepartmentId());
                            }
                        );
            } catch (Exception e) {
                dto.setDepartmentName("未知科室");
                log.error("查询科室失败: {}", doctor.getDepartmentId(), e);
            }
        } else {
            dto.setDepartmentName("未知科室");
        }

        return dto;
    }


}
