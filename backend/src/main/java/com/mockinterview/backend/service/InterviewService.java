package com.mockinterview.backend.service;

import com.mockinterview.backend.dto.InterviewRequest;
import com.mockinterview.backend.entity.Interview;
import com.mockinterview.backend.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InterviewService {

    @Autowired
    private InterviewAIService interviewAIService;

    private List<Interview> interviews = new ArrayList<>();
    private List<Question> questions = new ArrayList<>();
    private Long interviewIdCounter = 1L;
    private Long questionIdCounter = 1L;

    public List<Interview> getAllInterviews() {
        return interviews;
    }

    public Interview createInterview(InterviewRequest request) {
        Interview interview = new Interview();
        interview.setId(interviewIdCounter++);
        interview.setTargetRole(request.getTargetRole());
        interview.setInterviewType(request.getInterviewType());
        interview.setDifficulty(request.getDifficulty());
        interview.setNumberOfQuestions(request.getNumberOfQuestions());
        interview.setStatus("CREATED");
        interview.setOverallScore(0);
        interview.setTechnicalScore(0);
        interview.setCommunicationScore(0);
        
        interviews.add(interview);
        
        // Generate questions using AI service
        List<Question> generatedQuestions = interviewAIService.generateQuestions(
            request.getTargetRole(),
            request.getInterviewType(),
            request.getDifficulty(),
            request.getNumberOfQuestions()
        );
        
        // Add generated questions to the interview
        for (Question question : generatedQuestions) {
            question.setId(questionIdCounter++);
            question.setInterview(interview);
            questions.add(question);
        }
        
        return interview;
    }

    public Interview getInterviewById(Long id) {
        return interviews.stream()
                .filter(i -> i.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public Map<String, Object> getInterviewQuestions(Long id) {
        Map<String, Object> response = new HashMap<>();
        List<Question> interviewQuestions = questions.stream()
                .filter(q -> q.getInterview().getId().equals(id))
                .toList();
        response.put("interviewId", id);
        response.put("questions", interviewQuestions);
        response.put("aiEnabled", interviewAIService.isAIEnabled());
        return response;
    }
}