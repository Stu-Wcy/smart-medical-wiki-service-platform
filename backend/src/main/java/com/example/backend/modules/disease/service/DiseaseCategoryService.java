package com.example.backend.modules.disease.service;

import com.example.backend.common.exception.ServiceException;
import com.example.backend.common.utils.BeanUtils;
import com.example.backend.modules.disease.dto.DiseaseCategoryDTO;
import com.example.backend.modules.disease.entity.DiseaseCategory;
import com.example.backend.modules.disease.enums.DiseaseStatusEnum;
import com.example.backend.modules.disease.repository.DiseaseCategoryRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiseaseCategoryService {

    private final DiseaseCategoryRepository diseaseCategoryRepository;

    public Page<DiseaseCategoryDTO> list(String name, Integer page, Integer size) {
        // 构建查询条件
        Specification<DiseaseCategory> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            if (StringUtils.isNotBlank(name)) {
                predicates.add(cb.like(root.get("name"), "%" + name + "%"));
            }
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        // 分页查询
        Page<DiseaseCategory> categoryPage = diseaseCategoryRepository.findAll(spec, 
            PageRequest.of(page - 1, size, Sort.by(Sort.Direction.ASC, "sort")));
        
        // 转换为DTO
        return categoryPage.map(category -> {
            DiseaseCategoryDTO dto = new DiseaseCategoryDTO();
            BeanUtils.copyProperties(category, dto);
            dto.setStatus(category.getStatus().getValue());
            return dto;
        });
    }

    public DiseaseCategoryDTO get(Long id) {
        DiseaseCategory category = diseaseCategoryRepository.findById(id)
                .orElseThrow(() -> new ServiceException("分类不存在"));
        DiseaseCategoryDTO dto = new DiseaseCategoryDTO();
        BeanUtils.copyProperties(category, dto);
        dto.setStatus(category.getStatus().getValue());
        return dto;
    }

    @Transactional
    public DiseaseCategoryDTO add(DiseaseCategoryDTO addDTO) {
        // 验证名称是否存在
        if (diseaseCategoryRepository.existsByName(addDTO.getName())) {
            throw new ServiceException("分类名称已存在");
        }

        // 创建分类
        DiseaseCategory category = new DiseaseCategory();
        BeanUtils.copyProperties(addDTO, category);
        category.setStatus(addDTO.getStatus() == null || addDTO.getStatus() == 1 ? 
            DiseaseStatusEnum.NORMAL : DiseaseStatusEnum.DISABLED);

        category = diseaseCategoryRepository.save(category);

        // 转换为DTO
        DiseaseCategoryDTO dto = new DiseaseCategoryDTO();
        BeanUtils.copyProperties(category, dto);
        dto.setStatus(category.getStatus().getValue());
        return dto;
    }

    @Transactional
    public DiseaseCategoryDTO update(DiseaseCategoryDTO updateDTO) {
        // 验证分类是否存在
        DiseaseCategory category = diseaseCategoryRepository.findById(updateDTO.getId())
                .orElseThrow(() -> new ServiceException("分类不存在"));

        // 验证名称是否重复
        if (diseaseCategoryRepository.existsByNameAndIdNot(updateDTO.getName(), updateDTO.getId())) {
            throw new ServiceException("分类名称已存在");
        }

        // 更新分类
        BeanUtils.copyProperties(updateDTO, category);
        category.setStatus(updateDTO.getStatus() == null || updateDTO.getStatus() == 1 ? 
            DiseaseStatusEnum.NORMAL : DiseaseStatusEnum.DISABLED);

        category = diseaseCategoryRepository.save(category);

        // 转换为DTO
        DiseaseCategoryDTO dto = new DiseaseCategoryDTO();
        BeanUtils.copyProperties(category, dto);
        dto.setStatus(category.getStatus().getValue());
        return dto;
    }

    @Transactional
    public void delete(Long id) {
        diseaseCategoryRepository.deleteById(id);
    }

    @Transactional
    public void updateStatus(Long id, Integer status) {
        DiseaseCategory category = diseaseCategoryRepository.findById(id)
                .orElseThrow(() -> new ServiceException("分类不存在"));

        category.setStatus(status == 1 ? DiseaseStatusEnum.NORMAL : DiseaseStatusEnum.DISABLED);
        diseaseCategoryRepository.save(category);
    }

    public List<DiseaseCategoryDTO> listAll() {
        // 查询所有正常状态的分类，按排序字段升序
        Specification<DiseaseCategory> spec = (root, query, cb) -> 
            cb.equal(root.get("status"), DiseaseStatusEnum.NORMAL);

        List<DiseaseCategory> categories = diseaseCategoryRepository.findAll(
            spec, Sort.by(Sort.Direction.ASC, "sort"));

        // 转换为DTO
        return categories.stream().map(category -> {
            DiseaseCategoryDTO dto = new DiseaseCategoryDTO();
            BeanUtils.copyProperties(category, dto);
            dto.setStatus(category.getStatus().getValue());
            return dto;
        }).collect(Collectors.toList());
    }
}