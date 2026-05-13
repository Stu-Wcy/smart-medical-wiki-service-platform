package com.example.backend.modules.disease.repository;

import com.example.backend.modules.disease.entity.DiseaseCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DiseaseCategoryRepository extends JpaRepository<DiseaseCategory, Long>, JpaSpecificationExecutor<DiseaseCategory> {
    boolean existsByName(String name);
    boolean existsByNameAndIdNot(String name, Long id);
} 