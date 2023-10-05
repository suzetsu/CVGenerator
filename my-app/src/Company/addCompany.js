import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCompany } from '../Redux/companyActions'
import { fetchCompanyInfo } from '../Redux/companyActions'
import Navbar from '../Dashboard/Navbar'
import './styleCompany.css'
import Logo from '../images/Logo.png'



const AddCompany = () => {

    const [PAN, setPAN] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [department, setSelectedDepartment] = useState([]);
    const [currentDepartment, setCurrentDepartment] = useState(''); // Store current input department
    const [error, setError] = useState('')
    const successStatus = useSelector(state => state.company.companyCreationStatus)

    const dispatch = useDispatch()

    const handleKeyPress = (e) => {
      // Handle keypress in the input field
      if (e.key === 'Enter') {
        e.preventDefault();
        const departmentToAdd = currentDepartment.trim();
        if (departmentToAdd) {
          setSelectedDepartment([...department, departmentToAdd]);
          setCurrentDepartment('');
          
        }
      }
    };
  
    const removeDepartment = (index) => {
      // Remove a role from the roles array
      const updatedDepartment = [...department];
      updatedDepartment.splice(index, 1);
      setSelectedDepartment(updatedDepartment);

    };
    const handleDepartmentSelect = (e) => {
      // Handle the selection of roles from the dropdown
      const selectedDepartment = e.target.value;
      setSelectedDepartment([...department, selectedDepartment]);
    };
    const handlePanChange = (e) => {
      setPAN(e.target.value)
      setError('')
    }
    const handleNameChange = (e) => {
      setName(e.target.value)
      setError('')
    }
    const handleEmailChange = (e) => {
      setEmail(e.target.value)
      setError('')
    }
    const handleAddressChange = (e) => {
      setAddress(e.target.value)
      setError('')
    }
    const isValidEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }



    const handleClick = (e) => {
      e.preventDefault();
      if (PAN === '' || name === '' || email === '' || address === '') {
        setError('Please fill all the fields')
      }
      else if (!isValidEmail(email)){
        setError('Invalid Email')
      }
      else{
        dispatch(createCompany({ PAN, name, address, email } ));
        setError('') 
      }
      if (successStatus === 'success'){
        setName('')
        setEmail('')
        setAddress('')
        setPAN('')
        alert('Company Added Successfully')
      }else if (successStatus === 'failure'){
        alert('Company Not Added')
      }
        
    }
    

  return (
    // <div className='flex justify-center h-[100vh] items-center bg-[#F0F4F3]'>
      <div className='flex flex-col bg-[#F0F4F3] h-[100vh] '>
      <div>
        <Navbar />
      </div>
    <div className='flex justify-center pt-32'>
    <div className='shadow-paper flex flex-col justify-center items-center bg-white pl-10 pr-10 pb-5 pt-5'>
    <div>
        <img src={Logo} alt=""/>
      </div>
     
    <div className='flex justify-center p-4'>
       
    <div className='flex flex-col justify-center'>
        <div>
        <h2 className='p-0 m-0 text-lime-500'>Add New Company</h2>
        </div>
    <div>
    <div className=' flex flex-col gap-2 pt-4 pb-4 '>
    <div className='info-input-field-company'>
    <input type='text' value={currentDepartment} onKeyPress={handleKeyPress} placeholder='Choose Department' onChange={(e) =>{ setCurrentDepartment(e.target.value)}}/>
    <select value={currentDepartment} onChange={handleDepartmentSelect} className='info-input-field-select'>
                                    <option value=""></option>
                                    <option value="Development">Development</option>
                                    <option value="Design">Design</option>
                                    <option value="QA">QA</option>
                                    <option value="Human Resource">Human Resource</option>
                                    <option value="Technical">Technical</option>
                                    
    </select>
    </div>
          <div className='flex gap-2'>
                            {department.map((department, index) => (
                                
                        <div key={index} className='selected-company'>
                            
                          {department}
                          <button onClick={() => removeDepartment(index)} className='remove-department-button'>
                            x
                          </button>
                          
                        </div>))}
        </div>
            <div className='info-input-field-company w-10'><input type='number' value={PAN} placeholder='Company PAN NO.' onChange={handlePanChange} /></div>
            <div className='info-input-field-company'><input type='text' value={name} placeholder='Company Name' onChange={handleNameChange}/></div>
            <div className='info-input-field-company'><input type='text' value={address} placeholder='Company Address' onChange={handleAddressChange} /></div>
            <div className='info-input-field-company'><input type='email' value={email} placeholder='Company Email' onChange={handleEmailChange} /></div>
            

    </div>
    <div className='flex justify-center pb-4'>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={handleClick}>Add Company</button>
    </div>
    {error && <p className='error-message flex justify-center'>{error}</p>}
    
    </div>
    </div>
    </div>
    </div>
    </div>
    
</div>
  )
}

export default AddCompany