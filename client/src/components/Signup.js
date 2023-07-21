import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ onRegister }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState ("");
    const navigate = useNavigate();
    
    function handleSubmit(e) {
      e.preventDefault();
  
      fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Registration failed');
        }
      })
      .then((data) => {
        // Registration successful, set user state and navigate to home
        onRegister(data);
        navigate('/');
      })
      .catch((error) => {
        // Registration failed, clear user state (optional) and display error message
        onRegister(null);
        console.error('Error during registration:', error);
        alert(error)
      });
  }
  
    return (
      <div>
        <h3>Sign up</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="text"
          value={password}
          placeholder="password"
          onChange= {(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <h4>Already a user? Sign in here!</h4>
      <Link to ="/signin">Sign in</Link>
      </div>
    );
  }

export default Signup