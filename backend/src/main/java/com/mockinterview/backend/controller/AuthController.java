package com.mockinterview.backend.controller;

import com.mockinterview.backend.dto.GoogleAuthRequest;
import com.mockinterview.backend.dto.LoginRequest;
import com.mockinterview.backend.dto.RegisterRequest;
import com.mockinterview.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"${FRONTEND_URL:http://localhost:5173}"})
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleAuth(@RequestBody GoogleAuthRequest request) {
        return ResponseEntity.ok(authService.googleAuth(request));
    }

    @GetMapping("/verify-email/{email}")
    public ResponseEntity<?> verifyEmail(@PathVariable String email) {
        return ResponseEntity.ok(authService.verifyEmail(email));
    }
}