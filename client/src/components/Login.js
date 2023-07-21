import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    function handleSubmit(e) {
      e.preventDefault();

      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.message) {
            // Login successful, set user state and navigate to home
            onLogin(data);
            navigate('/');
          } else {
            // Login failed, display error message (optional)
            console.log('Login failed:', data.message);
            alert('Login failed');
          }
        })
        .catch((error) => {
          // Handle fetch or other errors (optional)
          console.error('Error during login:', error);
        });
    }
  
    return (
      <div>
                <h3>Login</h3>
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
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <h4>Not a user? Sign up here!</h4>
      <Link to ="/register">Register</Link>
      </div>

    );
  }

export default Login