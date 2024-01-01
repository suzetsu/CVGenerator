import React from 'react'
import './secondcontainer.scss'
import FirstCardContainer from './FirstCardContainer'
import SecondCardContainer from './SecondCardContainer'
import ThirdCardContainer from './ThirdCardContainer'

const SecondContainer = ({company}) => {
  return (
    <div className='second-cont w-full'>
      <div className='inside-container'>
        <p className='dashboard-text'>Dashboard</p>
        <div >
            <FirstCardContainer company={company}/>
        </div>
        <div>
          <SecondCardContainer/>
        </div>
        <div>
          <ThirdCardContainer/>
        </div>
      </div>
    </div>
  )
}

export default SecondContainer