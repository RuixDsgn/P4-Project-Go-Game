import React from 'react'
import {Card} from 'antd'

const GameReviewCard = ({review}) => {
    const preview = review.content.slice(0,25) + "..."
  return (
    <>
        <Card style={{width: '50%'}} type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
            {preview}
        </Card>
    </>
);  
}

export default GameReviewCard