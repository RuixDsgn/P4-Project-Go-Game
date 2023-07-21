import React from 'react'
import {useNavigate} from "react-router-dom"
import { Button, Input, Select, Space } from 'antd';
// import { Input } from 'antd';


const { Search } = Input;

function SearchGame({games, searchGames, setSearchGames}) {
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/search?results=${encodeURIComponent(searchGames)}`)
  }

  const handleGameSearch = e => {
    setSearchGames(e.target.value)
    console.log(searchGames)
  }

  return (
    <div>
        <Input style={{width: '30%', marginLeft: '340px', marginRight: '5px'}} placeholder="search for games here" onChange={handleGameSearch}/>
        <Button type="primary" onClick={handleSubmit}>Search</Button>
    </div>

  )
};
export default SearchGame;