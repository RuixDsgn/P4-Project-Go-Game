import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { EditOutlined, ShoppingCartOutlined, LikeOutlined } from '@ant-design/icons';
import { Avatar, Card, Col } from 'antd';

const { Meta } = Card;
const GameCard = ({game}) => {
  const {id, name, cover, genres} = game;
  let genreSet = new Set();
  const navigate = useNavigate()

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

  function handleReviewNav(){
    navigate(`/reviews/new/${id}`)
  }


  return(
    <Col sm={4} md={6} lg={8}>
    <Card 
    style={{
      width: 300, marginBottom: '20px'
    }}
    cover={
      <NavLink         
        to={{
        pathname: `/product/${id}`, // Game ID
        state: { game }, // Props
      }}>
        <img style={{width: '100%'}}
        alt="example"
        src={cover ? cover.url : "https://media.istockphoto.com/id/1208386205/vector/joystick-flat-icon-playing-online-gamepad-cartoon-icon-game-controller.jpg?s=612x612&w=0&k=20&c=0UCu7wJNNjJpIaUXe6zyLLXEk3ZX2onolq5aBrbQQY8="}
      />
      </NavLink>
    }
    actions={[
      <LikeOutlined key="like"/>,
      <EditOutlined key="edit" onClick={handleReviewNav}/>,
      <ShoppingCartOutlined key='cart'/>,
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