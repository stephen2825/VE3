package com.ve3.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import com.ve3.demo.model.EnrollmentDto;
import com.ve3.demo.model.Events;
import com.ve3.demo.service.EnrollmentService;
import com.ve3.demo.service.EventService;

import java.util.List;

@RestController
@CrossOrigin
public class EventController {
	@Autowired
	private EventService eventService;

	@Autowired
	private EnrollmentService enrollmentService;

	@GetMapping("/events")
	public List<Events> fetchAll() {
		List<Events> list = eventService.getEvents();
		return list;
	}

	@PostMapping("/register-event")
	public ResponseEntity<String> registerForEvent(@RequestBody EnrollmentDto enrollmentDTO) {
		try {
			enrollmentService.registerForEvent(enrollmentDTO.getVolunteerId(), enrollmentDTO.getEventId());
			return ResponseEntity.ok("User registered for the event successfully.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error registering for the event: " + e.getMessage());
		}
	}

	@PostMapping("/create-event")
	public ResponseEntity<String> createEvent(@RequestBody Events event) {
		try {
			eventService.createEvent(event);
			return ResponseEntity.ok("Event Created successfully.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error creating the event: " + e.getMessage());
		}
	}

	@GetMapping("/show-events/{id}")
	public List<Events> fetchbyId(@PathVariable int id) {
		List<Events> list = eventService.findEvents(id);
		return list;
	}

	// Update event method
	@PutMapping("/update-event/{eventId}")
	public ResponseEntity<String> updateEvent(@PathVariable("eventId") int eventId, @RequestBody Events updatedEvent) {
		try {
			Events existingEvent = eventService.getEventById(eventId);
			if (existingEvent != null) {
				// Update event details with the new data
				existingEvent.setName(updatedEvent.getName());
				existingEvent.setDescription(updatedEvent.getDescription());
				existingEvent.setDatetime(updatedEvent.getDatetime());
				existingEvent.setLocation(updatedEvent.getLocation());
				existingEvent.setImage(updatedEvent.getImage());

				// Save the updated event
				eventService.updateEvent(existingEvent);
				return ResponseEntity.ok("Event updated successfully.");
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found.");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error updating the event: " + e.getMessage());
		}
	}

	@DeleteMapping("withdraw-events/{eventId}/{userId}")
	public ResponseEntity<String> deleteEventUser(@PathVariable("eventId") int eventId,
			@PathVariable("userId") int userId) {
		enrollmentService.removeEnrollment(eventId, userId);
		return ResponseEntity.ok("Records deleted successfully");
	}

	@DeleteMapping("delete-events/{eventId}")
	public ResponseEntity<String> deleteEvent(@PathVariable("eventId") int eventId) {
		eventService.deleteEventById(eventId);
		return ResponseEntity.ok("Records deleted successfully");
	}

}
