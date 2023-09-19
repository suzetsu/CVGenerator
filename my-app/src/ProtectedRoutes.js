import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './useAuth'; // Import your useAuth custom hook

const ProtectedRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useAuth(); // Use the useAuth hook to check authentication status

  return (
    <Route
      {...rest}
      element={isLoggedIn() ? element : <Navigate to="/" />} // Redirect to the login page if not logged in
    />
  );
};
// const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
//     return (
//       <Route
//         {...rest}
//         render={(props) => {
//           if (auth) return <Component {...props} />;
//           if (!auth)
//             return (
//               <Navigate to={{ path: "/", state: { from: props.location } }} />
//             );
//         }}
//       />
//     );
//   };

export default ProtectedRoute;
