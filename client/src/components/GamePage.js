import React, {useState} from 'react'
import GameList from './GameList'
import { Col, Row } from 'antd';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const GamePage = () => {

  return (
    <div style={{ margin: 0 }}>
  
      <div>
      <h4>Top PS5 Games</h4>
          <Row>
            <Col xs={{ span: 5, offset: 1,}} lg={{ span: 6, offset: 2,}}>
              <GameList />
            </Col>
          </Row>
      </div>
  
      <div>
      <h4>Top XBOX S|X Games</h4>
          <Row>
            <Col xs={{ span: 5, offset: 1,}} lg={{ span: 6, offset: 2,}}>
              <GameList />
            </Col>
          </Row>
      </div>
  
      <div>
      <h4>Top PC Games</h4>
          <Row>
            <Col xs={{ span: 5, offset: 1,}} lg={{ span: 6, offset: 2,}}>
              <GameList />
            </Col>
          </Row>
      </div>
  
    </div>
    
  )
}

export default GamePage