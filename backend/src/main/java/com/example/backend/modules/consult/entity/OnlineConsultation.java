package com.example.backend.modules.consult.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "t_online_consultation")
public class OnlineConsultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "patient_id", nullable = false)
    private Long patientId;
    @Column(name = "doctor_id", nullable = false)
    private Long doctorId;
    @Column(name = "status")
    private Integer status; // 1待答复 2已答复 3已评价 4已关闭
    @Column(name = "patient_condition", columnDefinition = "TEXT", nullable = false)
    private String patientCondition;
    @Column(name = "doctor_reply", columnDefinition = "TEXT")
    private String doctorReply;
    @Column(name = "pic_path", length = 1000)
    private String picPath; // 多图用逗号分隔
    @Column(name = "evaluation")
    private Integer evaluation; // 1满意 2不满意
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "replied_at")
    private LocalDateTime repliedAt;
    @Column(name = "is_mailed")
    private Boolean isMailed;
}
