package com.example.backend.modules.department.service;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.exception.ServiceException;
import com.example.backend.modules.department.dto.DepartmentCategoryVO;
import com.example.backend.modules.department.entity.DepartmentCategory;
import com.example.backend.modules.department.enums.DepartmentStatusEnum;
import com.example.backend.modules.department.repository.DepartmentCategoryRepository;
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
 * Department Category Service
 */
@Service
@RequiredArgsConstructor
public class DepartmentCategoryService {

    private final DepartmentCategoryRepository categoryRepository;

    /**
     * Page query department category list
     */
    public PageResult<DepartmentCategoryVO> list(String name, Integer status, Integer page, Integer size) {
        Page<DepartmentCategory> categoryPage = categoryRepository.findByConditions(
            name, status,
            PageRequest.of(page - 1, size, Sort.by(Sort.Direction.ASC, "sort", "id"))
        );

        Page<DepartmentCategoryVO> voPage = categoryPage.map(this::convertToVO);
        return PageResult.build(voPage);
    }

    /**
     * Get all normal status category list
     */
    public List<DepartmentCategoryVO> listAll() {
        List<DepartmentCategory> categories = categoryRepository.findByStatusOrderBySortAscIdAsc(
            DepartmentStatusEnum.NORMAL.getValue()
        );
        return categories.stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    /**
     * Get department category detail
     */
    public DepartmentCategoryVO get(Long id) {
        DepartmentCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new ServiceException("Department category not found"));
        return convertToVO(category);
    }

    /**
     * Add department category
     */
    @Transactional
    public DepartmentCategoryVO add(String name, String description, String icon, Integer sort, Integer status) {
        if (categoryRepository.existsByNameAndDeletedFalse(name)) {
            throw new ServiceException("Category name already exists");
        }

        DepartmentCategory category = new DepartmentCategory();
        category.setName(name);
        category.setDescription(description);
        category.setIcon(icon);
        category.setSort(sort != null ? sort : 0);
        category.setStatus(status != null ? status : DepartmentStatusEnum.NORMAL.getValue());

        category = categoryRepository.save(category);
        return convertToVO(category);
    }

    /**
     * Update department category
     */
    @Transactional
    public DepartmentCategoryVO update(Long id, String name, String description, String icon, Integer sort, Integer status) {
        DepartmentCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new ServiceException("Department category not found"));

        if (categoryRepository.existsByNameAndIdNotAndDeletedFalse(name, id)) {
            throw new ServiceException("Category name already exists");
        }

        category.setName(name);
        category.setDescription(description);
        category.setIcon(icon);
        category.setSort(sort != null ? sort : 0);
        category.setStatus(status != null ? status : DepartmentStatusEnum.NORMAL.getValue());

        category = categoryRepository.save(category);
        return convertToVO(category);
    }

    /**
     * Delete department category
     */
    @Transactional
    public void delete(Long id) {
        DepartmentCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new ServiceException("Department category not found"));
        
        category.setDeleted(true);
        categoryRepository.save(category);
    }

    /**
     * Batch delete department categories
     */
    @Transactional
    public void batchDelete(List<Long> ids) {
        List<DepartmentCategory> categories = categoryRepository.findAllById(ids);
        categories.forEach(category -> category.setDeleted(true));
        categoryRepository.saveAll(categories);
    }

    /**
     * Convert to VO
     */
    private DepartmentCategoryVO convertToVO(DepartmentCategory category) {
        DepartmentCategoryVO vo = new DepartmentCategoryVO();
        BeanUtils.copyProperties(category, vo);

        DepartmentStatusEnum statusEnum = DepartmentStatusEnum.findByValue(category.getStatus());
        vo.setStatusDesc(statusEnum != null ? statusEnum.getDesc() : null);

        return vo;
    }
}
