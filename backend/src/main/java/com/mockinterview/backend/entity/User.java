package com.mockinterview.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    
    private String email;
    
    private String password;
    
    private String name;
    
    private String role = "USER";
    
    private String firebaseUid;
    
    private Boolean emailVerified = false;
    
    private String authProvider = "LOCAL"; // LOCAL, GOOGLE
}