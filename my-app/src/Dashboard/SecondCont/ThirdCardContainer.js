import React from 'react'
import './cards.scss'

const ThirdCardContainer = () => {
    const data = [
        {
          name: 'Faruk Ahmed',
          phoneNumber: '9812121212',
          date: '2021-01-01'
        },
        {
            name: 'Faruk Ahmed',
            phoneNumber: '9812121212',
            date: '2021-01-01'
          },
          {
            name: 'Faruk Ahmed',
            phoneNumber: '9812121212',
            date: '2021-01-01'
          },
          {
            name: 'Faruk Ahmed',
            phoneNumber: '9812121212',
            date: '2021-01-01'
          },
          {
            name: 'Faruk Ahmed',
            phoneNumber: '9812121212',
            date: '2021-01-01'
          },
    ]
  return (
    <div className='pt-4'>
        <div className='flex space-x-2'>
                <div className='card6'>
                        <div className='pl-4 pt-8 pr-4'>
                            <div className='flex gap-[356px]'>
                                <div className='font-helvetica font-semibold underline' >New Customers</div>
                                <div className='flex gap-1 font-helvetica'>
                                    <div className='underline font-semibold'>View All</div>
                                    <div className='font-bold' style={{ letterSpacing: '-0.2em'}}>&gt;&gt;</div>
                                </div>
                            </div>
                            <div className='flex flex-col pt-6'>
                                {data.map((item, index) => (
                                    <div key={index}>
                                        <div className='flex font-helvetica gap-32'>
                                            
                                            <div className='font-extrabold'>
                                                {item.name}
                                            </div>
                                            <div>
                                                {item.phoneNumber}
                                            </div>
                                            <div>
                                                {item.date}
                                            </div>
                                            
                                        </div>
                                        <div className='pt-2 pb-2'>
                                            
                                            <hr className=' border-gray-300' />
                                            
                                        </div>
                                    </div>
                            ))}   
                            </div>
                        </div>
                </div>
                <div className='card6'>
                    hi
                </div>
                
            </div>
        </div>

  )
}

export default ThirdCardContainer