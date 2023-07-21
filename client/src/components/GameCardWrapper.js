// GameCardWrapper.js
import React, { useContext } from 'react';
import GameCard from './GameCard';
import { UserContext } from './App';

const GameCardWrapper = () => {
  const user = useContext(UserContext);
  return <GameCard game={game} user={user} />;
};

export default GameCardWrapper;