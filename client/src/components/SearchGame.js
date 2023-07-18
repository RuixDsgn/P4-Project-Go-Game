import React from 'react'
import { Input } from 'antd';

const { Search } = Input;

const SearchGame = () => (
  <>
    <Search style={{width: '50%', float: 'right'}} size='middle' placeholder="search for games here" enterButton />
  </>
);
export default SearchGame;