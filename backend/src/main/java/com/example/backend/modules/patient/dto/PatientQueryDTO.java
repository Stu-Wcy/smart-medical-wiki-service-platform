package com.example.backend.modules.patient.dto;

import com.example.backend.modules.patient.enums.GenderEnum;
import com.example.backend.modules.patient.enums.PatientStatusEnum;
import com.example.backend.modules.patient.enums.RelationshipEnum;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class PatientQueryDTO {

    private Long userId;

    private String name;

    private String phone;

    private String idCard;

    private GenderEnum gender;

    private RelationshipEnum relationship;

    private PatientStatusEnum status;

    private Boolean isDefault;

    private Integer page = 1;

    private Integer size = 10;

    /**
     * 设置关系字段，支持中文描述和枚举名称
     */
    public void setRelationship(String relationshipStr) {
        if (relationshipStr == null || relationshipStr.trim().isEmpty()) {
            this.relationship = null;
            return;
        }

        try {
            // 首先尝试按枚举名称匹配
            this.relationship = RelationshipEnum.valueOf(relationshipStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            // 如果枚举名称匹配失败，尝试按描述匹配
            this.relationship = RelationshipEnum.fromDescription(relationshipStr);
            log.info("通过描述转换关系字段: {} -> {}", relationshipStr, this.relationship);
        }
    }

    /**
     * 直接设置关系枚举
     */
    public void setRelationship(RelationshipEnum relationship) {
        this.relationship = relationship;
    }
}
