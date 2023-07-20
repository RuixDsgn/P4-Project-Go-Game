import React, {useState} from 'react'

const NewReview = () => {
  const [reviewText, setReviewText] = useState('')
  function handleSubmit(e){
    e.preventDefault();
    //post review
  }

  return (
    <div>
      <input type="text" onChange={(e)=>setReviewText(e)}></input>
      <button onclick={handleSubmit}>Submit</button>
    </div>
  )
}

export default NewReview