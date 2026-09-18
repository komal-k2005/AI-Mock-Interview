package com.mockinterview.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evaluation {
    private Long id;
    
    private Interview interview;
    
    private Integer overallScore;
    
    private Integer technicalScore;
    
    private Integer communicationScore;
    
    private String feedback;
    
    private String areasToImprove;
}