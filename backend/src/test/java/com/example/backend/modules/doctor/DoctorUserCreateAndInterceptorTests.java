package com.example.backend.modules.doctor;

import com.example.backend.modules.doctor.entity.Doctor;
import com.example.backend.modules.doctor.repository.DoctorRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class DoctorUserCreateAndInterceptorTests {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Test
    void adminCreateDoctorUserRequiresAdmin() throws Exception {
        mockMvc.perform(post("/api/admin/doctor-users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"doc_user1\",\"password\":\"Abcdefg1\",\"doctorId\":1}"))
            .andExpect(status().isForbidden());
    }
    
    @Test
    void doctorStatusFieldExists() {
        Doctor d = new Doctor();
        d.setStatus(0);
        Assertions.assertEquals(0, d.getStatus());
    }
}
