package com.example.backend.modules.consult;

import com.example.backend.modules.consult.dto.ConsultationReplyDTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class ConsultationReplyDtoTests {
    @Test
    void notifyGetterWorks() {
        ConsultationReplyDTO dto = new ConsultationReplyDTO();
        dto.setNotifyByEmail(true);
        Assertions.assertTrue(Boolean.TRUE.equals(dto.getNotifyByEmail()));
    }
}
