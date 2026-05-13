package com.example.backend.modules.disease.service;

import com.example.backend.common.exception.ServiceException;
import com.example.backend.common.utils.BeanUtils;
import com.example.backend.modules.disease.dto.DiseaseDTO;
import com.example.backend.modules.disease.dto.DiseaseQueryDTO;
import com.example.backend.modules.disease.entity.Disease;
import com.example.backend.modules.disease.entity.DiseaseCategory;
import com.example.backend.modules.disease.enums.DiseaseStatusEnum;
import com.example.backend.modules.disease.repository.DiseaseCategoryRepository;
import com.example.backend.modules.disease.repository.DiseaseRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiseaseService {

    private final DiseaseRepository diseaseRepository;
    private final DiseaseCategoryRepository diseaseCategoryRepository;

    public Page<DiseaseDTO> list(DiseaseQueryDTO queryDTO, Integer page, Integer size) {
        // 构建查询条件
        Specification<Disease> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            if (StringUtils.isNotBlank(queryDTO.getName())) {
                predicates.add(cb.like(root.get("name"), "%" + queryDTO.getName() + "%"));
            }
            
            if (queryDTO.getCategoryId() != null) {
                predicates.add(cb.equal(root.get("category").get("id"), queryDTO.getCategoryId()));
            }
            
            if (queryDTO.getStatus() != null) {
                predicates.add(cb.equal(root.get("status"), 
                    queryDTO.getStatus() == 1 ? DiseaseStatusEnum.NORMAL : DiseaseStatusEnum.DISABLED));
            }
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        // 分页查询
        Page<Disease> diseasePage = diseaseRepository.findAll(spec, PageRequest.of(page - 1, size));
        
        // 转换为DTO
        return diseasePage.map(this::convertToDTO);
    }

    public DiseaseDTO get(Long id) {
        Disease disease = diseaseRepository.findById(id)
                .orElseThrow(() -> new ServiceException("疾病不存在"));
        return convertToDTO(disease);
    }

    @Transactional
    public DiseaseDTO add(DiseaseDTO addDTO) {
        // 验证名称是否存在
        if (diseaseRepository.existsByName(addDTO.getName())) {
            throw new ServiceException("疾病名称已存在");
        }

        // 验证分类是否存在
        DiseaseCategory category = diseaseCategoryRepository.findById(addDTO.getCategoryId())
                .orElseThrow(() -> new ServiceException("分类不存在"));

        // 创建疾病
        Disease disease = new Disease();
        BeanUtils.copyProperties(addDTO, disease);
        disease.setCategory(category);
        disease.setStatus(addDTO.getStatus() == null || addDTO.getStatus() == 1 ? 
            DiseaseStatusEnum.NORMAL : DiseaseStatusEnum.DISABLED);

        disease = diseaseRepository.save(disease);

        return convertToDTO(disease);
    }

    @Transactional
    public DiseaseDTO update(DiseaseDTO updateDTO) {
        // 验证疾病是否存在
        Disease disease = diseaseRepository.findById(updateDTO.getId())
                .orElseThrow(() -> new ServiceException("疾病不存在"));

        // 验证名称是否重复
        if (diseaseRepository.existsByNameAndIdNot(updateDTO.getName(), updateDTO.getId())) {
            throw new ServiceException("疾病名称已存在");
        }

        // 验证分类是否存在
        DiseaseCategory category = diseaseCategoryRepository.findById(updateDTO.getCategoryId())
                .orElseThrow(() -> new ServiceException("分类不存在"));

        // 更新疾病
        BeanUtils.copyProperties(updateDTO, disease);
        disease.setCategory(category);
        disease.setStatus(updateDTO.getStatus() == null || updateDTO.getStatus() == 1 ? 
            DiseaseStatusEnum.NORMAL : DiseaseStatusEnum.DISABLED);

        disease = diseaseRepository.save(disease);

        return convertToDTO(disease);
    }

    @Transactional
    public void delete(Long id) {
        diseaseRepository.deleteById(id);
    }

    @Transactional
    public void updateStatus(Long id, Integer status) {
        Disease disease = diseaseRepository.findById(id)
                .orElseThrow(() -> new ServiceException("疾病不存在"));

        disease.setStatus(status == 1 ? DiseaseStatusEnum.NORMAL : DiseaseStatusEnum.DISABLED);
        diseaseRepository.save(disease);
    }

    private DiseaseDTO convertToDTO(Disease disease) {
        DiseaseDTO dto = new DiseaseDTO();
        BeanUtils.copyProperties(disease, dto);
        dto.setStatus(disease.getStatus().getValue());
        dto.setCategoryId(disease.getCategory().getId());
        dto.setCategoryName(disease.getCategory().getName());
        return dto;
    }

    public Page<DiseaseDTO> listForPublic(String name, Long categoryId, Integer page, Integer size) {
        // 构建查询条件
        Specification<Disease> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            // 只查询正常状态的疾病
            predicates.add(cb.equal(root.get("status"), DiseaseStatusEnum.NORMAL));
            
            if (StringUtils.isNotBlank(name)) {
                predicates.add(cb.like(root.get("name"), "%" + name + "%"));
            }
            
            if (categoryId != null) {
                predicates.add(cb.equal(root.get("category").get("id"), categoryId));
            }
            
            // 分类也必须是正常状态
            predicates.add(cb.equal(root.get("category").get("status"), DiseaseStatusEnum.NORMAL));
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        // 分页查询
        Page<Disease> diseasePage = diseaseRepository.findAll(spec, PageRequest.of(page - 1, size));
        
        // 转换为DTO
        return diseasePage.map(this::convertToDTO);
    }

    public DiseaseDTO getForPublic(Long id) {
        // 查询疾病，同时确保疾病和分类都是正常状态
        Specification<Disease> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("id"), id));
            predicates.add(cb.equal(root.get("status"), DiseaseStatusEnum.NORMAL));
            predicates.add(cb.equal(root.get("category").get("status"), DiseaseStatusEnum.NORMAL));
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Disease disease = diseaseRepository.findOne(spec)
                .orElseThrow(() -> new ServiceException("疾病不存在"));

        return convertToDTO(disease);
    }

    public List<DiseaseDTO> search(String keyword, Integer limit) {
        // 构建查询条件
        Specification<Disease> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            // 只查询正常状态的疾病和分类
            predicates.add(cb.equal(root.get("status"), DiseaseStatusEnum.NORMAL));
            predicates.add(cb.equal(root.get("category").get("status"), DiseaseStatusEnum.NORMAL));
            
            // 关键词匹配疾病名称、症状、病因
            List<Predicate> keywordPredicates = new ArrayList<>();
            keywordPredicates.add(cb.like(root.get("name"), "%" + keyword + "%"));
            keywordPredicates.add(cb.like(root.get("symptoms"), "%" + keyword + "%"));
            keywordPredicates.add(cb.like(root.get("causes"), "%" + keyword + "%"));
            predicates.add(cb.or(keywordPredicates.toArray(new Predicate[0])));
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        // 查询并限制返回数量
        List<Disease> diseases = diseaseRepository.findAll(spec, PageRequest.of(0, limit)).getContent();
        
        // 转换为DTO
        return diseases.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
} 