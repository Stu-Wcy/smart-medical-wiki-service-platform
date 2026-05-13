package com.example.backend.common.converter;

import com.example.backend.modules.patient.enums.RelationshipEnum;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * RelationshipEnum 转换器
 * 支持从枚举名称和中文描述转换
 */
@Component
public class RelationshipEnumConverter implements Converter<String, RelationshipEnum> {

    @Override
    public RelationshipEnum convert(String source) {
        if (source == null || source.trim().isEmpty()) {
            return null;
        }
        
        return RelationshipEnum.fromString(source.trim());
    }
}
