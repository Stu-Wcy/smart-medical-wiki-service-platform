package com.example.backend.common.base;

import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.domain.Page;

@Data
@Accessors(chain = true)
public class Result<T> {
    private Integer code;
    private String message;
    private T data;

    public static <T> Result<T> success() {
        return new Result<T>().setCode(200).setMessage("操作成功");
    }

    public static <T> Result<T> success(T data) {
        return new Result<T>().setCode(200).setMessage("操作成功").setData(data);
    }

    public static <T> Result<PageResult<T>> success(Page<T> page) {
        return success(PageResult.build(page));
    }

    public static <T> Result<T> error(String message) {
        return new Result<T>().setCode(500).setMessage(message);
    }

    public static <T> Result<T> error(Integer code, String message) {
        return new Result<T>().setCode(code).setMessage(message);
    }
} 