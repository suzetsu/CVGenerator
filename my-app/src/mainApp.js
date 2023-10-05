import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/LoginPage'
import Signup from './Signup/signup';
import Main from './Dashboard/main';
import Info from "./CustomerDetails/info"
import CVTemp from './CustomerDetails/CVtemplate/CVTemp';
import SecondCVTemp from './CustomerDetails/CVtemplate/SecondCVTemp';
import ThirdCVTemp from './CustomerDetails/CVtemplate/ThirdCVTemp';
import CVGenerate from './CustomerDetails/CVtemplate/CVGenerate';
import Update from './CustomerDetails/InfoComponents/Update';
import AddCompany from './Company/addCompany';
import ViewCompany from './Company/viewCompany';
import AddRole from './Role/addRole';
import ViewRole from './Role/viewRole';
import Layout from './Layout';
import ViewDepartment from './Company/viewDepartment';
// import CVContainer from './CustomerDetails/CVtemplate/CVData';
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './Redux/reducers';
import store from './Redux/store';
import RoleSelect from './RoleSelection/roleSelect';
import ProtectedRoute from './ProtectedRoutes';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// const store = configureStore({
//   reducer: authReducer
// })


const MainApp = (props) => {
//   const { isLoggedIn} = useAuth();
const isLoggedIn = useSelector((state) => state.auth.token);
console.log(isLoggedIn);

console.log(isLoggedIn);

return (
    <Routes>
             <Route path="/" element={<Login />} />
             <Route path="/signup" element={<Signup />} />
             

        
        {/* <Route
            path="/Info"
            element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Info />
                </ProtectedRoute>
            }
            /> */}
            <Route path="/Main" element={<Main />} />
              <Route path="/Info" element={<Info />} />
              <Route path="/CVGenerate" element={<CVGenerate />} />         
              <Route path="/Update" element={<Update />} />
              <Route path="/CVTemp" element={<CVTemp />} />
              <Route path="/SecondCVTemp" element={<SecondCVTemp />} />
              <Route path="/ThirdCVTemp" element={<ThirdCVTemp />} />
              <Route path="/addCompany" element={<AddCompany />} />
              <Route path="/RoleSelect" element={<RoleSelect />} />
              <Route path="/viewCompany" element={<ViewCompany />} />
              <Route path="/addRole" element={<AddRole />} />
              <Route path="/viewRole" element={<ViewRole />} />
              <Route path="/viewDepartment" element={<ViewDepartment />} />

    
    </Routes>
)

}
export default MainApp;
        
      
        
        

