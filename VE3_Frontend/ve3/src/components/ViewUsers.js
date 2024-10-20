import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/listOfUser');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Registered Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.userId}>
            {user.userName} - {user.userEmail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewUsers;
