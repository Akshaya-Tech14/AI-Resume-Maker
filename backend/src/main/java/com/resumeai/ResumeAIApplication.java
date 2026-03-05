package com.resumeai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Main Application Class for ResumeAI Pro Backend
 * 
 * @author ResumeAI Team
 * @version 1.0.0
 */
@SpringBootApplication
@EnableJpaAuditing
public class ResumeAIApplication {

    public static void main(String[] args) {
        SpringApplication.run(ResumeAIApplication.class, args);
        System.out.println("===========================================");
        System.out.println("  ResumeAI Pro Backend Started Successfully");
        System.out.println("  Server running on: http://localhost:8080");
        System.out.println("===========================================");
    }
}
