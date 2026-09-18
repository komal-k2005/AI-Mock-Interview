package com.mockinterview.backend.controller;

import com.mockinterview.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = {"*"})
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/{id}/answer")
    public ResponseEntity<?> submitAnswer(@PathVariable String id, @RequestBody AnswerRequest request) {
        return ResponseEntity.ok(questionService.submitAnswer(id, request));
    }
}
