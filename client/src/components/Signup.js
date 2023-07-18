import React, {useState} from 'react'

const Signup = ({ onRegister }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState ("");
    
    function handleSubmit(e) {
      e.preventDefault();
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      })
        .then((r) => r.json())
        .then((user) => onRegister(user));
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="text"
          value={password}
          onChange= {(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    );
  }

export default Signup