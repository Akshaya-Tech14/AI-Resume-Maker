package com.resumeai.repository;

import com.resumeai.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for User entity
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by email
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if email exists
     */
    Boolean existsByEmail(String email);

    /**
     * Find active users
     */
    Optional<User> findByEmailAndActiveTrue(String email);
}
