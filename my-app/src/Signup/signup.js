import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './signup.css';
import Logo from '../images/Logo.png';
import Ellipse from '../images/Ellipse.png';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../Redux/roleActions';
import NavBar from '../Dashboard/Navbar';

import {createRole} from '../Redux/roleActions';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import '../CustomerDetails/InfoComponents/infoStyles.css'



const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [email, setEmail] = useState('');
  const [passwords, setPasswords] = useState({password:"", confirmPassword:""});
  const [fullName, setName] = useState('');
  const [roleName, setRole] = useState('');
  const [errorMails, setErrormail] = useState('');

  const [errorPW, seterrorPW] = useState('');
  const [errorRole, setErrorRole] = useState('');
  const [pwnotMatch, setpwnotMatch] = useState('');
  const [fielderrorMessage, setfieldErrorMessage] = useState('');
  const history = useNavigate();
  const dispatch = useDispatch();
  const userCreationStatus = useSelector(state => state.auth.userCreationStatus);
  const emailExistsError = useSelector(state => state.auth.errorUsermail);
  


  const [errorMail, setErrormailMessage] = useState(emailExistsError);
  // console.log(emailErrorMessage)
  
  
  
  // const [errorMail, setErrorMailMsg] = useState(emailErrorMessage);
  
  

  // setErrormailMessage(emailErrorMessage);

  // useEffect(() => {
  //   if (emailExistsError) {
  //     setErrormail(emailExistsError);
  //   } else {
  //     setErrormail('');
  //   }
  // }, [emailExistsError]);
  
useEffect (() => {
  dispatch(fetchUserInfo());
}, [])

const userData = useSelector(state => state.auth.userData);


const IsSameEmail = (email) => {
  if (userData && userData.$values) {
     const matchingEmail = userData.$values.find(
       (client) => client.email === email
     )
     return matchingEmail;
    
 }
 return null
 
}
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrormail('');
    setfieldErrorMessage('');
    setErrormailMessage('')
    // emailErrorMessage = e.target.value;



  
    
    //
  };  
  const handlePasswordChange = (e) => {
    const {name, value} = e.target
    setPasswords(prevState => ({
      ...prevState, 
      [name]: value
    }))
    seterrorPW('');
    setfieldErrorMessage('');
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
    setfieldErrorMessage('');
  }
  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setfieldErrorMessage('');
    setErrorRole('');
    
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrormail('');
    seterrorPW('');
    setpwnotMatch('');
    setfieldErrorMessage('');
    
    const { password } = passwords;

    if (!email || !passwords.password || !passwords.confirmPassword || !fullName || !roleName) {
      setfieldErrorMessage('All fields are necessary');
    } 
    else {
      if (!isValidEmail(email)) {
        setErrormail('Invalid email');
      } 
      else if (IsSameEmail(email)) {
        setErrormail('Email already exists');
        
      }
      
      else if (!IsPasswordVald(passwords.password)) {
        seterrorPW('Password must have a special character, number, uppercase letter, and 6 characters');
      } else if (passwords.password !== passwords.confirmPassword) {
        setpwnotMatch('Passwords do not match');
      }
     else {
        dispatch(createRole({
          email,
          password,
          fullName,
          roleName
        }));
        Swal.fire({
          icon: 'success',
          title: 'Account Created Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        
        
      }
    }
    
  };
 
  const isValidEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const IsPasswordVald = (password) => {
    return(password).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/);
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible1(!passwordVisible1);
  };
  
  
  return (
    <div>
      <div>
        <NavBar/>
      </div>
    <div className='main-Container1'>
      
      
      <div className='second-container1'>
        
        <div className='left1'>
        <div className='logo1'>
          <img src={Logo} alt='logo' />
        </div>
        <div>
        <div className='signup1'>
          <h2>Create New User</h2>
          </div>
          <div className='input-field1'>
            <input 
            type='name' 
            placeholder='Full Name' 
            value={fullName} 
            onChange={handleNameChange} 
            className='typeStyle'
            />
            
          <input 
          type='email' 
          placeholder='Email' 
          value={email} onChange={handleEmailChange} 
          className='typeStyle'
          />
          {errorMails && <p className='error-message1'>{errorMails}</p>}
          {/* {errorMail && <p className='error-message1'>{errorMail}</p>} */}
          <div className='info-input-field-dropdown '>
          <input 
          type='text' 
          placeholder='Select Role' 
          value={roleName} 
          onChange={handleRoleChange} 
          className='typeStyle' 
          />
           <select value={roleName} onChange={(e) => setRole(e.target.value)}>
                                    <option value=""></option>
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>                     
            </select>
          </div>
          {errorRole && <p className='error-message2'>{errorRole}</p>}
          <div className='password-container1'>
            <div>
          <input 
          type={passwordVisible ? "text": "password"} 
          value={passwords.password} 
          onChange={handlePasswordChange} 
          name='password' 
          placeholder='Password' />
          
          <i className={`password-toggle ${passwordVisible ? "fa fa-eye-slash" : "fa fa-eye"} `} onClick={togglePasswordVisibility}></i>
          </div>
          {errorPW && <p className='error-message2'>{errorPW}</p>}
          </div>
          <div className='password-container'>
            <div>
          <input 
          type={passwordVisible1 ? "text": "password"} 
          value={passwords.confirmPassword} 
          onChange={handlePasswordChange} 
          placeholder=' Confirm Password' 
          name='confirmPassword'/>
          
          <i className={`password-toggle ${passwordVisible1 ? "fa fa-eye-slash" : "fa fa-eye"} `} onClick={togglePasswordVisibility2}></i>
          {pwnotMatch && <p className='error-message2'>{pwnotMatch}</p>}
          </div>
          
          </div>
          </div>
        </div>
        <div className='button1' >
          <button className='button-edit1' onClick={handleSubmit}>Add</button>
        </div>
        {fielderrorMessage && <p className='error-message3'>{fielderrorMessage}</p>}
        {userCreationStatus === 'success' && <p className='success-message'>User created successfully!</p>}
        {/* <div className='signin-text'>
          <p>Already have an Account? <a href='/'>Sign in</a></p>
        </div> */}
        
        </div>
        {/* <div className='right1'>
          <div className='UM1'>
            <h1>Umbrella Solutions</h1>
            
          </div>
          <div className='description1'>
          <p>Certainly! In short, IT companies are businesses that provide technology-related 
              products and services, such as software development, hardware manufacturing, 
              cloud computing, cybersecurity, and IT consulting.</p>
              </div>
              <div className='Ellipse1'>
                <img src={Ellipse} alt='Ellipse' />
              </div>
        </div> */}
      </div>

    </div>
    </div>
  )
}

export default Signup;