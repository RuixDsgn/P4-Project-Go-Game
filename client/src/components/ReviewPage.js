import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from  'react-router-dom';

const ReviewPage = ({user}) => {
  const { id } = useParams();
  const [review, setReview] = useState({})
  const [author, setAuthor] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [editContent, setEditContent] = useState ("")
  const navigate = useNavigate();

  useEffect(()=>{
    fetch(`/reviews/${id}`)
    .then((r)=>r.json())
    .then((reviewData)=>{
      setReview(reviewData)
    });
  },[])
  useEffect(()=>{
    fetch(`/users/${review.user_id}`)
    .then((r)=>r.json())
    .then((userData)=>{
      setAuthor(userData.name)
    });
  }, [review])

  function handleSubmitEdit(e) {
    e.preventDefault();
    fetch(`/reviews/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: editContent }),
    })
      .then((r) => r.json())
      .then((updatedReview) => {
        // update page to show new review
        setReview(updatedReview);
        setEditMode(false); // exit edit mode
        console.log("patch done")
      })
      .catch((error) => {
        console.error('Error updating review:', error);
      });
  }

  function handleDelete(){
    fetch(`/reviews/${id}`, {
      method: 'DELETE',
    })
    .then(navigate(-1))
  };  

  function handleBack(){
    navigate(-1)
  }
  
const check = (e) => {setEditContent(e.target.value); console.log(e.target.value)}

  return (
    <div>
      <h4>
        {editMode ? (
          <form onSubmit={handleSubmitEdit}>
            <input
              type="text"
              onChange={check}
              value={editContent}
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </form>
        ) : (
          review?.content ?? 'Loading...'
        )}
      </h4>
      <p>Written by {author ?? 'Loading...'}</p>
      {user?.name??null === author ? (
        <div>
          {editMode ? null : (
            <div>
              <button onClick={()=> {setEditMode(true);setEditContent(review.content);}}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      ) : null}
    <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default ReviewPage