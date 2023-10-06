import React, { useEffect } from 'react'
import NavBar from '../Dashboard/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchClientInfo } from '../Redux/actions'
import { fetchCompanyInfo } from '../Redux/companyActions'

const EmployeeList = () => {
    const location = useLocation();
    const department = location.state.department;
    const companyName = location.state.companyName;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCompanyInfo());
        dispatch(fetchClientInfo());
    }, []);

    const employeeDetails = useSelector((state) => state.auth.clientData);
    console.log(employeeDetails);
    let filteredEmployees = [];

    // Filter employeeDetails based on department and companyName
    if (employeeDetails && employeeDetails.$values){
     filteredEmployees = employeeDetails.$values.filter((employee) => {
        return (
            employee.departmentName === department && 
            employee.companyName === companyName
        );
    
    
    })
  }else {
    return 0;
    }
  ;

    return (
        <div className='flex flex-col gap-9'>
            <div>
                <NavBar />
            </div>
            <div className='text-[#666] pt-[5rem] flex justify-center font-helvetica pl-4 text-lg font-bold'>
                Employee Details
            </div>
            <div className='flex justify-center items-center'>
                <table className='m-0 p-0'>
                    <thead>
                        <tr>
                            <th colSpan={1}>S.N.</th>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{employee.clientName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <div className='flex gap-2'>
                                        <p className='m-0 p-0 underline cursor-pointer'>View</p>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeeList;
