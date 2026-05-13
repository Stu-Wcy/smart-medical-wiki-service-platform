package com.example.backend.modules.user;

import com.example.backend.modules.user.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserPasswordTests {
    @Autowired
    private UserService userService;
    
    @Test
    void complexity() throws Exception {
        var method = UserService.class.getDeclaredMethod("isComplex", String.class);
        method.setAccessible(true);
        Assertions.assertFalse((Boolean) method.invoke(userService, "abc"));
        Assertions.assertFalse((Boolean) method.invoke(userService, "abcdefgh"));
        Assertions.assertFalse((Boolean) method.invoke(userService, "ABCDEFGH"));
        Assertions.assertFalse((Boolean) method.invoke(userService, "Abcdefgh"));
        Assertions.assertTrue((Boolean) method.invoke(userService, "Abcdefg1"));
        Assertions.assertTrue((Boolean) method.invoke(userService, "Aa123456"));
    }
}
