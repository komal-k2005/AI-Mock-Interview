package com.mockinterview.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    private Long id;
    
    private Interview interview;
    
    private String questionText;
    
    private String category;
    
    private Integer questionNumber;
    
    private String difficulty;
}