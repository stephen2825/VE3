// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8083'; 

// Login function
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { userEmail: email, userPassword: password });
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Rethrow the error for handling in the component
  }
};

// Fetch all events function
export const fetchAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

// Register for event function
export const registerForEvent = async (enrollmentDTO) => {
  try {
    const response = await axios.post(`${API_URL}/register-event`, enrollmentDTO);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

// Create event function
export const createEvent = async (event) => {
  try {
    const response = await axios.post(`${API_URL}/create-event`, event);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

// Fetch events by ID function
export const fetchEventsById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/show-events/${id}`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

// Delete enrollment function
export const deleteEnrollment = async (eventId, userId) => {
  try {
    const response = await axios.delete(`${API_URL}/withdraw-events/${eventId}/${userId}`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

// Delete event function
export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-events/${eventId}`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const updateEvent = async (eventId, updatedEvent) => {
  try {
    const response = await axios.put(`${API_URL}/update-event/${eventId}`, updatedEvent);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};