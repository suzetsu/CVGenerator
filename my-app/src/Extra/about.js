import React from 'react'
import bg from '../images/bg.png'
import butwalHills from '../images/butwall hills image.png'
import Line1 from '../images/Line1.png'
import './styleImage.css'
import ThirdContainer from './thirdContainer'
import FourthContainer from './fourthContainer'
import FifthContainer from './fifthContainer'
import Directors from './directors'

const about = () => {
  return (
    <div className='main-cont'>
          
            <div className='image-css'>
              <img src={bg} alt='bg'/>
              <p className='pt-10'>About</p>
            </div>
            <div className='pt-10'>
            <div className='second-cont'>
                <div className='second-cont-child pt-[2.5rem]'>
                  <div className='intro-part'>
                    <div className=' left-text'>
                      <p className='all-texts'>Butwal Hills</p>
                      <div className='w-[300px]'>
                      <span>At Skywalk Nepal, we are redefining the very essence of event spaces, proudly introducing Nepal’s first-ever Skywalk. Our towering marvel stands tall at 256 feet, offering a mesmerizing fusion of breathtaking views and world-class amenities.
                            Nestled amidst the scenic beauty of the valley, Skywalk Nepal provides an exceptional event experience that combines awe-inspiring panoramas with state-of-the-art facilities.
                            Skywalk Nepal provides an exceptional event experience that combines awe-inspiring panoramas with state-of-the-art facilities.</span>
                      </div>
                    </div>
                    <div>
                      <img src={butwalHills} alt='img' className='h-[500px]'/>
                    </div>
                  </div>

                </div>
                <ThirdContainer/>
                <FourthContainer/>
                <FifthContainer/>
                <div className='flex justify-center'>
                <div className=' break-sentence '>
                  <img src={Line1} alt= 'line' />
                  <p>MEET OUR BOARD OF DIRECTORS</p>
                  <img src={Line1} alt= 'line' />
                </div>
                </div>
                
                <Directors />
                
                </div>
            </div>
            
            


    </div>
  )
}

export default about