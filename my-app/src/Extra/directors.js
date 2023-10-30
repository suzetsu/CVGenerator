import React from 'react'
import directors from '../images/directors.png'

const Directors = () => {
  return (
    <div className='flex justify-center'>
            <div className='images'>
                <div className='flex gap-20'>
                <img src={directors} alt='Directors'/>
                <img src={directors} alt='Directors'/>
                <img src={directors} alt='Directors'/>
                </div>
                <div className='flex gap-20'>
                <img src={directors} alt='Directors'/>
                <img src={directors} alt='Directors'/>
                <img src={directors} alt='Directors'/>
                </div>
                

            </div>
    </div>
  )
}

export default Directors