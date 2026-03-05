package com.resumeai.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Certification Entity - Stores professional certifications
 */
@Entity
@Table(name = "certifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 200)
    private String issuingOrganization;

    @Column
    private LocalDate issueDate;

    @Column
    private LocalDate expirationDate;

    @Column(length = 100)
    private String credentialId;

    @Column(length = 500)
    private String credentialUrl;

    @Column
    private Boolean doesNotExpire = true;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private Integer displayOrder = 0;
}
