import React from 'react'
import NavBar from './Navbar'
import SecondContainer from './SecondCont/SecondContainer'
import Footer from './Footer'
import { Routes, Route, Outlet } from 'react-router-dom';
import Info from '../CustomerDetails/info';
import ViewAllEmployee from '../Employee/viewAllEmployee';
import ViewCompany from '../Company/viewCompany';
import ViewDepartment from '../Company/viewDepartment';
import ViewRole from '../Role/viewRole';
import Signup from '../Signup/signup';
import EmployeeList from '../Employee/employeeList';
import CustomDropdown from '../CustomerDetails/InfoComponents/customDropdown';
import AddCompany from '../Company/addCompany';
import CVTemp from '../CustomerDetails/CVtemplate/CVTemp';
import SecondCVTemp from '../CustomerDetails/CVtemplate/SecondCVTemp';
import ThirdCVTemp from '../CustomerDetails/CVtemplate/ThirdCVTemp';
import CVGenerate from '../CustomerDetails/CVtemplate/CVGenerate';
import './Navbar.scss'
import { useLocation } from 'react-router-dom';

const Main = () => {

  const location = useLocation();
  const company = location?.state;
  return (
    <div>
      <div>
        <NavBar/>
      </div>
    <div className='w-full pt-2'>
       <div className = "main-style flex flex-col" >
         <div>
         <SecondContainer company={company}/>
         </div>
         <div>
          <Footer/>
         </div>
        </div> 
        </div>
        <Outlet/>
    </div>
  )
}

export default Main