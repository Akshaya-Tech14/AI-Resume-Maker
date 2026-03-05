package com.resumeai.repository;

import com.resumeai.model.Experience;
import com.resumeai.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Experience entity
 */
@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {

    /**
     * Find all experience entries by resume
     */
    List<Experience> findByResumeOrderByDisplayOrderAsc(Resume resume);

    /**
     * Find experience entries by resume ID
     */
    List<Experience> findByResumeIdOrderByDisplayOrderAsc(Long resumeId);

    /**
     * Delete all experience entries by resume
     */
    void deleteByResume(Resume resume);
}
