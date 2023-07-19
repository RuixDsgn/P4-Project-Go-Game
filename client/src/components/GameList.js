import React, {useState} from 'react'
import GameCard from './GameCard'


const GameList = ({games}) => {
  function renderGameCards(){
    return games.map((game) => {
      return(
        <GameCard game = {game}/>
      )
    })
  }
  return (
    <div>
      {renderGameCards()}
    </div>
  )

}

export default GameList