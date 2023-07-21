import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';
import { Row} from 'antd'

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
      <Row gutter={16}>
        {renderSearch()}
      </Row>
    </div>
  );
};

export default SearchResults;