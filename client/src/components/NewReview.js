import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const NewReview = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Define the validation schema using Yup
  const reviewSchema = Yup.object().shape({
    content: Yup.string().required('Content is required'),
    // rating: Yup.number().required('Rating is required').min(0).max(100),
  });

  const handleSubmit = (values) => {
    const newReview = {
      content: values.content,
      // rating: values.rating,
      user_id: user.id,
      game_id: id,
    };

    fetch('/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log('Review posted successfully:', data);
        navigate(-1);
      })
      .catch((error) => {
        console.error('Error posting review:', error);
      });
  };

  return (
    <div>
      <h2>Write a review here!</h2>
      <Formik
        initialValues={{ content: '' /* , rating: '' */ }}
        validationSchema={reviewSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="text" name="content" />
              <ErrorMessage name="content" component="div" />
            </div>
            {/* Uncomment the following block for rating input */}
            {/* <div>
              <Field type="number" min="0" max="100" name="rating" />
              <ErrorMessage name="rating" component="div" />
            </div> */}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewReview;
