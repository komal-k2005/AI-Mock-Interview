package com.mockinterview.backend.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    public Map<String, Object> getDashboardData() {
        Map<String, Object> response = new HashMap<>();
        response.put("totalInterviews", 5);
        response.put("completedInterviews", 3);
        response.put("averageScore", 78);
        
        List<Map<String, Object>> recentInterviews = new ArrayList<>();
        Map<String, Object> interview1 = new HashMap<>();
        interview1.put("id", 1);
        interview1.put("role", "Java Developer");
        interview1.put("date", "2026-09-17");
        interview1.put("score", 85);
        recentInterviews.add(interview1);
        
        Map<String, Object> interview2 = new HashMap<>();
        interview2.put("id", 2);
        interview2.put("role", "Frontend Developer");
        interview2.put("date", "2026-09-16");
        interview2.put("score", 72);
        recentInterviews.add(interview2);
        
        Map<String, Object> interview3 = new HashMap<>();
        interview3.put("id", 3);
        interview3.put("role", "Full Stack Developer");
        interview3.put("date", "2026-09-15");
        interview3.put("score", 79);
        recentInterviews.add(interview3);
        
        response.put("recentInterviews", recentInterviews);
        return response;
    }
}