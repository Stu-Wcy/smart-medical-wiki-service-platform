package com.example.backend.modules.consult.dto;

import lombok.Data;

@Data
public class ConsultationReplyDTO {
    private String replyText;
    private Boolean notifyByEmail;
}
