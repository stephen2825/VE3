package com.ve3.demo.model;

public class EnrollmentDto {
	private int userId;
    private int eventId;
    
    
    
	public int getVolunteerId() {
		return userId;
	}
	public void setVolunteerId(int volunteerId) {
		this.userId = volunteerId;
	}
	public int getEventId() {
		return eventId;
	}
	public void setEventId(int eventId) {
		this.eventId = eventId;
	}

}
