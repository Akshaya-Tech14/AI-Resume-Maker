package com.resumeai.repository;

import com.resumeai.model.Education;
import com.resumeai.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Education entity
 */
@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {

    /**
     * Find all education entries by resume
     */
    List<Education> findByResumeOrderByDisplayOrderAsc(Resume resume);

    /**
     * Find education entries by resume ID
     */
    List<Education> findByResumeIdOrderByDisplayOrderAsc(Long resumeId);

    /**
     * Delete all education entries by resume
     */
    void deleteByResume(Resume resume);
}
