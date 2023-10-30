import React, { useEffect, useState } from 'react'
import { fetchClientInfo } from '../Redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../Dashboard/Navbar';
import EditAllEmployeePopup from './editAllEmployee'
import { updateClientInfo } from '../Redux/actions'
import {deleteClientInfo} from '../Redux/actions'
import { GetAllDepartments } from '../Redux/departmentActions';
import { useNavigate } from 'react-router-dom';
import './styles.css'
import CVGenerate from '../CustomerDetails/CVtemplate/CVGenerate';



const ViewAllEmployee = () => {
    const dispatch = useDispatch();
    const clientData = useSelector((state) => state.auth.clientData);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    
    useEffect(() => {
        dispatch(fetchClientInfo());
        dispatch(GetAllDepartments());
    }, []);

    const departmentData = Array.isArray(clientData.$values) ? clientData.$values.map((department) => department.departmentName): [];
    // console.log(clientData.$values.map((image) => image.imageData));
    // const imageData = Array.isArray(clientData.$values) ? clientData.$values.map((image) => image.imageData): [];
    // console.log(imageData);
    
    // Function to get the data for the current page
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredClientData.slice(startIndex, endIndex);
  };

  // Function to handle page navigation
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

    
    const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState(null); // Track selected user
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Track popup open/close
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [selectedCategory, setSelectedCategory] = useState(''); // Default search category
    const [isCVGeneratePopupOpen, setIsCVGeneratePopupOpen] = useState(false);
    const [departmentNameQuery, setDepartmentNameQuery] = useState(''); // Input for departmentName search

    // Function to filter client data based on the search query
    const filterData = () => {
      // Function to filter client data based on the selected category and search query
      if (!selectedCategory || !searchQuery) {
        return clientData?.$values ?? [];
      }
  
      const normalizedSearchQuery = searchQuery.toLowerCase().trim();
      return clientData?.$values?.filter((client) => {
        const { clientName, district, companyName, departmentName, mobile } = client;
  
        if (selectedCategory === 'companyName') {
          return (
            companyName.toLowerCase().includes(normalizedSearchQuery) &&
            departmentName.toLowerCase().includes(departmentNameQuery.toLowerCase().trim())
          );
        }
  
        switch (selectedCategory) {
          case 'clientName':
            return clientName.toLowerCase().includes(normalizedSearchQuery);
          case 'department':
            return departmentName.toLowerCase().includes(normalizedSearchQuery);
          case 'mobile':
            return mobile.toLowerCase().includes(normalizedSearchQuery);
          default:
            return false;
        }
      }) ?? [];
    };
  
  
    const filteredClientData = filterData();
    const placeholderText = selectedCategory
    ? `Search by ${selectedCategory}`
    : 'Search By...';
  
  
  

    const handleEmployeeEdit = (client) => {
      setSelectedEmployeeInfo(client);
        setIsPopupOpen(true);
      };
      
    
      // Function to handle closing the popup
      const handleClosePopup = () => {
        setSelectedEmployeeInfo(null);
        setIsPopupOpen(false);
      };
      const handleSaveEmployee = (clientInformationID, updatedClient) => {
        
        console.log(clientInformationID)
        console.log(updatedClient)
      dispatch(updateClientInfo(clientInformationID, updatedClient));
      setSelectedEmployeeInfo(null);
      setIsPopupOpen(false);
        
      }
      const handleDelete = (client) => {
        setSelectedEmployeeInfo(client);
        // console.log(selectedEmployeeInfo);
        const clientInformationID = client.clientInformationID;
        console.log(clientInformationID)
        
        // dispatch(deleteClientInfo(clientInformationID));
      }
      const handleEmployeeView = (client) => {
        setSelectedEmployeeInfo(client);
        setIsCVGeneratePopupOpen(true);
      }
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

  return (
    <div  className='flex flex-col gap-9'>
        
        <div className='text-[#666] pt-[5rem] flex justify-center font-helvetica pl-4 text-lg font-bold'>
        All Employee Details
      </div>
      <div className='flex justify-center'>
        
          
          <div className=' flex flex-col gap-1'>
            <div className='search-field'>
          
          
          <input type='text' placeholder={placeholderText} className=' rounded-[4.096px] w-[380px] h-[25px] bg-[#F3F3F3] border-black relative'
          onChange= {(e) => setSearchQuery(e.target.value)}
          />
         <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='drop-down'
          >
            <option value=''></option>
            <option value='clientName'>Client Name</option>
            <option value='companyName'>Company Name</option>
            <option value='department'>Department</option>
            <option value='mobile'>Mobile</option>
            <option value='district'>District</option>
            {/* Add more options as needed */}
          </select>
          </div>
          <div className=''>
          {selectedCategory === 'companyName' && (
            
            <input
              className='search-field'
              type='text'
              placeholder='Search Department Name'
              value={departmentNameQuery}
              onChange={(e) => setDepartmentNameQuery(e.target.value)}
            />
           
          )}
          </div>
        </div>
      </div>
      {/* Pagination navigation */}
    

        <div className=' flex flex-col gap-4'>

          
            <div className='flex flex-col justify-center items-center pb-8 gap-4'>
            
       
          <table className='m-0 p-0' >
            <thead>
            <tr>
                <th colSpan={1}>S.N.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company Name</th>
                <th>Mobile No.</th>
                <th>District</th>
                <th>Details</th>
            </tr>
            </thead>
           
                {/* <RoleTable Users={Users} /> */}
                {Array.isArray(getCurrentPageData()) ?
            getCurrentPageData().map((client, index) => {
              const { clientName, email, phone, district, companyName, imageData } = client;
                
            return (
                <tbody>
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td className='flex gap-6'>
                        { imageData &&
                        <div className='m-0 p-0'>
                        <img src={`data:image/jpg;base64,${imageData}`} alt= 'location' className=' w-5 h-5  '/>
                        </div>
                          } 
                        <p className='m-0 p-0'>{clientName}</p>
                        </td>
                        <td>{email}</td>
                        <td>{companyName}</td>
                        <td>{phone}</td>
                        <td>{district}</td>
                        {/* <td>{`${municipality}-${municipalityNumber}, ${district},`}</td> */}
                        <td>
                            <div className='flex gap-2'>
                            <p className='m-0 p-0 underline cursor-pointer' onClick={() => handleEmployeeEdit(client)}>Edit</p>
                            <p className='m-0 p-0 underline cursor-pointer' onClick={() => handleDelete(client)}>Delete</p>
                            < p className='m-0 p-0 underline cursor-pointer' onClick={() => handleEmployeeView(client)}>View</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            )
            }): null}
            
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
       <div className='pagination flex gap-2 justify-center pt-1'>
        <div>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
        <div>
          {/* Dropdown to select a specific page */}
          <select
            value={currentPage}
            onChange={(e) => handlePageSelect(Number(e.target.value))}
            className='pagination-dropdown'
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
              disabled={currentPage * itemsPerPage >= filteredClientData.length}
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
            <CVGenerate employee={selectedEmployeeInfo} onClose={() => setIsCVGeneratePopupOpen(false)} />
        )}
        </div>
  )
}

export default ViewAllEmployee