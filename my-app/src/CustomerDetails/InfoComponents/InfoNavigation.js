import React from 'react'
import './infoStyles.css'
import Logo from '../../images/Logo.png'

const InfoNavigation = () => {
  return (
    <div className='nav-shadow w-[100%] flex items-center justify-center'>
        <img src={Logo} alt='logo' className='umbrella-full '/>
    </div>
   
  )
}

export default InfoNavigation