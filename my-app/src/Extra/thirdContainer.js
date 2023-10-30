import React from 'react'
import cablecar from '../images/cablecar image.png'
import './styleImage.css'

const ThirdContainer = () => {
  return (
    
                <div className='second-cont-child'>
                  <div className='intro-part'>
                  <div>
                      <img src={cablecar} alt='img' className='h-[500px]'/>
                    </div>
                    <div className='right-text'>
                    <div>
                      <p className='all-texts'>Our Vision</p>
                      <div className='w-[300px]'>
                      <span>At Skywalk Nepal, we are redefining the very essence of event spaces, proudly introducing Nepal’s first-ever Skywalk. Our towering marvel stands tall at 256 feet, offering a mesmerizing fusion of breathtaking views and world-class amenities.
                            Nestled amidst the scenic beauty of the valley, Skywalk Nepal provides an exceptional event experience that combines awe-inspiring panoramas with state-of-the-art facilities.
                            Skywalk Nepal provides an exceptional event experience that combines awe-inspiring panoramas with state-of-the-art facilities.</span>
                      </div>
                      </div>
                    </div>
                    
                  </div>

                
            </div>
  )
}

export default ThirdContainer