import React, { useEffect, useState } from 'react';
import { fetchAllEvents, deleteEvent } from '../Services/AdminApiService';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchAllEvents();
        setEvents(data);
      } catch (error) {
        setError('Failed to fetch events.');
      }
    };
    loadEvents();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter(event => event.id !== id)); 
    } catch (error) {
      setError('Failed to delete event.');
    }
  };

  
  const handleEdit = (id) => {
    navigate(`/edit-event/${id}`); 
  };

  return (
    <div>
      <h2>Event List</h2>
      {error && <p>{error}</p>}
      <ul>
        {events.map(event => (
          <li key={event.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {new Date(event.datetime).toLocaleString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            
            <div>
              <button onClick={() => handleEdit(event.id)} style={{ marginRight: '10px' }}>Edit</button>
              <button onClick={() => handleDelete(event.id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
