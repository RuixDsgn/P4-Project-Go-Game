import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ onRegister }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState ("");
    const navigate = useNavigate();
    
    function handleSubmit(e) {
      e.preventDefault();
      // console.log(username)
      // console.log(password)
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          "username": username, 
          "password": password 
        }),
      })
        .then((r) => r.json())
        .then((user) => {
          if(!user.errors){
            onRegister(user)
            navigate("/")
          }
          else{
            console.log("registration failed")
          }
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