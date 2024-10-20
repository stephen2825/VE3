import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEventsById, updateEvent } from '../Services/AdminApiService'; 

function EditEvent() {
  const { eventId } = useParams(); 
  console.log('Event ID:', eventId);  
  
  const [event, setEvent] = useState({
    name: '',
    description: '',
    datetime: '',
    location: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);  // To handle loading state
  const history = useNavigate();

  // Fetch the event details on component load
  useEffect(() => {
    const loadEvent = async () => {
      try {
        console.log(`Fetching event with ID: ${eventId}`);  
        const eventData = await fetchEventsById(eventId);
        console.log('Fetched event data:', eventData);  
        
        // Set event data if it exists
        if (eventData) {
          setEvent({
            name: eventData.name || '',
            description: eventData.description || '',
            datetime: eventData.datetime || '',
            location: eventData.location || '',
            image: eventData.image || ''
          });
        }
        setLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        console.error("Error fetching event details:", error);
        setLoading(false);
      }
    };
    loadEvent();
  }, [eventId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(eventId, event);
      alert("Event updated successfully!");
      history("/events/list"); 
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update the event.");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value
    }));
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={event.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date and Time:</label>
          <input
            type="datetime-local"
            name="datetime"
            value={event.datetime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
}

export default EditEvent;
