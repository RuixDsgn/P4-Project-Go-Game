import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import GamesAll from "./GamesAll";
import OrderPage from "./OrderPage"
import Signup from "./Signup"
import Login from "./Login"
import Cart from "./Cart"
import Home from "./Home"
import SearchResults from "./SearchResults"
import GameProduct from "./GameProductPage";
import Profile from "./Profile";
import NewReview from "./NewReview";
import Wishlist from "./Wishlist"
import ReviewPage from "./ReviewPage"

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
      // console.log(allGamesData);
      // console.log(allGames)
    });

    fetch('/games/ps5')
      .then(r => r.json())
      .then(ps5GameData => {
        setAllPlayStationGames(ps5GameData)
        // console.log(ps5GameData)
        // console.log(allPlayStationGames)
      })
    
    fetch('/games/nintendo_switch')
      .then(r => r.json())
      .then(nintendoGameData => {
        setAllSwitchGames(nintendoGameData)
        // console.log(nintendoGameData)
        // console.log(allSwitchGames)
      })
    
    fetch('/games/xbox')
      .then(r => r.json())
      .then(xboxGameData => {
        setAllXboxGames(xboxGameData)
        // console.log(xboxGameData)
        // console.log(allXboxGames)
      }) 

    fetch('/games/pc')
      .then(r => r.json())
      .then(pcGameData => {
        setAllPCGames(pcGameData)
        // console.log(pcGameData)
        // console.log(allPCGames)
      })
  }, []);

  const handleUser = (user) => {
    setUser(user)
  }


  return <div>
    <Header user = {user} games={allGames} searchGames={searchGames} setSearchGames={setSearchGames}/>
    <br></br>
    <br></br>
    <Routes>
      <Route path="/orders" element={<OrderPage user={user}/>}/>
      <Route path="/all_games" element={<GamesAll games = {allGames}/>}/>
      <Route path="/signin" element={<Login onLogin = {handleUser}/>}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path='/register' element = {<Signup onRegister ={handleUser}/>}/>
      <Route path='/search' element = {<SearchResults results = {searchGames}/>}/>
      <Route path='/product/:id' element = {<GameProduct  />}/>
      <Route path='/profile' element = {<Profile user = {user}/>}/>
      <Route path="/reviews/new/:id" element = {<NewReview user = {user}/>}/>
      <Route path="/reviews/:id" element = {<ReviewPage user = {user}/>}/>
      <Route path="/wishlist/" element = {<Wishlist />}/>
      <Route path='/' element = {<Home xbox = {allXboxGames} playstation = {allPlayStationGames} nintendo = {allSwitchGames} pc = {allPCGames}/>}/>
    </Routes>

  </div>
}

export default App;
