import React, { useEffect, useState } from "react";
import { fetchClientInfo } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Dashboard/Navbar";
import EditAllEmployeePopup from "./editAllEmployee";
import { updateClientInfo } from "../Redux/actions";
import { deleteClientInfo } from "../Redux/actions";
import { GetAllDepartments } from "../Redux/departmentActions";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import CVGenerate from "../CustomerDetails/CVtemplate/CVGenerate";
import  EditImagePopup  from "./EditImagePopup";
import deleteIcon from "../images/delete.png";
import editIcon from "../images/blue-edit.png";
import viewIcon from "../images/green-eye.png";
// import { RiDeleteBin6Line } from "react-icons/fcRiDeleteBin6Line";




const ViewAllEmployee = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const clientData = useSelector((state) => state.auth.clientData);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const role =
    localStorage.getItem("tokendata") &&
    JSON.parse(localStorage.getItem("tokendata")).role;

  useEffect(() => {
    dispatch(fetchClientInfo());
    dispatch(GetAllDepartments());
  }, []);
  console.log(clientData.$values);

  const experiences = Array.isArray(clientData.$values)
    ? clientData.$values.map((client) => JSON.parse(client.experiences))
    : [];
  console.log(experiences);
  const duration = experiences.map((exp) => exp.duration);

  console.log(duration);
  const departmentData = Array.isArray(clientData.$values)
    ? clientData.$values.map((department) => department.departmentName)
    : [];
  // console.log(clientData.$values.map((image) => image.imageData));
  // const imageData = Array.isArray(clientData.$values) ? clientData.$values.map((image) => image.imageData): [];
  // console.log(imageData);

  // Function to get the data for the current page
  

  // Function to handle page navigation
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState(null); // Track selected user
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Track popup open/close
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedCategory, setSelectedCategory] = useState(""); // Default search category
  const [isCVGeneratePopupOpen, setIsCVGeneratePopupOpen] = useState(false);
  const [departmentNameQuery, setDepartmentNameQuery] = useState(""); // Input for departmentName search

  // Function to filter client data based on the search query
  const filterData = () => {
    // Function to filter client data based on the selected category and search query
    if (!selectedCategory || !searchQuery) {
      return clientData?.$values ?? [];
    }

    const normalizedSearchQuery = searchQuery.toLowerCase().trim();
    return (
      clientData?.$values?.filter((client) => {
        const {
          clientName,
          district,
          companyName,
          departmentName,
          mobile,
          email,
        } = client;

        if (selectedCategory === "companyName") {
          return (
            companyName.toLowerCase().includes(normalizedSearchQuery) &&
            departmentName
              .toLowerCase()
              .includes(departmentNameQuery.toLowerCase().trim())
          );
        }

        switch (selectedCategory) {
          case "clientName":
            return clientName.toLowerCase().includes(normalizedSearchQuery);
          case "department":
            return departmentName.toLowerCase().includes(normalizedSearchQuery);
          case "mobile":
            return mobile.toLowerCase().includes(normalizedSearchQuery);
          case "district":
            return district.toLowerCase().includes(normalizedSearchQuery);
          case "email":
            return email.toLowerCase().includes(normalizedSearchQuery);
          default:
            return false;
        }
      }) ?? []
    );
  };

 
  const filteredClientData = filterData();
  const placeholderText = selectedCategory
    ? `Search by ${selectedCategory}`
    : "Search By...";

    // useEffect(() => {
    //   filterData();
    // }, [searchQuery, selectedCategory, departmentNameQuery, clientData]);
    const getCurrentPageData = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredClientData.slice(startIndex, endIndex);
    };

  const handleEmployeeEdit = (client) => {
    setSelectedEmployeeInfo(client);
    // setIsPopupOpen(true);
    history("/editEmployee", { state: {client } });
  };

  // Function to handle closing the popup
  const handleClosePopup = () => {
    setSelectedEmployeeInfo(null);
    setIsPopupOpen(false);
  };
  const handleSaveEmployee = (clientInformationID, updatedClient) => {
    console.log(clientInformationID);
    console.log(updatedClient);
    dispatch(updateClientInfo(clientInformationID, updatedClient));
    setSelectedEmployeeInfo(null);
    setIsPopupOpen(false);
  };
  const handleDelete = (client) => {
    setSelectedEmployeeInfo(client);
    // console.log(selectedEmployeeInfo);
    const clientInformationID = client.clientInformationID;
    console.log(clientInformationID);

     dispatch(deleteClientInfo(clientInformationID));
  };
  const handleEmployeeView = (client) => {
    // setSelectedEmployeeInfo(client);
    // setIsCVGeneratePopupOpen(true);
    history('/CVFormat', {state: {client}});
  };
  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredClientData.length / itemsPerPage);

  // Function to generate an array of page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  // Function to handle selecting a specific page
  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };


  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePopupOpen = (imageData) => {
    setSelectedImage(imageData);
    setImagePopupOpen(true);
  };

  const handleImagePopupClose = () => {
    setSelectedImage(null);
    setImagePopupOpen(false);
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="text-[#666] pt-[5rem] flex justify-center font-helvetica pl-4 text-2xl font-bold">
        All Employee Details
      </div>
      <div className="flex justify-center">
        <div className=" flex flex-col gap-1">
          <div className="search-field">
            <input
              type="text"
              placeholder={placeholderText}
              className=" rounded-[4.096px] w-[380px] h-[25px] bg-[#F3F3F3] border-black relative"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="drop-down"
            >
              <option value=''></option>

              <option value="clientName">Client Name</option>
              <option value="companyName">Company Name</option>
              <option value="department">Department</option>
              <option value="mobile">Mobile</option>
              <option value="district">District</option>
              <option value="email">Email</option>

              {/* Add more options as needed */}
            </select>
          </div>
          <div className="">
            {selectedCategory === "companyName" && (
              <input
                className="search-field"
                type="text"
                placeholder="Search Department Name"
                value={departmentNameQuery}
                onChange={(e) => setDepartmentNameQuery(e.target.value)}
              />
            )}
          </div>
        </div>
      </div>
      {/* Pagination navigation */}

      <div className=" flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center pb-8 gap-4">
          <table className="m-0 p-0 " id="employeetable">
            <thead>
              <tr>
                <th colSpan={1}>S.N.</th>
                <th>Name</th>
                <th>DoB</th>
                <th>Age</th>
                <th>Email</th>
                {/* <th>Company Name</th> */}
                <th>Mobile No.</th>
                <th>Designation</th>
                <th>Branch</th>
                <th>Details</th>
              </tr>
            </thead>

            {/* <RoleTable Users={Users} /> */}
            {Array.isArray(getCurrentPageData())
              ? getCurrentPageData().map((client, index) => {
                  const {
                    clientName,
                    email,
                    phone,
                    district,
                    companyName,
                    imageData,
                    clientDOB,
                    age,
                    designation,
                    branch
                  } = client;
                  const parsedDate = new Date(clientDOB);
                  const formattedDate = parsedDate.toISOString().split('T')[0];
                  return (
                    <tbody>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="flex gap-6">
                          {imageData && (
                            // <div className="m-0 p-0" onClick={() => handleImagePopupOpen(imageData)}>
                            <div className="m-0 p-0 image-class">
                              <img
                                src={`data:image/jpg;base64,${imageData}`}
                                alt="location"
                                className="  "
                              />
                            </div>
                          )}
                          <p className="m-0 p-0">{clientName}</p>
                        </td>
                        <td>{formattedDate}</td>
                        <td>{age}</td>
                        <td>{email}</td>
                        {/* <td>{companyName}</td> */}
                        <td>{phone}</td>
                        <td>{designation}</td>
                        <td>{branch}</td>
                        {/* <td>{`${municipality}-${municipalityNumber}, ${district},`}</td> */}
                        <td>
                          <div className="flex gap-2">
                            {(role === "SuperAdmin" || role === "Admin") && (
                              <p
                                className="m-0 p-0 underline cursor-pointer"
                                onClick={() => handleEmployeeEdit(client)}
                              >
                                <img src={editIcon} alt="Edit" className="w-5 h-5"/>
                              </p>
                            )}
                            {role === "SuperAdmin" && (
                              <p
                                className="m-0 p-0 underline cursor-pointer"
                                onClick={() => handleDelete(client)}
                              >
                                <img src={deleteIcon} alt="Delete" className="w-5 h-5"/>
                              </p>
                            )}
                            <p
                              className="m-0 p-0 underline cursor-pointer"
                              onClick={() => handleEmployeeView(client)}
                            >
                              <img src={viewIcon} alt="View" className="w-5 h-5"/>
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              : null}
              
          </table>
          {/* Pagination navigation */}

          <div className="pagination flex gap-[1rem] justify-center ">
            <div>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button previous-button"
              >
                &larr; Previous
              </button>
            </div>
            <div className="pagination flex gap-2 justify-center pt-1">
              <div>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              <div>
                {/* Dropdown to select a specific page */}
                <select
                  value={currentPage}
                  onChange={(e) => handlePageSelect(Number(e.target.value))}
                  className="pagination-dropdown"
                >
                  {pageNumbers.map((page) => (
                    <option key={page} value={page}>
                      {page}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage * itemsPerPage >= filteredClientData.length
                }
                className="pagination-button next-button"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <EditAllEmployeePopup
          client={selectedEmployeeInfo}
          onClose={handleClosePopup}
          onSave={handleSaveEmployee}
        />
      )}
      {isCVGeneratePopupOpen && (
        <CVGenerate
          employee={selectedEmployeeInfo}
          onClose={() => setIsCVGeneratePopupOpen(false)}
        />
      )}
      {isImagePopupOpen && (
        <EditImagePopup
          image={selectedImage}
          onClose={handleImagePopupClose}
          // onClose={() => setImagePopupOpen(false)}
          
        />
      )}
    </div>
  );
};

export default ViewAllEmployee;
