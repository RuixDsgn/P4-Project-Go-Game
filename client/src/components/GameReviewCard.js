import React from 'react';
import {Card} from 'antd';
import {useNavigate} from "react-router-dom";

const GameReviewCard = ({review}) => {
    const navigate = useNavigate()
    let preview;
    if (review.length > 25){
        preview = review.content.slice(0,25) + "..."

    }
    else {
        preview = review.content
    }

    function handleFullReview(){
        navigate(`/reviews/${review.id}`)
    }

  return (
    <>
        <Card style={{width: '50%'}} type="inner" title="Inner Card title" extra={<a onClick={handleFullReview}>More</a>}>
            {preview}
        </Card>
    </>
);  
}

export default GameReviewCard