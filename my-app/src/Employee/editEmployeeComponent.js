import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../CustomerDetails/InfoComponents/infoStyles.css";
import { updateClientInfo } from "../Redux/actions";
import { useDispatch } from "react-redux";
import addIcon from "../images/addIcon.png";
import closeIcon from "../images/closeIcon.png";

const EditEmployee = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const employeeInfo = location.state;
  const clickedEmployeeInfo = employeeInfo.client;
  const formattedDate = new Date(clickedEmployeeInfo.clientDOB)
    .toISOString()
    .split("T")[0];
  const formattedJoiningDate = new Date(clickedEmployeeInfo.joiningDate)
    .toISOString()
    .split("T")[0];
  const formattedLeavingDate = new Date(clickedEmployeeInfo.clientLeavingDate)
    .toISOString()
    .split("T")[0];

  const [bloodGroup, setBloodGroup] = useState(clickedEmployeeInfo.bloodGroup);
  const [clientDOB, setClientDOB] = useState(formattedDate);
  const [joiningDate, setJoiningDate] = useState(formattedJoiningDate);
  const [clientLeavingDate, setClientLeavingDate] =
    useState(formattedLeavingDate);

  const [editedEmployee, setEditedEmployee] = useState(clickedEmployeeInfo); //

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...clickedEmployeeInfo, [name]: value });
  };

  const experienceJSON = JSON.parse(clickedEmployeeInfo.experiences);
  const educationJSON = JSON.parse(clickedEmployeeInfo.educations);

  const [experiences, setExperiences] = useState(experienceJSON);
  const [education, setEducation] = useState(educationJSON);

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

  const changedClientDOB = clientDOB.substring(0, 10);
  const changedJoiningDate = joiningDate.substring(0, 10);
  const changedClientLeavingDate = clientLeavingDate.substring(0, 10);

  const handleUpdate = () => {
    // console.log(JSON.stringify(education));
    console.log(JSON.stringify(experiences));
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

      skills,
      imageFile,
      imagePath,
    } = editedEmployee;

    const updatedClient = {
      ...editedEmployee,
      experiences: JSON.stringify(experiences),
      educations: JSON.stringify(education),
      joiningDate,
      clientLeavingDate,
      clientDOB,
    };
    dispatch(updateClientInfo(clientInformationID, updatedClient));
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
                          {/* {showCompanyOptions && (
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
                          )} */}
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
                          Blood Group
                        </p>
                        <div className="info-input-field flex gap-1">
                          <input
                            type="text"
                            name="bloodGroup"
                            value={bloodGroup}
                            placeholder="Client Blood Group"
                            onChange={(e) => setBloodGroup(e.target.value)}
                          />
                          <select
                            value={bloodGroup}
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
                    <div className="flex gap-14">
                      {/* <div className="flex flex-col gap-1 pt-2">
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
                      </div> */}
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
                          Client Leaving Date
                        </p>
                        <div className="info-input-field">
                          <input
                            type="date" // Use 'date' type for date input
                            name="clientLeavingDate"
                            value={clientLeavingDate}
                            placeholder="Client Leaving Date"
                            onChange={(e) =>
                              setClientLeavingDate(e.target.value)
                            }
                          />
                        </div>
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

                    {/* <div
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
                    </div> */}
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
                {/* <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                  <div
                    className="image-container"
                    style={{ backgroundImage: { imagePreviewURL } }}
                  ></div>
                </div> */}

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
