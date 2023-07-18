import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import GamePage from "./GamePage";
import Header from "./Header";
import NavBar from "./NavBar";
import SearchGame from "./SearchGame";

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
    <NavBar />
    <SearchGame />
    <GamePage />
  </div>
}

export default App;
