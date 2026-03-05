package com.resumeai.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for resume response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeResponse {

    private Long id;
    private String title;
    private String templateName;
    private String summary;
    private Integer atsScore;
    private Boolean isPublic;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
