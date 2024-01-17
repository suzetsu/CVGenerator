import React from 'react'
import './Navbar.scss'
import umlogo from '../images/u1.png'
import userCircle from '../images/userCircle.png'
import userLogo from '../images/userLogo.png'
import { useNavigate } from 'react-router-dom'

const CompanyDashboardNav = () => {
    const role = localStorage.getItem("tokendata") && JSON.parse(localStorage.getItem("tokendata")).role;
    const history = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("tokendata");
        localStorage.removeItem("selectedCompany");
        window.location.href = "/login";
    }
    const handleClick = () => {
        history('/');
    }
    return (
        <div className='nav-container shadow-paper flex justify-between items-center gap-2'>
            <div className='flex justify-center items-center gap-2 pl-5'>
                <h3 className='font-helvetica text-slate-50 text-3xl p-0 m-0'>EMS</h3>
                <img src={umlogo} alt='logo' className='w-[3rem] h-[3rem]' />
            </div>

            <div className='nav-links flex  gap-20 font-helvetica items-center'>

                <div className='hoverNav' onClick={handleClick}>Home</div>
                {role === 'SuperAdmin' && (
                    <div className='hoverNav-company '>
                        Company Details
                        <div className='dropdown-menu hidden absolute shadow-md py-2 '>
                            <div className='pb-2'><a href='/addCompany' className='menu-item'>Add Company</a></div>
                            <div><a href='/viewCompany' className='menu-item' >View Company</a></div>
                        </div>
                    </div>)}


                <div className='hoverNav' onClick={() => history('/templateList')}>CV Template List</div>
                {role === 'SuperAdmin' && (
              <div className='hoverNav-company'>
              Role Management
              <div className='dropdown-menu hidden absolute top-10 left-0 bg-white shadow-md py-2'>
                <div className='pb-2'><a href='/signup' className='menu-item'>Add Role</a></div>
                <div><a href='/viewRole' className='menu-item'>View Role</a></div>
              </div>
            </div>
            )}
                {/* {userRole === 'Admin' || userRole === 'SuperAdmin' ? (
      <div className='hoverNav'>User Management</div>
        ) : null}
        {userRole === 'SuperAdmin' ? (
      <div className='hoverNav'>Role Management</div>
         ) : null} */}
{/*               
                {role === 'SuperAdmin' && (
                    <div className='hoverNav-company'>
                        Role Management
                        <div className='dropdown-menu hidden absolute top-10 left-0 bg-white shadow-md py-2'>
                            <div className='pb-2'><a href='/signup' className='menu-item'>Add Role</a></div>
                            <div><a href='/viewRole' className='menu-item'>View Role</a></div>
                        </div>
                    </div>
                )} */}
                {/* <div className='hoverNav-company'>
          Role Management
          <div className='dropdown-menu hidden absolute top-10 left-0 bg-white shadow-md py-2'>
            <div className='pb-2'><a href='/signup' className='menu-item'>Add Role</a></div>
            <div><a href='/viewRole' className='menu-item'>View Role</a></div>
          </div>
        </div> */}

                {/* <div className='hoverNav'>Settings</div> */}

                <div className=' side-logo flex gap-1 '>
                    <div className='relative'>
                        <img src={userCircle} alt='user' />
                        <img src={userLogo} alt='user' className='center-image pb-4 pr-3' />
                    </div>
                    <div className='pb-1 font-semibold text-white underline cursor-pointer' onClick={handleLogout}>
                        Logout

                    </div>

                </div>
            </div>
        </div>
    )
}

export default CompanyDashboardNav