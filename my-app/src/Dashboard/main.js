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

const Main = () => {
  return (
    <div>
    <div className='w-full'>
       <div className = "main-style flex flex-col" >
         <div>
         <SecondContainer/>
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