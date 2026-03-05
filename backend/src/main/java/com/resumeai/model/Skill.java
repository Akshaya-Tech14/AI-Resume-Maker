package com.resumeai.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Skill Entity - Stores skills with proficiency levels
 */
@Entity
@Table(name = "skills")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SkillLevel level = SkillLevel.INTERMEDIATE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SkillCategory category = SkillCategory.TECHNICAL;

    @Column
    private Integer yearsOfExperience = 0;

    @Column
    private Integer displayOrder = 0;

    public enum SkillLevel {
        BEGINNER,
        INTERMEDIATE,
        ADVANCED,
        EXPERT
    }

    public enum SkillCategory {
        TECHNICAL,
        SOFT,
        LANGUAGE,
        TOOLS,
        OTHER
    }
}
