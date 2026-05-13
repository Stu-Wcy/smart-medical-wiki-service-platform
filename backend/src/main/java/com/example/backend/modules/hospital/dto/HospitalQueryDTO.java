package com.example.backend.modules.hospital.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 医院查询DTO
 */
@Data
@Schema(description = "医院查询请求")
public class HospitalQueryDTO {

    @Schema(description = "医院名称")
    private String name;

    @Schema(description = "省份")
    private String province;

    @Schema(description = "城市")
    private String city;

    @Schema(description = "区县")
    private String district;

    @Schema(description = "医院等级(1-一级,2-二级,3-三级)")
    private Integer level;

    @Schema(description = "医院类型(1-综合医院,2-专科医院,3-中医医院)")
    private Integer type;

    @Schema(description = "状态(0-禁用,1-正常)")
    private Integer status;
}
