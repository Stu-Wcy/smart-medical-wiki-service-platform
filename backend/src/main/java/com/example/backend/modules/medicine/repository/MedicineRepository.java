package com.example.backend.modules.medicine.repository;

import com.example.backend.modules.medicine.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MedicineRepository extends JpaRepository<Medicine, Long>, JpaSpecificationExecutor<Medicine> {
    boolean existsByName(String name);
    boolean existsByNameAndIdNot(String name, Long id);
} 