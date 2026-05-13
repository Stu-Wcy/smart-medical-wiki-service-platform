package com.example.backend.common.utils;

import com.example.backend.common.base.BasePageQuery;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

public class PageUtils {

    public static PageRequest createPageRequest(BasePageQuery query) {
        return PageRequest.of(query.getPageNum() - 1, query.getPageSize());
    }

    public static PageRequest createPageRequest(BasePageQuery query, Sort sort) {
        return PageRequest.of(query.getPageNum() - 1, query.getPageSize(), sort);
    }
} 