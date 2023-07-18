import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import GamePage from "./GamePage";
import Header from "./Header";
import Hero from "./Hero";


function App() {
  return <div>
    <Header />
    <br></br>
    <br></br>
    <Hero />
    <GamePage />
  </div>
}

export default App;
