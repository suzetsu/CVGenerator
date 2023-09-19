import React from 'react'
import InfoNavigation from './InfoComponents/InfoNavigation'
import InfoBody from './InfoComponents/InfoBody'
// import EditUpdate from './InfoComponents/EditUpdate'

const Info = () => {
  return (
    <div >
        <div className='flex flex-col gap-[4rem]'>
            <div>
            <InfoNavigation/>
            </div>
          <div>
            <InfoBody/>
            </div>
            {/* <EditUpdate/> */}
           
        </div>
    </div>
  )
}

export default Info