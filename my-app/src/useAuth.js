import { useSelector } from 'react-redux';
import { useState } from 'react';

// Replace 'auth' with the name of your reducer slice in the selector
const selectAuth = (state) => state.auth;

export const useAuth = () => {
  // Use the useSelector hook to access the authentication state from Redux
  const auth = useSelector(selectAuth);

  // Define functions or logic related to authentication here

  // Example function to check if the user is logged in
  const isLoggedIn = () => !!auth.token;
  const role = () => auth.role

  // Add other authentication-related logic here

  return {
    auth,
    isLoggedIn,
    role
    // Add other functions or properties as needed
  };
};


// export default function useAuth (initialValue) {
//     const [isAauth, setIsAuth] = useState(initialValue)
//     return [ isAauth ]
// }
