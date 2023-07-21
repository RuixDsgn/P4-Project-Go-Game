import React from 'react'
import {Col, Row, Button} from 'antd'

const Cart = () => {
  return (
    <div>
    <h3>My Cart🎮</h3>
    <br />
    <hr />
    <Row>
        <Col style={{marginLeft: '250px', marginRight: '200px'}}>
            <h5>Game</h5>
        </Col>
        <Col style={{marginRight: '250px'}}>
            <h5>Price</h5>
        </Col>
        <Col style={{marginRight: '200px'}}>
            <h5>Quantity</h5>
        </Col>
    </Row>
    <hr />
    <Row>
        <Col style={{marginLeft: '215px', marginRight: '200px'}}>
            <img style={{height: '100px', width: '100px'}} src="" alt="" />
        </Col>
        <Col style={{marginRight: '200px'}}>
            <p>Game Name</p>
        </Col>
        <Col style={{marginRight: '10px'}}>
            <p>1</p>
        </Col>
    </Row>
  </div>
  )
}

export default Cart