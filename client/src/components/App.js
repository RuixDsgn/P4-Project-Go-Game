import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import GamePage from "./GamePage";
import NavBar from "./NavBar";


function App() {
  return <div>
    <NavBar />
    <GamePage />
  </div>
}

export default App;
