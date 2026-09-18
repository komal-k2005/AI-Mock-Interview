package com.mockinterview.backend.dto;

import lombok.Data;

@Data
public class InterviewRequest {
    private String targetRole;
    private String interviewType;
    private String difficulty;
    private Integer numberOfQuestions;
}