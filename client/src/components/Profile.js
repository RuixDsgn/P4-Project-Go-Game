import React from 'react'

const Profile = ({user}) => {
  function handleClick(){
    if(user){
      console.log(user)
    }
    else{
      console.log("not logged in")
    }
  }
  const name = user?.name ?? "Loading...";
  const created_at = user?.created_at ?? "Loading...";
 
  function renderReviews(){
    //map reviews where user_id = user.id
    //TODO ReviewCard AND ReviewPage
  }

  return (
    <div>
      <div>Profile</div>
      <button onClick={handleClick}>Click!</button>
      <h2>{user ? name : null}</h2>
      <h2>Reviews</h2>
      {renderReviews()}
      <p>Account created on {user ? created_at : null}</p>
    </div>

  )
}

export default Profile