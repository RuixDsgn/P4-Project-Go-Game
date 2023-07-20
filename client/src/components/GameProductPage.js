import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import GameReviewCard from './GameReviewCard'
import GameCard from './GameCard'
import { Row, Col, Card } from 'antd'

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
      return <GameCard game={game}/>
    })
  }
    
  return (
    <div style={{marginLeft: '50px'}}>
      <Row className='product-card'>
          <Col>
              <img style={{width: '400px', marginRight: '50px'}} className='product-img' src="" alt="" />
          </Col>
              <div>
                <p>Title</p>
                <p>Genre</p>
                <p>Platform</p>
                <p>Price: $59.99</p>
                <button>Add to cart</button>
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
          <Col span={8}>
              <Card style={{width: '200px'}} title="Card title" bordered={false}>
                  Card content
              </Card>
          </Col>
          <Col span={8}>
              <Card style={{width: '200px'}} title="Card title" bordered={false}>
                  Card content
              </Card>
          </Col>
          <Col span={8}>
              <Card style={{width: '200px'}} title="Card title" bordered={false}>
                  Card content
              </Card>
          </Col>
      </Row>
      </div>







    </div>
  )
}

export default GameProduct