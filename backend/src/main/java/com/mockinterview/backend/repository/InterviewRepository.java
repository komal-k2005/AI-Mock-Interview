package com.mockinterview.backend.repository;

import com.mockinterview.backend.entity.Interview;
import com.mockinterview.backend.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class InterviewRepository {
    // Placeholder implementation
    public List<Interview> findByUser(User user) {
        return List.of();
    }
    
    public List<Interview> findByUserId(Long userId) {
        return List.of();
    }
    
    public Interview save(Interview interview) {
        return interview;
    }
}