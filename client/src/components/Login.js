import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    function handleSubmit(e) {
      e.preventDefault();
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          username: username,
          password: password 
      }),
      })
        .then((r) => r.json())
        .then((user) => {
          onLogin(user)
          navigate("/")
        });
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={password}
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