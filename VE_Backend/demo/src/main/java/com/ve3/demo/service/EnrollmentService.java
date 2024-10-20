package com.ve3.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ve3.demo.dao.EnrollmentDao;
import com.ve3.demo.model.Enrollments;
import com.ve3.demo.model.Events;
import com.ve3.demo.model.User;

@Service
public class EnrollmentService {
	
	@Autowired
	private EnrollmentDao enrollmentRepository;
	
	@Autowired
    private UserServiceImpl userService;
	
	@Autowired
    private EventService eventService;

    public void registerForEvent(int userId, int eventId) {
    	User user = userService.getById(userId);
        Events event = eventService.getEventById(eventId);

     // Check if user is already registered for the event
        Optional<Enrollments> existingEnrollment = enrollmentRepository.findByEventIdAndUserId(eventId, userId);
        if (existingEnrollment.isPresent()) {
            throw new IllegalStateException("User is already registered for this event");
        }

        Enrollments enrollment = new Enrollments();
        enrollment.setUser(user);
        enrollment.setEvent(event);

        // Save the enrollment to the database
        // You need to implement the save method in your EnrollmentRepository
        enrollmentRepository.save(enrollment);
    }
    
    
    public void removeEnrollment(int eventId, int userId) {
    	enrollmentRepository.deleteByEventIdAndUserId(eventId, userId);
    }
    

}
