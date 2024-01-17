import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientInfo } from '../Redux/actions';
import { useNavigate } from 'react-router-dom';
import {fetchCompanyInfo} from '../Redux/companyActions'
import './styleCompany.css'
import Navbar from '../Dashboard/Navbar'
import { updateCompanyInfo } from '../Redux/companyActions';
import {deleteCompanyInfo} from '../Redux/companyActions'
import '../Role/roletable.css'
import ViewDepartment from './viewDepartment';
import { login } from '../Redux/actions';
import deleteIcon from "../images/delete.png";
import editIcon from "../images/blue-edit.png";
import viewIcon from "../images/green-eye.png";
import CompanyDashboardNav from '../Dashboard/CompanyDashboardNav';
import DeleteUserPopup from '../Role/DeleteUserPopup';


const CompanyDetailsPopup = ({ companyInfo, onClose, onUpdate }) => {
  const [editedCompany, setEditedCompany] = useState({ ...companyInfo });
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  setEditedCompany({
    ...editedCompany,
    [name]: value,
  });
  };

  const handleUpdate = () => {
    const PAN = editedCompany.pan;
    const name = editedCompany.name;
    const address = editedCompany.address;
    const email = editedCompany.email;
    const departments = editedCompany.departments;
    onUpdate(PAN, name, address, email, departments);
    
    

    onClose(); // Close the popup
  };

  return (
    <div className='popup-container-edit'>
      <div className='popup-content-edit'>
        <h2>Edit Company Details</h2>
        <div className='flex flex-col gap-2'>
        <div className='info-input-field'>
          <label>Company PAN:</label>
          <input
            type='string'
            name='pan'
            value={editedCompany.pan}
            onChange={handleInputChange}
          />
        </div>
        <div className='info-input-field'>
          <label>Company Name:</label>
          <input
            type='text'
            name='name'
            value={editedCompany.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='info-input-field'>
          <label>Company Address:</label>
          <input
            type='text'
            name='address'
            value={editedCompany.address}
            onChange={handleInputChange}
          />
        </div>
        
          <div className='flex flex-row gap-2 button-container'>
          <div>
            <button
              onClick={handleUpdate}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
            >
              Update
            </button>
            </div>
            <div>
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
    </div>
  );
};

const ViewCompany = ({ isLoggedIn}) => {

    const [showDetailsPopup, setShowDetailsPopup] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const role=  localStorage.getItem("tokendata") &&   JSON.parse(localStorage.getItem("tokendata")).role;
    const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchCompanyInfo())
}, [])

const companyDetails = useSelector((state) => state.company.companyData);
const handleOpenPasswordPopup = (company) => {
  setIsPasswordPopupOpen(true);
  setSelectedCompany(company)
}

