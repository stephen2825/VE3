package com.ve3.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.ve3.demo.dao.EventDao;
import com.ve3.demo.model.Events;

@Service
public class EventService {
	
	@Autowired
	private EventDao eventRepository;
	
	
	public List<Events> getEvents(){
		return eventRepository.findAll();
	}
	
	public Events getEventById(int id) {
		return eventRepository.findById(id).get();
	}
	
	public List<Events> findEvents(int id){
    	List<Events> list = eventRepository.findEventById(id);
    	return list;
    }

	public void createEvent(Events event) {
		// TODO Auto-generated method stub
		eventRepository.save(event);
		
	}
	
	public void deleteEventById(int id) {
        Optional<Events> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isPresent()) {
            Events event= optionalEvent.get();
            eventRepository.delete(event);
        } else {
            throw new IllegalArgumentException("Event with ID " + id + " not found");
        }
    }
	
	// Update an existing event
    public void updateEvent(Events updatedEvent) {
        Optional<Events> optionalEvent = eventRepository.findById(updatedEvent.getId());
        if (optionalEvent.isPresent()) {
            Events existingEvent = optionalEvent.get();
            existingEvent.setName(updatedEvent.getName());
            existingEvent.setDescription(updatedEvent.getDescription());
            existingEvent.setDatetime(updatedEvent.getDatetime());
            existingEvent.setLocation(updatedEvent.getLocation());
            existingEvent.setImage(updatedEvent.getImage());
            
            // Save the updated event
            eventRepository.save(existingEvent);
        } else {
            throw new IllegalArgumentException("Event with ID " + updatedEvent.getId() + " not found");
        }
    }

}
