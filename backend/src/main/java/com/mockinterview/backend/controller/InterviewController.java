package com.mockinterview.backend.controller;

import com.mockinterview.backend.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = {"*"})
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    @GetMapping
    public ResponseEntity<?> getAllInterviews() {
        return ResponseEntity.ok(interviewService.getAllInterviews());
    }

    @PostMapping
    public ResponseEntity<?> createInterview(@RequestBody InterviewRequest request) {
        return ResponseEntity.ok(interviewService.createInterview(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInterviewById(@PathVariable String id) {
        return ResponseEntity.ok(interviewService.getInterviewById(id));
    }

    @GetMapping("/{id}/questions")
    public ResponseEntity<?> getInterviewQuestions(@PathVariable String id) {
        return ResponseEntity.ok(interviewService.getInterviewQuestions(id));
    }
}
