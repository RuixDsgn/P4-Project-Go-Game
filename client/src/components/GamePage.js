import React, {useState} from 'react'
import GameList from './GameList'

const GamePage = ({xbox, playstation, nintendo, pc}) => {

  return (
    <div>
  
      <div>
        <h4>Top PS5 Games</h4>
        <GameList games = {playstation}/>
      </div>
  
      <div>
        <h4>Top XBOX S|X Games</h4>
        <GameList games = {xbox}/>
      </div>
  
      <div>
        <h4>Top Switch Games</h4>
        <GameList games = {nintendo}/>
      </div>

      <div>
        <h4>Top PC Games</h4>
        <GameList games = {pc}/>
      </div>
  
    </div>
    
  )
}

export default GamePage