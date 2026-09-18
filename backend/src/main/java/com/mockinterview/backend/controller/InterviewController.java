package com.mockinterview.backend.controller;

import com.mockinterview.backend.dto.InterviewRequest;
import com.mockinterview.backend.entity.Interview;
import com.mockinterview.backend.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = {"${FRONTEND_URL:http://localhost:5173}"})
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    @GetMapping
    public ResponseEntity<List<Interview>> getAllInterviews() {
        return ResponseEntity.ok(interviewService.getAllInterviews());
    }

    @PostMapping
    public ResponseEntity<Interview> createInterview(@RequestBody InterviewRequest request) {
        return ResponseEntity.ok(interviewService.createInterview(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Interview> getInterviewById(@PathVariable Long id) {
        return ResponseEntity.ok(interviewService.getInterviewById(id));
    }

    @GetMapping("/{id}/questions")
    public ResponseEntity<?> getInterviewQuestions(@PathVariable Long id) {
        return ResponseEntity.ok(interviewService.getInterviewQuestions(id));
    }
}