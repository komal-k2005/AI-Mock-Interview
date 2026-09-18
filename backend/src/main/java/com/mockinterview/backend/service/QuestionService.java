package com.mockinterview.backend.service;

import com.mockinterview.backend.dto.AnswerRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class QuestionService {

    @Autowired
    private InterviewAIService interviewAIService;

    public Map<String, Object> submitAnswer(Long questionId, AnswerRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        // For now, use a placeholder question text
        // In real implementation, this would come from the actual question data
        String questionText = "Describe your experience with the key technologies and skills required for this position.";
        
        // Use AI to evaluate the answer
        InterviewAIService.AnswerEvaluation evaluation = interviewAIService.evaluateAnswer(
            questionText,
            request.getAnswerText()
        );
        
        response.put("questionId", questionId);
        response.put("answerText", request.getAnswerText());
        response.put("score", evaluation.getScore());
        response.put("feedback", evaluation.getFeedback());
        response.put("assessment", evaluation.getAssessment());
        response.put("message", "Answer submitted successfully");
        response.put("aiEnabled", interviewAIService.isAIEnabled());
        
        return response;
    }
}