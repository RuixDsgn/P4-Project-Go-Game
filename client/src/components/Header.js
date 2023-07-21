import React from 'react'
import { Link } from 'react-router-dom';
import NavBar from './NavBar'
import SearchGame from './SearchGame'

const Header = ({user, games, searchGames,setSearchGames}) => {

  return (
    <div>
      <Link to="/">
        <h2>GoGame.GG🎮</h2>
      </Link>
        <div>
          <NavBar user = {user}/>
          <SearchGame games={games} searchGames={searchGames} setSearchGames={setSearchGames}/>
        </div>
    </div>
  )
}

export default Header