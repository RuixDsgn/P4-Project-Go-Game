import React, { useState } from 'react';
import { ShoppingCartOutlined, UserAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const NavBar = ({user}) => {
  const items = [
    {
      label: 'track your order',
      key: 'order',
      link: '/orders'
    },
    {
      label: 'all games',
      key: 'game',
      link: '/all_games',
      // icon: <FontAwesomeIcon icon="fa-solid fa-gamepad" />,
      disabled: false,
    },
    user ? {
      label: user,
      key: user,
      link: '/profile',
      icon: <UserAddOutlined />,
      children: [
        {
          type: 'group',
          label: 'account',
          children: [
            {
              label: 'orders',
              key: 'orders',
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
            {
              label: 'my reviews',
              key: 'review',
            },
            {
              label: 'favorited games',
              key: 'favorite',
            },
          ],
        },
      ],
    }:{
      label: 'signin / signup',
      key: 'signin / signup',
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
    console.log(e);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <nav>
        {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <NavLink to={item.link}>{item.label}</NavLink>
            </Menu.Item>
        ))}
      </nav>
    </Menu>
  );

};
export default NavBar;