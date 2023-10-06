import React, { useState, useEffect, useRef } from 'react'
import {Form, useNavigate} from 'react-router-dom'
import axios from 'axios'
import './infoStyles.css'
import { storeClientInfo } from '../../Redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientInfo } from '../../Redux/actions';
import CVTemp from '../CVtemplate/CVTemp';
import EditUpdate from './EditUpdate'
import { allProvinces } from './dropdownMenu'
import { nepalDistricts } from './dropdownMenu'
import Swal from 'sweetalert2'
import { fetchCompanyInfo } from '../../Redux/companyActions'

const InfoBody = () => {
    const [clientName, setName] = useState('')
    const [clientPANNO, setPAN] = useState('')
    const [companyName, setCompany] = useState('')
    const [departmentName, setDepartment] = useState('')
    const [municipality, setAddress] = useState('')
    const [municipalityNumber, setMUNno] = useState('')
    const [district, setDistrict] = useState('')
    const [province, setProvince] = useState('')

    
    
    const [designation, setDesignation] = useState('')
    const [phone, setMobile] = useState('')
    const [email, setEmail] = useState('')
    
    const [university, setUni] = useState('')
    const [college, setCollege] = useState('')
    const [level, setLevel] = useState('')
    const [degree, setdegree] = useState('')
    const [skills, setSelectedSkills] = useState([]); // Store selected roles
    
    const [currentSkill, setCurrentSkill] = useState(''); // Store current input role
    const [description, setDescription] = useState('')
    const [firstOrganizationName, setFirstOrganizationName] = useState('')
    const [secondOrganizationName, setSecondOrganizationName] = useState('')
    const [firstTitle, setFirstTitle] = useState('')
    const [secondTitle, setSecondTitle] = useState('')
    const [firstDuration, setFirstDuration] = useState('')
    const [secondDuration, setSecondDuration] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [uploadedImage, setUploadedImage] = useState(null)

    console.log(firstDuration, secondDuration, firstOrganizationName, secondOrganizationName, firstTitle, secondTitle)
    
    const [fielderrorMessage, setFieldErrorMessage] = useState('')

    const allError = {
        emailFieldError: '',
        clientNameFieldError: '',
        companyNameFieldError: '',
        departmentNameFieldError: '',
        clientPANNOfieldError: '',
        municipalityFieldError: '',
        municipalityNumberFieldError: '',
        districtFieldError: '',
        provinceFieldError: '',
        designationFieldError: '',
        phoneFieldError: '',
        universityFieldError: '',
        collegeFieldError: '',
        levelFieldError: '',
        degreeFieldError: '',
        skillsFieldError: '',
        descriptionFieldError: '',
        firstDurationFieldError : '',
        secondDurationFieldError : '',
        firstOrganizationNameFieldError: '',
        secondDurationOrganizationNameFieldError: '',
        firstTitleFieldError: '',
        secondTitleFieldError: '',

    }

    const [showOptions, setShowOptions] = useState(false);
    const [showDistricts, setShowDistricts] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const dropdownRef = useRef(null);

    
    

    // All available options
    
      

    const [allErrors, setAllErrors] = useState(allError)
    

    const [errorMail, setErrorEmail] = useState('')
   

    const dispatch = useDispatch()
    const history = useNavigate()

    useEffect(() => {
        dispatch(fetchClientInfo());
        dispatch(fetchCompanyInfo());
    }, [])

    const [showCompanyOptions, setShowCompanyOptions] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState("");
    const clientDetails = useSelector((state) => state.auth.clientData);
    const companyDetails = useSelector((state) => state.company.companyData);
    // console.log(companyDetails)
    const companyInfo = companyDetails.$values;
    const companyNames = Array.isArray(companyInfo) ? companyInfo.map((company) => company.name) : [];

    const [showDepartmentOptions, setShowDepartmentOptions] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const departmentInfo = Array.isArray(companyInfo) ? companyInfo.map((company) => company.departments) : [];
    // console.log(departmentInfo)
    const departmentNames = Array.isArray(departmentInfo) ? departmentInfo.map((department) => department.$values) : [];
    const filteredDepartmentNames = departmentNames.filter(
      (departments, index) => companyNames[index] === companyName
    );
    const flattenedDepartmentNames = [].concat(...filteredDepartmentNames);
  
    
    const handleDepartmentInputChange = (e) => {
      setAllErrors({...allErrors, departmentNameFieldError: '' })
    const departmentValue = e.target.value;
    setDepartment(departmentValue);
    
    setSelectedOption("");
    }
    const handleDepartmentFocus = (e) => {
      setShowDepartmentOptions(!showDepartmentOptions);
    }
    const filterDepartmentNamesByDepartments = flattenedDepartmentNames.filter ((department) => {
      return department.toLowerCase().includes(departmentName.toLowerCase());
    })
    const handleDepartmentClick = (option) => {
      setDepartment(option)
      setSelectedDepartment(option);
      setShowDepartmentOptions(false);
      
    }
    
    const handleCompanyClick = (option) => {
        // Handle the selection of companies from the dropdown
        setCompany(option);
        setSelectedCompany(option);
        setShowCompanyOptions(false);
    }
    const handleCompanyInputChange = (e) => {
      setAllErrors({...allErrors, companyNameFieldError: '' })
      const companyValue = e.target.value;
      setCompany(companyValue);
      
      setSelectedOption("");

    }
    const filteredCompanyNames = companyNames.filter((company) => {
      return company.toLowerCase().includes(companyName.toLowerCase());
    })
    const handleCompanyFocus = (e) => {
      setShowCompanyOptions(!showCompanyOptions);
    }
    
  

    let emailExistsErrorMessage = useSelector((state) => state.auth.emailError);
    const clientCreationStatus = useSelector(state => state.auth.clientCreationStatus);
    const userRole = useSelector((state) => state.auth.role);
    const isLoggedIn = useSelector((state) => state.auth.token);
    
    // const [emailExistMsg, setEmailExistsMsg] = useState(emailExistsErrorMessage);
    // console.log(emailExistMsg)
    


    const IsSameEmail = (email) => {
         if (clientDetails && clientDetails.$values) {
            const matchingEmail = clientDetails.$values.find(
              (client) => client.email === email
            )
            return matchingEmail;
           
        }
        return null
        
    }
    
    
    

    const handleRoleSelect = (e) => {
        // Handle the selection of roles from the dropdown
        const selectedRole = e.target.value;
        setSelectedSkills([...skills, selectedRole]);
      };
    
    
      const handleKeyPress = (e) => {
        // Handle keypress in the input field
        if (e.key === 'Enter') {
          e.preventDefault();
          const roleToAdd = currentSkill.trim();
          if (roleToAdd) {
            setSelectedSkills([...skills, roleToAdd]);
            setCurrentSkill('');
            
          }
        }
      };
    
      const removeRole = (index) => {
        // Remove a role from the roles array
        const updatedRoles = [...skills];
        updatedRoles.splice(index, 1);
        setSelectedSkills(updatedRoles);

      };
      
      const isValidEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
       
      const handleDistrictChange = (e) => {
        setAllErrors({...allErrors, districtFieldError: '' })
        const districtValue = e.target.value;
        setDistrict(districtValue);
        setSelectedOption("");
      }
      const filteredDistricts = nepalDistricts.filter((option) =>
          option.toLowerCase().includes(district.toLowerCase())
        );
      const handleDistrictClick = (option) => {
        // setFilteredOptions(option)
        setDistrict(option);
        setShowDistricts(false);
        setSelectedOption(option);
        // console.log(option);
      }
      const handleDistrictFocus = () => {
          
        setShowDistricts(!showDistricts);
      }
    
      const handleInputChange = (e) => {
        setAllErrors({...allErrors, provinceFieldError: '' })
        const inputValue = e.target.value;
        setProvince(inputValue);
        setSelectedOption("");
      }
      const filteredOptions = allProvinces.filter((option) =>
          option.toLowerCase().includes(province.toLowerCase())
        );
      const handleInputFocus = () => {
          // setFilteredOptions(allProvinces);
          setShowOptions(!showOptions);

      };
      // const handleInputBlur = () => {
      //     setShowOptions(false);
      // }
    
      
      const handleOptionClick = (option) => {
        // setFilteredOptions(option)
        setProvince(option);
        setShowOptions(false);
        setSelectedOption(option);
        // console.log(option);
      }
      
      
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowOptions(false);
          }
        }
        
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
      
    
      const handleSubmit = async (e) => {
        
        e.preventDefault();
        setFieldErrorMessage('');
        setErrorEmail('');


        // })
        // setAllErrors(errors); 

     
        // const formData = new FormData();
        // for (const key in ClientInfo) {
        //   formData.append(key, ClientInfo[key]);
        // }

        // const imageAsString = btoa(String.fromCharCode(...new Uint8Array(uploadedImage)));
        // formData.append('imagePath', uploadedImage);

        

        
      const requiredField = [
        {name: 'clientName', label : 'Name'},
        {name: 'clientPANNO', label : 'PAN'},
        {name: 'municipality', label : 'Municipality'},
        {name: 'municipalityNumber', label : 'MUN No'},
        {name: 'district', label : 'District'},
        {name: 'province', label : 'Province'},
        {name: 'designation', label : 'Designation'},
        {name: 'phone', label : 'Phone'},
        {name: 'email', label : 'Email'},
        {name: 'university', label : 'University'},
        {name: 'college', label : 'College'},
        {name: 'level', label : 'Level'},
        {name: 'degree', label : 'Degree'},
        {name: 'skills', label : 'Skills'},
        {name: 'description', label : 'Description'},
        {name: 'firstOrganizationName', label : 'Organization Name'},
        {name: 'firstDuration', label : 'Project Duration'},
        {name: 'firstTitle', label : 'Title'},
        {name: 'companyName', label : 'Company Name'},
        {name: 'departmentName', label : 'Department Name'},
      ]
      requiredField.forEach((field) => {
        const fieldName = field.name;
        const fieldValue = eval(fieldName);
        if (!fieldValue) {
          setAllErrors((prevErrors) => ({...prevErrors, [`${fieldName}FieldError`]: `${field.label} is required`}))
        }
         
      })
      if (!isValidEmail(email)) {
        setErrorEmail('Email is invalid')

      }
      else if (IsSameEmail(email)) {
        setErrorEmail('Email already exists')
      }

      else{
        dispatch(storeClientInfo( {clientName,
        clientPANNO,
        companyName,
        departmentName,
        designation,
        municipality,
        municipalityNumber,
        province,
        district,
        email,
        phone,
        university,
        college,
        level,
        degree,
        description,
        firstOrganizationName,
        firstDuration,
        firstTitle,
        secondOrganizationName,
        secondDuration,
        secondTitle,
        skills}));
      }
    
            // setName('');
            // setPAN('');
            // setAddress('');
            // setMUNno('');
            // setDistrict('');
            // setProvince('');
            // setRole('');
            // setMobile('');
            // setEmail('');
            // setUni('');
            // setCollege('');
            // setLevel('');
            // setdegree('');
            // setSelectedSkills([]);
            // setFirstProject('');
            // setSecondProject('');
            // setFirstProjectDescription('');
            // setSecondProjectDescription(''); 
       
    }
 

    const handlePhotoUpload = (e) => {
      const imageFile = e.target.files[0]; // Get the selected image fil
      // if(imageFile){
      //   setUploadedImage(imageFile);
      // }
      const imgURL = URL.createObjectURL(imageFile);
      console.log(imgURL)
      
  if (imageFile) {
    // Optional: You can preview the image if needed
    const reader = new FileReader();
    reader.onload = (event) => {
      const imagePreviewURL = event.target.result;
      setPreviewImage(imagePreviewURL); // Store the image preview URL in state
      console.log(`Previewing ${imagePreviewURL}`);
    };
    reader.readAsDataURL(imageFile);

    // Store the selected image file in state (e.g., uploadedImage)
    setUploadedImage(imageFile);
    // console.log(uploadedImage);

    
  }
}




  return (
    <div className='  flex justify-center pt-12 bg-[#F8F8F8] pb-10'>
        <div className='flex flex-col'>
            <div className='w-[815px]  info-div '> 
                <div className='p-6'>
                    <p className=" m-0 p-0 font-helvetica font-bold" style={{color:"#1670B2", fontSize:"20px",}}>Customer Information</p>
                    <hr></hr>
                    <div className='flex flex-col gap-6 pt-2'>
                    <div>
                    <p className=" m-0 pb-4 font-roboto font-bold" style={{color:"#1670B2", fontSize:"16px",}}>Client Information</p>
                    <div className=' flex flex-col pl-2'>
                    <div className='flex gap-14'>
                        
                        <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Client Name</p>
                            <div className={` ${allErrors.clientNameFieldError? 'error-input' : 'info-input-field'}`}>
                                <input type='text' value={clientName} placeholder='Your Name' onChange={(e) => {setName(e.target.value); setAllErrors({...allErrors, clientNameFieldError: ''});}} />
                            </div>
                            { allErrors.clientNameFieldError && <p className=' field-error-message'>{allErrors.clientNameFieldError}</p> }
                        </div>
                        <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Client PAN No.</p>
                            <div className={` ${allErrors.clientPANNOfieldError ? 'error-input' : 'info-input-field'}`}>
                                <input type='number' value={clientPANNO}  placeholder='PAN No.' onChange={(e) => {setPAN(e.target.value); setAllErrors({...allErrors, clientPANNOfieldError: ''})}}/>
                            </div>
                            { allErrors.clientPANNOfieldError && <p className='field-error-message'>{allErrors.clientPANNOfieldError}</p> }
                        </div>
                        <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Designation</p>
                            <div className={` ${allErrors.designationFieldError ? 'error-input' : 'info-input-field flex gap-1'}`}>
                                <input type='text' value={designation}  placeholder='Eg: Developer, Analyst, Tester' onChange={(e) => {setDesignation(e.target.value); setAllErrors({...allErrors, designationFieldError: '' }) }}
                                
                                />
                                <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
                                    <option value=""></option>
                                    <option value="Developer">Developer</option>
                                    <option value="Analyst">Analyst</option>
                                    <option value="Tester">Tester</option>
                                </select>
                            </div>
                            { allErrors.designationFieldError && <p className='field-error-message'>{allErrors.designationFieldError}</p> }
                        </div>
                        <div>
                            
                        </div>
                        

                    </div>
                    <div className='flex gap-14'>

                        <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Company Name</p>
                            <div className={` ${allErrors.companyNameFieldError? 'error-input' : 'info-input-field'}`}>
                                <input type='text' 
                                value={companyName} 
                                placeholder='Company Name' 
                                onChange = {handleCompanyInputChange}
                                onFocus={handleCompanyFocus}
                                />
                                {showCompanyOptions && (
                                    <div className='absolute'>
                                    <div className='autocomplete-options'>
                                      {filteredCompanyNames.map((option) => (
                                        <div key={option} className='option' onClick={() => handleCompanyClick(option)} >
                                          {option}
                                          
                                        </div>
                                      ))}
                                    </div>
                                    </div>
                                  )}
                            </div>
                            { allErrors.companyNameFieldError && <p className=' field-error-message'>{allErrors.companyNameFieldError}</p> }
                        </div>

                        <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Department Name</p>
                            <div className={` ${allErrors.departmentNameFieldError? 'error-input' : 'info-input-field'}`}>
                                <input 
                                type='text' 
                                value={departmentName} 
                                placeholder='Department Name' 
                                onChange = {handleDepartmentInputChange}
                                onFocus={handleDepartmentFocus}
                                />
                                {showDepartmentOptions && (
                                    <div className='absolute'>
                                    <div className='autocomplete-options'>
                                      {filterDepartmentNamesByDepartments.map((option) => (
                                        <div key={option} className='option' onClick={() => handleDepartmentClick(option)} >
                                          {option}
                                          </div>
                                      ))}
                                      </div>
                                    </div>
                                )}
                                    
                                  
                            </div>
                            { allErrors.departmentNameFieldError && <p className=' field-error-message'>{allErrors.departmentNameFieldError}</p> }
                        </div>
                      </div>
                    
                    <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Skills</p>
                            <div className={` ${allErrors.skillsFieldError ? 'error-input' : 'info-input-field flex gap-1'}`}>
                                <input type='text' value={currentSkill} onKeyPress={handleKeyPress} placeholder='Add skills' onChange={(e) =>{ setCurrentSkill(e.target.value); setAllErrors({...allErrors, skillsFieldError: '' }) }}/>
                                <select value={currentSkill} onChange={handleRoleSelect} >
                                    <option value=""></option>
                                    <option value="HTML">HTML</option>
                                    <option value="CSS">CSS</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="Python">Python</option>
                                    <option value="C#">C#</option>
                                    <option value="C++">C++</option>
                                </select>
                            </div>
                            {allErrors.skillsFieldError && <p className='field-error-message'>{allErrors.skillsFieldError}</p>}
                            <div className='flex gap-2'>
                            {skills.map((skill, index) => (
                                
                        <div key={index} className='selected-role'>
                            
                          {skill}
                          <button onClick={() => removeRole(index)} className='remove-role-button'>
                            x
                          </button>
                          
                        </div>))}
                        </div>
                        </div>
                        

                    </div>
                    
                    </div>
                    <div>
                    <p className=" m-0 pb-4 font-roboto font-bold" style={{color:"#1670B2", fontSize:"16px",}}>Client Address Information</p>
                    <div className='flex flex-col pl-2'>
                    <div className='flex  gap-14'>
                        <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Municipality</p>
                            <div className={` ${allErrors.municipalityFieldError ? 'error-input' : 'info-input-field'}`}>
                                <input type='text' value={municipality} placeholder='Municipality' onChange={(e) =>{ setAddress(e.target.value); setAllErrors({...allErrors, municipalityFieldError: '' }) }}/>
                            </div>
                            { allErrors.municipalityFieldError && <p className='field-error-message'>{allErrors.municipalityFieldError}</p> }
                        </div>
                        <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>MUN No.</p>
                            <div className={` ${allErrors.municipalityNumberFieldError ? 'error-input' : 'info-input-field'}`}>
                                <input type='number' value={municipalityNumber}  placeholder='Municipality No.' onChange={(e) => {setMUNno(e.target.value); setAllErrors({...allErrors, municipalityNumberFieldError: '' }) }}/>
                            </div>
                            { allErrors.municipalityNumberFieldError && <p className='field-error-message'>{allErrors.municipalityNumberFieldError}</p> }
                        </div>
                        <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Province</p>
                            <div className={` ${allErrors.provinceFieldError ? 'error-input' : 'info-input-field flex gap-1'}`}>
                                <input 
                                type='text' 
                                value={province}  
                                placeholder='province' 
                                onChange={ handleInputChange}
                                onFocus={handleInputFocus}
                                
                                
                                />
                                
                                {showOptions && (
                                    <div className='pt-[27px] absolute'>
                                    <div className='autocomplete-options'>
                                      {filteredOptions.map((option) => (
                                        <div key={option} className='option' onClick={() => handleOptionClick(option)} >
                                          {option}
                                          
                                        </div>
                                      ))}
                                    </div>
                                    </div>
                                  )}
                                  
                            </div>
                            { allErrors.provinceFieldError && <p className='field-error-message'>{allErrors.provinceFieldError}</p> }
                        </div>
                        <div>
                            
                        </div>
                    </div>
                    <div>
                    <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>District</p>
                            <div className={` ${allErrors.districtFieldError ? 'error-input' : 'info-input-field'}`}>
                                <input type='text'  
                                value={district}  
                                placeholder='district' 
                                onChange={ handleDistrictChange}
                                onFocus={handleDistrictFocus}
                                />
                                {
                                  showDistricts && (
                                    <div>
                                    <div className='autocomplete-options'>
                                      {filteredDistricts.map((option) => (
                                        <div key={option} className='option' onClick={() => handleDistrictClick(option)} >
                                          {option}
                                        </div>
                                      ))}
                                    </div>
                                    </div>
                                  )
                                }

                            </div>
                            { allErrors.districtFieldError && <p className='field-error-message'>{allErrors.districtFieldError}</p> }
                        </div>
                    </div>
                    
                    </div>
                    </div>

                    <div>
                    <p className=" m-0 pb-4 font-roboto font-bold" style={{color:"#1670B2", fontSize:"16px",}}>Client Contact Information</p>
                    <div className=' pl-2'>
                    <div className='flex  gap-14'>
                        <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Client Email</p>
                            <div className={` ${errorMail ? 'error-input' : 'info-input-field'}` || ` ${ allErrors.emailFieldError ? 'error-input' : 'info-input-field'}`}>
                                <input  type='email' value={email}  placeholder='email' onChange={(e) => {setEmail(e.target.value); setErrorEmail(''); setAllErrors({...allErrors, emailFieldError: ''}); emailExistsErrorMessage = '' }}/>
                            </div>
                            {allErrors.emailFieldError && <p className='field-error-message'>{allErrors.emailFieldError}</p>}
                            {errorMail && <p className='field-error-message'>{errorMail}</p>}
                            {emailExistsErrorMessage && <p className='field-error-message'>{emailExistsErrorMessage}</p>}
                           
                        </div>
                        <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Client Mobile No.</p>
                            <div className={` ${allErrors.phoneFieldError ? 'error-input' : 'info-input-field'}`}>
                                <input type='tel' value={phone}  placeholder='mobile number' onChange={(e) => {setMobile(e.target.value); setAllErrors({...allErrors, phoneFieldError: '' }) }}/>
                            </div>
                            { allErrors.phoneFieldError && <p className='field-error-message'>{allErrors.phoneFieldError}</p> }
                        </div>
                        <div>
                            
                        </div>
                    </div>
                    </div>
                    </div>

                    <div>
                    <p className=" m-0 pb-4 font-roboto font-bold" style={{color:"#1670B2", fontSize:"16px",}}>Client Academic Information</p>
                    <div className='flex flex-col pl-2'>
                    <div className='flex  gap-14'>
                        <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>University</p>
                            <div className={` ${ allErrors.universityFieldError ? 'error-input' : 'info-input-field'}`}>
                                <input type='text' value={university} placeholder='university' onChange={(e) => {setUni(e.target.value); setAllErrors({...allErrors, universityFieldError: '' }) }}/>
                            </div>
                            { allErrors.universityFieldError && <p className='field-error-message'>{allErrors.universityFieldError}</p> }
                        </div>
                        <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>College</p>
                            <div className={` ${allErrors.collegeFieldError ? 'error-input' : 'info-input-field'}`}>
                                <input type='text' value={college}  placeholder='college' onChange={(e) => {setCollege(e.target.value); setAllErrors({...allErrors, collegeFieldError: '' })}}/>
                            </div>
                            { allErrors.collegeFieldError && <p className='field-error-message'>{allErrors.collegeFieldError}</p> }
                        </div>
                        <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Level</p>
                            <div className={` ${allErrors.levelFieldError ? 'error-input' : 'info-input-field'}`}>
                                <input type='text'value={level}  placeholder='level'  onChange={(e) => {setLevel(e.target.value); setAllErrors({...allErrors, levelFieldError: '' })}}/>
                            </div>
                            {allErrors.levelFieldError && <p className='field-error-message'>{allErrors.levelFieldError}</p>}
                        </div>
                        <div>
                            
                        </div>
                    </div>
                    <div>
                    <div className='flex flex-col gap-1 pt-2'>
                            <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Degree</p>
                            <div className={` ${ allErrors.degreeFieldError ? 'error-input' : 'info-input-field'}` }>
                                <input type='text' value={degree}  placeholder='degree' onChange={(e) => {setdegree(e.target.value); setAllErrors({...allErrors, degreeFieldError: '' })}}/>
                            </div>
                            <div className='flex items-start'>{allErrors.degreeFieldError && <p className='field-error-message'>{allErrors.degreeFieldError}</p>}</div>
                        </div>
                    </div>
                    </div>
                    </div>

                    <div>
                    <p className=" m-0 pb-4 font-roboto font-bold" style={{color:"#1670B2", fontSize:"16px",}}>Description</p>
                    <div className=' pl-2'>
                    <div className={` ${ allErrors.descriptionFieldError ? 'error-input-desc' : 'info-input-field-desc'}`}>
                                <textarea type='text' value={description} placeholder='Type something about yourself...' onChange={(e) => {setDescription(e.target.value);  setAllErrors({...allErrors, descriptionFieldError: '' }) }} rows={4} cols={60}></textarea>
                     </div>
                     <div className='flex items-start'>{allErrors.descriptionFieldError && <p className='field-error-message'>{allErrors.descriptionFieldError}</p>}</div>
                     </div>
                    </div>
                    <div>
                    <p className=" m-0 pb-4 font-roboto font-bold" style={{color:"#1670B2", fontSize:"16px",}}>Professional Experiences</p>
                    <div className=' pl-2'>
                        <div className='flex  gap-14'>
                        <div className='flex  flex-col gap-2'>
                        
                        <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Organization Name</p>
                        <div className={` ${ allErrors.firstOrganizationNameFieldError ? 'error-input' : 'info-input-field'}`}>
                                <input type='text'value={firstOrganizationName}  placeholder='Enter Organization name'  onChange={(e) => {setFirstOrganizationName(e.target.value); setAllErrors({...allErrors, firstOrganizationNameFieldError: '' })}}/>
                        </div>

                        <div>{allErrors.firstTitleFieldError && <p className='field-error-message'>{allErrors.firstTitleFieldError}</p>}</div>

                        <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Work Duration</p>
                        <div className={` ${allErrors.firstDurationFieldError ? 'error-input' : 'info-input-field'}`}>
                            <input type='text' value={firstDuration} placeholder='Enter work duration' onChange={(e) => { setFirstDuration(e.target.value); setAllErrors({ ...allErrors, workDurationFieldError: '' }) }} />
                        </div>
                        <div>{allErrors.firstDurationFieldError && <p className='field-error-message'>{allErrors.firstDurationFieldError}</p>}</div>

                        <div className= {` ${ allErrors.firstTitleFieldError ? 'error-input-project-desc' : 'info-input-field-project-desc'}`}>
                                <textarea type='text' value={firstTitle} placeholder='Enter your work details...' onChange={(e) => {setFirstTitle(e.target.value); setAllErrors({...allErrors, firstTitleFieldError: '' })}} rows={3} cols={40}></textarea>
                        </div>
                        {allErrors.firstTitleFieldError && <p className='field-error-message'>{allErrors.firstTitleFieldError}</p>}
                        </div>
                        <div className='flex  flex-col gap-2'>
                        <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Organization name</p>
                        <div className='info-input-field'>
                                <input type='text'value={secondOrganizationName}  placeholder='Enter Organization name'  onChange={(e) => {setSecondOrganizationName(e.target.value); setAllErrors({...allErrors, secondDurationOrganizationNameFieldError: '' }) }}/>
                        </div>
                        

                        <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Work Duration</p>
                        <div className='info-input-field'>
                            <input type='text' value={secondDuration} placeholder='Enter work duration' onChange={(e) => { setSecondDuration(e.target.value); setAllErrors({ ...allErrors, secondDurationFieldError: '' }) }} />
                        </div>

                        <div className='info-input-field-project-desc'>
                                <textarea type='text' value={secondTitle} placeholder='Enter your work details...' onChange={(e) => {setSecondTitle(e.target.value); setAllErrors({...allErrors, secondProjectDescriptionFieldError: '' })}} rows={3} cols={40}></textarea>
                        </div>
                        {allErrors.secondTitleFieldError && <p className='field-error-message'>{allErrors.secondTitleFieldError}</p>}

                        </div>
                        </div>
                    </div>
                    </div>
                    <div>
                  <input type = 'file' accept='image/*' onChange = {handlePhotoUpload}/>
                  
                    </div>

                    <div className='flex justify-center'>
                        <button className='btn-info' onClick={handleSubmit}>Submit</button>
                    </div>
                    {clientCreationStatus ==='success' && <p className='success-message1'>User created successfully!</p>}
                    { fielderrorMessage && <p className='field-error-message'>{fielderrorMessage}</p>}
                    

                    </div>
                </div>

            </div>

         {/* Input filled        */}
         <div className='pt-4 pl-2 flex justify-end'>
                <a href='/CVGenerate' className=' m-0 pb-4 font-roboto font-bold' style={{ color: '#1670B2', fontSize: '16px' }}>
                  Clicke Here To Generate CV
                </a>
            </div>
            {
               userRole === 'Admin' && (
                   <EditUpdate/>
               )
            }                     
            
            
        </div>
    </div>
  )
}

export default InfoBody