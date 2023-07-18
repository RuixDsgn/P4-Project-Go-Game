import React, { useState } from 'react';
import { ShoppingCartOutlined, UserAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    label: 'track your order',
    key: 'order',
  },
  {
    label: 'all games',
    key: 'game',
    // icon: <FontAwesomeIcon icon="fa-solid fa-gamepad" />,
    disabled: false,
  },
  {
    label: 'sign in',
    key: 'signin',
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
  },
  {
    label: 'cart',
    key: 'cart',
    icon: <ShoppingCartOutlined />
  }
];
const NavBar = () => {
  const [current, setCurrent] = useState('order');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu style={{}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default NavBar;