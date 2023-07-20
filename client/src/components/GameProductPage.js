import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import GameReviewCard from './GameReviewCard'
import GameCard from './GameCard'
import { Row, Col, Card, Button } from 'antd'

const GameProduct = () => {

  const { id } = useParams();
  const [game, setGame] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetch(`/games/product?id=${encodeURIComponent(id)}`)
      .then((response) => response.json())
      .then((gameData) => {
        setGame(gameData[0]);
        console.log(gameData[0]);
        setIsLoaded(true)
      });
  }, []);


  function renderScreenshots(){
    return game.screenshots.map((screenshot)=>{
      return <img src={screenshot.url}/>
    })
  }

  function renderSimilar(){
    return game.similar_games.map((game)=>{
      return (
        <Col>
            <GameCard game={game}/>
        </Col>

      )
    })
  }

  function mapGenres(){
    const genreList = []
    game.genres.map((genre) => {
      genreList.push(genre.name)
    })
    return genreList.join(', ')
  }

  function mapPlatforms(){
    const platformList = []
      game.platforms.map((platform) => {
      platformList.push(platform.name)
    }
    )
      return platformList.join(", ")

  }

  const minPrice = 39.99;
  const maxPrice = 69.99;

  const getRandomPrice = () => {
  const price = (Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2);
  return price;
  }

  const generatedPrice = getRandomPrice()
  

  return (
    isLoaded ? 
    <div style={{marginLeft: '50px'}}>
      <Row className='product-card'>
          <Col>
              <img style={{width: '400px', marginRight: '50px'}} className='product-img' src={game.cover.url} alt="" />
          </Col>
              <div>
                <p>title: {game.name}</p>
                <p>genre(s): {mapGenres()}</p>
                <p>platform(s): {mapPlatforms()}</p>
                <p>rating</p>
                <p>`Price: ${generatedPrice}`</p>
                <Button type="primary">add to cart</Button>
              </div>
      </Row>

      <div>
          <h4>Recent reviews from players</h4>
          <GameReviewCard />
      </div>
      <br></br><br></br>
      <div>
      <h4>Similar games you might like</h4>
      <Row gutter={16}>
        {renderSimilar()}
      </Row>
      </div>

    </div> 
  : <div>
    Loading game....
  </div>
     
    
  )
}

export default GameProduct