package com.example.backend.modules.disease.repository;

import com.example.backend.modules.disease.entity.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DiseaseRepository extends JpaRepository<Disease, Long>, JpaSpecificationExecutor<Disease> {
    boolean existsByName(String name);
    boolean existsByNameAndIdNot(String name, Long id);
}