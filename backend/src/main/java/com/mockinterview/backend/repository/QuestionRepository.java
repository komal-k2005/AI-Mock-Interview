package com.mockinterview.backend.repository;

import com.mockinterview.backend.entity.Question;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class QuestionRepository {
    // Placeholder implementation
    public List<Question> findByInterviewId(Long interviewId) {
        return List.of();
    }
    
    public Question save(Question question) {
        return question;
    }
}