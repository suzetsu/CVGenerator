import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../CustomerDetails/InfoComponents/infoStyles.css";
import { updateClientInfo } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import addIcon from "../images/addIcon.png";
import closeIcon from "../images/closeIcon.png";

const EditEmployee = () => {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const employeeInfo = location.state;
  const clickedEmployeeInfo = employeeInfo.client;
  const [editedEmployee, setEditedEmployee] = useState(clickedEmployeeInfo);
  // console.log(clickedEmployeeInfo);
  // console.log(editedEmployee);
  const formattedDate = editedEmployee.clientDOB
    ? new Date(editedEmployee.clientDOB).toISOString().split("T")[0]
    : null;
  const formattedJoiningDate = editedEmployee.joiningDate
    ? new Date(editedEmployee.joiningDate).toISOString().split("T")[0]
    : null;
  const formattedLeavingDate = editedEmployee.clientLeavingDate
    ? new Date(editedEmployee.clientLeavingDate)
      .toISOString()
      .split("T")[0]
    : null;


  const clientUpdateStatus = useSelector(
    (state) => state.auth.clientUpdateStatus
  );


  const [uploadedImage, setUploadedImage] = useState(
    clickedEmployeeInfo.imageData
  );
  const [editedbloodGroup, setBloodGroup] = useState(clickedEmployeeInfo.bloodGroup);
  const [clientDOB, setClientDOB] = useState(formattedDate);
  const [joiningDate, setJoiningDate] = useState(formattedJoiningDate);
  const [clientLeavingDate, setClientLeavingDate] = useState(formattedLeavingDate);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });

  };

 

  const experienceJSON = JSON.parse(editedEmployee.experiences);
  const educationJSON = JSON.parse(editedEmployee.educations);
  const affiliatedOrganizationJSON = JSON.parse(editedEmployee.affiliatedOrganization)


  const otherInformationJSON = JSON.parse(editedEmployee.otherInformation);
  const familyContactInformationJSON = JSON.parse(editedEmployee.familyContactInfo);
  const skillsJSON = JSON.parse(editedEmployee.skills);
  const officialInformationJSON = JSON.parse(editedEmployee.officialInformation);



  const [experiences, setExperiences] = useState(experienceJSON);
  const [education, setEducation] = useState(educationJSON);
  const [skills, setSkills] = useState(skillsJSON);
  const [familyContact, setFamilyContact] = useState(familyContactInformationJSON);
  const [otherInfo, setOtherInformation] = useState(otherInformationJSON);
  const [officialInfo, setOfficialInfo] = useState(officialInformationJSON);

 const isFamilyContactExist = familyContact[0]
