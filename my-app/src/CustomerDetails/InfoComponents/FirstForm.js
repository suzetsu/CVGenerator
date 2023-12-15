import React, { useState, useEffect, useRef } from "react";
import { Form, useNavigate, useLocation } from "react-router-dom";
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

  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [bloodGroup, setBloodGroup] = useState("");

  const [fielderrorMessage, setFieldErrorMessage] = useState("");
  const [gender, setGender] = useState("");
  const [marriedStatus, setMarriedStatus] = useState('');
  const [tole, setTole] = useState('');
  const [homeNumber, setHomeNumber] = useState("");
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [swimming, setSwimming] = useState('')
  const [license, setLicense] = useState('');
  const [otherSkill, setOtherSkill] = useState('');
  const [spouseNumber, setSpouseNumber] = useState('');
  const [fatherName, setFatherName] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [religion, setReligion] = useState("");
  const [sonNum, setSonNum] = useState('');
  const [daughterNum, setDaughterNum] = useState('');
  const [citizenNum, setCitizenNum] = useState('');
  const [issueDistrict, setIssueDistrict] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [insuranceNum, setInsuranceNum] = useState('');
  const [insuranceCompany, setInsuranceCompany] = useState('');
  const [pfSsfNum, setPfSsfNum] = useState('');
  const [citNum, setCitNum] = useState('');
  const [branch, setBranch] = useState('');
  const [affiliatedField, setAffiliationField] = useState('');
  const [interestedField, setInterestedField] = useState('');
  const [occupationName, setOccupationName] = useState('');
  const [occupationType, setOccupationType] = useState('');
  const [operationPeriod, setOperationPeriod] = useState('');
  const [occupationLocation, setOccupationLocation] = useState('');
  const [affiliatedOrganization, setAffiliationOrganization] = useState({
    firstaffiliatedOrganization: '',
    secondaffiliatedOrganization: '',
    thirdaffiliatedOrganization: '',

  });
  const [appointmentStatus, setAppointmentStatus] = useState('');


  const location = useLocation('');
  const chosenCompanyInfo = location.state?.companyInfo
  const formType = chosenCompanyInfo && chosenCompanyInfo.formType
  const chosenCompanyName = chosenCompanyInfo && chosenCompanyInfo.name

  const [companyName, setCompany] = useState(chosenCompanyName);
 

  const allError = {
    emailFieldError: "",
    clientNameFieldError: "",
    genderFieldError: "",
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
  const [showIssueDistricts, setShowIssueDistricts] = useState(false)
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
  // const companyNames = Array.isArray(companyInfo)
  //   ? companyInfo.map((company) => company.name)
  //   : [];

  const [showDepartmentOptions, setShowDepartmentOptions] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const departmentInfo = Array.isArray(chosenCompanyInfo)
    ? chosenCompanyInfo.map((company) => company.departments)
    : [];
  // console.log(departmentInfo)
  const departmentNames = Array.isArray(departmentInfo)
    ? departmentInfo.map((department) => department.$values)
    : [];
  const filteredDepartmentNames = departmentNames.filter(
    (departments, index) => chosenCompanyName[index] === companyName
  );
  const flattenedDepartmentNames = [].concat(...filteredDepartmentNames);

  const handleAffiliationChange = (fieldName, value) => {
    setAffiliationOrganization((prevAffiliation) => ({
      ...prevAffiliation,
      [fieldName]: value,
    }));
  };

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
  // const filteredCompanyNames = companyNames.filter((company) => {
  //   return company.toLowerCase().includes(companyName.toLowerCase());
  // });
  const handleCompanyFocus = (e) => {
    setShowCompanyOptions(!showCompanyOptions);
  };

  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const inputRef7 = useRef(null);
  const handleDocumentClick = (e) => {
    // if (inputRef.current && !inputRef.current.contains(e.target)) {
    //   setShowCompanyOptions(false);
    //   // setShowDepartmentOptions(false);
    // }
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
    if (inputRef6.current && !inputRef6.current.contains(e.target)) {
      setShowIssueDistricts(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  let emailExistsErrorMessage = useSelector((state) => state.auth.emailError);
  const clientCreationStatus = useSelector(
    (state) => state.auth.clientCreationStatus
  );
 

  const isValidEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
let [filteredDistrictNames, setFilteredDistrictNames] = useState([]);
  //  filteredDistrictNames = districtNames.filter((option) =>
  //   option.toLowerCase().includes(district.toLowerCase())
  // );

  const handleDistrictChange = (e) => {
    setAllErrors({ ...allErrors, districtFieldError: "" });
    const districtValue = e.target.value;
    setDistrict(districtValue);
    setSelectedOption("");
    // setFilteredDistrictNames(
    //   districtNames.filter((option) =>
    //     option.toLowerCase().includes(districtValue.toLowerCase())
    //   )
    // );
    
  };

  const handleIssueDistrictChange = (e) => {
    const issuedistrictValue = e.target.value;
    setIssueDistrict(issuedistrictValue);
    setSelectedOption("");
   
  
  }
 

  const handleDistrictClick = (option) => {
    // setFilteredOptions(option)
    setDistrict(option);
    setShowDistricts(false);
    setSelectedOption(option);
    // console.log(option);
  };
  const handleIssueDistrictClick = (issuedoption) => { 
    setIssueDistrict(issuedoption);
    setShowIssueDistricts(false);
    setSelectedOption(issuedoption);
  }
  
  const handleDistrictFocus = () => {
    setShowDistricts(!showDistricts);
    setFilteredDistrictNames(
      districtNames.filter((option) =>
        option.toLowerCase().includes(district.toLowerCase())
      )
    );
  };
  const handleIssueDistrictFocus = () => {
    setShowIssueDistricts(!showIssueDistricts);
   
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
    const affiliatedOrganizationJSON = JSON.stringify(
      affiliatedOrganization
    );

    console.log(experiencesJson);
    console.log(educationJson);


    // })
    // setAllErrors(errors);
    let clientInfo;
    if (formType === "Form 1" ){
     clientInfo = {
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
      religion,
      experiences: experiencesJson,
      educations: educationJson,
      bloodGroup,
      joiningDate: clientJoiningDate,
      clientDOB: clientDOB,
      
      gender,
      marriedStatus,
      swimming,
      homeNumber,
      

      officialInformation: JSON.stringify({
        // affiliatedField: affiliatedField,
        appointment: appointmentStatus,
        // interestedField : interestedField,
      }),
     
      otherInformation: JSON.stringify({
        citizenNum: citizenNum,
        issueDistrict: issueDistrict,
        issueDate: issueDate,
        insuranceCompany:insuranceCompany,
        insuranceNum: insuranceNum,
        pfSsfNum: pfSsfNum,
        citNum: citNum,

      }),
      familyContactInfo: JSON.stringify({
        spouseName: spouseName,
        spouseNumber: spouseNumber,
        sonNum: sonNum,
        daughterNum: daughterNum,
      }),
      skills: JSON.stringify( {
        swimming: swimming,
        license:license,
        otherSkill: otherSkill,
      })
    }
  }
  else if (formType === 'Form 2'){
    clientInfo = {
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
      religion,
      experiences: experiencesJson,
      educations: educationJson,
      bloodGroup,
      joiningDate: clientJoiningDate,
      clientDOB: clientDOB,
      
      gender,
      marriedStatus,
      swimming,
      homeNumber,
      
      branch: branch? branch: null,
      occupations: JSON.stringify({
        occupationType: occupationType,
        occupationLocation: occupationLocation,
        occupationName: occupationName,
        operationPeriod: operationPeriod,
      }),

      officialInformation: JSON.stringify({
        affiliatedField: affiliatedField,
        // appointment: appointmentStatus,
        interestedField : interestedField,
      }),
      // affiliatedOrganization: affiliatedOrganizationJSON,
      otherInformation: JSON.stringify({
        citizenNum: citizenNum,
        issueDistrict: issueDistrict,
        issueDate: issueDate,
        insuranceCompany:insuranceCompany,
        insuranceNum: insuranceNum,
        pfSsfNum: pfSsfNum,
        citNum: citNum,

      }),
      familyContactInfo: JSON.stringify({
        spouseName: spouseName,
        spouseNumber: spouseNumber,
        sonNum: sonNum,
        daughterNum: daughterNum,
      }),
      skills: JSON.stringify( {
        swimming: swimming,
        license:license,
        otherSkill: otherSkill,
      })
    }
  }
    else if (formType === 'Form 3'){
       clientInfo = {
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
        religion,
        experiences: experiencesJson,
        educations: educationJson,
        bloodGroup,
        joiningDate: clientJoiningDate,
        clientDOB: clientDOB,
        
        gender,
        marriedStatus,
        swimming,
        homeNumber,
        
        branch: branch? branch: null,
        occupations: JSON.stringify({
          occupationType: occupationType,
          occupationLocation: occupationLocation,
          occupationName: occupationName,
          operationPeriod: operationPeriod,
        }),
  
        officialInformation: JSON.stringify({
          affiliatedField: affiliatedField,
          // appointment: appointmentStatus,
          interestedField : interestedField,
        }),
        affiliatedOrganization: affiliatedOrganizationJSON,
        otherInformation: JSON.stringify({
          citizenNum: citizenNum,
          issueDistrict: issueDistrict,
          issueDate: issueDate,
          insuranceCompany:insuranceCompany,
          insuranceNum: insuranceNum,
          pfSsfNum: pfSsfNum,
          citNum: citNum,
  
        }),
        familyContactInfo: JSON.stringify({
          spouseName: spouseName,
          spouseNumber: spouseNumber,
          sonNum: sonNum,
          daughterNum: daughterNum,
        }),
        skills: JSON.stringify( {
          swimming: swimming,
          license:license,
          otherSkill: otherSkill,
        })
      }
    }
  

    //  if(formType === 'Form 1'){
    //    clientInfo["branch"] = branch
    //    clientInfo[""] = branch
    //  }

    const formData = new FormData();
    for (const key in clientInfo) {
      formData.set(key, clientInfo[key]);
    }

    formData.append("ImageFile", uploadedImage);
    // const imageAsString = btoa(String.fromCharCode(...new Uint8Array(uploadedImage)));
    // formData.append('imagePath', uploadedImage);

    console.log(formData.get("education"));

    const requiredField = [
      // { name: "clientName", label: "Name" },
      // { name: "clientPANNO", label: "PAN" },
      // { name: "companyName", label: "Company Name" },
      // { name: "municipality", label: "Municipality" },
      // { name: "municipalityNumber", label: "MUN No" },
      // { name: "district", label: "District" },
      // { name: "province", label: "Province" },
      // { name: "designation", label: "Designation" },
      // { name: "phone", label: "Phone" },
      { name: "email", label: "Email" },
      // { name: "description", label: "Description" },
      // { name: "departmentName", label: "Department Name" },
      // { name: "bloodGroup", label: "Blood Group" },
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

      // setName("");
      // setPAN("");
      // setAddress("");
      // setMUNno("");
      // setDistrict("");
      // setProvince("");
      // setDesignation("");
      // setMobile("");
      // setEmail("");
      // setDescription("");
      // setCompany("");
      // setDepartment("");
      // setBloodGroup("");
      // setJoiningDate("");
      // setLeavingDate("");
      // setclientDOB("");
      // setExperiences([]);
      // setEducation([]);

      // setUploadedImage("");
    }
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
      <div className="  flex justify-center pt-24 bg-[#F8F8F8] pb-10">
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
                    Personal Information
                  </p>
                  <div className=" flex flex-col pl-2">
                    <div className="flex gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Client Name
                        </p>
                        <div
                          className={` ${allErrors.clientNameFieldError
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
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Client DOB
                        </p>
                        <div
                          className={` ${allErrors.clientDOBFieldError
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
                      <div className="flex flex-col gap-1 pt-2 ">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Religion
                        </p>
                        <div
                          className="info-input-field"

                        >
                          <input
                            type="text"
                            value={religion}
                            placeholder="Enter Religion"
                            onChange={(e) => {
                              setReligion(e.target.value);
                            }}
                          />
                        </div>
                      </div>


                      <div></div>
                    </div>

                    <div className="flex gap-14">
                      <div className="flex flex-col gap-1 pt-2 ">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Father's Name
                        </p>
                        <div
                          className={` ${allErrors.clientPANNOfieldError
                            ? "error-input"
                            : "info-input-field"
                            }`}
                        >
                          <input
                            type="text"
                            value={fatherName}
                            placeholder="Father Name"
                            onChange={(e) => {
                              setFatherName(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 pt-2 ">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold pt-1">
                          Gender:
                        </p>
                        <div
                          className='flex items-center gap-2 content-center font-helvetica text-sm pt-1'
                        >
                          <label className="flex content-center m-0 p-0">
                            <input
                              className="flex content-center items-center pl-1 ml-1 mb-0 mt-0 pb-0 pt-0 "
                              type="radio"
                              name="gender"
                              value='Male'
                              checked={gender === "Male"}
                              onChange={(e) => {

                                setGender("Male");

                              }}
                            />
                            Male
                          </label>
                          <label className="flex content-center ">
                            <input
                              className="flex content-center items-center pl-1 ml-1 mb-0 mt-0 pb-0 pt-0"
                              type="radio"
                              name="gender"
                              value="Female"
                              checked={gender === "Female"}
                              onChange={(e) => {
                                setGender("Female");

                                console.log(gender);

                              }}
                            />
                            Female
                          </label>
                          <label className="flex content-center">
                            <input
                              className="flex content-center items-center pl-1 ml-1 mb-0 mt-0 pb-0 pt-0"
                              type="radio"
                              name="gender"
                              value="Others"
                              checked={gender === "Others"}
                              onChange={(e) => {

                                setGender("Others");
                                
                              }}
                            />
                            Others
                          </label>
                        </div>
                        
                        
                       
                      </div>
                      <div className="flex flex-col gap-1 pt-2 pl-3">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold pt-1">
                          Marital Status:
                        </p>
                        <div
                          className='flex items-center gap-2 content-center font-helvetica text-sm pt-1'
                        >
                          <label className="flex content-center m-0 p-0">
                            <input
                              className="flex content-center items-center pl-1 ml-1 mb-0 mt-0 pb-0 pt-0 "
                              type="radio"
                              value='Married'
                              checked={marriedStatus === "Married"}
                              onChange={(e) => {
                                setMarriedStatus('Married');
                               
                              }}
                            />
                            Married
                          </label>
                          <label className="flex content-center ">
                            <input
                              className="flex content-center items-center pl-1 ml-1 mb-0 mt-0 pb-0 pt-0"
                              type="radio"
                              value='Unmarried'
                              checked={marriedStatus === "Unmarried"}
                              onChange={(e) => {
                                setMarriedStatus('Unmarried');
                               
                              }}
                            />
                            Unmarried
                          </label>
                        </div>
                        
                      </div>
                    </div>
                    <div className="flex gap-14 pt-2">
                    <div className="flex flex-col gap-2">
                            <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                              Company Name
                            </p>
                            <div className="info-input-field">
                              <input
                                type="text"
                                value={companyName}
                                placeholder="Enter Company name"
                                onChange={(e) =>
                                  setCompany(e.target.value)
                                }
                              />
                            </div>
                          </div>
                      </div>

                    <div></div>
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
                            ` ${errorMail ? "error-input" : "info-input-field"
                            }` ||
                            ` ${allErrors.emailFieldError
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
                              dispatch({
                                type: actionTypes.CLIENT_INFO_FAILURE,
                                payload: null,
                              });
                            }}
                          />
                        </div>
                        {allErrors.emailFieldError && (
                          <p className="field-error-message">
                            {allErrors.emailFieldError}
                          </p>
                        )}
                        {emailExistError && (
                          <p className="field-error-message">
                            {emailExistError}
                          </p>
                        )}
                        {/* {emailExistsErrorMessage && <p className='field-error-message'>{emailExistsErrorMessage}</p>} */}
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Client Mobile No.
                        </p>
                        <div
                          className={` ${allErrors.phoneFieldError
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
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Home No.
                        </p>
                        <div
                          className="info-input-field"

                        >
                          <input
                            type="number"
                            value={homeNumber}
                            placeholder="Home number"
                            onChange={(e) => {
                              setHomeNumber(e.target.value);

                            }}
                          />
                        </div>

                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <div>
                  <p
                    className=" m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Postal Information
                  </p>
                  <div className="flex flex-col pl-2">
                    <div className="flex  gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Province
                        </p>
                        <div
                          className={` ${allErrors.provinceFieldError
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
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          District
                        </p>
                        <div
                          className={` ${allErrors.districtFieldError
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
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Municipality
                        </p>
                        <div
                          className={` ${allErrors.municipalityFieldError
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

                      <div></div>
                    </div>
                    <div className="flex  gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          MUN No.
                        </p>
                        <div
                          className={` ${allErrors.municipalityNumberFieldError
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
                          Tole
                        </p>
                        <div
                          className="info-input-field"
                        >
                          <input
                            type="text"
                            value={tole}
                            placeholder="Tole Name"
                            onChange={(e) => {
                              setTole(e.target.value);
                              
                            }}
                          />
                          
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
                {(formType === 'Form 1')&& <div className="flex flex-col gap-2">
                  <p
                    className=" m-0 p-0 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Official Information
                  </p>
                  <div className=" pl-2">
                    <div className=" flex flex-col pl-2">
                      <div className="flex  gap-14">
                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Designation
                          </p>
                          <div
                            className={` ${allErrors.designationFieldError
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
                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Department Name
                          </p>
                          <div
                            className={` ${allErrors.departmentNameFieldError
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
                            Client Joining Date
                          </p>
                          <div
                            className={` ${allErrors.clientJoiningDateFieldError
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
                                console.log(clientJoiningDate);
                                setAllErrors({
                                  ...allErrors,
                                  clientJoiningDateFieldError: "",
                                });
                              }}
                            />
                          </div>
                          {allErrors.clientJoiningDateFieldError && (
                            <p className="field-error-message">
                              {allErrors.clientJoiningDateFieldError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-14"></div>
                      <div className="flex flex-col gap-1 pt-2 ">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold pt-1">
                          Type Of Appointment:
                        </p>
                        <div
                          className='flex items-center gap-2 content-center font-helvetica text-sm pt-1'
                        >
                          <label className="flex content-center m-0 p-0">
                            <input
                              className="flex content-center items-center pl-1 ml-1 mb-0 mt-0 pb-0 pt-0 "
                              type="radio"
                              value='Permanent'
                              checked={appointmentStatus === "Permanent"}
                              onChange={(e) => {
                                setAppointmentStatus('Permanent');
                               
                              }}
                            />
                            Permanent
                          </label>
                          <label className="flex content-center ">
                            <input
                              className="flex content-center items-center pl-1 ml-1 mb-0 mt-0 pb-0 pt-0"
                              type="radio"
                              value='Contract'
                              checked={appointmentStatus === "Contract"}
                              onChange={(e) => {
                                setAppointmentStatus('Contract');
                               
                              }}
                            />
                            Contract
                          </label>
                          <label className="flex content-center ">
                            <input
                              className="flex content-center items-center pl-1 ml-1 mb-0 mt-0 pb-0 pt-0"
                              type="radio"
                              value='Other'
                              checked={appointmentStatus === "Other"}
                              onChange={(e) => {
                                setAppointmentStatus('Other');
                               
                              }}
                            />
                            Other
                          </label>
                        </div>
                        
                        </div>
                    </div>
                  </div>
                </div>
                }
                <div className="flex flex-col gap-2">
                  <p
                    className=" m-0 p-0 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Physical Information
                  </p>
                  <div className=" pl-2">
                    <div className=" flex flex-col pl-2">
                      <div className="flex  gap-14">
                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Height(ft)
                          </p>
                          <div
                            className={` ${allErrors.clientNameFieldError
                              ? "error-input"
                              : "info-input-field"
                              }`}
                          >
                            <input
                              type="text"
                              value={height}
                              placeholder="Enter height"
                              onChange={(e) => {
                                setHeight(e.target.value);
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
                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Weight(kg)
                          </p>
                          <div
                            className={` ${allErrors.clientNameFieldError
                              ? "error-input"
                              : "info-input-field"
                              }`}
                          >
                            <input
                              type="text"
                              value={weight}
                              placeholder="Enter weight"
                              onChange={(e) => {
                                setWeight(e.target.value);
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
                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Blood Group
                          </p>
                          <div
                            className={` ${allErrors.bloodGroupFieldError
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
                      <div className="flex gap-14"></div>
                      <div className="flex flex-col gap-1 pt-2">

                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p
                    className=" m-0 p-0 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Skills
                  </p>
                  <div className=" pl-2">
                    <div className=" flex flex-col pl-2">
                      <div className="flex  gap-14">
                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Driving License Category
                          </p>
                          <div
                            className='info-input-field'
                          >
                            <input
                              type="text"
                              value={license}
                              placeholder="E.g. A, B, K"
                              onChange={(e) => {
                                setLicense(e.target.value);

                              }}
                            />
                          </div>

                        </div>
                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Swimming
                          </p>
                          <div >
                            <div className="flex items-center gap-4">
                              <label className="flex content-center m-0 p-0">
                                <input

                                  type="checkbox"
                                  value= "Yes"
                                  checked={swimming === 'Yes'}
                                  onChange={() => {
                                    setSwimming('Yes');
                                    

                                  }}
                                />
                                Yes
                              </label>
                              <label >
                                <input

                                  type="checkbox"
                                  value='No'
                                  checked={swimming === 'No'}
                                  onChange={() => {
                                    setSwimming('No')

                                  }}
                                />
                                No
                              </label>
                            </div>
                          </div>

                        </div>

                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Others
                          </p>
                          <div
                            className='info-input-field'
                          >
                            <input
                              type="text"
                              value={otherSkill}
                              placeholder="Other skills"
                              onChange={(e) => {
                                setOtherSkill(e.target.value);

                              }}
                            />

                          </div>

                        </div>

                      </div>
                      <div className="flex gap-14"></div>
                      <div className="flex flex-col gap-1 pt-2">

                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p
                    className=" m-0 p-0 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Family Contact Information
                  </p>
                  <div className=" pl-2">
                    <div className=" flex flex-col pl-2">
                      <div className="flex  gap-14">
                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Spouse Name
                          </p>
                          <div
                            className='info-input-field'
                          >
                            <input
                              type="text"
                              value={spouseName}
                              placeholder=" Spouse Name"
                              onChange={(e) => {
                                setSpouseName(e.target.value);

                              }}
                            />
                          </div>

                        </div>
                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Contact No.
                          </p>
                          <div >
                            <div
                              className='info-input-field'
                            >
                              <input
                                type="tel"
                                value={spouseNumber}
                                placeholder="Spouse Contact Number"
                                onChange={(e) => {
                                  setSpouseNumber(e.target.value);

                                }}
                              />
                            </div>
                          </div>

                        </div>

                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            No. Of Children
                          </p>
                          <div className="flex gap-2">
                            <p className=" p-0 m-0 font-helvetica text-xs font-thin ">Son:</p>
                            <div
                              className='info-input-field--smallfield'
                            >
                              <input
                                type="text"
                                value={sonNum}
                                placeholder=""
                                onChange={(e) => {
                                  setSonNum(e.target.value);

                                }}
                              />

                            </div>
                            <p className=" p-0 m-0 font-helvetica text-xs font-thin ">Daughter:</p>
                            <div
                              className='info-input-field--smallfield'
                            >
                              <input
                                type="text"
                                value={daughterNum}
                                placeholder=""
                                onChange={(e) => {
                                  setDaughterNum(e.target.value);

                                }}
                              />

                            </div>
                          </div>

                        </div>

                      </div>
                      <div className="flex gap-14"></div>
                      <div className="flex flex-col gap-1 pt-2">

                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p
                    className=" m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Other Information
                  </p>
                  <div className="flex flex-col pl-2">
                    <div className="flex  gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Citizenship Number
                        </p>
                        <div
                          className='info-input-field'
                        >
                          <input
                            type="text"
                            value={citizenNum}
                            placeholder="province"
                            onChange={
                              (e) => {
                                setCitizenNum(e.target.value);

                              }
                            }

                          />


                        </div>

                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Issued District
                        </p>
                        <div
                          className='info-input-field'
                        >
                          <input
                            type="text"
                            value={issueDistrict}
                            placeholder="district"
                            onChange={handleIssueDistrictChange}
                            onFocus={handleIssueDistrictFocus}
                            ref={inputRef6}
                          />
                          {showIssueDistricts && (
                            <div>
                              <div className="autocomplete-options">
                                {Array.isArray(filteredDistrictNames)
                                  ? filteredDistrictNames.map((issuedoption) => (
                                    <div
                                      key={issuedoption}
                                      className="option"
                                      onClick={() =>
                                        handleIssueDistrictClick(issuedoption)
                                      }
                                    >
                                      {issuedoption}
                                    </div>
                                  ))
                                  : null}
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Issued Date
                        </p>
                        <div
                          className=' info-input-field'
                        >
                          <input
                            type="text"
                            value={issueDate}
                            placeholder="Enter Issue Date"
                            onChange={(e) => {
                              setIssueDate(e.target.value);

                            }}
                          />
                        </div>
                        {allErrors.municipalityFieldError && (
                          <p className="field-error-message">
                            {allErrors.municipalityFieldError}
                          </p>
                        )}
                      </div>

                      <div></div>
                    </div>
                    <div className="flex  gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          PF/SSF Number
                        </p>
                        <div
                          className="info-input-field"
                        >
                          <input
                            type="number"
                            value={pfSsfNum}
                            placeholder="Pf/SSF Number"
                            onChange={(e) => {
                              setPfSsfNum(e.target.value);

                            }}
                          />
                        </div>

                      </div>

                      <div className="flex flex-col gap-1 pt-2 ">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          PAN No.
                        </p>
                        <div
                          className={` ${allErrors.clientPANNOfieldError
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
                      <div className="flex flex-col gap-1 pt-2 ">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          CIT No.
                        </p>
                        <div
                          className="info-input-field"
                        >
                          <input
                            type="text"
                            value={citNum}
                            placeholder="PAN No."
                            onChange={(e) => {
                              setCitNum(e.target.value);

                            }}
                          />
                        </div>

                      </div>
                    </div>
                    <div className="flex  gap-14">
                      <div className="flex flex-col gap-1 pt-2 ">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Insurance Number
                        </p>
                        <div
                          className="info-input-field"
                        >
                          <input
                            type="text"
                            value={insuranceNum}
                            placeholder="Insurance Company"
                            onChange={(e) => {
                              setInsuranceNum(e.target.value);

                            }}
                          />
                        </div>

                      </div>
                      <div className="flex flex-col gap-1 pt-2 ">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Insurance Comapny
                        </p>
                        <div
                          className="info-input-field"
                        >
                          <input
                            type="text"
                            value={insuranceCompany}
                            placeholder="Insurance Company"
                            onChange={(e) => {
                              setInsuranceCompany(e.target.value);

                            }}
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                {(formType === 'Form 2' || formType === 'Form 3') &&
                <div>
                  <p
                    className=" m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Business/Occupation
                  </p>
                  <div className="flex flex-col pl-2">
                    <div className="flex  gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Name
                        </p>
                        <div
                          className='info-input-field'
                        >
                          <input
                            type="text"
                            value={occupationName}
                            placeholder="business name"
                            onChange={
                              (e) => {
                                setOccupationName(e.target.value);

                              }
                            }

                          />


                        </div>

                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Type
                        </p>
                        <div
                          className='info-input-field'
                        >
                          <input
                            type="text"
                            value={occupationType}
                            placeholder="Business type"
                            onChange={
                              (e) => {
                                setOccupationType(e.target.value);

                              }
                            }

                          />

                        </div>

                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Operation Period
                        </p>
                        <div
                          className=' info-input-field'
                        >
                          <input
                            type="text"
                            value={operationPeriod}
                            placeholder="Enter duration of operation"
                            onChange={(e) => {
                              setOperationPeriod(e.target.value);

                            }}
                          />
                        </div>

                      </div>

                      <div></div>
                    </div>
                    <div className="flex  gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Location
                        </p>
                        <div
                          className="info-input-field"
                        >
                          <input
                            type="text"
                            value={occupationLocation}
                            placeholder="Location of the business"
                            onChange={(e) => {
                              setOccupationLocation(e.target.value);

                            }}
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                }
                {(formType === 'Form 2' || formType === 'Form 3') && 
                <div>
                  <p
                    className="m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    {formType === 'Form 2' ? 'Institutional Status' : 'Political Status'}
                  </p>
                  <div className="flex flex-col pl-2">
                    <div className="flex  gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Designation
                        </p>
                        <div
                          className='info-input-field'
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

                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Branch
                        </p>
                        <div
                          className='info-input-field'
                        >
                          <input
                            type="text"
                            value={branch}
                            placeholder="branch name"
                            onChange={
                              (e) => {
                                setBranch(e.target.value);

                              }
                            }

                          />


                        </div>

                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Date of Join
                        </p>
                        <div
                          className='info-input-field'
                        >
                          <input
                            type="date"
                            value={clientJoiningDate}
                            placeholder=""
                            onChange={
                              (e) => {
                                setJoiningDate(e.target.value);

                              }
                            }

                          />

                        </div>

                      </div>

                      <div></div>
                    </div>
                    <div className="flex  gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Affiliated Field
                        </p>
                        <div
                          className=' info-input-field'
                        >
                          <input
                            type="text"
                            value={affiliatedField}
                            placeholder="Enter affiliated field"
                            onChange={(e) => {
                              setAffiliationField(e.target.value);

                            }}
                          />
                        </div>

                      </div>

                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Interested Field
                        </p>
                        <div
                          className="info-input-field"
                        >
                          <input
                            type="text"
                            value={interestedField}
                            placeholder="Enter affiliated field"
                            onChange={(e) => {
                              setInterestedField(e.target.value);

                            }}
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                  }
                {(formType === 'Form 3') && <div>
                  <p
                    className=" m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Affiliated Organization
                  </p>
                  <div className="flex flex-col pl-2">
                    <div className="flex  gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Organization 1:
                        </p>
                        <div
                          className='info-input-field'
                        >
                          <input
                            type="text"
                            value={affiliatedOrganization.firstaffiliatedOrganization}
                            placeholder="Organization Name"
                            onChange={(e) =>
                              handleAffiliationChange('firstaffiliatedOrganization', e.target.value)
                            }

                          />


                        </div>

                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Organization 2:
                        </p>
                        <div
                          className='info-input-field'
                        >
                          <input
                            type="text"
                            value={affiliatedField.secondOrganization}
                            placeholder="Organization Name"
                            onChange={(e) => handleAffiliationChange('secondaffiliatedOrganization', e.target.value)}

                          />

                        </div>

                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Organization 3:
                        </p>
                        <div
                          className=' info-input-field'
                        >
                          <input
                            type="text"
                            value={affiliatedOrganization.thirdaffiliatedOrganization}
                            placeholder="Organization Name"
                            onChange={(e) => {
                              handleAffiliationChange('thirdaffiliatedOrganization', e.target.value)

                            }}
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                }

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
                                className={` ${educationError
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
                {(formType === 'Form 1' || formType === 'Form 2') &&
                <div>
                  <p
                    className="m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Training/Experiences
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
                              Work Title
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
                  }

                <div>
                  <p
                    className=" m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Description
                  </p>
                  <div className=" pl-2">
                    <div
                      className={` ${allErrors.descriptionFieldError
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
                        cols={40}
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
