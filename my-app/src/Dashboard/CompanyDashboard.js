import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientInfo } from '../Redux/actions';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { fetchCompanyInfo } from '../Redux/companyActions'
import { setCompany } from '../Redux/companyActions';
import '../Company/styleCompany.css'
import Navbar from '../Dashboard/Navbar'
import { updateCompanyInfo } from '../Redux/companyActions';
import { deleteCompanyInfo } from '../Redux/companyActions'
import '../Role/roletable.css'
// import ViewDepartment from './viewDepartment';
import { login } from '../Redux/actions';
import deleteIcon from "../images/delete.png";
import editIcon from "../images/blue-edit.png";
import viewIcon from "../images/green-eye.png";

import CompanyDashboardNav from './CompanyDashboardNav';
import NavBar from '../Dashboard/Navbar';
import * as actionTypes from "../Redux/actionTypes"
import { insertCompanyDetails } from '../Redux/thirdReducer';


const CompanyDashboard = ({ isLoggedIn }) => {

  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const role = localStorage.getItem("tokendata") && JSON.parse(localStorage.getItem("tokendata")).role;
  const location = useLocation();
  useEffect(() => {
    dispatch(fetchCompanyInfo())
  }, [])

  const companyDetails = useSelector((state) => state.company.companyData);

  const handleClosePopup = () => {
    setShowDetailsPopup(false);
  }
  const dispatch = useDispatch()
  const history = useNavigate()

  useEffect(() => {
    dispatch(fetchClientInfo());
  }, [])



  const token = localStorage.getItem("tokendata") && JSON.parse(localStorage.getItem("tokendata")).token;


  useEffect(() => {
    if (!localStorage.getItem("tokendata")) {
      window.location.href = "/login";
    }
  }, []);


  // const handleCompanyClick = (company) => {
  //   history("/", { state: {company } })
  //   setChosenCompany(company)
  // }
const navigate = useNavigate()
  return (
    <div className='bg-[#F0F4F3] h-[100vh]'>
      <CompanyDashboardNav />
      <div className='flex flex-col '>


        <div className='flex flex-col justify-center pt-32 items-center'>
          <div className='text-[#666] font-helvetica pl-4 text-lg font-bold'>
            Select Company
          </div>

          <table className='m-[1rem]'>
            <thead>
              <tr>
                <th colSpan={1}>S.N.</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Address</th>
                {/* <th>Edit</th> */}

              </tr>
            </thead>

            {/* <RoleTable Users={Users} /> */}
            {
              companyDetails && Array.isArray(companyDetails.$values) &&
              (
                companyDetails.$values.map((companyInf, index) => {
                  const name = companyInf.name;
                  const email = companyInf.email;
                  const address = companyInf.address


                  return (
                    <tbody>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td><Link to="/main" onClick={()=> {dispatch(insertCompanyDetails(companyInf)); }} >{name}</Link></td>
                        <td>{email}</td>
                        <td>{address}</td>
                        {/* <td>
                                    <div className='flex gap-2'>
                                    {(role === 'SuperAdmin' || role === 'Admin') && <p className='m-0 p-0 underline border-b-2 cursor-pointer' onClick={() => handleEditClick(company)}>
                                      <img src={editIcon} alt="edit" className='w-5 h-5' />
                                    </p>}
                                    {role === 'SuperAdmin' && <p className='m-0 p-0 underline border-b-2 cursor-pointer' onClick={() => handleDeleteCompany(company)}>
                                    <img src={deleteIcon} alt="delete" className='w-5 h-5' /></p>}
                                    </div>
                                </td> */}
                        {/* <td>
                                  <div className='flex justify-center'>
                                  <p className='m-0 p-0 underline border-b-2 cursor-pointer'onClick={() => viewDepartment(company)}>
                                  <img src={viewIcon} alt="view" className='w-5 h-5' />
                                  </p>
                                  </div>
                                </td> */}
                      </tr>
                    </tbody>
                  );
                })
              )}

          </table>

        </div>



      </div>
    </div>
  )
}




export default CompanyDashboard