package com.example.backend.modules.department.service;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.exception.ServiceException;
import com.example.backend.modules.department.dto.*;
import com.example.backend.modules.department.entity.Department;
import com.example.backend.modules.department.entity.DepartmentCategory;
import com.example.backend.modules.department.enums.DepartmentStatusEnum;
import com.example.backend.modules.department.repository.DepartmentCategoryRepository;
import com.example.backend.modules.department.repository.DepartmentRepository;
import com.example.backend.modules.hospital.entity.Hospital;
import com.example.backend.modules.hospital.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Department Service
 */
@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final DepartmentCategoryRepository categoryRepository;
    private final HospitalRepository hospitalRepository;

    /**
     * Page query department list
     */
    public PageResult<DepartmentVO> list(DepartmentQueryDTO queryDTO, Integer page, Integer size) {
        Page<Department> departmentPage = departmentRepository.findByConditions(
            queryDTO.getName(),
            queryDTO.getCategoryId(),
            queryDTO.getHospitalId(),
            queryDTO.getStatus(),
            PageRequest.of(page - 1, size, Sort.by(Sort.Direction.ASC, "sort", "id"))
        );

        Page<DepartmentVO> voPage = departmentPage.map(this::convertToVO);
        return PageResult.build(voPage);
    }

    /**
     * Get department list by hospital ID
     */
    public List<DepartmentVO> listByHospitalId(Long hospitalId) {
        List<Department> departments = departmentRepository.findByHospitalIdAndStatus(
            hospitalId, DepartmentStatusEnum.NORMAL.getValue()
        );
        return departments.stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    /**
     * Get department list by category ID
     */
    public List<DepartmentVO> listByCategoryId(Long categoryId) {
        List<Department> departments = departmentRepository.findByCategoryIdAndStatus(
            categoryId, DepartmentStatusEnum.NORMAL.getValue()
        );
        return departments.stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    /**
     * Get department detail
     */
    public DepartmentVO get(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ServiceException("Department not found"));
        return convertToVO(department);
    }

    /**
     * Add department
     */
    @Transactional
    public DepartmentVO add(DepartmentAddDTO addDTO) {
        if (departmentRepository.existsByNameAndHospitalIdAndDeletedFalse(addDTO.getName(), addDTO.getHospitalId())) {
            throw new ServiceException("Department name already exists in this hospital");
        }

        DepartmentCategory category = categoryRepository.findById(addDTO.getCategoryId())
                .orElseThrow(() -> new ServiceException("Department category not found"));
        Hospital hospital = hospitalRepository.findById(addDTO.getHospitalId())
                .orElseThrow(() -> new ServiceException("Hospital not found"));

        Department department = new Department();
        BeanUtils.copyProperties(addDTO, department);
        department.setCategory(category);
        department.setHospital(hospital);
        department.setSort(addDTO.getSort() != null ? addDTO.getSort() : 0);
        department.setStatus(addDTO.getStatus() != null ? addDTO.getStatus() : DepartmentStatusEnum.NORMAL.getValue());

        department = departmentRepository.save(department);
        return convertToVO(department);
    }

    /**
     * Update department
     */
    @Transactional
    public DepartmentVO update(DepartmentUpdateDTO updateDTO) {
        Department department = departmentRepository.findById(updateDTO.getId())
                .orElseThrow(() -> new ServiceException("Department not found"));

        if (departmentRepository.existsByNameAndHospitalIdAndIdNotAndDeletedFalse(
                updateDTO.getName(), updateDTO.getHospitalId(), updateDTO.getId())) {
            throw new ServiceException("Department name already exists in this hospital");
        }

        DepartmentCategory category = categoryRepository.findById(updateDTO.getCategoryId())
                .orElseThrow(() -> new ServiceException("Department category not found"));
        Hospital hospital = hospitalRepository.findById(updateDTO.getHospitalId())
                .orElseThrow(() -> new ServiceException("Hospital not found"));

        BeanUtils.copyProperties(updateDTO, department);
        department.setCategory(category);
        department.setHospital(hospital);
        department.setSort(updateDTO.getSort() != null ? updateDTO.getSort() : 0);
        department.setStatus(updateDTO.getStatus() != null ? updateDTO.getStatus() : DepartmentStatusEnum.NORMAL.getValue());

        department = departmentRepository.save(department);
        return convertToVO(department);
    }

    /**
     * Delete department
     */
    @Transactional
    public void delete(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ServiceException("Department not found"));
        
        department.setDeleted(true);
        departmentRepository.save(department);
    }

    /**
     * Batch delete departments
     */
    @Transactional
    public void batchDelete(List<Long> ids) {
        List<Department> departments = departmentRepository.findAllById(ids);
        departments.forEach(department -> department.setDeleted(true));
        departmentRepository.saveAll(departments);
    }

    /**
     * Public API: Get normal status department list
     */
    public PageResult<DepartmentVO> listForPublic(DepartmentQueryDTO queryDTO, Integer page, Integer size) {
        queryDTO.setStatus(DepartmentStatusEnum.NORMAL.getValue());
        return list(queryDTO, page, size);
    }

    /**
     * Public API: Get department detail
     */
    public DepartmentVO getForPublic(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ServiceException("Department not found"));

        if (!DepartmentStatusEnum.NORMAL.getValue().equals(department.getStatus())) {
            throw new ServiceException("Department not found");
        }

        return convertToVO(department);
    }

    /**
     * Convert to VO
     */
    private DepartmentVO convertToVO(Department department) {
        DepartmentVO vo = new DepartmentVO();
        BeanUtils.copyProperties(department, vo);

        if (department.getCategory() != null) {
            vo.setCategoryId(department.getCategory().getId());
            vo.setCategoryName(department.getCategory().getName());
        }
        if (department.getHospital() != null) {
            vo.setHospitalId(department.getHospital().getId());
            vo.setHospitalName(department.getHospital().getName());
        }

        DepartmentStatusEnum statusEnum = DepartmentStatusEnum.findByValue(department.getStatus());
        vo.setStatusDesc(statusEnum != null ? statusEnum.getDesc() : null);

        return vo;
    }
}
