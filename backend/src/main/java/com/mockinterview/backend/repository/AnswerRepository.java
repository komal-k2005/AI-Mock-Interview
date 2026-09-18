package com.mockinterview.backend.repository;

import com.mockinterview.backend.entity.Answer;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AnswerRepository {
    // Placeholder implementation
    public List<Answer> findByQuestionId(Long questionId) {
        return List.of();
    }
    
    public Answer save(Answer answer) {
        return answer;
    }
}