import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import GamePage from "./GamePage";
import Header from "./Header";
import Hero from "./Hero";
import GamesAll from "./GamesAll";
import OrderPage from "./OrderPage"
import Signup from "./Signup"
import Login from "./Login"
import Cart from "./Cart"
import Home from "./Home"

function App() {
  const [user, setUser] = useState(null);
  const [allGames, setAllGames] = useState([]);
  const [allPlayStationGames, setAllPlayStationGames] = useState([]);
  const [allXboxGames, setAllXboxGames] = useState([]);
  const [allSwitchGames, setAllSwitchGames] = useState([]);
  const [allPCGames, setAllPCGames] = useState([]);
  const [searchGames, setSearchGames] = useState("")
 

  useEffect(() => {
    fetch("/check_session")
    .then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });

    fetch('/games')
    .then(r => r.json())
    .then(allGamesData => {
      setAllGames(allGamesData);
      console.log(allGamesData);
      console.log(allGames)
    });

    fetch('/games/ps5')
      .then(r => r.json())
      .then(ps5GameData => {
        setAllPlayStationGames(ps5GameData)
        console.log(ps5GameData)
        console.log(allPlayStationGames)
      })
    
    fetch('/games/nintendo-switch')
      .then(r => r.json())
      .then(nintendoGameData => {
        setAllSwitchGames(nintendoGameData)
        console.log(nintendoGameData)
        console.log(allSwitchGames)
      })
    
    fetch('/games/xbox')
      .then(r => r.json())
      .then(xboxGameData => {
        setAllXboxGames(xboxGameData)
        console.log(xboxGameData)
        console.log(allXboxGames)
      }) 

    fetch('/games/pc')
      .then(r => r.json())
      .then(pcGameData => {
        setAllPCGames(pcGameData)
        console.log(pcGameData)
        console.log(allPCGames)
      })
  }, []);

  const handleUser = (user) => {
    setUser(user)
  }

  return <div>
    <Header user={user}/>
    <br></br>
    <br></br>
    <Routes>
      <Route path="/orders" element={<OrderPage/>}/>
      <Route path="/all_games" element={<GamesAll games = {allGames}/>}/>
      <Route path="/signin" element={<Login onLogin = {handleUser}/>}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path='/' element = {<Home xbox = {allXboxGames} playstation = {allPlayStationGames} nintendo = {allSwitchGames} pc = {allPCGames}/>}/>
      <Route path='/register' element = {<Signup onRegister ={handleUser}/>}/>
    </Routes>

  </div>
}

export default App;
