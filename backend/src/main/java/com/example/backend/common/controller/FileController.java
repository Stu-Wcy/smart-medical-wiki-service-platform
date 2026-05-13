package com.example.backend.common.controller;

import com.example.backend.common.base.Result;
import com.example.backend.common.utils.OSSUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * 药品图片：指定 folder=medicines
 * 用户头像：指定 folder=avatars
 * 其他文件：使用默认的 common 文件夹或指定特定的文件夹
 */
@Tag(name = "文件上传")
@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final OSSUtil ossUtil;

    @Operation(summary = "上传文件")
    @PostMapping("/upload")
    public Result<String> upload(
            @Parameter(description = "文件") @RequestParam("file") MultipartFile file,
            @Parameter(description = "文件夹") @RequestParam(defaultValue = "common") String folder) {
        try {
            if (file == null || file.isEmpty()) {
                return Result.error("文件为空");
            }
            long maxSize = 5 * 1024 * 1024;
            if (file.getSize() > maxSize) {
                return Result.error("文件过大，限制为5MB");
            }
            String name = file.getOriginalFilename() != null ? file.getOriginalFilename().toLowerCase() : "";
            boolean extOk = name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png") || name.endsWith(".gif");
            if (!(extOk)) {
                return Result.error("仅支持图片格式：JPG/PNG/GIF");
            }
            String url = ossUtil.uploadFile(file, folder);
            return Result.success(url);
        } catch (Exception e) {
            return Result.error("上传失败：" + e.getMessage());
        }
    }
} 
