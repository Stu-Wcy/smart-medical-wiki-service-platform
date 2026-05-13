package com.example.backend.modules.medicine.service;

import com.example.backend.common.exception.ServiceException;
import com.example.backend.common.utils.BeanUtils;
import com.example.backend.modules.medicine.dto.MedicineDTO;
import com.example.backend.modules.medicine.dto.MedicineQueryDTO;
import com.example.backend.modules.medicine.entity.Medicine;
import com.example.backend.modules.medicine.entity.MedicineCategory;
import com.example.backend.modules.medicine.enums.MedicineStatusEnum;
import com.example.backend.modules.medicine.repository.MedicineCategoryRepository;
import com.example.backend.modules.medicine.repository.MedicineRepository;
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

@Service
@RequiredArgsConstructor
public class MedicineService {

    private final MedicineRepository medicineRepository;
    private final MedicineCategoryRepository medicineCategoryRepository;

    public Page<MedicineDTO> list(MedicineQueryDTO queryDTO, Integer page, Integer size) {
        // 构建查询条件
        Specification<Medicine> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            if (StringUtils.isNotBlank(queryDTO.getName())) {
                predicates.add(cb.like(root.get("name"), "%" + queryDTO.getName() + "%"));
            }
            
            if (queryDTO.getCategoryId() != null) {
                predicates.add(cb.equal(root.get("category").get("id"), queryDTO.getCategoryId()));
            }
            
            if (StringUtils.isNotBlank(queryDTO.getManufacturer())) {
                predicates.add(cb.like(root.get("manufacturer"), "%" + queryDTO.getManufacturer() + "%"));
            }
            
            if (queryDTO.getStatus() != null) {
                predicates.add(cb.equal(root.get("status"), 
                    queryDTO.getStatus() == 1 ? MedicineStatusEnum.NORMAL : MedicineStatusEnum.DISABLED));
            }
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        // 分页查询
        Page<Medicine> medicinePage = medicineRepository.findAll(spec, PageRequest.of(page - 1, size));
        
        // 转换为DTO
        return medicinePage.map(this::convertToDTO);
    }

    public MedicineDTO get(Long id) {
        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new ServiceException("药品不存在"));
        return convertToDTO(medicine);
    }

    @Transactional
    public MedicineDTO add(MedicineDTO addDTO) {
        // 验证名称是否存在
        if (medicineRepository.existsByName(addDTO.getName())) {
            throw new ServiceException("药品名称已存在");
        }

        // 验证分类是否存在
        MedicineCategory category = medicineCategoryRepository.findById(addDTO.getCategoryId())
                .orElseThrow(() -> new ServiceException("分类不存在"));

        // 创建药品
        Medicine medicine = new Medicine();
        BeanUtils.copyProperties(addDTO, medicine);
        medicine.setCategory(category);
        medicine.setStatus(addDTO.getStatus() == null || addDTO.getStatus() == 1 ? 
            MedicineStatusEnum.NORMAL : MedicineStatusEnum.DISABLED);

        medicine = medicineRepository.save(medicine);

        return convertToDTO(medicine);
    }

    @Transactional
    public MedicineDTO update(MedicineDTO updateDTO) {
        // 验证药品是否存在
        Medicine medicine = medicineRepository.findById(updateDTO.getId())
                .orElseThrow(() -> new ServiceException("药品不存在"));

        // 验证名称是否重复
        if (medicineRepository.existsByNameAndIdNot(updateDTO.getName(), updateDTO.getId())) {
            throw new ServiceException("药品名称已存在");
        }

        // 验证分类是否存在
        MedicineCategory category = medicineCategoryRepository.findById(updateDTO.getCategoryId())
                .orElseThrow(() -> new ServiceException("分类不存在"));

        // 更新药品
        BeanUtils.copyProperties(updateDTO, medicine);
        medicine.setCategory(category);
        medicine.setStatus(updateDTO.getStatus() == null || updateDTO.getStatus() == 1 ? 
            MedicineStatusEnum.NORMAL : MedicineStatusEnum.DISABLED);

        medicine = medicineRepository.save(medicine);

        return convertToDTO(medicine);
    }

    @Transactional
    public void delete(Long id) {
        medicineRepository.deleteById(id);
    }

    @Transactional
    public void updateStatus(Long id, Integer status) {
        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new ServiceException("药品不存在"));

        medicine.setStatus(
            status.equals(MedicineStatusEnum.NORMAL.getValue()) ? MedicineStatusEnum.DISABLED : MedicineStatusEnum.NORMAL);
        medicineRepository.save(medicine);
    }

    private MedicineDTO convertToDTO(Medicine medicine) {
        MedicineDTO dto = new MedicineDTO();
        BeanUtils.copyProperties(medicine, dto);
        dto.setStatus(medicine.getStatus().getValue());
        dto.setCategoryId(medicine.getCategory().getId());
        dto.setCategoryName(medicine.getCategory().getName());
        return dto;
    }
} 