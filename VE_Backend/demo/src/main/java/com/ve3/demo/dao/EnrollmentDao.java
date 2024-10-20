package com.ve3.demo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ve3.demo.model.Enrollments;

import jakarta.transaction.Transactional;

@Repository
public interface EnrollmentDao extends JpaRepository<Enrollments, Integer> {

    @Transactional
    @Modifying
    @Query(value = "delete from tbl_enrollments where event_id = ?1 AND user_id = ?2", nativeQuery = true)
    public void deleteByEventIdAndUserId(int eventId, int userId);

    @Query(value = "SELECT * FROM tbl_enrollments e WHERE e.event_id = :eventId AND e.user_id = :userId", nativeQuery = true)
    Optional<Enrollments> findByEventIdAndUserId(int eventId, int userId);
}
