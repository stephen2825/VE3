
import React, { useState } from 'react';
import { registerForEvent } from '../Services/AdminApiService';

const RegisterEvent = () => {
  const [userId, setUserId] = useState('');
  const [eventId, setEventId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const enrollmentDTO = { volunteerId: userId, eventId };
    
    try {
      const response = await registerForEvent(enrollmentDTO);
      setMessage(response);
      setError('');
    } catch (error) {
      setError('Failed to register for the event.');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Register for Event</h2>
      <form onSubmit={handleRegister}>
        <input type="number" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        <input type="number" placeholder="Event ID" value={eventId} onChange={(e) => setEventId(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterEvent;
