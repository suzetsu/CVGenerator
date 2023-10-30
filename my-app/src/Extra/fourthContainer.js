import React from 'react'
import cablecar1 from '../images/cablecar1.png'
import './styleImage.css'

const FourthContainer = () => {
  return (
    <div className='second-cont-child'>
                  <div className='intro-part'>
                    <div className=' left-text'>
                      <p className='all-texts'>Our Mission</p>
                      <div className='w-[300px]'>
                      <span>At Skywalk Nepal, we are redefining the very essence of event spaces, proudly introducing Nepal’s first-ever Skywalk. Our towering marvel stands tall at 256 feet, offering a mesmerizing fusion of breathtaking views and world-class amenities.
Nestled amidst the scenic beauty of the valley, Skywalk Nepal provides an exceptional event experience that combines awe-inspiring panoramas with state-of-the-art facilities.
Skywalk Nepal provides an exceptional event experience that combines awe-inspiring panoramas with state-of-the-art facilities.
                        </span>
                      </div>
                    </div>
                    <div>
                      <img src={cablecar1} alt='img' className='h-[500px]'/>
                    </div>
                  </div>

                </div>
  )
}

export default FourthContainer