import React from 'react';
import { Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth'; // Import your useAuth custom hook
import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ element }) => {
//   // const isLoggedIn = useSelector((state) => state.auth.token);
//   let {isLoggedIn} = useAuth();
  // let location = useLocation();
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" state={{ from: location }} />;
  // }

  // return <Outlet />;

  // return (
  //   <Route
  //     element={ isLoggedIn ? element : <Navigate to="/" /> } // Redirect to the login page if not logged in
  //   />
  // );
// };

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  else {
    return children;
  }
  
};
export default ProtectedRoute;
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


