import React from 'react'
import './cards.scss'
import homelogo from '../../images/Vector.png'
import arrow from '../../images/arrow.png'
import redarrow from '../../images/redarrow.png'
import carkey from '../../images/car-key.png'
import lot from '../../images/lot.png'
import GreenRect from '../../images/GreenRect.png'
import LightRect from '../../images/LightRect.png'
import WhiteRect from '../../images/WhiteRect.png'

const SecondCardContainer = () => {
  return (
    <div className='pt-4'>
    <div className='first-card-container space-x-2'>
    <div>
            <div className='card5'>
              <div className='flex flex-col gap-6 p-4'>
                  <div className='flex flex-col'>
                    <p className='font-helvetica font-bold text-lg'>Hiring</p>
                    <div className='flex '>
                     
                      <div className='pt-3'>
                          <img src={homelogo} alt='logo'/>
                      </div>
                      <div className='pl-3 flex flex-col gap-3'>
                        <div className='font-helvetica text-sm font-semibold'>In Home</div>
                        <div className='font-helvetica text-sm font-semibold'>20</div>
                      </div>
                      
                      
                      <div className='pt-3 pl-12'>
                          <img src={arrow} alt='logo'/>
                      </div>
                      <div className='pl-2 flex flex-col gap-3'>
                        <div className='font-helvetica text-sm font-semibold'>Arrival</div>
                        <div className='font-helvetica text-sm font-semibold'>20</div>
                      </div>

                      <div className='pt-3 pl-12'>
                          <img src={redarrow} alt='logo'/>
                      </div>
                      <div className='pl-2 flex flex-col gap-3'>
                        <div className='font-helvetica text-sm font-semibold'>Departure</div>
                        <div className='font-helvetica text-sm font-semibold'>20</div>
                      </div>
                    </div>
                    
                  </div>
                  <div className='flex flex-col'>
                    <p className='font-helvetica font-bold text-lg'>Employed Users</p>
                    <div className='flex '>
                     
                      <div className='pt-3'>
                          <img src={carkey} alt='logo'/>
                      </div>
                      <div className='pl-3 flex flex-col gap-3'>
                        <div className='font-helvetica text-sm font-semibold'>Employed</div>
                        <div className='font-helvetica text-sm font-semibold'>25</div>
                      </div>

                      <div className='pt-3 pl-28'>
                          <img src={lot} alt='logo'/>
                      </div>
                      <div className='pl-2 flex flex-col gap-3'>
                        <div className='font-helvetica text-sm font-semibold'>Vacant Jobs</div>
                        <div className='font-helvetica text-sm font-semibold'>04</div>
                      </div>
                    </div>
                    
                  </div>

                  
              </div>
            </div>
        </div>
        <div>
            <div className='card5'>
              <div className='flex flex-col pl-8 pt-16'>
                <div className='font-helvetica font-bold text-2xl'>Job Vacancy</div>
                <div className='flex pt-6 gap-6'>
                  <div className='flex flex-col gap-3'>
                    <div className='flex gap-2'>
                      <div>
                        <img src={GreenRect} alt='logo' className='pt-1'/>
                        </div>
                      <div className='text-lg font-helvetica' style={{fontWeight: '400'}}>Available</div>
                    </div>
                    <div className='text-xl font-semibold'>
                      49
                    </div>
                  </div>

                  <div className='flex flex-col gap-3'>
                    <div className='flex gap-2'>
                      <div>
                        <img src={LightRect} alt='logo' className='pt-1'/>
                        </div>
                      <div className='text-lg font-helvetica' style={{fontWeight: '400'}}>Occupied</div>
                    </div>
                    <div className='text-xl font-semibold'>
                      09
                    </div>
                  </div>

                  <div className='flex flex-col gap-3'>
                    <div className='flex gap-2'>
                      <div>
                        <img src={WhiteRect} alt='logo' className='pt-1'/>
                        </div>
                      <div className='text-lg font-helvetica' style={{fontWeight: '400'}}>Not Ready</div>
                    </div>
                    <div className='text-xl font-semibold'>
                      15
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div>
            <div className='card5'>
              <div className='flex flex-col font-helvetica gap-2 pt-6 pl-8'>
                <div className='text-3xl font-bold'>
                  Users
                </div>
                <div className='font-semibold text-xl'>
                  Last 30 Days
                </div>
                <div className='text-lg'>
                  1500
                </div>
                <div className='font-semibold  text-xl'>
                  Yesterday
                </div>
                <div className='text-lg'>
                  1500
                </div>
                <div className='font-semibold text-xl'>
                  Today
                </div>
                <div className='text-lg'>
                  1500
                </div>

              </div>
            </div>
        </div>
    </div>
    
    </div>
  )
}

export default SecondCardContainer