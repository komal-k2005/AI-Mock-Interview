package com.mockinterview.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Interview {
    private Long id;
    
    private User user;
    
    private String targetRole;
    
    private String interviewType;
    
    private String difficulty;
    
    private Integer numberOfQuestions;
    
    private String status = "CREATED";
    
    private Integer overallScore = 0;
    
    private Integer technicalScore = 0;
    
    private Integer communicationScore = 0;
    
    private String feedback;
    
    private String areasToImprove;
}