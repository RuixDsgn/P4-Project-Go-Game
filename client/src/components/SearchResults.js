import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';

const SearchResults = ({ results }) => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    console.log(results);
    fetch(`/games/search?results=${encodeURIComponent(results)}`)
      .then((response) => response.json())
      .then((searchData) => {
        setResult(searchData);
      });
  }, [results]);

  function renderSearch() {
    return result.map((game) => <GameCard key={game.id} game={game} />);
  }

  return (
    <div>
      <h2>Search</h2>
      {renderSearch()}
    </div>
  );
};

export default SearchResults;