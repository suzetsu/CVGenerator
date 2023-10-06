import React, { useEffect } from 'react'
import Logo from '../images/u1.png';
import '../Dashboard/SecondCont/cards.scss'
import './Navbar.scss'
import {useSelector} from 'react-redux';
import userCircle from '../images/userCircle.png'
import userLogo from '../images/userLogo.png'
// import { getUserRole } from '../Redux/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
  const history = useNavigate();
  // const userRole = useSelector(state => state.auth.role);
  // const dispatch = useDispatch();

//  useEffect(() => {
//     dispatch(getUserRole());
//   }, [dispatch])
const handleClick = () => {
  history('/main');
}
  return (
    <div className='nav-container w-full shadow-paper '>
        <div className='side-logo'>
            <div>
            <img src={Logo} alt='logo'/>
            </div>
            <div>
            <h1 className='logo-text font-helvetica'>JPortal</h1>
            </div>
        </div>
        <div className='nav-links space-x-10 pl-24 font-helvetica'>
            
            <div className='hoverNav' onClick={handleClick}>Home</div>
            <div className='hoverNav-company'>
              Company Details
              <div className='dropdown-menu hidden absolute top-10 left-0 bg-white shadow-md py-2 '>
                <div className='pb-2'><a href='/addCompany' className='menu-item'>Add Company</a></div>
                <div><a href='/viewCompany' className='menu-item'>View Company</a></div>
              </div>
            </div>
            
            <div className='hoverNav'>CV Template List</div>
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
                {/* <div><a href='/viewRole' className='menu-item'>View Employee</a></div> */}
              </div>
              </div>
            <div className='hoverNav-company'>
              Role Management
              <div className='dropdown-menu hidden absolute top-10 left-0 bg-white shadow-md py-2'>
                <div className='pb-2'><a href='/signup' className='menu-item'>Add Role</a></div>
                <div><a href='/viewRole' className='menu-item'>View Role</a></div>
              </div>
            </div>
            <div className='hoverNav'>Settings</div>
            
           
        </div>
        <div className=' side-logo pl-48 flex gap-1'>
              <div className='relative'>
                <img src={userCircle} alt='user'/>
                <img src={userLogo} alt='user' className='center-image pb-4 pr-3'/>
              </div>
              <div className='pb-1 font-semibold text-white underline'>User</div>
            </div>
    </div>
  )
}

export default NavBar