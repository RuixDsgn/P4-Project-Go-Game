import React, {useState} from 'react'
import {useParams} from  'react-router-dom'

const NewReview = ({user}) => {
  const { id } = useParams();
  const [content, setContent] = useState('')
  // const [rating, setRating] = useState('')
  function handleSubmit(e){
    e.preventDefault();
    const newReview = {
      content: content,
      // rating: rating, 
      user_id: user.id, 
      game_id: id,
    };
    fetch('/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    })
    .then((r)=> r.json())
    .then((data) => {
      console.log('Review posted successfully:', data);
      })
      .catch((error) => {
        console.error('Error posting review:', error);
      });
  }

  return (
    <div>
      <h2>Write a review here!</h2>
      <input type="text" onChange={(e)=>{setContent(e.target.value)}}></input>
      {/* <input type="number" min="0" max="100" onChange={(e)=>{setRating(e.target.value)}}></input> */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default NewReview