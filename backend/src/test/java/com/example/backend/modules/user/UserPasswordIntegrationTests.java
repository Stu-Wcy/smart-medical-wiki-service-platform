package com.example.backend.modules.user;

import com.example.backend.modules.user.dto.RegisterDTO;
import com.example.backend.modules.user.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserPasswordIntegrationTests {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void registerThenLogin() throws Exception {
        if (!userRepository.existsByUsername("test_user_1")) {
            RegisterDTO dto = new RegisterDTO();
            dto.setUsername("test_user_1");
            dto.setPassword("Abcdefg1");
            dto.setConfirmPassword("Abcdefg1");
            mockMvc.perform(post("/api/auth/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"username\":\"test_user_1\",\"password\":\"Abcdefg1\",\"confirmPassword\":\"Abcdefg1\"}"))
                .andExpect(status().isOk());
        }
        Assertions.assertTrue(userRepository.existsByUsername("test_user_1"));
    }
}
