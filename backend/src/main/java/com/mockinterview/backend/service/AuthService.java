package com.mockinterview.backend.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.mockinterview.backend.dto.GoogleAuthRequest;
import com.mockinterview.backend.dto.LoginRequest;
import com.mockinterview.backend.dto.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired(required = false)
    private FirebaseAuth firebaseAuth;

    public Map<String, Object> register(RegisterRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (firebaseAuth != null) {
                // Create user in Firebase
                UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest()
                        .setEmail(request.getEmail())
                        .setPassword(request.getPassword())
                        .setDisplayName(request.getName())
                        .setEmailVerified(false);
                
                UserRecord userRecord = firebaseAuth.createUser(createRequest);
                
                // Send email verification
                String verificationLink = firebaseAuth.generateEmailVerificationLink(request.getEmail());
                
                response.put("message", "User registered successfully. Please verify your email.");
                response.put("email", request.getEmail());
                response.put("name", request.getName());
                response.put("verificationLink", verificationLink);
                response.put("firebaseUid", userRecord.getUid());
            } else {
                // Fallback for development without Firebase
                response.put("message", "User registered successfully (development mode)");
                response.put("email", request.getEmail());
                response.put("name", request.getName());
                response.put("note", "Email verification not available in development mode");
            }
        } catch (FirebaseAuthException e) {
            response.put("error", "Registration failed: " + e.getMessage());
        }
        
        return response;
    }

    public Map<String, Object> login(LoginRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (firebaseAuth != null) {
                // For email/password login, we'll need to use Firebase Client SDK on frontend
                // Backend will verify the token
                response.put("message", "Please use Firebase Client SDK for authentication");
                response.put("note", "Backend validates Firebase tokens");
            } else {
                // Fallback for development
                response.put("message", "Login successful (development mode)");
                response.put("token", "dummy-jwt-token");
                response.put("email", request.getEmail());
            }
        } catch (Exception e) {
            response.put("error", "Login failed: " + e.getMessage());
        }
        
        return response;
    }

    public Map<String, Object> googleAuth(GoogleAuthRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (firebaseAuth != null) {
                // Verify the Google ID token
                FirebaseToken decodedToken = firebaseAuth.verifyIdToken(request.getIdToken());
                String uid = decodedToken.getUid();
                String email = decodedToken.getEmail();
                String name = decodedToken.getName();
                boolean emailVerified = decodedToken.isEmailVerified();
                
                // Check if user exists in our database
                // For now, we'll return the Firebase user info
                response.put("message", "Google authentication successful");
                response.put("token", request.getIdToken());
                response.put("email", email);
                response.put("name", name);
                response.put("firebaseUid", uid);
                response.put("emailVerified", emailVerified);
                response.put("authProvider", "GOOGLE");
            } else {
                response.put("error", "Firebase not configured");
            }
        } catch (FirebaseAuthException e) {
            response.put("error", "Google authentication failed: " + e.getMessage());
        }
        
        return response;
    }

    public Map<String, Object> verifyEmail(String email) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (firebaseAuth != null) {
                UserRecord userRecord = firebaseAuth.getUserByEmail(email);
                if (userRecord != null) {
                    response.put("emailVerified", userRecord.isEmailVerified());
                    response.put("message", "Email verification status retrieved");
                } else {
                    response.put("error", "User not found");
                }
            } else {
                response.put("error", "Firebase not configured");
            }
        } catch (FirebaseAuthException e) {
            response.put("error", "Failed to verify email: " + e.getMessage());
        }
        
        return response;
    }
}