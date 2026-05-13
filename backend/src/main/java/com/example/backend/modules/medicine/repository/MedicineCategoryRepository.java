package com.example.backend.modules.medicine.repository;

import com.example.backend.modules.medicine.entity.MedicineCategory;
import com.example.backend.modules.medicine.enums.MedicineStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface MedicineCategoryRepository extends JpaRepository<MedicineCategory, Long>, JpaSpecificationExecutor<MedicineCategory> {
    boolean existsByName(String name);
    boolean existsByNameAndIdNot(String name, Long id);
    List<MedicineCategory> findAllByStatusOrderBySort(MedicineStatusEnum status);
} 