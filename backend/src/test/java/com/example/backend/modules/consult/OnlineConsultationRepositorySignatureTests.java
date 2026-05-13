package com.example.backend.modules.consult;

import com.example.backend.modules.consult.repository.OnlineConsultationRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.util.List;

public class OnlineConsultationRepositorySignatureTests {
    @Test
    void hasFindByPatientIdInMethod() throws Exception {
        Method m = OnlineConsultationRepository.class.getMethod("findByPatientIdInOrderByCreatedAtDesc", List.class);
        Assertions.assertNotNull(m);
    }
}
