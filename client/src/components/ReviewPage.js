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
    <div style={{textAlign: 'center'}}>
      <h4>
        {editMode ? (
          <form onSubmit={handleSubmitEdit}>
            <input
              style={{width: '300px', height: '150px'}}
              type="text"
              onChange={check}
              value={editContent}
            />
            <br></br>
            <br></br>
            <button style={{ backgroundColor: '#1777FF', marginRight: '5px', borderStyle: 'none', borderRadius: '5px', padding: '10px', width: '100px'}} type="submit">Submit</button>
            <button style={{ borderStyle: 'none', borderRadius: '5px', padding: '10px', width: '100px'}} type="button" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </form>
        ) : (
          review?.content ?? 'Loading...'
        )}
      </h4>
      <h5>Written by {author ?? 'Loading...'}</h5>
      {user?.name??null === author ? (
        <div>
          {editMode ? null : (
            <div>
              <button style={{ backgroundColor:'#1777FF', color: 'white', marginRight: '5px', borderStyle: 'none', borderRadius: '5px', padding: '10px', width: '100px'}} onClick={()=> {setEditMode(true);setEditContent(review.content);}}>Edit</button>
              <button style={{ backgroundColor: 'white', borderColor: '#E70111', color: 'black', borderRadius: '5px', padding: '10px', width: '100px'}} onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      ) : null}
    <br></br>
    <button style={{ backgroundColor: 'white', borderColor: '#1777FF', color: 'black', borderRadius: '5px', padding: '10px', width: '100px'}} onClick={handleBack}>Back</button>
    </div>
  );
};

export default ReviewPage