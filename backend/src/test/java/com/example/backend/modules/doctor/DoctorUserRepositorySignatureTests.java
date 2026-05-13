package com.example.backend.modules.doctor;

import com.example.backend.modules.doctor.repository.DoctorUserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;

public class DoctorUserRepositorySignatureTests {
    @Test
    void hasFindByDoctorIdMethod() throws Exception {
        Method m = DoctorUserRepository.class.getMethod("findByDoctorId", Long.class);
        Assertions.assertNotNull(m);
    }
}
