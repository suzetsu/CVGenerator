import React from 'react'
import './cards.scss'
import circle from '../../images/blueCircle.png'
import circle1 from '../../images/orangeCircle.png'
import circle2 from '../../images/purpleCircle.png'
import circle3 from '../../images/greenCircle.png'
import parcels from '../../images/parcels.png'

const FirstCardContainer = () => {
  return (
    <div>
    <div className='first-card-container space-x-2'>
        <div>
            <div className='card1'>
                <div className='flex'>
                    <div>
                        <div className='circle-style'>
                            <img src={circle} alt='circle'/>
                            <img className='center-image' src={parcels} alt='parcels'/>
                        </div>
                    </div>
                    <div className='inside-text pl-4 pt-12 text-white font-helvetica'>
                        <div className='mb-2 '>User</div>
                        <div className='text-xl font-bold mb-2'>450</div>
                        <div className='mb-2'>60% Increase in 28 Days</div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='card2'>
            <div className='flex'>
                    <div>
                        <div className='circle-style'>
                            <img src={circle1} alt='circle'/>
                            <img className='center-image' src={parcels} alt='parcels'/>
                        </div>
                    </div>
                    <div className='inside-text pl-4 pt-12 text-white '>
                        <div className='mb-2 font-helvetica'>New Users</div>
                        <div className='text-xl font-bold mb-2 font-helvetica'>155</div>
                        <div className='mb-2 font-helvetica'>40% Increase in 28 Days</div>
                    </div>
                </div>

            </div>
        </div>
        <div>
            <div className='card3'>
            <div className='flex'>
                    <div>
                        <div className='circle-style'>
                            <img src={circle2} alt='circle'/>
                            <img className='center-image' src={parcels} alt='parcels'/>
                        </div>
                    </div>
                    <div className='inside-text pl-4 pt-12 text-white '>
                        <div className='mb-2 font-helvetica'>Jobs</div>
                        <div className='text-xl font-bold mb-2 font-helvetica'>52</div>
                        <div className='mb-2 font-helvetica'>80% Increase in 28 Days</div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='card4'>
            <div className='flex'>
                    <div>
                        <div className='circle-style'>
                            <img src={circle3} alt='circle'/>
                            <img className='center-image' src={parcels} alt='parcels'/>
                        </div>
                    </div>
                    <div className='inside-text pl-4 pt-12 text-white '>
                        <div className='mb-2 font-helvetica'>Hired</div>
                        <div className='text-xl font-bold mb-2 font-helvetica'>Rs. 20,00,000</div>
                        <div className='mb-2 font-helvetica'>60% Increase in 28 Days</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default FirstCardContainer