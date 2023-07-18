import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import GamePage from "./GamePage";
import Header from "./Header";
import Hero from "./Hero";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  return <div>
    <Header />
    <br></br>
    <br></br>
    <Hero />
    <GamePage />
  </div>
}

export default App;
