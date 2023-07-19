import React from 'react'
import { Input, Button } from 'antd';

const { Search } = Input;

function SearchGame({games, searchGames, setSearchGames}) {

  const handleGameSearch = e => {
    setSearchGames(e.target.value)
  }

  return (
    <div>
        <Input style={{width: '50%'}} defaultValue="Combine input and button" />
        <Button type="primary" onClick={handleGameSearch}>Submit</Button>
    </div>

  )
 
  
  };
export default SearchGame;