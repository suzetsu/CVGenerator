import React from 'react'
import { useLocation } from 'react-router-dom'
import NavBar from '../Dashboard/Navbar'

const ViewDepartment = () => {

    const location = useLocation()
    const company = location?.state?.company

  return (
    <div  className='flex flex-col gap-9'>
        <div>
            <NavBar />
        </div>
        <div className='text-[#666] pt-[5rem] flex justify-center font-helvetica pl-4 text-lg font-bold'>
        Department Details
      </div>
        <div className='flex justify-center items-center '>
       

          <table className='m-0 p-0'>
            <thead>
            <tr>
                <th colSpan={1}>S.N.</th>
                <th>Department Name</th>
                <th>Total Employee</th>
                <th>View Employee</th>
                
            </tr>
            </thead>
           
                {/* <RoleTable Users={Users} /> */}
            
                <tbody>
                    <tr >
                        <td>S.N.</td>
                        <td>Department Name</td>
                        <td>Total Employee</td>
                        
                        <td>
                            <div className='flex gap-2'>
                            <p className='m-0 p-0 underline cursor-pointer' >Edit</p>
                            <p className='m-0 p-0 underline cursor-pointer' >Delete</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            
            
          </table>
        


        </div>
        </div>
  
  )
}

export default ViewDepartment