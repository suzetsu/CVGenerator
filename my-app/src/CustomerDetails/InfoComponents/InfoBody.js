import React, { useState, useEffect, useRef } from "react";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import "./infoStyles.css";
import { storeClientInfo } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientInfo } from "../../Redux/actions";
import CVTemp from "../CVtemplate/CVTemp";
import EditUpdate from "./EditUpdate";
import { allProvinces } from "./dropdownMenu";
import Experience from "./experience";

import Swal from "sweetalert2";
import { fetchCompanyInfo } from "../../Redux/companyActions";
import { GetAllDistricts } from "../../Redux/departmentActions";
import { GetAllDesignation } from "../../Redux/departmentActions";
import EducationForm from "./education";
import addIcon from "../../images/addIcon.png";
import closeIcon from "../../images/closeIcon.png";
import * as actionTypes from "../../Redux/actionTypes";
const InfoBody = () => {



  const [clientName, setName] = useState("");
  const [clientPANNO, setPAN] = useState("");
  const [companyName, setCompany] = useState("");
  const [departmentName, setDepartment] = useState("");
  const [municipality, setAddress] = useState("");
  const [municipalityNumber, setMUNno] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [clientJoiningDate, setJoiningDate] = useState("");
  const [clientLeavingDate, setLeavingDate] = useState("");
  const [clientDOB, setclientDOB] = useState("");
  const [experiences, setExperiences] = useState([
    {
      organizationName: "",
      duration: "",
      title: "",
    },
  ]);
  const [education, setEducation] = useState([
    {
      college: "",
      level: "",
      degree: "",
      university: "",
    },
  ]);
  const [organizationName, setOrganization] = useState("");
  const [duration, setDuration] = useState("");
  const [title, setTitle] = useState("");

  const [designation, setDesignation] = useState("");
  const [phone, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const [skills, setSelectedSkills] = useState([]); // Store selected roles

  const [currentSkill, setCurrentSkill] = useState(""); // Store current input role
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [bloodGroup, setBloodGroup] = useState("");

  const [fielderrorMessage, setFieldErrorMessage] = useState("");

  const allError = {
    emailFieldError: "",
    clientNameFieldError: "",
    companyNameFieldError: "",
    departmentNameFieldError: "",
    clientPANNOfieldError: "",
    municipalityFieldError: "",
    municipalityNumberFieldError: "",
    districtFieldError: "",
    provinceFieldError: "",
    designationFieldError: "",
    phoneFieldError: "",
    universityFieldError: "",
    collegeFieldError: "",
    levelFieldError: "",
    degreeFieldError: "",
    skillsFieldError: "",
    descriptionFieldError: "",
    bloodGroupFieldError: "",
    educationFieldError: "",
    clientDOB,
    clientJoiningDate,
    clientLeavingDate,
    // organizationNameFieldError: '',
    // durationFieldError: '',
    // titleFieldError: '',
    // clientJoiningDateFieldError: '',
  };

  const [showOptions, setShowOptions] = useState(false);

  const districtData = useSelector((state) => state.company.districtData);
  const designationData = useSelector((state) => state.company.designationData);
  // console.log(designationData?.$values);

  const districtValues = districtData?.$values;

  // console.log(districtData);
  const districtNames = Array.isArray(districtValues)
    ? districtValues.map((district) => district.districtName)
    : [];

  const designationValues = designationData?.$values;
  // console.log(designationData);
  const designationNames = Array.isArray(designationValues)
    ? designationValues.map((designation) => designation.designationName)
    : [];

  const [showDistricts, setShowDistricts] = useState(false);
  const [showDesignations, setShowDesignations] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");

  const dropdownRef = useRef(null);

  // All available options

  const [allErrors, setAllErrors] = useState(allError);

  const emailExistError = useSelector((state) => state.auth.errorMail);

  const [errorMail, setErrorEmail] = useState("");
  const [educationError, setErrorEducation] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchClientInfo());
    dispatch(fetchCompanyInfo());
    dispatch(GetAllDistricts());
    dispatch(GetAllDesignation());
  }, []);

  const [showCompanyOptions, setShowCompanyOptions] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const clientDetails = useSelector((state) => state.auth.clientData);
  const companyDetails = useSelector((state) => state.company.companyData);
  // console.log(companyDetails)
  const companyInfo = companyDetails?.$values;
  const companyNames = Array.isArray(companyInfo)
    ? companyInfo.map((company) => company.name)
    : [];

  const [showDepartmentOptions, setShowDepartmentOptions] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const departmentInfo = Array.isArray(companyInfo)
    ? companyInfo.map((company) => company.departments)
    : [];
  // console.log(departmentInfo)
  const departmentNames = Array.isArray(departmentInfo)
    ? departmentInfo.map((department) => department.$values)
    : [];
  const filteredDepartmentNames = departmentNames.filter(
    (departments, index) => companyNames[index] === companyName
  );
  const flattenedDepartmentNames = [].concat(...filteredDepartmentNames);

  const handleDepartmentInputChange = (e) => {
    setAllErrors({ ...allErrors, departmentNameFieldError: "" });
    const departmentValue = e.target.value;
    setDepartment(departmentValue);

    setSelectedOption("");
  };
  const handleDepartmentFocus = (e) => {
    setShowDepartmentOptions(!showDepartmentOptions);
  };
  const filterDepartmentNamesByDepartments = flattenedDepartmentNames.filter(
    (department) => {
      return department.toLowerCase().includes(departmentName.toLowerCase());
    }
  );
  const handleDepartmentClick = (option) => {
    setDepartment(option);
    setSelectedDepartment(option);
    setShowDepartmentOptions(false);
  };

  const handleCompanyClick = (option) => {
    // Handle the selection of companies from the dropdown
    setCompany(option);
    setSelectedCompany(option);
    setShowCompanyOptions(false);
    
  };
  const handleCompanyInputChange = (e) => {
    setAllErrors({ ...allErrors, companyNameFieldError: "" });
    const companyValue = e.target.value;
    setCompany(companyValue);

    setSelectedOption("");
  };
  const filteredCompanyNames = companyNames.filter((company) => {
    return company.toLowerCase().includes(companyName.toLowerCase());
  });
  const handleCompanyFocus = (e) => {
    setShowCompanyOptions(!showCompanyOptions);
  };
  
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const handleDocumentClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowCompanyOptions(false);
      // setShowDepartmentOptions(false);
    }
    if (inputRef2.current && !inputRef2.current.contains(e.target)) {
      setShowDepartmentOptions(false);
    }
    if (inputRef3.current && !inputRef3.current.contains(e.target)) {
      setShowOptions(false);
    }
    if (inputRef4.current && !inputRef4.current.contains(e.target)) {
      setShowDesignations(false);
    }
    if (inputRef5.current && !inputRef5.current.contains(e.target)) {
      setShowDistricts(false);
    }
    

  };

  React.useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  

  let emailExistsErrorMessage = useSelector((state) => state.auth.emailError);
  const clientCreationStatus = useSelector(
    (state) => state.auth.clientCreationStatus
  );
  console.log(clientCreationStatus);
  const userRole = useSelector((state) => state.auth.role);
  const isLoggedIn = useSelector((state) => state.auth.token);

  // const [emailExistMsg, setEmailExistsMsg] = useState(emailExistsErrorMessage);
  // console.log(emailExistMsg)

  const IsSameEmail = (email) => {
    if (clientDetails && clientDetails.$values) {
      const matchingEmail = clientDetails.$values.find(
        (client) => client.email === email
      );
      return matchingEmail;
    }
    return null;
  };

  const handleRoleSelect = (e) => {
    // Handle the selection of roles from the dropdown
    const selectedRole = e.target.value;
    setSelectedSkills([...skills, selectedRole]);
  };

  const handleKeyPress = (e) => {
    // Handle keypress in the input field
    if (e.key === "Enter") {
      e.preventDefault();
      const roleToAdd = currentSkill.trim();
      if (roleToAdd) {
        setSelectedSkills([...skills, roleToAdd]);
        setCurrentSkill("");
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
    setAllErrors({ ...allErrors, districtFieldError: "" });
    const districtValue = e.target.value;
    setDistrict(districtValue);
    setSelectedOption("");
  };

  const handleDistrictClick = (option) => {
    // setFilteredOptions(option)
    setDistrict(option);
    setShowDistricts(false);
    setSelectedOption(option);
    // console.log(option);
  };
  const handleDesignationChange = (e) => {
    setAllErrors({ ...allErrors, designationFieldError: "" });
    const designationValue = e.target.value;
    setDesignation(designationValue);
    setSelectedOption("");
  };
  const handleDesignationClick = (option) => {
    // setFilteredOptions(option)
    setDesignation(option);
    setShowDesignations(false);
    setSelectedOption(option);
    // console.log(option);
  };
  const handleDistrictFocus = () => {
    setShowDistricts(!showDistricts);
  };
  const handleDesignationFocus = () => {
    setShowDesignations(!showDesignations);
  };

  const handleInputChange = (e) => {
    setAllErrors({ ...allErrors, provinceFieldError: "" });
    const inputValue = e.target.value;
    setProvince(inputValue);
    setSelectedOption("");
  };
  const filteredOptions = allProvinces.filter((option) =>
    option.toLowerCase().includes(province.toLowerCase())
  );

  const filteredDistrictNames = districtNames.filter((option) =>
    option.toLowerCase().includes(district.toLowerCase())
  );
  const filteredDesignations = designationNames.filter((option) =>
    option.toLowerCase().includes(designation.toLowerCase())
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
  };

 



  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrorMessage("");
    setErrorEmail("");
    setErrorEducation("");

    const experiencesJson = JSON.stringify(experiences);
    const educationJson = JSON.stringify(education);
    // const experiences = JSON.parse(experiencesJson);
    // const experienceString = experiencesJson.stringify(experiences);
    // console.log(experienceString);
    // const experiencesString = experiences.map(item => `${item.organizationName}, ${item.duration}, ${item.title}`).join(', ');

    // console.log(experiencesJson);

    console.log(experiencesJson);
    console.log(educationJson);
    console.log(skills);

    // })
    // setAllErrors(errors);
    const clientInfo = {
      clientName,
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
      description,
      experiences: experiencesJson,
      educations: educationJson,
      skills,
      bloodGroup,
      joiningDate: clientJoiningDate,
      clientLeavingDate,
      clientDOB,

    };

    console.log(clientInfo);
    const formData = new FormData();
    for (const key in clientInfo) {
      console.log(key, clientInfo[key]);
      formData.set(key, clientInfo[key]);
    }

    formData.append("ImageFile", uploadedImage);
    // const imageAsString = btoa(String.fromCharCode(...new Uint8Array(uploadedImage)));
    // formData.append('imagePath', uploadedImage);

    console.log(formData.get("education"));

    const requiredField = [
      { name: "clientName", label: "Name" },
      { name: "clientPANNO", label: "PAN" },
      { name: "companyName", label: "Company Name" },
      { name: "municipality", label: "Municipality" },
      { name: "municipalityNumber", label: "MUN No" },
      { name: "district", label: "District" },
      { name: "province", label: "Province" },
      { name: "designation", label: "Designation" },
      { name: "phone", label: "Phone" },
      { name: "email", label: "Email" },
      { name: "description", label: "Description" },
      { name: "departmentName", label: "Department Name" },
      { name: "bloodGroup", label: "Blood Group" },
    ];
    requiredField.forEach((field) => {
      const fieldName = field.name;
      const fieldValue = eval(fieldName);
      if (!fieldValue) {
        setAllErrors((prevErrors) => ({
          ...prevErrors,
          [`${fieldName}FieldError`]: `${field.label} is required field`,
        }));
      }
    });
    if (!isValidEmail(email)) {
      setErrorEmail("Email is invalid");
    } else {
     
      
      dispatch(await storeClientInfo(formData));
      
      setName('');
    setPAN('');
    setAddress('');
    setMUNno('');
    setDistrict('');
    setProvince('');
    setDesignation('');
    setMobile('');
    setEmail('');
    setDescription('');
    setCompany('');
    setDepartment('');
    setBloodGroup('');
    setJoiningDate('');
    setLeavingDate('');
    setclientDOB('');
    setExperiences([]);
    setEducation([]);
    setCurrentSkill([]);
    setUploadedImage('');
    }

    // if (clientCreationStatus === 'success'){
    //   alert('Client Created Successfully')
    // }
    // else if (clientCreationStatus === 'failure'){
    //   alert('Client Creation Failed')
    // }

    
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
        console.log(`Previewing ${imagePreviewURL}`);
      };
      reader.readAsDataURL(imageFile);

      // Store the selected image file in state (e.g., uploadedImage)
      setUploadedImage(imageFile);
      // console.log(uploadedImage);
    }
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { organizationName: "", duration: "", title: "" },
    ]);
  };
  const removeExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  const handleOrganizationNameChange = (value, index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index].organizationName = value;
    setExperiences(updatedExperiences);
  };

  const handleDurationChange = (value, index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index].duration = value;
    setExperiences(updatedExperiences);
  };

  const handleTitleChange = (value, index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index].title = value;
    setExperiences(updatedExperiences);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { college: "", level: "", degree: "", university: "" },
    ]);
  };
  const removeEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  const handleUniversityChange = (value, index) => {
    const updatedEducation = [...education];
    updatedEducation[index].university = value;
    setEducation(updatedEducation);
    setAllErrors({ ...allErrors, universityFieldError: "" });
  };

  const handleCollegeChange = (value, index) => {
    const updatedEducation = [...education];
    updatedEducation[index].college = value;
    setEducation(updatedEducation);
  };

  const handleLevelChange = (value, index) => {
    const updatedEducation = [...education];
    updatedEducation[index].level = value;
    setEducation(updatedEducation);
  };
  const handleDegreeChange = (value, index) => {
    const updatedEducation = [...education];
    updatedEducation[index].degree = value;
    setEducation(updatedEducation);
  };



  return (
    <>
      <div className="  flex justify-center pt-12 bg-[#F8F8F8] pb-10">
        <div className="flex flex-col">
          <div className="w-[815px]  info-div ">
            <div className="p-6">
              <p
                className=" m-0 p-0 font-helvetica font-bold"
                style={{ color: "#1670B2", fontSize: "20px" }}
              >
                Customer Information
              </p>
              <hr></hr>
              <div className="flex flex-col gap-6 pt-2">
                <div>
                  <p
                    className=" m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Basic Information
                  </p>
                  <div className=" flex flex-col pl-2">
                    <div className="flex gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Client Name
                        </p>
                        <div
                          className={` ${
                            allErrors.clientNameFieldError
                              ? "error-input"
                              : "info-input-field"
                          }`}
                        >
                          <input
                            type="text"
                            value={clientName}
                            placeholder="Your Name"
                            onChange={(e) => {
                              setName(e.target.value);
                              setAllErrors({
                                ...allErrors,
                                clientNameFieldError: "",
                              });
                            }}
                          />
                        </div>
                        {allErrors.clientNameFieldError && (
                          <p className=" field-error-message">
                            {allErrors.clientNameFieldError}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 pt-2 ">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Client PAN No.
                        </p>
                        <div
                          className={` ${
                            allErrors.clientPANNOfieldError
                              ? "error-input"
                              : "info-input-field"
                          }`}
                        >
                          <input
                            type="text"
                            value={clientPANNO}
                            placeholder="PAN No."
                            onChange={(e) => {
                              setPAN(e.target.value);
                              setAllErrors({
                                ...allErrors,
                                clientPANNOfieldError: "",
                              });
                            }}
                          />
                        </div>
                        {allErrors.clientPANNOfieldError && (
                          <p className="field-error-message">
                            {allErrors.clientPANNOfieldError}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Designation
                        </p>
                        <div
                          className={` ${
                            allErrors.designationFieldError
                              ? "error-input"
                              : "info-input-field flex gap-1"
                          }`}
                        >
                          <input
                            type="text"
                            value={designation}
                            placeholder="Eg: Developer, Analyst, Tester"
                            onChange={handleDesignationChange}
                            onFocus={handleDesignationFocus}
                            ref={inputRef4}
                          />
                          {/* <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
                                    <option value=""></option>
                                    <option value="Developer">Developer</option>
                                    <option value="Analyst">Analyst</option>
                                    <option value="Tester">Tester</option>
                                </select> */}
                          {showDesignations && (
                            <div className="autocomplete-options mt-7">
                              {Array.isArray(filteredDesignations)
                                ? filteredDesignations.map((option) => (
                                    <div
                                      key={option}
                                      className="option"
                                      onClick={() =>
                                        handleDesignationClick(option)
                                      }
                                    >
                                      {option}
                                    </div>
                                  ))
                                : null}
                            </div>
                          )}
                        </div>
                        {allErrors.designationFieldError && (
                          <p className="field-error-message">
                            {allErrors.designationFieldError}
                          </p>
                        )}
                      </div>
                      <div></div>
                    </div>
                    <div className="flex gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Company Name
                        </p>
                        <div
                          className={` ${
                            allErrors.companyNameFieldError
                              ? "error-input"
                              : "info-input-field"
                          }`}
                        >
                          <input
                            type="text"
                            value={companyName}
                            placeholder="Company Name"
                            onChange={handleCompanyInputChange}
                            onFocus={handleCompanyFocus}
                            ref={inputRef}
                          />
                          {showCompanyOptions && (
                            <div className="absolute">
                              <div className="autocomplete-options">
                                {filteredCompanyNames.map((option) => (
                                  <div
                                    key={option}
                                    className="option"
                                    onClick={() => handleCompanyClick(option)}
                                  >
                                    {option}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        {allErrors.companyNameFieldError && (
                          <p className=" field-error-message">
                            {allErrors.companyNameFieldError}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Department Name
                        </p>
                        <div
                          className={` ${
                            allErrors.departmentNameFieldError
                              ? "error-input"
                              : "info-input-field"
                          }`}
                        >
                          <input
                            type="text"
                            value={departmentName}
                            placeholder="Department Name"
                            onChange={handleDepartmentInputChange}
                            onFocus={handleDepartmentFocus}
                            ref={inputRef2}
                          />
                          {showDepartmentOptions && (
                            <div className="absolute">
                              <div className="autocomplete-options">
                                {filterDepartmentNamesByDepartments.map(
                                  (option) => (
                                    <div
                                      key={option}
                                      className="option"
                                      onClick={() =>
                                        handleDepartmentClick(option)
                                      }
                                    >
                                      {option}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        {allErrors.departmentNameFieldError && (
                          <p className=" field-error-message">
                            {allErrors.departmentNameFieldError}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Blood Group
                        </p>
                        <div
                          className={` ${
                            allErrors.bloodGroupFieldError
                              ? "error-input"
                              : "info-input-field flex gap-1"
                          }`}
                        >
                          <input
                            type="text"
                            value={bloodGroup}
                            placeholder="Client Blood Group"
                            onChange={(e) => {
                              setBloodGroup(e.target.value);
                              setAllErrors({
                                ...allErrors,
                                bloodGroupFieldError: "",
                              });
                            }}
                          />
                          <select
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                          >
                            <option value=""></option>
                            <option value="A +ve">A +ve</option>
                            <option value="A -ve">A -ve</option>
                            <option value="O +ve">O +ve</option>
                            <option value="O -ve">O -ve</option>
                            <option value="AB +ve">AB +ve</option>
                            <option value="AB -ve">AB -ve</option>
                          </select>
                        </div>
                        {allErrors.bloodGroupFieldError && (
                          <p className="field-error-message">
                            {allErrors.bloodGroupFieldError}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Skills
                        </p>
                        <div
                          className={` ${
                            allErrors.skillsFieldError
                              ? "error-input"
                              : "info-input-field flex gap-1"
                          }`}
                        >
                          <input
                            type="text"
                            value={currentSkill}
                            onKeyPress={handleKeyPress}
                            placeholder="Add skills"
                            onChange={(e) => {
                              setCurrentSkill(e.target.value);
                              setAllErrors({
                                ...allErrors,
                                skillsFieldError: "",
                              });
                            }}
                          />
                          <select
                            value={currentSkill}
                            onChange={handleRoleSelect}
                          >
                            <option value=""></option>
                            <option value="HTML">HTML</option>
                            <option value="CSS">CSS</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                            <option value="C#">C#</option>
                            <option value="C++">C++</option>
                          </select>
                        </div>
                        {allErrors.skillsFieldError && (
                          <p className="field-error-message">
                            {allErrors.skillsFieldError}
                          </p>
                        )}
                        <div className="flex gap-2">
                          {skills.map((skill, index) => (
                            <div key={index} className="selected-role">
                              {skill}
                              <button
                                onClick={() => removeRole(index)}
                                className="remove-role-button"
                              >
                                x
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Client Joining Date
                        </p>
                        <div
                          className={` ${
                            allErrors.clientJoiningDateFieldError
                              ? "error-input"
                              : "info-input-field"
                          }`}
                        >
                          <input
                            type="date" // Use 'date' type for date input
                            value={clientJoiningDate}
                            placeholder="Client Joining Date"
                            onChange={(e) => {
                              setJoiningDate(e.target.value);
                              console.log(clientJoiningDate)
                              setAllErrors({
                                ...allErrors,
                                clientJoiningDateFieldError: "",
                                
                              } );
                            }}
                          />
                        </div>
                        {allErrors.clientJoiningDateFieldError && (
                          <p className="field-error-message">
                            {allErrors.clientJoiningDateFieldError}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Client Leaving Date
                        </p>
                        <div
                          className={` ${
                            allErrors.clientLeavingDateFieldError
                              ? "error-input"
                              : "info-input-field"
                          }`}
                        >
                          <input
                            type="date" // Use 'date' type for date input
                            value={clientLeavingDate}
                            placeholder="Client Leaving Date"
                            onChange={(e) => {
                              setLeavingDate(e.target.value);
                              setAllErrors({
                                ...allErrors,
                                clientLeavingDateFieldError: "",
                              });
                            }}
                          />
                        </div>
                        {allErrors.clientJoiningDateFieldError && (
                          <p className="field-error-message">
                            {allErrors.clientLeavingDateFieldError}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Client DOB
                        </p>
                        <div
                          className={` ${
                            allErrors.clientDOBFieldError
                              ? "error-input"
                              : "info-input-field"
                          }`}
                        >
                          <input
                            type="date" // Use 'date' type for date input
                            value={clientDOB}
                            onChange={(e) => {
                              setclientDOB(e.target.value);
                              // console.log(new Date(e.target.value).toString().split(" ")[1]);
                              // console.log(new Date(e.target.value).toString().split(" ")[0]);
                              // console.log(new Date(e.target.value).toString().split(" ")[2]);
                              // console.log(new Date(e.target.value).toString().split(" ")[3]);
                              setAllErrors({
                                ...allErrors,
                                clientDOBFieldError: "",
                              });
                            }}
                          />
                        </div>
                        {allErrors.clientDOBFieldError && (
                          <p className="field-error-message">
                            {allErrors.clientDOBFieldError}
                          </p>
                        )}
                      </div>
                    <div>
                      
                    </div>

                  </div>
                </div>
                <div>
                  <p
                    className=" m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Address Information
                  </p>
                  <div className="flex flex-col pl-2">
                    <div className="flex  gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Municipality
                        </p>
                        <div
                          className={` ${
                            allErrors.municipalityFieldError
                              ? "error-input"
                              : "info-input-field"
                          }`}
                        >
                          <input
                            type="text"
                            value={municipality}
                            placeholder="Municipality"
                            onChange={(e) => {
                              setAddress(e.target.value);
                              setAllErrors({
                                ...allErrors,
                                municipalityFieldError: "",
                              });
                            }}
                          />
                        </div>
                        {allErrors.municipalityFieldError && (
                          <p className="field-error-message">
                            {allErrors.municipalityFieldError}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          MUN No.
                        </p>
                        <div
                          className={` ${
                            allErrors.municipalityNumberFieldError
                              ? "error-input"
                              : "info-input-field"
                          }`}
                        >
                          <input
                            type="number"
                            value={municipalityNumber}
                            placeholder="Municipality No."
                            onChange={(e) => {
                              setMUNno(e.target.value);
                              setAllErrors({
                                ...allErrors,
                                municipalityNumberFieldError: "",
                              });
                            }}
                          />
                        </div>
                        {allErrors.municipalityNumberFieldError && (
                          <p className="field-error-message">
                            {allErrors.municipalityNumberFieldError}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Province
                        </p>
                        <div
                          className={` ${
                            allErrors.provinceFieldError
                              ? "error-input"
                              : "info-input-field flex gap-1"
                          }`}
                        >
                          <input
                            type="text"
                            value={province}
                            placeholder="province"
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            ref={inputRef3}
                          />

                          {showOptions && (
                            <div className="pt-[27px] absolute">
                              <div className="autocomplete-options">
                                {filteredOptions.map((option) => (
                                  <div
                                    key={option}
                                    className="option"
                                    onClick={() => handleOptionClick(option)}
                                  >
                                    {option}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        {allErrors.provinceFieldError && (
                          <p className="field-error-message">
                            {allErrors.provinceFieldError}
                          </p>
                        )}
                      </div>
                      <div></div>
                    </div>
                    <div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          District
                        </p>
                        <div
                          className={` ${
                            allErrors.districtFieldError
                              ? "error-input"
                              : "info-input-field"
                          }`}
                        >
                          <input
                            type="text"
                            value={district}
                            placeholder="district"
                            onChange={handleDistrictChange}
                            onFocus={handleDistrictFocus}
                            ref={inputRef5}
                          />
                          {showDistricts && (
                            <div>
                              <div className="autocomplete-options">
                                {Array.isArray(filteredDistrictNames)
                                  ? filteredDistrictNames.map((option) => (
                                      <div
                                        key={option}
                                        className="option"
                                        onClick={() =>
                                          handleDistrictClick(option)
                                        }
                                      >
                                        {option}
                                      </div>
                                    ))
                                  : null}
                              </div>
                            </div>
                          )}
                        </div>
                        {allErrors.districtFieldError && (
                          <p className="field-error-message">
                            {allErrors.districtFieldError}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p
                    className=" m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Contact Information
                  </p>
                  <div className=" pl-2">
                    <div className="flex  gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Client Email
                        </p>
                        <div
                          className={
                            ` ${
                              errorMail ? "error-input" : "info-input-field"
                            }` ||
                            ` ${
                              allErrors.emailFieldError
                                ? "error-input"
                                : "info-input-field"
                            }`
                          }
                        >
                          <input
                            type="email"
                            value={email}
                            placeholder="email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setErrorEmail("");
                              setAllErrors({
                                ...allErrors,
                                emailFieldError: "",
                              });
                              emailExistsErrorMessage = "";
                              dispatch({type:actionTypes.CLIENT_INFO_FAILURE, payload:null})
                            }}
                          />
                        </div>
                        {allErrors.emailFieldError && (
                          <p className="field-error-message">
                            {allErrors.emailFieldError}
                          </p>
                        )}
                        {emailExistError && (
                          <p className="field-error-message">{emailExistError}</p>
                        )}
                        {/* {emailExistsErrorMessage && <p className='field-error-message'>{emailExistsErrorMessage}</p>} */}
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Client Mobile No.
                        </p>
                        <div
                          className={` ${
                            allErrors.phoneFieldError
                              ? "error-input"
                              : "info-input-field"
                          }`}
                        >
                          <input
                            type="tel"
                            value={phone}
                            placeholder="mobile number"
                            onChange={(e) => {
                              setMobile(e.target.value);
                              setAllErrors({
                                ...allErrors,
                                phoneFieldError: "",
                              });
                            }}
                          />
                        </div>
                        {allErrors.phoneFieldError && (
                          <p className="field-error-message">
                            {allErrors.phoneFieldError}
                          </p>
                        )}
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>

                <div>
                  <p
                    className="m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Education Details
                  </p>
                  <div className="pl-2 pb-4 flex flex-col gap-2">
                    {education.map((educations, index) => (
                      <div
                        key={index}
                        className="flex gap-14 p-2"
                        style={{ border: "1px solid black", outline: "none" }}
                      >
                        <div className="flex flex-col gap-4">
                          <div className="flex gap-14">
                            <div className="flex flex-col gap-2">
                              <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                                University
                              </p>
                              <div
                                className={` ${
                                  educationError
                                    ? "error-input"
                                    : "info-input-field"
                                }`}
                              >
                                <input
                                  type="text"
                                  value={educations.university}
                                  placeholder="Enter University name"
                                  onChange={(e) =>
                                    handleUniversityChange(
                                      e.target.value,
                                      index
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                                College
                              </p>
                              <div className="info-input-field">
                                <input
                                  type="text"
                                  value={educations.college}
                                  placeholder="Enter college name"
                                  onChange={(e) =>
                                    handleCollegeChange(e.target.value, index)
                                  }
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                                Level
                              </p>
                              <div className="info-input-field">
                                <input
                                  type="text"
                                  value={educations.level}
                                  placeholder="Enter Level..."
                                  onChange={(e) =>
                                    handleLevelChange(e.target.value, index)
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                              Degree
                            </p>
                            <div className="info-input-field">
                              <input
                                type="text"
                                value={educations.degree}
                                placeholder="Enter degree"
                                onChange={(e) =>
                                  handleDegreeChange(e.target.value, index)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {index > 0 && (
                          <div className="mb-[1rem] ml-[-4.3rem] mt-[-0.4rem]">
                            <div
                              className="flex gap-1 justify-center items-center bg-[red] w-[18px] h-[20px] rounded-[6px] cursor-pointer"
                              onClick={() => removeEducation(index)}
                            >
                              <img
                                src={closeIcon}
                                alt="closeIcon"
                                className="h-[15px] m-0 p-0"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <div
                      className="flex gap-1 justify-center items-center bg-[blue] w-[130px] h-[32px] rounded-[6px] cursor-pointer"
                      onClick={addEducation}
                    >
                      {/* <button onClick={addExperience}>Add Experience</button> */}
                      <img
                        src={addIcon}
                        alt="addIcon"
                        className="w-[20px] h-[20px] m-0 p-0"
                      />
                      <p className="m-0 p-0 font-helvetica font-bold text-white text-xs">
                        Add Education
                      </p>
                    </div>
                  </div>
                  {allErrors.educationFieldError && (
                    <p className="field-error-message">
                      {allErrors.educationFieldError}
                    </p>
                  )}
                </div>
                <div>
                  <p
                    className="m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Professional Experiences
                  </p>
                  <div className="pl-2 pb-4 flex flex-col gap-2">
                    {experiences.map((experience, index) => (
                      <div
                        key={index}
                        className="flex gap-14 p-2"
                        style={{ border: "1px solid black", outline: "none" }}
                      >
                        <div className="flex flex-col gap-4">
                          <div className="flex gap-20">
                            <div className="flex flex-col gap-2">
                              <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                                Organization Name
                              </p>
                              <div className="info-input-field">
                                <input
                                  type="text"
                                  value={experience.organizationName}
                                  placeholder="Enter Organization name"
                                  onChange={(e) =>
                                    handleOrganizationNameChange(
                                      e.target.value,
                                      index
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                                Work Duration
                              </p>
                              <div className="info-input-field">
                                <input
                                  type="text"
                                  value={experience.duration}
                                  placeholder="Enter work duration"
                                  onChange={(e) =>
                                    handleDurationChange(e.target.value, index)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                              Work Description
                            </p>
                            <div className="info-input-field-project-desc">
                              <textarea
                                type="text"
                                value={experience.title}
                                placeholder="Enter your work details..."
                                onChange={(e) =>
                                  handleTitleChange(e.target.value, index)
                                }
                                rows={3}
                                cols={40}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        {index > 0 && (
                          <div className="pl-[10.5rem] pb-4">
                            <div
                              className="flex gap-1 justify-center items-center bg-[red] w-[20px] h-[20px] rounded-[6px] cursor-pointer"
                              onClick={() => removeExperience(index)}
                            >
                              <img
                                src={closeIcon}
                                alt="closeIcon"
                                className="h-[15px] m-0 p-0"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <div
                      className="flex gap-1 justify-center items-center bg-[blue] w-[130px] h-[32px] rounded-[6px] cursor-pointer"
                      onClick={addExperience}
                    >
                      {/* <button onClick={addExperience}>Add Experience</button> */}
                      <img
                        src={addIcon}
                        alt="addIcon"
                        className="w-[20px] h-[20px] m-0 p-0"
                      />
                      <p className="m-0 p-0 font-helvetica font-bold text-white text-xs">
                        Add Experience
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p
                    className=" m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Description
                  </p>
                  <div className=" pl-2">
                    <div
                      className={` ${
                        allErrors.descriptionFieldError
                          ? "error-input-desc"
                          : "info-input-field-desc"
                      }`}
                    >
                      <textarea
                        type="text"
                        value={description}
                        placeholder="Type something about yourself..."
                        onChange={(e) => {
                          setDescription(e.target.value);
                          setAllErrors({
                            ...allErrors,
                            descriptionFieldError: "",
                          });
                        }}
                        rows={4}
                        cols={60}
                      ></textarea>
                    </div>
                    <div className="flex items-start">
                      {allErrors.descriptionFieldError && (
                        <p className="field-error-message">
                          {allErrors.descriptionFieldError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div></div>
                <div>
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

                <div className="flex justify-center">
                  <button className="btn-info" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
                {clientCreationStatus === "success" && (
                  <div className="success-message flex justify-center">
                    Client Added Successfully
                  </div>
                )}
                {fielderrorMessage && (
                  <p className="field-error-message">{fielderrorMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoBody;
