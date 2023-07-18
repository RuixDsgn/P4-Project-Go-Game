import React from 'react'
import { Input } from 'antd';

const { Search } = Input;

const SearchGame = () => (
  <>
    <Search placeholder="search for games here" enterButton />
  </>
);
export default SearchGame;