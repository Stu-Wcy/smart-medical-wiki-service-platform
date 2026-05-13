package com.example.backend.modules.department.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 科室状态枚举
 */
@Getter
@AllArgsConstructor
public enum DepartmentStatusEnum {
    
    DISABLED(0, "禁用"),
    NORMAL(1, "正常");

    private final Integer value;
    private final String desc;

    /**
     * 根据值查找枚举
     */
    public static DepartmentStatusEnum findByValue(Integer value) {
        if (value == null) {
            return null;
        }
        for (DepartmentStatusEnum status : values()) {
            if (status.getValue().equals(value)) {
                return status;
            }
        }
        return null;
    }
}
