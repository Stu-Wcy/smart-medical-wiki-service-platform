package com.example.backend.modules.user.dto;

import com.example.backend.modules.user.enums.GenderEnum;
import com.example.backend.modules.user.enums.RoleTypeEnum;
import com.example.backend.modules.user.enums.UserStatusEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import lombok.Data;

@Data
@Schema(description = "用户信息")
public class UserInfoDTO {

    @Schema(description = "用户ID")
    private Long id;

    @Schema(description = "用户名")
    private String username;

    @Schema(description = "昵称")
    private String nickname;

    @Schema(description = "真实姓名")
    private String realName;

    @Schema(description = "头像")
    private String avatar;

    @Schema(description = "手机号")
    private String phone;

    @Schema(description = "邮箱")
    private String email;

    @Schema(description = "性别")
    private GenderEnum gender;

    @Schema(description = "出生日期")
    private LocalDate birthDate;



    @Schema(description = "token")
    private String token;
    /**
     * 角色
     */
    @Schema(description = "角色")
    private RoleTypeEnum roleType;

    @Schema(description = "状态")
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private UserStatusEnum status;
    
    @Schema(description = "是否在线")
    private Boolean isOnline;
} 