const isOtherInfoExist = otherInfo[0]


  const handleofficialInfo = (value, index, field) => {
    const updatedOfficialInfo = [...officialInfo]
    updatedOfficialInfo[index][field] = value;
    setOfficialInfo(updatedOfficialInfo);
  };
  const handleOtherInfoChange = (value, index, field) => {
    const updatedOtherInfo = [...otherInfo]
    updatedOtherInfo[index][field] = value;
    setOtherInformation(updatedOtherInfo);

  };


  const handleFamilyChange = (value, index, field) => {
    const updatedFamilyContact = [...familyContact];
    updatedFamilyContact[index][field] = value
    setFamilyContact(updatedFamilyContact);


  };
  // const handleSpouseNumberChange = (value, index) => {
  //   const updatedFamilyContact = [...familyContact];
  //   updatedFamilyContact[index].spouseNumber = value 
  //   setFamilyContact(updatedFamilyContact);
  // };
  // const handleSonChange = (value, index) => {
  //   const updatedFamilyContact = [...familyContact];
  //   updatedFamilyContact[index].sonNum = value 
  //   setFamilyContact(updatedFamilyContact);
  // };
  // const handleDaughterChange = (value, index) => {
  //   const updatedFamilyContact = [...familyContact];
  //   updatedFamilyContact[index].daughterNum = value 
  //   setFamilyContact(updatedFamilyContact);
  // };


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
  const handleUniversityChange = (value, index) => {
    const updatedEducation = [...education];
    updatedEducation[index].university = value;
    setEducation(updatedEducation);
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
  const [imagePreviewURL, setImagePreviewURL] = useState("");

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    // Assuming you want to preview the selected image
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUploadedImage(file);
        setImagePreviewURL(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const removeExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { organizationName: "", duration: "", title: "" },
    ]);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { college: "", level: "", degree: "", university: "" },
    ]);
  };

  // Function to remove an education
  const removeEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  const handleUpdate = () => {

    // console.log(JSON.stringify(experiences));
    // console.log(JSON.stringify(familyContact));
    // Call an update function or dispatch an action to save the edited user data
    const {
      clientName,
      email,
      clientPANNO,
      designation,
      clientInformationID,
      companyName,
      departmentName,
      municipality,
      province,
      district,
      phone,
      municipalityNumber,
      university,
      college,

      bloodGroup,
      level,
      degree,
      description,
      affiliatedOrganization,


      imageFile,
      imagePath,
    } = editedEmployee;


    const updatedClients = {
      ...editedEmployee,
      experiences: JSON.stringify(experiences),
      educations: JSON.stringify(education),
      joiningDate,
      clientLeavingDate,
      clientDOB,
      bloodGroup: editedbloodGroup,
      skills: JSON.stringify(skills),
      otherInformation: JSON.stringify(otherInfo),
      familyContactInfo: JSON.stringify(familyContact),

    };

    const updatedClient = new FormData();
    for (const key in updatedClients) {
      updatedClient.append(key, updatedClients[key]);
    }

    if (uploadedImage) {
      updatedClient.append("imageFile", uploadedImage);
    }

    // Dispatch the update action with the updated client data
    dispatch(updateClientInfo(clientInformationID, updatedClient));

    // Redirect to the "/main" page after the update if successful
    if (clientUpdateStatus === "success") {
      setTimeout(() => {
        history("/viewAllEmployee");
      }, 1000);
    }
  };

  return (
    <>
      <div className="  flex justify-center pt-20 bg-[#F8F8F8] pb-10">
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
                        <div className="info-input-field">
                          <input
                            type="text"
                            name="clientName"
                            value={editedEmployee.clientName}
                            placeholder="Your Name"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pt-2 ">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Client PAN No.
                        </p>
                        <div className="info-input-field">
                          <input
                            type="text"
                            name="clientPANNO"
                            value={editedEmployee.clientPANNO}
                            placeholder="PAN No."
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Designation
                        </p>
                        <div className="info-input-field flex gap-1">
                          <input
                            type="text"
                            name="designation"
                            value={editedEmployee.designation}
                            placeholder="Eg: Developer, Analyst, Tester"
                            onChange={handleInputChange}
                          // onFocus={handleDesignationFocus}
                          />
                          {/* <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
                                    <option value=""></option>
                                    <option value="Developer">Developer</option>
                                    <option value="Analyst">Analyst</option>
                                    <option value="Tester">Tester</option>
                                </select> */}
                          {/* {showDesignations && (
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
                          )} */}
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="flex gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Company Name
                        </p>
                        <div className="info-input-field">
                          <input
                            type="text"
                            name="companyName"
                            value={editedEmployee.companyName}
                            placeholder="Company Name"
                            onChange={handleInputChange}
                          // onFocus={handleCompanyFocus}
                          />

                        </div>
                      </div>

                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Department Name
                        </p>
                        <div className="info-input-field">
                          <input
                            type="text"
                            name="departmentName"
                            value={editedEmployee.departmentName}
                            placeholder="Department Name"
                            onChange={handleInputChange}
                          // onFocus={handleDepartmentFocus}
                          />
                          {/* {showDepartmentOptions && (
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
                          )} */}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Client DOB
                        </p>
                        <div className="info-input-field">
                          <input
                            type="date" // Use 'date' type for date input
                            name="clientDOB"
                            value={clientDOB}
                            onChange={(e) => setClientDOB(e.target.value)}
                          />
                        </div>
                      </div>

                    </div>
                    <div className="flex gap-14">

                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Client Joining Date
                        </p>
                        <div className="info-input-field">
                          <input
                            type="date" // Use 'date' type for date input
                            name="clientJoiningDate"
                            value={joiningDate}
                            placeholder="Client Joining Date"
                            onChange={(e) => setJoiningDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Type of Appointment
                        </p>
                        {officialInfo && Array.isArray(officialInfo) && officialInfo.length > 0 && officialInfo.map((info, index) => (
                          <div className="info-input-field">
                            <input
                              type="text" // Use 'date' type for date input

                              value={info.appointment}
                              placeholder="Type of Appointment"
                              onChange={(e) => handleofficialInfo(e.target.value, index, 'appointment')}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Gender
                        </p>
                        <div className="info-input-field">
                          <input
                            type="text"
                            name="gender"
                            value={editedEmployee.gender}
                            placeholder="Gender"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-14 ">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Father's Name
                        </p>
                        <div className="info-input-field">
                          <input
                            type="text"
                            name="fatherName"
                            value={editedEmployee.fatherName}
                            placeholder="Father Name"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Religion
                        </p>
                        <div className="info-input-field">
                          <input
                            type="text"
                            name="religion"
                            value={editedEmployee.religion}
                            placeholder="Religion Name"
                            onChange={handleInputChange}
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
                    Address Information
                  </p>
                  <div className="flex flex-col pl-2">
                    <div className="flex  gap-14">
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Municipality
                        </p>
                        <div className="info-input-field">
                          <input
                            type="text"
                            name="municipality"
                            value={editedEmployee.municipality}
                            placeholder="Municipality"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          MUN No.
                        </p>
                        <div className="info-input-field">
                          <input
                            type="number"
                            name="municipalityNumber"
                            value={editedEmployee.municipalityNumber}
                            placeholder="Municipality No."
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Province
                        </p>
                        <div className="info-input-field flex gap-1">
                          <input
                            type="text"
                            name="province"
                            value={editedEmployee.province}
                            placeholder="province"
                            onChange={handleInputChange}
                          // onFocus={handleInputFocus}
                          />

                          {/* {showOptions && (
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
                          )} */}
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          District
                        </p>
                        <div className="info-input-field">
                          <input
                            type="text"
                            name="district"
                            value={editedEmployee.district}
                            placeholder="district"
                            onChange={handleInputChange}
                          // onChange={handleDistrictChange}
                          // onFocus={handleDistrictFocus}
                          />
                          {/* {showDistricts && (
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
                          )} */}
                        </div>
                        {/* {allErrors.districtFieldError && (
                          <p className="field-error-message">
                            {allErrors.districtFieldError}
                          </p>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
                {isFamilyContactExist &&
                  <div className="flex flex-col gap-2">
                    <p
                      className=" m-0 p-0 font-roboto font-bold"
                      style={{ color: "#1670B2", fontSize: "16px" }}
                    >
                      Family Contact Information
                    </p>
                    {familyContact && Array.isArray(familyContact) && familyContact.length > 0 && familyContact.map((family, index) => (
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
                                  value={family.spouseName}
                                  placeholder=" Spouse Name"
                                  onChange={(e) => handleFamilyChange(e.target.value, index, 'spouseName')}
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
                                    value={family.spouseNumber}
                                    placeholder="Spouse Contact Number"
                                    onChange={(e) => handleFamilyChange(e.target.value, index, 'spouseNumber')}
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
                                    value={family.sonNum}
                                    placeholder=""
                                    onChange={(e) => handleFamilyChange(e.target.value, index, 'sonNum')}
                                  />

                                </div>
                                <p className=" p-0 m-0 font-helvetica text-xs font-thin ">Daughter:</p>
                                <div
                                  className='info-input-field--smallfield'
                                >
                                  <input
                                    type="text"
                                    value={family.daughterNum}
                                    placeholder=""
                                    onChange={(e) => handleFamilyChange(e.target.value, index, 'daughterNum')}
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
                    ))}
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
                            Height
                          </p>
                          <div
                            className='info-input-field'
                          >
                            <input
                              type="text"
                              name="clientheight"
                              value={editedEmployee.clientheight}
                              placeholder="Height"
                              onChange={handleInputChange}
                            />
                          </div>

                        </div>
                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Weight
                          </p>
                          <div >
                            <div
                              className='info-input-field'
                            >
                              <input
                                type="text"
                                name="weight"
                                value={editedEmployee.weight}
                                placeholder="Weight"
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                        </div>

                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Blood Group
                          </p>
                          <div className="info-input-field flex gap-1">
                            <input
                              type="text"
                              name="bloodGroup"
                              value={editedbloodGroup}
                              placeholder="Client Blood Group"
                              onChange={(e) => setBloodGroup(e.target.value)}
                            />
                            <select
                              value={editedbloodGroup}
                              onChange={(e) => setBloodGroup(e.target.value)}
                            >
                              <option value=""></option>
                              <option value="A +ve">A +ve</option>
                              <option value="A -ve">A -ve</option>
                              <option value="O +ve">O +ve</option>
                              <option value="O -ve">A -ve</option>
                              <option value="AB +ve">AB +ve</option>
                              <option value="AB -ve">AB -ve</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div className="flex gap-14"></div>
                      <div className="flex flex-col gap-1 pt-2">

                      </div>
                    </div>
                  </div>

                </div>
                  {isOtherInfoExist &&
                <div>
                  <p
                    className=" m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Other Information
                  </p>
                  {otherInfo && Array.isArray(otherInfo) && otherInfo.length > 0 && otherInfo.map((otherInf, index) => (
                    <div className=" pl-2">
                      <div className="flex  gap-14">
                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            PF/SSF No.:
                          </p>
                          <div className="info-input-field">
                            <input
                              type="number"
                              name="pfSsfNum"
                              value={otherInf.pfSsfNum}
                              placeholder="PF/SS Number"
                              onChange={(e) => { handleOtherInfoChange(e.target.value, index, "pfSsfNum") }}
                            />
                          </div>

                          {/* {emailExistsErrorMessage && <p className='field-error-message'>{emailExistsErrorMessage}</p>} */}
                        </div>
                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Citizenship No.
                          </p>
                          <div className="info-input-field">
                            <input
                              type="text"

                              value={otherInf.citizenNum}
                              placeholder="Citizen number"
                              onChange={(e) => { handleOtherInfoChange(e.target.value, index, "citizenNum") }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Insurance No.
                          </p>
                          <div className="info-input-field">
                            <input
                              type="number"

                              value={otherInf.insuranceNum}
                              placeholder="Insurance number"
                              onChange={(e) => { handleOtherInfoChange(e.target.value, index, "insuranceNum") }}
                            />
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="flex gap-14">
                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            CIT No.
                          </p>
                          <div className="info-input-field">
                            <input
                              type="number"

                              value={otherInf.citNum}
                              placeholder="CIT number"
                              onChange={(e) => { handleOtherInfoChange(e.target.value, index, "citNum") }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 pt-2">
                          <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Insurance Company
                          </p>
                          <div className="info-input-field">
                            <input
                              type="text"

                              value={otherInf.insuranceCompany}
                              placeholder="Insurance Company"
                              onChange={(e) => { handleOtherInfoChange(e.target.value, index, "insuranceCompany") }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
}
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
                        <div className="info-input-field">
                          <input
                            type="email"
                            name="email"
                            value={editedEmployee.email}
                            placeholder="email"
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* {emailExistsErrorMessage && <p className='field-error-message'>{emailExistsErrorMessage}</p>} */}
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Client Mobile No.
                        </p>
                        <div className="info-input-field">
                          <input
                            type="tel"
                            name="phone"
                            value={editedEmployee.phone}
                            placeholder="mobile number"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                          Home No.
                        </p>
                        <div className="info-input-field">
                          <input
                            type="number"
                            name="homeNumber"
                            value={editedEmployee.homeNumber}
                            placeholder="mobile number"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>

                {/* here for education */}
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
                              <div className="info-input-field">
                                <input
                                  type="text"
                                  name="university"
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
                                  name="college"
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
                                  name="level"
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
                                name="degree"
                                value={educations.degree}
                                placeholder="Enter degree"
                                onChange={(e) =>
                                  handleDegreeChange(e.target.value, index)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* {index > 0 && (
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
                        )} */}
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
                </div>

                {/* here for education and experiences */}
                <div className="flex flex-col gap-2">
                  <p
                    className="m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Professional Experiences
                  </p>
                  {experiences.map((experience, index) => (
                    <div
                      key={index}
                      className="flex gap-14 p-2"
                      style={{ border: "1px solid black", outline: "none" }}
                    >
                      <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4 ">
                          <div className="flex gap-20 ">
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
                      </div>
                      {/* {index > 0 && (
                        <div className="pl-[10.5rem] pb-4">
                          <div
                            className="flex gap-1 ml-3 justify-center items-center bg-[red] w-[20px] h-[20px] rounded-[6px] cursor-pointer"
                            onClick={() => removeExperience(index)}
                          >
                            <img
                              src={closeIcon}
                              alt="closeIcon"
                              className="h-[15px] m-0 p-0"
                            />
                          </div>
                        </div>
                      )} */}
                    </div>
                  ))}
                  <div
                    className="flex gap-1 mt-2 justify-center items-center bg-[blue] w-[130px] h-[32px] rounded-[6px] cursor-pointer"
                    onClick={addExperience}
                  >
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
                <div>
                  <p
                    className=" m-0 pb-4 font-roboto font-bold"
                    style={{ color: "#1670B2", fontSize: "16px" }}
                  >
                    Description
                  </p>
                  <div className=" pl-2">
                    <div className="info-input-field-desc">
                      <textarea
                        type="text"
                        name="description"
                        value={editedEmployee.description}
                        placeholder="Type something about yourself..."
                        onChange={handleInputChange}
                        rows={4}
                        cols={60}
                      ></textarea>
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

                  <div className="image-container">
                    {imagePreviewURL ? (
                      <img
                        src={imagePreviewURL}
                        alt="Preview"
                        style={{ maxWidth: "15%", maxHeight: "15%" }}
                      />
                    ) : // If no new image is selected, show the existing image
                      uploadedImage ? (
                        <img
                          style={{
                            backgroundImage: `url(data:image/jpg;base64,${uploadedImage})`,
                            backgroundSize: "cover",
                            width: "100px",
                            height: "100px",
                          }}
                          alt=""
                        />
                      ) : (
                        // If no existing image, you can display a placeholder or some default content
                        <p>No image chosen</p>
                      )}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button className="btn-info" onClick={handleUpdate}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEmployee;
