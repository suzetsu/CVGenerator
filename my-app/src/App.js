import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/LoginPage'
import Signup from './Signup/signup';
import Main from './Dashboard/main';
import Info from "./CustomerDetails/info"
import CVTemp from './CustomerDetails/CVtemplate/CVTemp';
import SecondCVTemp from './CustomerDetails/CVtemplate/SecondCVTemp';
import ThirdCVTemp from './CustomerDetails/CVtemplate/ThirdCVTemp';
import CVGenerate from './CustomerDetails/CVtemplate/CVGenerate';
import matchedClient from './CustomerDetails/InfoComponents/InfoBody';
import Update from './CustomerDetails/InfoComponents/Update';
// import CVContainer from './CustomerDetails/CVtemplate/CVData';
// import { configureStore } from '@reduxjs/toolkit';
import { Provider } from'react-redux';
import {useAuth} from './useAuth';
// import authReducer from './Redux/reducers';
import store from './Redux/store';
import RoleSelect from './RoleSelection/roleSelect';
import ProtectedRoute from './ProtectedRoutes';
import Layout from './Layout';

// const store = configureStore({
//   reducer: authReducer
// })


const App = () => {
  // const { isLoggedIn} = useAuth();
  return (
    <Provider store={store}>
     <Router>
        <Routes>
      {/* Public Routes  */}
              <Route  path="/" element={<Login/>} />
              <Route  path="/signup" element={<Signup/>} />
              <Route  path="/info" element={<Info/>} />
              <Route  path="/Update" element={<Update/>} />
              <Route  path="/CVGenerate" element={<CVGenerate/>} />
              <Route  path="/CVTemp" element={<CVTemp/>} />
              
        </Routes>  
        </Router>
      {/* Protected Routes  */}
               {/* <Route element={<ProtectedRoute />}>
                <Route path="/main" element={<Main />} />
              </Route> */}
              {/* <Route element={<ProtectedRoute />}>
                <Route path="/info" element={<Info />} />
              </Route>  */}
              
              {/* <Route element={<ProtectedRoute />} >
                <Route path="/CVTemp" element={<CVTemp />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/SecondCVTemp" element={<SecondCVTemp />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/ThirdCVTemp" element={<ThirdCVTemp />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/CVGenerate" element={<CVGenerate />} />
              </Route> */}
              {/* <Route path="/info" element={<ProtectedRoute element={<Info />}/>} /> */}
        
        
    </Provider>
  );
}

export default App;