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
import CompanyDashboardNav from "../Dashboard/CompanyDashboardNav";
import * as actionTypes from "../Redux/actionTypes";
import Select from "react-dropdown-select";

const AddCompany = ({ token }) => {
  const [PAN, setPAN] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [departments, setSelectedDepartment] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState(""); // Store current input department
  const [error, setError] = useState("");
  const [formType, setFormType] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const successStatus = useSelector(
    (state) => state.company.companyCreationStatus
  );
  // const [CompanySuccessStatus, setSuccessStatus] = useState( successStatus );
  const companyData = useSelector((state) => state.company.companyData);
  let errorMessage = useSelector((state) => state.company.companyError);
  const departmentData = useSelector((state) => state.company.departmentData);
  let departmentNames =
    departmentData &&
    departmentData.$values &&
    Array.isArray(departmentData.$values)
      ? departmentData.$values.map((department) => department.departmentName)
      : [];
  const [showDepartmentOptions, setShowDepartmentOptions] = useState(false);

  const dummyDepartments = [
    "Sales",
    "Employees",
    "HR",
    "Marketing",
    "IT",
    "Business",
    "Administration",
  ];
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
  };
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  const handlePanChange = (e) => {
    setPAN(e.target.value);
    setError("");
  };
  const [nameWarning, setNameWarning] = useState({
    compNameWarning: "",
    addressWarning: "",
  });
  const handleNameChange = (e) => {
    const enteredName = e.target.value;
    setName(enteredName);
    setError("");
    errorMessage = "";
    dispatch({
      type: actionTypes.COMPANY_CREATE_FAILURE,
      payload: null,
    });
    // setSuccessStatus("");
    // Check if the first letter is not capitalized

    if (enteredName && enteredName[0] !== enteredName[0].toUpperCase()) {
      setNameWarning((prevWarnings) => ({
        ...prevWarnings,
        compNameWarning: "First letter must be capitalized",
      }));
    } else {
      setNameWarning((prevWarnings) => ({
        ...prevWarnings,
        compNameWarning: "",
      }));
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
    // setSuccessStatus("");
  };
  const handleAddressChange = (e) => {
    const enteredAddress = e.target.value;
    setAddress(enteredAddress);
    setError("");
    // setSuccessStatus("");
    // Check if the first letter is not capitalized
    if (
      enteredAddress &&
      enteredAddress[0] !== enteredAddress[0].toUpperCase()
    ) {
      setNameWarning((prevWarnings) => ({
        ...prevWarnings,
        addressWarning: "First letter must be capitalized",
      }));
    } else {
      setNameWarning((prevWarnings) => ({
        ...prevWarnings,
        addressWarning: "",
      }));
    }
  };
  const isValidEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  let imagePreviewURL = null;
  const handlePhotoUpload = (e) => {
    const imageFile = e.target.files[0]; // Get the selected image fil

    if (imageFile) {
      // Optional: You can preview the image if needed
      const reader = new FileReader();
      reader.onload = (event) => {
        imagePreviewURL = event.target.result;
        setPreviewImage(imagePreviewURL); // Store the image preview URL in state
      };
      reader.readAsDataURL(imageFile);

      // Store the selected image file in state (e.g., uploadedImage)
      setUploadedImage(imageFile);
      // console.log(uploadedImage);
    }
  };

  const dataToPost = {
    PAN,
    name,
    email,
    address,
    departments,
    formType,
  };

  const formData = new FormData();
  // for (const key in dataToPost) {
  //   formData.append(key, dataToPost[key]);
  // }
  for (const key in dataToPost) {
    if (Array.isArray(dataToPost[key])) {
      // If the value is an array, append each element separately
      dataToPost[key].forEach((element, index) => {
        formData.append(`${key}[${index}]`, element);
      });
    } else {
      formData.append(key, dataToPost[key]);
    }
  }
  formData.append("imageFile", uploadedImage);
  const handleClick = (e) => {
    console.log(departments);
    e.preventDefault();

    setError("");
    if (!PAN || !name || !email || !address || !departments || !formType) {
      setError("Please fill all the fields");
    } else if (!isValidEmail(email)) {
      setError("Invalid Email");
    }
    // else if (IsSameName(name) !== null) {
    //   setError('Company name already exists');
    // }
    else {
      dispatch(createCompany(formData));

      if (errorMessage) {
        setError(errorMessage);
      }
      if (successStatus === "success") {
        setAddress("");
        setPAN("");
        setName("");
        setEmail("");
        // setDepartments([]);
        setSelectedDepartment([]);
        setUploadedImage(null);
        setFormType("");
      }
    }
  };

  return (
    // <div className='flex justify-center h-[100vh] items-center bg-[#F0F4F3]'>
    <div className="flex flex-col bg-[#F0F4F3] h-[100%] ">
      <div>
        <CompanyDashboardNav />
      </div>
      <div className=" add-company-css flex justify-center pt-40 pb-10">
        <div className="shadow-paper flex flex-col justify-center items-center bg-white pl-10 pr-10 pb-5 pt-5 rounded-lg">
          <div>
            <img src={Logo} alt="" />
          </div>

          <div className="flex justify-center p-4">
            <div className="flex flex-col justify-center">
              <div>
                <h2 className="p-0 m-0 text-lime-500">Add New Company</h2>
              </div>
              <div>
                <div className=" flex flex-col gap-4 pt-4 pb-4 ">
                  {/* <input
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
                    )} */}

                  <Select
                    name="select"
                    style={{
                      width: "300.546px",
                      height: "27.379",
                      fontSize: "16px",
                      borderRadius: "0.8rem",
                      border: "1px solid black",
                    }}
                    options={departmentNames.map((department) => ({
                      value: department,
                      label: department,
                    }))}
                    multi
                    onChange={(selectedOptions) =>
                      setSelectedDepartment(
                        selectedOptions.map((option) => option.value)
                      )
                    }
                  ></Select>

                  {/* <div className="flex gap-2">
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
                  </div> */}
                  <div className="info-input-field-company w-10">
                    <input
                      type="text"
                      value={PAN}
                      placeholder="Company PAN/VAT NO."
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
                  {errorMessage == "Company Name already exists" && (
                    <p className="field-error-message">{errorMessage}</p>
                  )}
                  {nameWarning.compNameWarning && (
                    <p className="field-error-message">
                      {nameWarning.compNameWarning}
                    </p>
                  )}
                  <div className="info-input-field-company">
                    <input
                      type="text"
                      value={address}
                      placeholder="Company Address"
                      onChange={handleAddressChange}
                    />
                  </div>
                  {nameWarning.addressWarning && (
                    <p className="field-error-message">
                      {nameWarning.addressWarning}
                    </p>
                  )}
                  <div className="info-input-field-company">
                    <input
                      type="email"
                      value={email}
                      placeholder="Company Email"
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="info-input-field-company ">
                    <input
                      type="text"
                      placeholder="Select Form Type"
                      value={formType}
                      // onChange={(e) => setFormType(e.target.value)}
                      className="typeStyle"
                    />
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="Form 1">Form 1</option>
                      <option value="Form 2">Form 2</option>
                      <option value="Form 3">Form 3</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="photo-upload"
                      className="m-0 pb-2 font-helvetica text-sm font-semibold block"
                    >
                      Select Company Logo:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                    <div
                      className="image-container"
                      style={{ backgroundImage: { imagePreviewURL } }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-center pb-4 mt-2">
                  <div
                    type="submit"
                    className="bg-blue-700 hover:bg-[#8FD448] text-white font-bold py-2 px-4 rounded-2xl cursor-pointer hover:scale-110 transition-transform duration-2000"
                    onClick={handleClick}
                  >
                    Add Company
                  </div>
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
