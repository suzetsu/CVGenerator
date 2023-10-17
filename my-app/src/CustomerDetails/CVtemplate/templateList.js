import React from 'react'
import firstTemplate from '../../images/template1.jpg'
import secomdTemplate from '../../images/template2.jpg'
import thirdTemplate from '../../images/template3.jpg'

const templateList = () => {
  return (
    <div className=' flex justify-center pt-24 pb-10 bg-[#F0F4F3]'>
        <div className='flex flex-col gap-4'>
        <div className='text-[#666] font-helvetica pl-4 text-xl font-bold'>
        CV Templates
        </div>
        <div className='shadow-paper p-4 bg-[#fffbfb] rounded-md w-[700px]'> 
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                    <p className='p-0 m-0 text-lg font-semibold font-helvetica'>Template 1</p>
                    <div className='flex justify-center'>
                    <img src={firstTemplate} alt="" className='w-[300px]'/>
                    </div>
                </div>
               
                <div className='flex flex-col gap-2'>
                    <p className='p-0 m-0 text-lg font-semibold font-helvetica'>Template 2</p>
                    <div className='flex justify-center'>
                    <img src={secomdTemplate} alt="" className='w-[300px]'/>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='p-0 m-0 text-lg font-semibold font-helvetica'>Template 3</p>
                    <div className='flex justify-center'>
                    <img src={thirdTemplate} alt="" className='w-[300px]'/>
                    </div>
                </div>

            </div>
        </div>
        </div>
    </div>
  )
}

export default templateList