const handleClosePasswordPopup = (company) => {
  setIsPasswordPopupOpen(false);
  setSelectedCompany(null);


};



  const handleEditClick = (company) => {
    // setShowDetailsPopup(true);
    // setSelectedCompany(company);
    history('/editCompany', {state: { company}})
    
  };

  const handleClosePopup = () => {
    setShowDetailsPopup(false);
  }
  const dispatch = useDispatch()
  const history = useNavigate()

  useEffect(() => {
      dispatch(fetchClientInfo());
  }, [])

  const CompanyId = selectedCompany && selectedCompany?.companyId
  
  
 
  const handleDeleteCompany = (userId, userPassword) => {  
    // const CompanyId = company.companyId
    // console.log(CompanyId)
    // setSelectedCompany(company);
    const deletedCompany = {
      userId,
      userPassword,
      
    }
    

    dispatch(deleteCompanyInfo(CompanyId, deletedCompany))
    // window.location.reload()
  }
    
  
  const handleUpdateCompany = (PAN, name, address, email, departments) => {
  
    
    const updatedcompany = {
      PAN,
      name,
      address,
      email,
      departments

    }
 
  
    dispatch(updateCompanyInfo(CompanyId, updatedcompany))

    
    handleClosePopup();
    
  };

  const viewDepartment = (company) => {
    
    setSelectedCompany(company)
    
    
    history('/viewDepartment', {state: company})
  }
 
  
  

  return (
    <div className='bg-[#F0F4F3] h-[100vh]'>
    <div className='flex flex-col '>
    <div>
        <CompanyDashboardNav />
      </div>
      
      <div className='flex flex-col justify-center pt-32 items-center'>
      <div className='text-[#666] font-helvetica pl-4 text-lg font-bold'>
        Company Details
      </div>

                  <table className='m-[1rem]'>
                    <thead>
                    <tr>
                        <th colSpan={1}>S.N.</th>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Edit</th>
                        <th>View Department</th>
                    </tr>
                    </thead>
                  
                        {/* <RoleTable Users={Users} /> */}
                    {
                    companyDetails && Array.isArray(companyDetails.$values) &&
                    ( 
                      companyDetails.$values.map((company, index) => {
                        const name = company.name;
                        const email = company.email;
                        const address = company.address
                    
                        
                    return (
                        <tbody>
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{address}</td>
                                <td>
                                    <div className='flex gap-2'>
                                    {(role === 'SuperAdmin' || role === 'Admin') && <p className='m-0 p-0 underline border-b-2 cursor-pointer' onClick={() => handleEditClick(company)}>
                                      <img src={editIcon} alt="edit" className='w-5 h-5' />
                                    </p>}
                                    {role === 'SuperAdmin' && <p className='m-0 p-0 underline border-b-2 cursor-pointer' onClick={() => handleOpenPasswordPopup(company)}>
                                    <img src={deleteIcon} alt="delete" className='w-5 h-5' /></p>}
                                    </div>
                                </td>
                                <td>
                                  <div className='flex justify-center'>
                                  <p className='m-0 p-0 underline border-b-2 cursor-pointer'onClick={() => viewDepartment(company)}>
                                  <img src={viewIcon} alt="view" className='w-5 h-5' />
                                  </p>
                                  </div>
                                </td>
                            </tr>
                        </tbody>
                    );
                    })
                  )}

                  </table>

</div>
{showDetailsPopup && (
        <div className='flex popup-container justify-center'>
          <CompanyDetailsPopup
            companyInfo={selectedCompany}
            onClose={handleClosePopup}
            onUpdate={handleUpdateCompany} // Pass the update function
          />
        </div>
      )}
      {
        isPasswordPopupOpen && (
          <DeleteUserPopup
          onClose={handleClosePasswordPopup}
          onCompanySave={handleDeleteCompany}
          CompanyId = {CompanyId}
          />
        ) 
      }
      
      
</div>
</div>
  )
}

    {/* <div className='flex  font-helvetica p-4 '>
        <div className='bg-white shadow-paper flex flex-col table-wrapper '> 
            <div className='bg-[#F39C12] p-2 flex gap-40 table-header text-left'>
            <p className='p-0 m-0' style={{ width: '10%' }}>S.N.</p>
            <p className='p-0 m-0' style={{ width: '35%' }}>Company Name</p>
            <p className='p-0 m-0' style={{ width: '35%' }}>Address</p>
            <p className='p-0 m-0' style={{ width: '10%' }}>Edit</p>
            <p className='p-0 m-0' style={{ width: '10%' }}>Employee</p>
            </div>
            <div className='flex flex-col p-2 text-left'>
            {Array.isArray(companyDetails.$values) &&
            companyDetails.$values.map((company, index) => (
              <div key={company.companyId} >
              <div className='flex gap-40'>
              <p className='p-0 m-0' style={{ width: '10%' }}>{index + 1}</p>
              <p className='p-0 m-0' style={{ width: '35%', whiteSpace: 'nowrap' }}>{company.name}</p>
              <p className='p-0 m-0' style={{ width: '35%' }}>{company.address}</p>
              <div className='flex gap-2' style={{ width: '10%' }}>
                <a href='#' className='p-0 m-0' onClick={() => handleEditClick(company)}>Edit</a>
                <a href='' className='p-0 m-0' onClick={() => handleDeleteCompany(company)}>Delete</a>
              </div>
              <a href='' className='p-0 m-0' style={{ width: '10%' }}>View</a>
            </div>
                <hr></hr> 
              </div>
                ))}
                
                
            </div>
            
          
      
        </div>
        {showDetailsPopup && (
        <div className='flex popup-container justify-center'>
          <CompanyDetailsPopup
            companyInfo={selectedCompany}
            onClose={handleClosePopup}
            onUpdate={handleUpdateCompany} // Pass the update function
          />
        </div>
      )}
    </div> */}
   

export default ViewCompany