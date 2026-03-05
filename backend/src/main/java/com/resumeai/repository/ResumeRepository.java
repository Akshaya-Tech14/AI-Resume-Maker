package com.resumeai.repository;

import com.resumeai.model.Resume;
import com.resumeai.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Resume entity
 */
@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {

    /**
     * Find all resumes by user
     */
    List<Resume> findByUserOrderByUpdatedAtDesc(User user);

    /**
     * Find resumes by user ID
     */
    List<Resume> findByUserIdOrderByUpdatedAtDesc(Long userId);

    /**
     * Find resume by ID and user
     */
    Optional<Resume> findByIdAndUser(Long id, User user);

    /**
     * Find public resumes
     */
    List<Resume> findByIsPublicTrue();

    /**
     * Count resumes by user
     */
    Long countByUser(User user);

    /**
     * Find resumes by status
     */
    List<Resume> findByUserAndStatus(User user, Resume.ResumeStatus status);

    /**
     * Search resumes by title
     */
    @Query("SELECT r FROM Resume r WHERE r.user = ?1 AND LOWER(r.title) LIKE LOWER(CONCAT('%', ?2, '%'))")
    List<Resume> searchByTitle(User user, String keyword);
}
