package com.example.backend.modules.doctor;

import com.example.backend.modules.doctor.entity.DoctorUser;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class DoctorUserGetterTests {
    @Test
    void userIdGetterWorks() {
        DoctorUser du = new DoctorUser();
        du.setUserId(123L);
        Assertions.assertEquals(123L, du.getUserId());
    }
}
