import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const admin = location.state?.admin;

  if (!admin) {
    navigate('/login');
  }

  return (
    <div>
      <h2>Welcome, Admin {admin.adminName}</h2>
      <button onClick={() => navigate('/create-event')}>Create Event</button>
      <button onClick={() => navigate('/view-users')}>View Users</button>
    </div>
  );
};

export default AdminDashboard;
