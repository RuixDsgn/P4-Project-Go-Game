import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import GamePage from "./GamePage";
import Header from "./Header";
import NavBar from "./NavBar";
import SearchGame from "./SearchGame";


function App() {
  return <div>
    <Header />
    <NavBar />
    <SearchGame />
    <GamePage />
  </div>
}

export default App;
