import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCompany } from "../Redux/companyActions";
import { fetchCompanyInfo } from "../Redux/companyActions";
import { GetAllDepartments, GetAllDistricts } from "../Redux/departmentActions";
import Navbar from "../Dashboard/Navbar";
import "./styleCompany.css";
import Logo from "../images/Logo.png";
import "../CustomerDetails/InfoComponents/infoStyles.css";
import Swal from "sweetalert2";

const AddCompany = ({ token }) => {
  const [PAN, setPAN] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [departments, setSelectedDepartment] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState(""); // Store current input department
  const [error, setError] = useState("");
  
  const successStatus = useSelector(
    (state) => state.company.companyCreationStatus
  );
  // const [CompanySuccessStatus, setSuccessStatus] = useState( successStatus );
  const companyData = useSelector((state) => state.company.companyData);
  const errorMessage = useSelector((state) => state.company.companyError);
  const departmentData = useSelector((state) => state.company.departmentData);
  let departmentNames =
    departmentData &&
    departmentData.$values &&
    Array.isArray(departmentData.$values)
      ? departmentData.$values.map((department) => department.departmentName)
      : [];
  const [showDepartmentOptions, setShowDepartmentOptions] = useState(false);

  const IsSameName = (name) => {
    if (companyData && companyData.$values) {
      const matchingName = companyData.$values.find(
        (client) => client.companyName === name
      );
      return matchingName;
    }
    return null;
  };

  const dispatch = useDispatch();

  // const token = useSelector((state)=> state.auth.token)
  console.log(token);

  useEffect(() => {
    dispatch(GetAllDepartments());
    dispatch(GetAllDistricts());
  }, []);

  const handleDepartmentInputChange = (e) => {
    setCurrentDepartment(e.target.value);
    // setSuccessStatus("");
  };

  const handleKeyPress = (e) => {
    // Handle keypress in the input field
    if (e.key === "Enter") {
      e.preventDefault();
      const departmentToAdd = currentDepartment.trim();
      if (departmentToAdd) {
        setSelectedDepartment([...departments, departmentToAdd]);
        setCurrentDepartment("");
      }
    }
  };
  const handleDepartmentInputChangeFocus = (e) => {
    // Handle focus in the input field
    setShowDepartmentOptions(!showDepartmentOptions);
  };
  const removeDepartment = (index) => {
    // Remove a department from the roles array
    const updatedDepartment = [...departments];
    updatedDepartment.splice(index, 1);
    setSelectedDepartment(updatedDepartment);
  };
  const handleDepartmentSelect = (option) => {
    // Handle the selection of roles from the dropdown

    setSelectedDepartment([...departments, option]);
    setShowDepartmentOptions(false);
  };
  const inputRef = useRef(null);

  const handleDocumentClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowDepartmentOptions(false);
      // setShowDepartmentOptions(false);
    }
  }
  React.useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);
  const handlePanChange = (e) => {
    setPAN(e.target.value);
    setError("");
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
    setError("");
    // setSuccessStatus("");
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
    // setSuccessStatus("");
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setError("");
    // setSuccessStatus("");
  };
  const isValidEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleClick = (e) => {
   
    e.preventDefault();

    setError("");
    if (!PAN || !name || !email || !address || !departments) {
      setError("Please fill all the fields");
    } else if (!isValidEmail(email)) {
      setError("Invalid Email");
    }
    // else if (IsSameName(name) !== null) {
    //   setError('Company name already exists');
    // }
     else {
      dispatch(createCompany({ PAN, name, email, address, departments }));
      console.log(errorMessage);
      if (errorMessage) {
        setError(errorMessage);
      }
      setAddress('');
      setPAN('');
      setName('');
      setEmail('');
      // setDepartments([]);
      setSelectedDepartment([]);
      
      console.log(successStatus);
     
    }
  };
console.log(successStatus);
  return (
    // <div className='flex justify-center h-[100vh] items-center bg-[#F0F4F3]'>
    <div className="flex flex-col bg-[#F0F4F3] ">
      {/* <div>
        <Navbar />
      </div> */}
      <div className=" add-company-css flex justify-center pt-44 pb-10">
        <div className="shadow-paper flex flex-col justify-center items-center bg-white pl-10 pr-10 pb-5 pt-5">
          <div>
            <img src={Logo} alt="" />
          </div>

          <div className="flex justify-center p-4">
            <div className="flex flex-col justify-center">
              <div>
                <h2 className="p-0 m-0 text-lime-500">Add New Company</h2>
              </div>
              <div>
                <div className=" flex flex-col gap-2 pt-4 pb-4 ">
                  <div className="info-input-field-company">
                    <input
                      type="text"
                      value={currentDepartment}
                      placeholder="Department Name"
                      onChange={handleDepartmentInputChange}
                      onFocus={handleDepartmentInputChangeFocus}
                      onKeyPress={handleKeyPress}
                      ref={inputRef}
                    />
                    {showDepartmentOptions && (
                      <div className="absolute">
                        <div className="autocomplete-options">
                          {departmentNames.map((option) => (
                            <div
                              key={option}
                              className="option"
                              onClick={() => handleDepartmentSelect(option)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {departments.map((department, index) => (
                      <div key={index} className="selected-company">
                        {department}
                        <button
                          onClick={() => removeDepartment(index)}
                          className="remove-department-button"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="info-input-field-company w-10">
                    <input
                      type="text"
                      value={PAN}
                      placeholder="Company PAN NO."
                      onChange={handlePanChange}
                    />
                  </div>
                  <div className="info-input-field-company">
                    <input
                      type="text"
                      value={name}
                      placeholder="Company Name"
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="info-input-field-company">
                    <input
                      type="text"
                      value={address}
                      placeholder="Company Address"
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="info-input-field-company">
                    <input
                      type="email"
                      value={email}
                      placeholder="Company Email"
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>
                <div className="flex justify-center pb-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    onClick={handleClick}
                  >
                    Add Company
                  </button>
                </div>
                {error && (
                  <p className="error-message flex justify-center">{error}</p>
                )}
                {successStatus === "success" && (
                  <div className="success-message flex justify-center">
                    Company Added Successfully
                  </div>
                  // Swal.fire({
                  //   icon: 'success',
                  //   title: 'Company Added Successfully',
                  //   showConfirmButton: false,
                  //   timer: 1500
                  // })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
