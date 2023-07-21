import React, { useState } from 'react';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const NavBar = ({user}) => {

  const navigate = useNavigate();
  const items = [
    {
      label: 'track your order',
      key: 'orders',
      link: '/orders'
    },
    {
      label: 'all games',
      key: 'all_games',
      link: '/all_games',
      // icon: <FontAwesomeIcon icon="fa-solid fa-gamepad" />,
      disabled: false,
    },
    user
      ? {
          label: user.name, // Change this label to whatever you want to display as the user's name
          key: 'profile',
          link: '/profile',
          icon: <UserOutlined />,
          children: [
        {
          type: 'group',
          label: 'account',
          children: [
            {
              label: "profile", // Change this label to whatever you want to display as the user's name
              key: `profile`,
              // link: `/profile/${user.id}`,
            },
            {
              label: 'wishlist',
              key: 'wishlist',
            },
          ],
        },
        {
          type: 'group',
          label: 'activitiy',
          children: [
            // {
            //   label: 'my reviews',
            //   key: 'review',
            // },
            // {
            //   label: 'favorited games',
            //   key: 'favorite',
            // },
            {
              label: 'logout',
              key: 'logout',
            },
          ],
        },
      ],
    }      
    : {
      label: 'signin / signup',
      key: 'signin',
      link: '/signin',
    },
    {
      label: 'cart',
      key: 'cart',
      link: '/cart',
      icon: <ShoppingCartOutlined />
    }
  ];
  const [current, setCurrent] = useState('order');

  const handleClick = (e) => {
    // console.log(e);
    setCurrent(e.key);
    navigate(`/${e.key}`)
  };

  return <Menu style={{position: 'relative', display: 'flex', justifyContent: 'center'}} onClick={handleClick} selectedKeys={[current]} mode="horizontal" items={items} />
  

};
export default NavBar;