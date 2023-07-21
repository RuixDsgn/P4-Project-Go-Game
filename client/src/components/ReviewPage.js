import React, {useState, useEffect} from 'react'
import {useParams} from  'react-router-dom'

const ReviewPage = ({user}) => {
  const { id } = useParams();
  const [review, setReview] = useState({})
  const [author, setAuthor] = useState("")
  useEffect(()=>{
    fetch(`/reviews/${id}`)
    .then((r)=>r.json())
    .then((reviewData)=>{
      setReview(reviewData)
      console.log(reviewData)
    });
  },[])
  useEffect(()=>{
    console.log(review.user_id);
    fetch(`/users/${review.user_id}`)
    .then((r)=>r.json())
    .then((userData)=>{
      setAuthor(userData.name)
      console.log(userData.name)
    });
  }, [review])
  return (
    <div>
      <h4>{review?.content??"Loading..."}</h4>
      <p>Written by {author??"Loading..."}</p>
      {user.name == author ? 
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>:null}
    </div>
  )
}

export default ReviewPage