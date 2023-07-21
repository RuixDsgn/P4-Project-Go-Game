import React, { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    // Make the logout request to your backend
    fetch('/logout', {
      method: 'DELETE',
      credentials: 'include', // Include credentials to handle cookies or session-based authentication
    })
      .then((response) => {
        if (response.status === 204) {
          // Logout was successful, redirect the user to the login page or homepage
          window.location.href = '/'; // Replace '/login' with the URL you want to redirect to
        } else {
          // Handle logout failure or errors here
          console.error('Logout failed:', response);
        }
      })
      .catch((error) => {
        console.error('Error logging out:', error);
        // Handle any errors here, if needed
      });
  }, []);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default Logout;






