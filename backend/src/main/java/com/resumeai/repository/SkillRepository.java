package com.resumeai.repository;

import com.resumeai.model.Resume;
import com.resumeai.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Skill entity
 */
@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    /**
     * Find all skills by resume
     */
    List<Skill> findByResumeOrderByDisplayOrderAsc(Resume resume);

    /**
     * Find skills by resume ID
     */
    List<Skill> findByResumeIdOrderByDisplayOrderAsc(Long resumeId);

    /**
     * Find skills by category
     */
    List<Skill> findByResumeAndCategory(Resume resume, Skill.SkillCategory category);

    /**
     * Delete all skills by resume
     */
    void deleteByResume(Resume resume);
}
