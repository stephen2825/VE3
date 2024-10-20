import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import NavigationBar from './components/NavigationBar'; 
import Registration from './components/Registeration';

import UserDashboard from './components/UserDashboard';
import CreateEvent from './components/CreateEvent';
import ViewUsers from './components/ViewUsers';
import Home from './components/Home';
import EditEvent from './components/EditEvent';
import EventList from './components/EventList';
import RegisterEvent from './components/RegisterEvent';
import { useState } from 'react'; 

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');  // Track the role of the user

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false); 
    setIsRegistered(false);    
    setUserRole('');           
  };

  return (
    <Router>
      <NavigationBar
        isAuthenticated={isAuthenticated}
        isRegistered={isRegistered}
        userRole={userRole}       
        onLogout={handleLogout}   
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} /> 
        <Route path="/register" element={<Registration setIsRegistered={setIsRegistered} />} />
        <Route path="/edit-event/:eventId" element={<EditEvent />} />
        <Route path="/edit-event/:eventId" component={EditEvent} />

        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/view-users" element={<ViewUsers />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/register-event" element={<RegisterEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
