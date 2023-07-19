import React from 'react'
import GameCard from "./GameCard"
import {Row, Col} from 'antd'

const GamesAll = ({games}) => {

  function renderGames(){
    return games.map((game) => {
      return(
        <GameCard game = {game}/>
      )
    })
  }

  return (
    <Row>
      {renderGames()}
    </Row>

  )
}

export default GamesAll