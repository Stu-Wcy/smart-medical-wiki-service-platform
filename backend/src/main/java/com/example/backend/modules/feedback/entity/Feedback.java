package com.example.backend.modules.feedback.entity;

import com.example.backend.common.base.BaseEntity;
import com.example.backend.modules.feedback.enums.FeedbackStatusEnum;
import com.example.backend.modules.feedback.enums.FeedbackTypeEnum;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "t_feedback")
@EqualsAndHashCode(callSuper = true)
public class Feedback extends BaseEntity {

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "type", nullable = false)
    private FeedbackTypeEnum type;

    @Column(name = "content", nullable = false, columnDefinition = "text")
    private String content;

    @Column(name = "images", length = 1000)
    private String images;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status", nullable = false)
    private FeedbackStatusEnum status = FeedbackStatusEnum.PENDING;

    @Column(name = "reply", columnDefinition = "text")
    private String reply;

    @Column(name = "reply_time")
    private LocalDateTime replyTime;
} 