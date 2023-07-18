import React, {useState} from 'react'
import NavBar from './NavBar'
import SearchGame from './SearchGame'

const Header = () => {
  return (
    <div>
      <div>
        <h2>GoGame.GG</h2>
      </div>
        <div>
          <NavBar />
          <SearchGame />
        </div>
    </div>
  )
}

export default Header