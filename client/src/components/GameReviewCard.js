import React, {useState, useEffect} from 'react';
import {Card} from 'antd';
import {useNavigate} from "react-router-dom";

const GameReviewCard = ({review}) => {
    const [author, setAuthor] = useState("")
    useEffect(()=>{
        console.log(review.user_id);
        fetch(`/users/${review.user_id}`)
        .then((r)=>r.json())
        .then((userData)=>{
          setAuthor(userData.name)
          console.log(userData.name)
        });
      }, [])
    const navigate = useNavigate()
    let preview;
    if (review.content.length > 50){
        preview = review.content.slice(0,50) + "..."

    }
    else {
        preview = review.content
    }

    function handleFullReview(){
        navigate(`/reviews/${review.id}`)
    }

  return (
    <>
        <Card style={{width: '50%'}} type="inner" title={`Review by ${author}`} extra={<a onClick={handleFullReview}>Read More</a>}>
            {preview}
        </Card>
    </>
);  
}

export default GameReviewCard