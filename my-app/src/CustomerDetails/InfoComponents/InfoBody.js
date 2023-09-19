import React, { useState, useEffect } from 'react'
import {Form, useNavigate} from 'react-router-dom'
import axios from 'axios'
import './infoStyles.css'
import { storeClientInfo } from '../../Redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientInfo } from '../../Redux/actions';
import CVTemp from '../CVtemplate/CVTemp';
import EditUpdate from './EditUpdate'
import Swal from 'sweetalert2'

const InfoBody = () => {
    const [clientName, setName] = useState('')
    const [clientPANNO, setPAN] = useState('')
    const [municipality, setAddress] = useState('')
    const [municipalityNumber, setMUNno] = useState('')
    const [district, setDistrict] = useState('')
    const [province, setProvince] = useState('')
    const [role, setRole] = useState('')
    const [phone, setMobile] = useState('')
    const [email, setEmail] = useState('')
    
    const [university, setUni] = useState('')
    const [college, setCollege] = useState('')
    const [level, setLevel] = useState('')
    const [degree, setdegree] = useState('')
    const [skills, setSelectedSkills] = useState([]); // Store selected roles
    const [currentSkill, setCurrentSkill] = useState(''); // Store current input role
    
    const [fielderrorMessage, setFieldErrorMessage] = useState('')

    const allError = {
        emailFieldError: '',
        clientNameFieldError: '',
        clientPANNOfieldError: '',
        municipalityFieldError: '',
        municipalityNumberFieldError: '',
        districtFieldError: '',
        provinceFieldError: '',
        roleFieldError: '',
        phoneFieldError: '',
        universityFieldError: '',
        collegeFieldError: '',
        levelFieldError: '',
        degreeFieldError: '',
        skillsFieldError: '',
        descriptionFieldError: '',
        firstProjectFieldError: '',
        secondProjectFieldError: '',
        firstProjectDescriptionFieldError: '',
        secondProjectDescriptionFieldError: '',

    }
    // const formFields = [
    //     { name: 'email', label: 'Email' },
    //     { name: 'clientName', label: 'Name' },
    //     { name: 'clientPANNO', label: 'PAN' },
    //     { name: 'municipality', label: 'Municipality' },
    //     { name: 'municipalityNumber', label: 'MUN No.' },
    //     { name: 'district', label: 'District' },
    //     { name: 'province', label: 'Province' },
    //     { name: 'role', label: 'Role' },
    //     { name: 'phone', label: 'Phone' },
    //     { name: 'university', label: 'University' },
    //     { name: 'college', label: 'College' },
    //     { name: 'level', label: 'Level' },
    //     { name: 'degree', label: 'Degree' },
    //     { name: 'skills', label: 'Skills' },
    //     { name: 'description', label: 'Description' },
    //     { name: 'firstProject', label: 'First Project' },
    //     { name: 'secondProject', label: 'Second Project' },
    //     { name: 'firstProjectDescription', label: 'First Project Description' },
    //     { name: 'secondProjectDescription', label: 'Second Project Description' },
    //   ];

      

    const [allErrors, setAllErrors] = useState(allError)
    

    const [errorMail, setErrorEmail] = useState('')
    const [description, setDescription] = useState('')
    const [firstProject, setFirstProject] = useState('')
    const [secondProject, setSecondProject] = useState('')
    const [firstProjectDescription, setFirstProjectDescription] = useState('')
    const [secondProjectDescription, setSecondProjectDescription] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [uploadedImage, setUploadedImage] = useState(null)



    // const emailExistsError2 = useSelector((state) => state.auth.emailError2);
    // // console.log(emailExistsError2)

    // const emailExistsError1 = useSelector((state) => state.auth.emailError1);
    // console.log(emailExistsError1)



    // const [projectDesc, setProjectDesc] = useState({
    //     firstProject: "",
    //     secondProject: "",
    //     firstProjectDescription: "",
    //     secondProjectDescription: ""
    // })

    const dispatch = useDispatch()
    const history = useNavigate()

    // const clientDetails = useSelector((state) => state.auth.clientData);
    // const [matchedUser, setMatchedUser] = useState(null);
    // console.log(clientDetails)

    let emailExistsErrorMessage = useSelector((state) => state.auth.emailError);
    const clientInformation = useSelector((state) => state.auth.clientCreationStatus);
    console.log(clientInformation)
    // const [emailExistMsg, setEmailExistsMsg] = useState(emailExistsErrorMessage);
    // console.log(emailExistMsg)
    
    

    // const IsSameEmail = (email) => {
    //      if (clientDetails && clientDetails.$values) {
    //         const matchingEmail = clientDetails.$values.find(
    //           (client) => client.email === email
    //         )
    //         return matchingEmail;
           
    //     }
    //     return null
        
    // }
    

    const handleRoleSelect = (e) => {
        // Handle the selection of roles from the dropdown
        const selectedRole = e.target.value;
        setSelectedSkills([...skills, selectedRole]);
      };
    
    //   const removeRole = (index) => {
    //     // Remove a role from the selected roles
    //     const updatedSkills= [...selectedSkills];
    //     updatedSkills.splice(index, 1);
    //     setSelectedSkills(updatedSkills);
    //   };
    
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
    
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setFieldErrorMessage('');
        setErrorEmail('');

         
         
        //   Clear the form fields
        
        // setProjectDesc({
        //     firstProject: "",
        //     secondProject: "",
        //     firstProjectDescription: "",
        //     secondProjectDescription: ""
        // })

        // const errors = {}
        // formFields.forEach((field) => {
        //     const fieldValue = eval(field.name); // Access form field value using eval()
        //     if (!fieldValue) {
        //         errors[`${field.name}FieldError`] = `${field.label} is required`;
        //     }

        // })
        // setAllErrors(errors); 

        // const ClientInfo = {
        //     ClientName, 
        //     Email, 
        //     Phone, 
        //     ClientPANNO,
        //     Municipality,
        //     MunicipalityNumber,
        //     District,
        //     Province,
        //     Role, 
        //     University, 
        //     College, 
        //     Level, 
        //     Degree,
        //     Skills,
        //     Description,
        //     FirstProject,
        //     SecondProject,
        //     firstProjectDescription,
        //     secondProjectDescription,
          
        // }
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
        {name: 'role', label : 'Role'},
        {name: 'phone', label : 'Phone'},
        {name: 'email', label : 'Email'},
        {name: 'university', label : 'University'},
        {name: 'college', label : 'College'},
        {name: 'level', label : 'Level'},
        {name: 'degree', label : 'Degree'},
        {name: 'skills', label : 'Skills'},
        {name: 'description', label : 'Description'},
        {name: 'firstProject', label : 'First Project'},
        {name: 'secondProject', label : 'Second Project'},
        {name: 'firstProjectDescription', label : 'First Project Description'},
        {name: 'secondProjectDescription', label : 'Second Project Description'},
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
      else{
        dispatch(storeClientInfo( clientName, 
          email, 
          phone, 
          clientPANNO,
          municipality,
          municipalityNumber,
          district,
          province,
          role, 
          university, 
          college, 
          level, 
          degree,
          skills,
          description,
          firstProject,
          secondProject,
          firstProjectDescription,
          secondProjectDescription, ));
      }
      // const hasErrors = Object.keys(allErrors).some((key) => allErrors[key]);
      // if (hasErrors) {
      //   setFieldErrorMessage('All fields are required');
      // }

    //    if (!clientName || !clientPANNO || !municipality || !municipalityNumber || !district || !province || !role || !phone || !email || !university || !college || !level || !degree) {
    //       setFieldErrorMessage('All fields are required');
          
    //   }
      

        
        
    
        // setName('');
        //     setPAN('');
        //     setAddress('');
        //     setMUNno('');
        //     setDistrict('');
        //     setProvince('');
        //     setRole('');
        //     setMobile('');
        //     setEmail('');
        //     setUni('');
        //     setCollege('');
        //     setLevel('');
        //     setdegree('');
        //     setSelectedSkills([]);
        //     setFirstProject('');
        //     setSecondProject('');
        //     setFirstProjectDescription('');
        //     setSecondProjectDescription(''); 
        if (clientInformation === 'success'){
            Swal.fire('User Created', 'User created successfully!', 'success');
        }
        else {
            Swal.fire('User Not Created', 'User not created!', 'error');
        }
    }
    
    // useEffect(() => {
    //     dispatch(fetchClientInfo());
    //  } , []);

    //  console.log(clientDetails);

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
    // const handleGenerateCV = () => {
        
    //     // Check if a matching user is found and set matchedUser accordingly

    // if (clientDetails && clientDetails.$values) {
    //     const matchingClient = clientDetails.$values.find(
    //       (client) => client.clientName === userName
    //     );
        
  
    //     if (matchingClient) {
    //       setMatchedUser(matchingClient);
    //       // Dispatch an action to store the matching client in Redux
    //     // dispatch(storeMatchingClient(matchingClient));
    //     // console.log(matchedUser);
    //     history('/CVTemp', { state: { matchedUser: matchingClient } });
    //     // history('/CVTemp');
    //     //   history('/CVTemp', {state: {matchedUser: matchingClient}});
    //     // history('/CVTemp', {matchedUser: {matchingClient}});
    //     }
    //   }
    //   console.log(matchedUser)
    // };

    
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
                            <div className={` ${allErrors.roleFieldError ? 'error-input' : 'info-input-field flex gap-1'}`}>
                                <input type='text' value={role}  placeholder='Eg: Developer, Analyst, Tester' onChange={(e) => {setRole(e.target.value); setAllErrors({...allErrors, roleFieldError: '' }); setFieldErrorMessage('') }}/>
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value=""></option>
                                    <option value="Developer">Developer</option>
                                    <option value="Analyst">Analyst</option>
                                    <option value="Tester">Tester</option>
                                </select>
                            </div>
                            { allErrors.roleFieldError && <p className='field-error-message'>{allErrors.roleFieldError}</p> }
                        </div>
                        <div>
                            
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
                            <div className={` ${allErrors.provinceFieldError ? 'error-input' : 'info-input-field'}`}>
                                <input type='text' value={province}  placeholder='province' onChange={(e) => {setProvince(e.target.value); setAllErrors({...allErrors, provinceFieldError: '' })}}/>
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
                                <input type='text'  value={district}  placeholder='district' onChange={(e) => {setDistrict(e.target.value); setAllErrors({...allErrors, districtFieldError: '' })}}/>
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
                    <p className=" m-0 pb-4 font-roboto font-bold" style={{color:"#1670B2", fontSize:"16px",}}>Project Works</p>
                    <div className=' pl-2'>
                        <div className='flex  gap-14'>
                        <div className='flex  flex-col gap-2'>
                        
                        <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Project 1</p>
                        <div className={` ${ allErrors.firstProjectFieldError ? 'error-input' : 'info-input-field'}`}>
                                <input type='text'value={firstProject}  placeholder='Enter your project name'  onChange={(e) => {setFirstProject(e.target.value); setAllErrors({...allErrors, firstProjectFieldError: '' })}}/>
                        </div>
                        <div className='flex items-start pb-2'>{allErrors.firstProjectFieldError && <p className='field-error-message'>{allErrors.frstProjectFieldError}</p>}</div>
                        <div className= {` ${ allErrors.firstProjectDescriptionFieldError ? 'error-input-project-desc' : 'info-input-field-project-desc'}`}>
                                <textarea type='text' value={firstProjectDescription} placeholder='Enter your project details...' onChange={(e) => {setFirstProjectDescription(e.target.value); setAllErrors({...allErrors, firstProjectDescriptionFieldError: '' })}} rows={3} cols={40}></textarea>
                        </div>
                        {allErrors.firstProjectDescriptionFieldError && <p className='field-error-message'>{allErrors.firstProjectDescriptionFieldError}</p>}
                        </div>
                        <div className='flex  flex-col gap-2'>
                        <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Project 2</p>
                        <div className={` ${ allErrors.secondProjectFieldError ? 'error-input' : 'info-input-field'}`}>
                                <input type='text'value={secondProject}  placeholder='Enter your project name'  onChange={(e) => {setSecondProject(e.target.value); setAllErrors({...allErrors, secondProjectFieldError: '' }) }}/>
                        </div>
                        <div className='flex items-start pb-2'>{allErrors.secondProjectFieldError && <p className='field-error-message'>{allErrors.secondProjectFieldError}</p>}</div>
                        <div className={` ${ allErrors.secondProjectDescriptionFieldError ? 'error-input-project-desc' : 'info-input-field-project-desc'}`}>
                                <textarea type='text' value={secondProjectDescription} placeholder='Enter your project details...' onChange={(e) => {setSecondProjectDescription(e.target.value); setAllErrors({...allErrors, secondProjectDescriptionFieldError: '' })}} rows={3} cols={40}></textarea>
                        </div>
                        {allErrors.secondProjectDescriptionFieldError && <p className='field-error-message'>{allErrors.secondProjectDescriptionFieldError}</p>}

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
                    { fielderrorMessage && <p className='field-error-message'>{fielderrorMessage}</p>}
                    {clientInformation ==='success' && <p className='success-message1'>User created successfully!</p>}

                    </div>
                </div>

            </div>

         {/* Input filled        */}
         <div className='pt-4 pl-2 flex justify-end'>
                <a href='/CVGenerate' className=' m-0 pb-4 font-roboto font-bold' style={{ color: '#1670B2', fontSize: '16px' }}>
                  Clicke Here To Generate CV
                </a>
            </div>

            <EditUpdate/>
            
        </div>
    </div>
  )
}

export default InfoBody