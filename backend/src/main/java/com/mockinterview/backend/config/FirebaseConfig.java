package com.mockinterview.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @Value("${firebase.config.file}")
    private String firebaseConfigPath;

    private static boolean firebaseInitialized = false;

    @PostConstruct
    public void initializeFirebase() {
        try {
            // Try to load from classpath first
            ClassPathResource resource = new ClassPathResource(firebaseConfigPath);
            GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(credentials)
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                firebaseInitialized = true;
            } else {
                firebaseInitialized = true;
            }
        } catch (IOException e) {
            // For development, we'll continue without Firebase
            firebaseInitialized = false;
        }
    }

    @Bean
    public FirebaseAuth firebaseAuth() {
        if (firebaseInitialized && !FirebaseApp.getApps().isEmpty()) {
            return FirebaseAuth.getInstance();
        }
        return null;
    }
}