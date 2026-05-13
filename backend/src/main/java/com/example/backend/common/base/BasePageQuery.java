package com.example.backend.common.base;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
@Schema(description = "分页查询基类")
public class BasePageQuery {
    
    @Schema(description = "页码(从1开始)", example = "1")
    @Min(value = 1, message = "页码不能小于1")
    private Integer pageNum = 1;
    
    @Schema(description = "每页数量", example = "10")
    @Min(value = 1, message = "每页数量不能小于1")
    @Max(value = 100, message = "每页数量不能大于100")
    private Integer pageSize = 10;
} 