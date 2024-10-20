import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  if (!user) {
    navigate('/login');
  }

  return (
    <div>
      <h2>Welcome, {user.userName}</h2>
      <button onClick={() => navigate('/events')}>View Events</button>
      <button onClick={() => navigate('/register-event')}>Register for Event</button>
    </div>
  );
};

export default UserDashboard;
