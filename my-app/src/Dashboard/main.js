import React from 'react'
import NavBar from './Navbar'
import SecondContainer from './SecondCont/SecondContainer'
import Footer from './Footer'

const Main = () => {
  return (
    <div>
    <div className='w-full'>
       <div className = " flex flex-col" >
         <div>
         <NavBar/>
         </div>
         <div>
         <SecondContainer/>
         </div>
         <div>
          <Footer/>
         </div>
        </div> 
        </div>
    </div>
  )
}

export default Main