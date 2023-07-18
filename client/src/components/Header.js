import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import NavBar from './NavBar'
import SearchGame from './SearchGame'

const Header = () => {
  return (
    <div>
      <Link to="/">
        <h2>GoGame.GG</h2>
      </Link>
        <div>
          <NavBar />
          <SearchGame />
        </div>
    </div>
  )
}

export default Header