import React, { useEffect } from 'react'
import Logo from '../images/u1.png';
import '../Dashboard/SecondCont/cards.scss'
import './Navbar.scss'
import {useSelector} from 'react-redux';
import userCircle from '../images/userCircle.png'
import userLogo from '../images/userLogo.png'
// import { getUserRole } from '../Redux/actions';
import { useDispatch } from 'react-redux';
const NavBar = () => {
  // const userRole = useSelector(state => state.auth.role);
  // const dispatch = useDispatch();

//  useEffect(() => {
//     dispatch(getUserRole());
//   }, [dispatch])

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
        <div className='nav-links space-x-8 pl-24 font-helvetica'>
            
            <div className='hoverNav'>Home</div>
            <div className='hoverNav'>Member's Details</div>
            <div className='hoverNav'>CV category</div>
            <div className='hoverNav'>CV Template List</div>
            {/* {userRole === 'Admin' || userRole === 'SuperAdmin' ? (
          <div className='hoverNav'>User Management</div>
            ) : null}
            {userRole === 'SuperAdmin' ? (
          <div className='hoverNav'>Role Management</div>
             ) : null} */}
            <div className='hoverNav'>User Management</div>
            <div className='hoverNav'>Role Management</div>
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