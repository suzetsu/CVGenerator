import React, { useState, useEffect } from 'react'
import '../InfoComponents/infoStyles.css'
import { useNavigate } from 'react-router-dom';


const CVGenerate = ({employee, onClose}) => {
  const history = useNavigate();


      
  return (
    <div className='popup-container-edit'>
        <div className='popup-content-edit'>
        <h2>Generate CV</h2>
        <div className=' flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
              
                
                <div>
                  <div className='flex gap-2'>
                    <div className='flex flex-col gap-2'>
                      <p className='pb-0 m-0 font-helvetica text-xs font-semibold'>Template 1</p>
                    </div>
                    <div className=' pt-[22px]'>
                      <button className='btn-info1' onClick={() => history('/CVTemp', { state: { employee } })}>
                        Generate
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='flex gap-2'>
                    <div className='flex flex-col gap-2'>
                      <p className='pb-0 m-0 font-helvetica text-xs font-semibold'>Template 2</p>
                      
                    </div>
                    <div className='pt-[22px]'>
                      <button className='btn-info1' onClick={() => history('/SecondCVTemp', { state: { employee } })}>
                        Generate
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='flex gap-2'>
                    <div className='flex flex-col gap-2'>
                      <p className='pb-0 m-0 font-helvetica text-xs font-semibold'>Template 3</p>
                    </div>
                    <div className='pt-[22px]'>
                      <button className='btn-info1' onClick={() => history('/ThirdCVTemp', { state: { employee } })}>
                        Generate
                      </button>
                    </div>
                    
                  </div>
                </div>
                <button
                      onClick={onClose}
                      className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
                    >
                      Cancel
                    </button>

            </div>
        </div>
        </div>
    </div>
  )

};
export default CVGenerate