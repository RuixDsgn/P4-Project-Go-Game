import React from 'react'
import Hero from "./Hero"
import GamePage from "./GamePage"

const Home = ({xbox, playstation, nintendo, pc}) => {
  return (
    <div>
    <Hero />
    <GamePage xbox = {xbox} playstation = {playstation} nintendo = {nintendo} pc={pc}/>
    </div>
  )
}

export default Home