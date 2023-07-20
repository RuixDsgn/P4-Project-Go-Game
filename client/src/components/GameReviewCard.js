import React from 'react'
import {Card} from 'antd'

const GameReviewCard = () => {
  return (
    <>
        <Card style={{width: '50%'}} type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
            Inner Card content
        </Card>
    </>
);  
}

export default GameReviewCard