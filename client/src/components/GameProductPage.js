import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import GameReviewCard from './GameReviewCard'
import GameCard from './GameCard'
import { Row, Col, Card, Button } from 'antd'
import { HeartOutlined } from '@ant-design/icons'

const GameProduct = ({user}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [game, setGame] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadImg, setLoadImg] = useState('')

  useEffect(() => {
    fetch(`/games/product?id=${encodeURIComponent(id)}`)
      .then((response) => response.json())
      .then((gameData) => {
        setGame(gameData[0]);
        // console.log(gameData[0]);
        setIsLoaded(true)
        setLoadImg(gameData[0].cover.url)
      });
  }, []);

  function showImg(e){
    debugger;
  }

  function renderScreenshots(){

    const displayImages = []
    displayImages.push(game.cover)
    game.screenshots.map((screenshot)=>{
      displayImages.push(screenshot)
    })
    return displayImages.map((screenshot)=> {
      return (
        <Col>
           <img onMouseEnter={ (e) => {setLoadImg(e.target.src)}} style={{width: '50px', height: '50px', marginRight: '10px'}} src={screenshot.url}/>
        </Col>
      )
    })
  }
  const [reviews, setReviews] = useState([])
  useEffect(()=>{
      fetch('/reviews')
        .then((response) => response.json())
        .then((reviewData) => {
          setReviews(reviewData);
          // console.log(reviewData);
        });
  },[])

  function renderReviews(){
    if(reviews.length > 0){
      const gameReviews = reviews.filter((review) => review.game_id == game.id)
      while(reviews.length > 3){
        reviews.pop()
      }
      // console.log(gameReviews)
      return gameReviews.map((review) => {
        return <GameReviewCard review = {review}/>
      })
    }
    else{
      return <h4>Game Has No Reviews</h4>
    }
  }
  function renderSimilar(){
    return game.similar_games.map((game)=>{
      return <GameCard game={game}/>
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
  
  function setRating(){
    if (game.rating < 88) {
      return '⭐️⭐️⭐️'
    }
    else if ( game.rating < 93 && game.rating >= 88) {
      return '⭐️⭐️⭐️⭐️'
    }
    else if (game.rating >= 93) {
      return '⭐️⭐️⭐️⭐️⭐️'
    }
  }

  function handleNewReview(){
    navigate(`/reviews/new/${game.id}`)
  }

  return (
    isLoaded ? 
    <div style={{marginLeft: '50px'}}>
      <Row className='product-card'>
          <Col>
            {renderScreenshots()}
          </Col>
          <Col>
              <img style={{width: '400px', marginRight: '50px'}} className='product-img' src={loadImg} alt="" />
          </Col>
              <div>
                <p><strong>Title:</strong> {game.name}</p>
                <p><strong>Genre(s):</strong> {mapGenres()}</p>
                <p style={{maxWidth: '500px'}}><strong>Platform(s):</strong> {mapPlatforms()}</p>
                <p><strong>Rating: {setRating()}</strong></p>
                <p><strong>$</strong>{generatedPrice}</p>
                <Button style={{marginRight: '10px'}} type="primary">add to cart</Button>
                <Button icon={<HeartOutlined />} href="" />
              </div>
      </Row>

      <div>
          <h4>Recent reviews from players</h4>
          {renderReviews()}
          {user?
          <h4 onClick={handleNewReview}>Write a Review!</h4>:
          <h4>Login to leave a review!</h4>
          }
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