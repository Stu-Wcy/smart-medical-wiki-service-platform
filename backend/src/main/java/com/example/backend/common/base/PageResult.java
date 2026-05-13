package com.example.backend.common.base;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@Schema(description = "分页结果")
public class PageResult<T> {
    
    @Schema(description = "总记录数")
    private Long total;
    
    @Schema(description = "当前页数据")
    private List<T> list;
    
    @Schema(description = "总页数")
    private Integer pages;
    
    @Schema(description = "当前页码")
    private Integer pageNum;
    
    @Schema(description = "每页数量")
    private Integer pageSize;

    public static <T> PageResult<T> build(Page<T> page) {
        PageResult<T> result = new PageResult<>();
        result.setTotal(page.getTotalElements());
        result.setList(page.getContent());
        result.setPages(page.getTotalPages());
        result.setPageNum(page.getNumber() + 1);
        result.setPageSize(page.getSize());
        return result;
    }
} 