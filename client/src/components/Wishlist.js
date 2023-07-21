import React, { useEffect, useState } from 'react';
import GameCard from "./GameCard";

import {Col, Row} from 'antd'

const Wishlist = ({ user }) => {
  const [wishlists, setWishlists] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [renderedGames, setRenderedGames] =useState([]);

  useEffect(() => {
    fetch('/wishlist')
      .then((response) => response.json())
      .then((wishlistData) => {
        setWishlists(wishlistData);
        setIsLoaded(true);
        console.log(wishlistData);
      })
      .catch((error) => {
        console.error('Error while fetching wishlist:', error);
      });
  }, []);

  function fetchGameDetails(game_id) {
    return fetch(`/games/product?id=${encodeURIComponent(game_id)}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch game details');
        }
      })
      .catch((error) => {
        console.error('Error while fetching game details:', error);
        return null;
      });
  }

  useEffect(() => {
    if (wishlists.length > 0) {
      renderWishlist();
    }
  }, [wishlists]);

  function renderWishlist() {
    // Filter the wishlist items based on the 'user.id'
    const userWishes = wishlists.filter((wishlistItem) => wishlistItem.user_id === user.id);

    // Fetch game details for each wishlist item and wait for all requests to complete
    const gamePromises = userWishes.map((wishlistItem) => {
      return fetchGameDetails(wishlistItem.game_id);
    });

    Promise.all(gamePromises)
      .then((games) => {
        const filteredGames = games.filter(Boolean); // Remove any null or undefined entries
        const gameCards = filteredGames.map((game) => {
          const wishlistItem = userWishes.find((wishlistItem) => wishlistItem.game_id === game[0].id);
          const wishlistItemId = wishlistItem ? wishlistItem.id : null; // Access the 'id' property

          return (
            <div key={game.id}>
              <Col>
                <GameCard game={game[0]} key={game[0].id} />
                {wishlistItemId && (
                <button onClick={() => removeFromWishlist(wishlistItemId)}>Remove from List</button>
                )}
              </Col>
            </div>
          );
        });
        setRenderedGames(gameCards); // Update the renderedGames state here
      })
      .catch((error) => {
        console.error('Error while fetching game details:', error);
      });
  }

  function removeFromWishlist(wishlistItemId) {
    // Make a DELETE request to remove the wishlist item from the wishlist
    fetch(`/wishlist/${wishlistItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // Remove the wishlist item from the local state directly
          setWishlists((prevWishlists) => prevWishlists.filter((item) => item.id !== wishlistItemId));
          console.log('Wishlist item removed successfully!');
        } else {
          // Handle the error when the wishlist item couldn't be removed
          console.error('Failed to remove wishlist item');
        }
      })
      .catch((error) => {
        console.error('Error while removing wishlist item:', error);
      });
  }

  if (!user) {
    return <div>Loading user data...</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (wishlists.length === 0) {
    return <div><h1>No games found in the wishlist</h1></div>;
  }

  return (
    <div>
      <h2>Wishlist</h2>
      <Row>
        {renderedGames.length > 0 ? renderedGames : <div><h1>No games found in the wishlist</h1></div>}
      </Row>
    </div>
  );
};


export default Wishlist;
