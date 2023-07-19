import React from 'react';
import { EditOutlined, EllipsisOutlined, LikeOutlined } from '@ant-design/icons';
import { Avatar, Card, Col } from 'antd';

const { Meta } = Card;
const GameCard = ({game}) => {
  const {id, name, cover, genres, platforms, screenshots, similar_games, summary, first_release_date} = game;
  let genreSet = new Set();

  if (genres && genres.length > 0) {
    genres.forEach((genre) => {
      genreSet.add(genre.name);
    });
  }
  else{
    genreSet.add("A Fun Game!")
  }

  const genreList = Array.from(genreSet);
  const description = genreList.join(", ");
  // console.log(description);

  return(
    <Col sm={4} md={6} lg={8}>
    <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src={cover ? cover.url : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
      />
    }
    actions={[
      <LikeOutlined key="like"/>,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title={name}
      description={description || genres}
    />
  </Card>
  </Col>
  )
};
export default GameCard;