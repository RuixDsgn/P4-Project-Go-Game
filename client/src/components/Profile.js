import React, {useState, useEffect} from 'react'
import GameReviewCard from './GameReviewCard'

const Profile = ({user}) => {
  const [reviews, setReviews] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(()=>{
      fetch('/reviews')
        .then((response) => response.json())
        .then((reviewData) => {
          setReviews(reviewData);
          // console.log(reviewData);
          setIsLoaded(true)
        });
  },[])
  function renderReviews(){
    if(reviews.length > 0){
      const userReviews = reviews.filter((review) => review.user_id == user.id)
      console.log(userReviews)
      return userReviews.map((review) => {
        return <GameReviewCard review = {review}/>
      })
    }
    else{
      return <h4>User Has No Reviews</h4>
    }
  }
  const name = user?.name ?? "Loading...";
  const created_at = user?.created_at ?? "Loading...";
  return (
    <div>
      <h2>{user ? name : null}</h2>
      <h2>Reviews</h2>
      <div>
      {isLoaded ?renderReviews() : "Loading..."}
      </div>
      <p>Account created on {user ? created_at : null}</p>
    </div>

  )
}

export default Profile