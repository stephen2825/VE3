package com.ve3.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ve3.demo.model.Events;

import java.util.List;

@Repository
public interface EventDao extends JpaRepository<Events, Integer>{
	
	@Query(value = "SELECT e.* FROM tbl_events e " +
            "JOIN tbl_enrollments en ON e.id = en.event_id " +
            "WHERE en.user_id = :userId", nativeQuery = true)
	List<Events> findAllByVolunteerId(int userId);

	List<Events> findEventById(int id);

}
