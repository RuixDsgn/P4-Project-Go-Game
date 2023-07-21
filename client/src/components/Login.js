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
      <div style={{textAlign: 'center'}}>
        <img src="https://camo.githubusercontent.com/558a9e1af3cdb7fe71bc706ee9c6fe7c662097fc3fd95a910880092bd8b71957/68747470733a2f2f696d6775722e636f6d2f50323271655a4d2e676966" alt="pacman-loading" />
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br></br>
        <br></br>
        <input
          type="text"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        <button type="submit">Login</button>
      </form>
      <h4>Not a user? Sign up <Link to ="/register">here!</Link></h4>
      </div>

    );
  }

export default Login