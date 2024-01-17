import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../Dashboard/Navbar';
import EmployeeList from '../Employee/employeeList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientInfo } from '../Redux/actions';
import viewIcon from "../images/green-eye.png";


const ViewDepartment = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const company = location.state;
 
  
  const department = company.departments.$values;
  const companyName = company.name;
  const employeeDetails = useSelector((state) => state.auth.clientData)

  
    
  // Filter employees based on the selected company name
const matchedDepartments = employeeDetails && employeeDetails.$values
.filter((employee) => employee.companyName === companyName)
.map((depart) => depart.departmentName);

// Filter out duplicate departments already present in company.departments.$values
const uniqueMatchedDepartments = matchedDepartments && matchedDepartments.filter(
(depart) => !department.includes(depart)
);

// Concatenate departments
const totalDepartments = department.concat(uniqueMatchedDepartments);


  const [selectedDepartment, setSelectedDepartmentSet] = useState('');
  const history = useNavigate();

  const viewEmployee = (department) => {
    setSelectedDepartmentSet(department);
    history('/employeeList', { state: { department, companyName } });
    
  };


  useEffect(() => {
    dispatch(fetchClientInfo());
  }, []);

  
 
  const companyData = useSelector((state) => state.auth.companyData);

  
  const getEmployeeCountByDepartment = (department) => {
    if (employeeDetails && employeeDetails.$values){
    const filteredEmployees = employeeDetails.$values.filter(
      (employee) => employee.departmentName === department && employee.companyName === companyName
    );
    return filteredEmployees.length;
    } else {
      return 0;
    }
  };
  // console.log(employeeCount);

  return (
    <div className='flex flex-col gap-9'>
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
          <tbody>
            {Array.isArray(totalDepartments) &&
              totalDepartments.map((department, index) => {
                const employeeCount = getEmployeeCountByDepartment(department);
                const departmentId = department.departmentId;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{department}</td>
                    <td>{employeeCount}</td>
                    <td>
                      <div className='flex gap-2'>
                        <p
                          className='m-0 p-0 underline cursor-pointer'
                          onClick={() => viewEmployee(department)}
                        >
                          <img src={viewIcon} alt='view' className='w-5 h-5' />
                        </p>
                        
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDepartment;
