package com.example.backend.common.utils;

import com.aliyun.oss.OSS;
import com.example.backend.common.exception.ServiceException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OssUtils {

    private final OSS ossClient;
    
    @Value("${aliyun.oss.bucketName}")
    private String bucketName;
    
    @Value("${aliyun.oss.endpoint}")
    private String endpoint;

    public String upload(MultipartFile file) {
        try {
            String fileName = generateFileName(file);
            ossClient.putObject(bucketName, fileName, file.getInputStream());
            return getFileUrl(fileName);
        } catch (Exception e) {
            throw new ServiceException("文件上传失败");
        }
    }

    public void delete(String fileUrl) {
        try {
            String fileName = getFileNameFromUrl(fileUrl);
            ossClient.deleteObject(bucketName, fileName);
        } catch (Exception e) {
            throw new ServiceException("文件删除失败");
        }
    }

    private String generateFileName(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        return "upload/" + UUID.randomUUID() + extension;
    }

    private String getFileUrl(String fileName) {
        return "https://" + bucketName + "." + endpoint + "/" + fileName;
    }

    private String getFileNameFromUrl(String fileUrl) {
        return fileUrl.substring(fileUrl.indexOf("/upload/"));
    }
} 