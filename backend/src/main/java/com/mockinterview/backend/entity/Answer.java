package com.mockinterview.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Answer {
    private Long id;
    
    private Question question;
    
    private String answerText;
    
    private Integer score = 0;
    
    private String feedback;
}