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
     <Search style={{width: '50%', float: 'right'}} size='middle' placeholder="search for games here" enterButton onChange={handleGameSearch} />
    {/* <Input defaultValue="Combine input and button" /> */}
    <Button type="primary"onClick={handleSubmit}>Submit</Button>
    </div>

  )
 
  
  };
export default SearchGame;