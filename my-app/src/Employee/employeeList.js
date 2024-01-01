import React, { useEffect, useState } from "react";
import NavBar from "../Dashboard/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchClientInfo } from "../Redux/actions";
import { fetchCompanyInfo } from "../Redux/companyActions";
import EditEmployeePopup from "./employeeEdit";
import { updateClientInfo } from "../Redux/actions";
import { deleteClientInfo } from "../Redux/actions";
import CVGenerate from "../CustomerDetails/CVtemplate/CVGenerate";
import deleteIcon from "../images/delete.png";
import editIcon from "../images/editing.png";
import viewIcon from "../images/view.png";

const EmployeeList = () => {
  const location = useLocation();
  const department = location.state.department;
  const companyName = location.state.companyName;
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Track selected user
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Track popup open/close
  const [isCVGeneratePopupOpen, setIsCVGeneratePopupOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchCompanyInfo());
    dispatch(fetchClientInfo());
  }, []);

  const employeeDetails = useSelector((state) => state.auth.clientData);
  // const clientInformationID = selectedEmployee?.id



  let filteredEmployees = [];

  // Filter employeeDetails based on department and companyName
  if (employeeDetails && employeeDetails.$values) {
    filteredEmployees = employeeDetails.$values.filter((employee) => {
      return (
        employee.departmentName === department &&
        employee.companyName === companyName
      );
    });
  } else {
    return 0;
  }

  const handleEmployeeEdit = (client) => {
    setSelectedEmployee(client);
    // setIsPopupOpen(true);
    history("/editEmployee", { state: {client } });
  };

  // Function to handle closing the popup
  const handleClosePopup = () => {
    setSelectedEmployee(null);
    setIsPopupOpen(false);
  };
  const handleSaveEmployee = (clientInformationID, updatedClient) => {
    dispatch(updateClientInfo(clientInformationID, updatedClient));
    setSelectedEmployee(null);
    window.location.reload();
    setIsPopupOpen(false);
    console.log(updatedClient);
  };
  const handleDelete = (clientInformationID) => {
    dispatch(deleteClientInfo(clientInformationID));
  };
  const handleView = (client) => {
    setSelectedEmployee(client);
    // setIsCVGeneratePopupOpen(true);
    history("/CVFormat", { state: {client } });
  };

  return (
    <div className="flex flex-col gap-9">
      <div>
        <NavBar />
      </div>
      <div className="text-[#666] pt-[5rem] flex justify-center font-helvetica pl-4 text-lg font-bold">
        Employee Details
      </div>
      <div className="flex justify-center items-center">
        <table className="m-0 p-0">
          <thead>
            <tr>
              <th colSpan={1}>S.N.</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((client, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{client.clientName}</td>
                <td>{client.email}</td>
                <td>
                  <div className="flex gap-2">
                    <p
                      className="m-0 p-0 underline cursor-pointer"
                      onClick={() => handleView(client)}
                    >
                      <img src={viewIcon} alt="view" className="w-5 h-5"/>
                    </p>
                    <p
                      className="m-0 p-0 underline cursor-pointer"
                      onClick={() => handleEmployeeEdit(client)}
                    >
                      <img src={editIcon} alt="edit" className="w-5 h-5"/>
                    </p>
                    <p
                      className="m-0 p-0 underline cursor-pointer"
                      onClick={() => handleDelete(client)}
                    >
                      <img src={deleteIcon} alt="delete" className="w-5 h-5"/>
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isPopupOpen && (
        <EditEmployeePopup
          employee={selectedEmployee}
          onClose={handleClosePopup}
          onSave={handleSaveEmployee}
        />
      )}
      {isCVGeneratePopupOpen && (
        <CVGenerate
          employee={selectedEmployee}
          onClose={() => setIsCVGeneratePopupOpen(false)}
        />
      )}
    </div>
  );
};

export default EmployeeList;
