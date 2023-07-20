import React from 'react'

const OrderPage = ({user}) => {
  function handleClick(){
    if(user){
      console.log(user)
    }
    else{
      console.log("not logged in")
    }
  }
  return (
    <div>OrderPage
          <button onClick={handleClick}>Click!</button>
    </div>
  )
}

export default OrderPage