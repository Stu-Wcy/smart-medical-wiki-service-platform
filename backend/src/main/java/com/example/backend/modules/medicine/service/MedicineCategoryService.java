package com.example.backend.modules.medicine.service;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.exception.ServiceException;
import com.example.backend.common.utils.BeanUtils;
import com.example.backend.modules.medicine.dto.MedicineCategoryDTO;
import com.example.backend.modules.medicine.entity.MedicineCategory;
import com.example.backend.modules.medicine.enums.MedicineStatusEnum;
import com.example.backend.modules.medicine.repository.MedicineCategoryRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicineCategoryService {

    private final MedicineCategoryRepository medicineCategoryRepository;

    public List<MedicineCategoryDTO> listAll() {
        List<MedicineCategory> categories = medicineCategoryRepository.findAllByStatusOrderBySort(MedicineStatusEnum.NORMAL);
        return categories.stream().map(this::convertToDTO).toList();
    }

    public PageResult<MedicineCategoryDTO> list(String name, Integer page, Integer size) {
        // 构建查询条件
        Specification<MedicineCategory> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            if (StringUtils.isNotBlank(name)) {
                predicates.add(cb.like(root.get("name"), "%" + name + "%"));
            }
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        // 分页查询
        Page<MedicineCategory> categoryPage = medicineCategoryRepository.findAll(spec, 
                PageRequest.of(page - 1, size, Sort.by(Sort.Direction.ASC, "sort")));
        
        // 转换为DTO
        List<MedicineCategoryDTO> records = categoryPage.getContent().stream()
                .map(this::convertToDTO)
                .toList();
        
        // 创建DTO的Page对象
        Page<MedicineCategoryDTO> dtoPage = new PageImpl<>(
            records, 
            categoryPage.getPageable(), 
            categoryPage.getTotalElements()
        );
        
        return PageResult.build(dtoPage);
    }

    public MedicineCategoryDTO get(Long id) {
        MedicineCategory category = medicineCategoryRepository.findById(id)
                .orElseThrow(() -> new ServiceException("分类不存在"));
        return convertToDTO(category);
    }

    @Transactional
    public MedicineCategoryDTO add(MedicineCategoryDTO addDTO) {
        // 验证名称是否存在
        if (medicineCategoryRepository.existsByName(addDTO.getName())) {
            throw new ServiceException("分类名称已存在");
        }

        // 创建分类
        MedicineCategory category = new MedicineCategory();
        BeanUtils.copyProperties(addDTO, category);
        category.setStatus(addDTO.getStatus() == null || addDTO.getStatus() == 1 ? 
            MedicineStatusEnum.NORMAL : MedicineStatusEnum.DISABLED);

        category = medicineCategoryRepository.save(category);

        return convertToDTO(category);
    }

    @Transactional
    public MedicineCategoryDTO update(MedicineCategoryDTO updateDTO) {
        // 验证分类是否存在
        MedicineCategory category = medicineCategoryRepository.findById(updateDTO.getId())
                .orElseThrow(() -> new ServiceException("分类不存在"));

        // 验证名称是否重复
        if (medicineCategoryRepository.existsByNameAndIdNot(updateDTO.getName(), updateDTO.getId())) {
            throw new ServiceException("分类名称已存在");
        }

        // 更新分类
        BeanUtils.copyProperties(updateDTO, category);
        category.setStatus(updateDTO.getStatus() == null || updateDTO.getStatus() == 1 ? 
            MedicineStatusEnum.NORMAL : MedicineStatusEnum.DISABLED);

        category = medicineCategoryRepository.save(category);

        return convertToDTO(category);
    }

    @Transactional
    public void delete(Long id) {
        medicineCategoryRepository.deleteById(id);
    }

    @Transactional
    public void updateStatus(Long id, Integer status) {
        MedicineCategory category = medicineCategoryRepository.findById(id)
                .orElseThrow(() -> new ServiceException("分类不存在"));

        category.setStatus(status == 1 ? MedicineStatusEnum.NORMAL : MedicineStatusEnum.DISABLED);
        medicineCategoryRepository.save(category);
    }

    private MedicineCategoryDTO convertToDTO(MedicineCategory category) {
        MedicineCategoryDTO dto = new MedicineCategoryDTO();
        BeanUtils.copyProperties(category, dto);
        dto.setStatus(category.getStatus().getValue());
        return dto;
    }
} 