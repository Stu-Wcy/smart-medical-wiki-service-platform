package com.example.backend.modules.user.task;

import com.example.backend.modules.user.entity.User;
import com.example.backend.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class UserOnlineScheduler {
    private final UserRepository userRepository;
    
    @Scheduled(fixedRate = 5 * 60 * 1000)
    public void markInactiveUsersOffline() {
        LocalDateTime threshold = LocalDateTime.now().minusMinutes(15);
        List<User> users = userRepository.findAll();
        for (User u : users) {
            if (Boolean.TRUE.equals(u.getIsOnline())) {
                if (u.getLastActiveAt() == null || u.getLastActiveAt().isBefore(threshold)) {
                    u.setIsOnline(false);
                }
            }
        }
        userRepository.saveAll(users);
    }
}
