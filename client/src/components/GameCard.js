import React, {useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { EditOutlined, ShoppingCartOutlined, LikeOutlined } from '@ant-design/icons';
import { Avatar, Card, Col } from 'antd';
import { UserContext } from './App';


const { Meta } = Card;
const GameCard = ({game = {}}) => {
  const user = useContext(UserContext);
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

  function handleWishList(e) {
    e.preventDefault();
    // console.log(user.id)
    // console.log(id)  
    fetch('/wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.id,
        game_id: id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // The wishlist item was successfully added
          // You can perform additional actions if needed
          console.log('Wishlist item added successfully!');
        } else {
          // Handle the error when the wishlist item couldn't be added
          console.error('Failed to add wishlist item');
        }
      })
      .catch((error) => {
        console.error('Error while adding wishlist item:', error);
      });
  }

  return(
    <Col sm={4} md={6} lg={8}>
    <Card 
    style={{
      width: 300,
    }}
    cover={
      <NavLink         
        to={{
        pathname: `/product/${id}`, // Game ID
        state: { game }, // Props
      }}>
        <img style={{width: '100%'}}
        alt="example"
        src={cover ? cover.url : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
      />
      </NavLink>
    }
    actions={[
      <LikeOutlined key="like" onClick={handleWishList}/>,
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