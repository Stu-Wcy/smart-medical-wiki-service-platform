package com.example.backend.common.utils;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.example.backend.common.exception.ServiceException;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Data
@Component
@ConfigurationProperties(prefix = "aliyun.oss")
public class OSSUtil {

    private String endpoint;
    private String accessKeyId;
    private String accessKeySecret;
    private String bucketName;

    public String uploadFile(MultipartFile file, String folder) {
        // 创建OSSClient实例
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        try {
            // 生成文件名
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String fileName = folder + "/" + 
                    LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) + "/" +
                    UUID.randomUUID().toString().replaceAll("-", "") + extension;

            // 上传文件
            ossClient.putObject(bucketName, fileName, file.getInputStream());

            // 返回访问URL
            return "http"+ "://" + bucketName + "." + endpoint + "/" + fileName;
        } catch (IOException e) {
            throw new ServiceException("文件上传失败：" + e.getMessage());
        } finally {
            // 关闭OSSClient
            ossClient.shutdown();
        }
    }
} 