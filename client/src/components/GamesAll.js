import React from 'react'
import GameCard from "./GameCard"

const GamesAll = ({games}) => {

  function renderGames(){
    return games.map((game) => {
      return(
        <GameCard game = {game}/>
      )
    })
  }

  return (
    <div>
      {renderGames()}
    </div>
  )
}

export default GamesAll