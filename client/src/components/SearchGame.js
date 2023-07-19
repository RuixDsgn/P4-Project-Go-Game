import React from 'react'
import { Input } from 'antd';

const { Search } = Input;

function SearchGame({games, searchGames, setSearchGames}) {

  const searchGameResults = games.filter((eachGame) => {
    return eachGame.name.toLowerCase().includes(searchGames.toLowerCase())
  })

  const handleGameSearch = e => {
    setSearchGames(e.target.value)
  }

  return (
    <Search style={{width: '50%', float: 'right'}} size='middle' placeholder="search for games here" enterButton onChange={handleGameSearch}/>

  )
 
  
  };
export default SearchGame;