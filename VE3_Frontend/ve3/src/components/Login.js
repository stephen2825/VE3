import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsAuthenticated, setUserRole }) => {  // Accept props for authentication and role
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8083/login", {
                userEmail: email,
                userPassword: password,
            });

            const message = response.data;

            if (message === "Admin login successful") {
                setIsAuthenticated(true);  // Update authentication status
                setUserRole('admin'); 
                navigate("/"); 
            } else if (message === "User login successful") {
                setIsAuthenticated(true);  // Update authentication status
                setUserRole('user');  
                navigate("/"); 
            } else {
                setErrorMessage("Invalid credentials. Please try again.");
            }

        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
};

export default Login;
