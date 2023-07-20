import React, {useState} from 'react'
import GameCard from './GameCard'
import {Col, Row} from 'antd'


const GameList = ({games}) => {

  function renderGameCards(){
    return games.map((game) => {
      return(
            <GameCard game = {game}/>
      )
    })
  }
  return (
    <Row>
      {renderGameCards()}
    </Row>
  )
}

export default GameList