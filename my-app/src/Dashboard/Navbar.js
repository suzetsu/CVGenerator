import React, { useEffect, useState } from 'react'
import Logo from '../images/u1.png';
import '../Dashboard/SecondCont/cards.scss'
import './Navbar.scss'
import {useSelector} from 'react-redux';
import userCircle from '../images/userCircle.png'
import userLogo from '../images/userLogo.png'
import { login } from '../Redux/actions';
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';

const NavBar = () => {
  const history = useNavigate();
  // const userRole = useSelector(state => state.auth.role);
  const dispatch = useDispatch();
  const role=  localStorage.getItem("tokendata") &&   JSON.parse(localStorage.getItem("tokendata")).role;
  const token=  localStorage.getItem("tokendata") &&   JSON.parse(localStorage.getItem("tokendata")).token;
  console.log(token);

  // useEffect(() => {
  //   if(!localStorage.getItem("tokendata")){
  //     window.location.href = "/login";
  //   }
  // }, []);

  

  const handleLogout = () => {
    localStorage.removeItem("tokendata");
    window.location.href = "/login";
  }

  // console.log(roleName);
const handleClick = () => {
  history('/main');
}
  return (
    <>
    <div className='nav-container w-full shadow-paper flex gap-52 '>
        <div className='side-logo'>
            <div>
            <img src={Logo} alt='logo'/>
            </div>
            <div>
            <h1 className='logo-text font-helvetica'>EMS</h1>
            </div>
        </div>
        <div className='nav-links space-x-9 font-helvetica pl-1'>
            
            <div className='hoverNav' onClick={handleClick}>Home</div>
            <div className='hoverNav-company '>
              Company Details
              <div className='dropdown-menu hidden absolute shadow-md py-2 '>
                <div className='pb-2'><a href='/addCompany' className='menu-item'>Add Company</a></div>
                <div><a href='/viewCompany' className='menu-item' >View Company</a></div>
              </div>
            </div>
            
            <div className='hoverNav' onClick={() => history('/templateList')}>CV Template List</div>
            {/* {userRole === 'Admin' || userRole === 'SuperAdmin' ? (
          <div className='hoverNav'>User Management</div>
            ) : null}
            {userRole === 'SuperAdmin' ? (
          <div className='hoverNav'>Role Management</div>
             ) : null} */}
            <div className='hoverNav-company'>
              Employee Management
              <div className='dropdown-menu hidden absolute top-10 left-0 bg-white shadow-md py-2'>
                <div className='pb-2'><a href='/Info' className='menu-item'>Add Employee</a></div>
                {(role === 'SuperAdmin' || role === 'Admin') && <div className='pb-2'><a href='/viewAllEmployee' className='menu-item'>View All</a></div>}
                {/* <div><a href='/viewRole' className='menu-item'>View Employee</a></div> */}
              </div>
              </div>
            {role === 'SuperAdmin' && (
              <div className='hoverNav-company'>
              Role Management
              <div className='dropdown-menu hidden absolute top-10 left-0 bg-white shadow-md py-2'>
                <div className='pb-2'><a href='/signup' className='menu-item'>Add Role</a></div>
                <div><a href='/viewRole' className='menu-item'>View Role</a></div>
              </div>
            </div>
            )}
             {/* <div className='hoverNav-company'>
              Role Management
              <div className='dropdown-menu hidden absolute top-10 left-0 bg-white shadow-md py-2'>
                <div className='pb-2'><a href='/signup' className='menu-item'>Add Role</a></div>
                <div><a href='/viewRole' className='menu-item'>View Role</a></div>
              </div>
            </div> */}
            
            {/* <div className='hoverNav'>Settings</div> */}
            
           
        </div>
        <div className=' side-logo flex gap-1'>
              <div className='relative'>
                <img src={userCircle} alt='user'/>
                <img src={userLogo} alt='user' className='center-image pb-4 pr-3'/>
              </div>
              <div className='pb-1 font-semibold text-white underline cursor-pointer' onClick={handleLogout}>
                Logout
               
              </div>
              
            </div>
    </div>
    <Outlet />
    </>
  )
}

export default NavBar