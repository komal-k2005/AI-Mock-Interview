package com.mockinterview.backend.repository;

import com.mockinterview.backend.entity.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserRepository {
    // Placeholder implementation - replace with actual database operations when needed
    public Optional<User> findByEmail(String email) {
        return Optional.empty();
    }
    
    public boolean existsByEmail(String email) {
        return false;
    }
    
    public User save(User user) {
        return user;
    }
}