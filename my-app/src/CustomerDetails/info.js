import React from 'react'
import InfoNavigation from './InfoComponents/InfoNavigation'
import InfoBody from './InfoComponents/InfoBody'
import NavBar from '../Dashboard/Navbar'
// import EditUpdate from './InfoComponents/EditUpdate'

const Info = () => {
  return (
    <div >
        <div className='flex flex-col gap-[4rem]'>
            <div>
            <NavBar/>
            </div>
          <div>
            <InfoBody/>
            </div>
           
        </div>
    </div>
  )
}

export default Info

