import React, { useEffect, useState } from 'react';
import '../Role/editContainer.css'

const EditAllEmployeePopup = ({ client, onClose, onSave }) => {
  const [editedEmployee, setEditedEmployee] = useState(client);
  console.log(client)
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  const handleSave = () => {
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
        joiningDate,
        clientLeavingDate,
        bloodGroup,
        level,
        degree,
        description,
        experiences,
        educations,
        skills,
        imageFile, 
        imagePath,
        clientDOB
        
      } = editedEmployee

   

    const updatedClient = {
      ...editedEmployee,
      // clientName, 
      // email, 
      // clientPANNO, 
      // designation,
      // companyName,
      // departmentName,
      // designation,
      // municipality,
      // municipalityNumber,
      // province,
      // district,
      // email,
      // phone,
      // university,
      // college,
      // level,
      // degree,
      // description,
      // experiences,
      // educations,
      // skills,
      // joiningDate,
      // bloodGroup,
      // imageFile, 
      // imagePath
    }
    // console.log(clientInformationID, clientName, email, clientPANNO, designation)
    // const id = editedUser.id
    onSave(clientInformationID, updatedClient);
    onClose();
  };

  return (
    <div className="popup-container-edit">
      <div className="popup-content-edit flex flex-col gap-4">
        
        <h2>Edit Employee</h2>
        <div className='flex gap-36'>
          <div>
        <div className='flex flex-col gap-2'>
        <div className='info-input-field'>
          <label className='pr-1'>Name:</label>
          <input
            type='text'
            name='clientName'
            value={editedEmployee.clientName}
            onChange={handleInputChange}
          />
        </div>
        <div className='info-input-field'>
          <label className='pr-1'>Email:</label>
          <input
            type='text'
            name='email'
            value={editedEmployee.email}
            onChange={handleInputChange}
          />
        </div>
        <div className='info-input-field'>
          <label className='pr-1'>PAN:</label>
          <input
            type='text'
            name='clientPANNO'
            value={editedEmployee.clientPANNO}
            onChange={handleInputChange}
          />
        </div>
        <div className='info-input-field'>
          <label className='pr-1'>Designation:</label>
          <input
            type='text'
            name='designation'
            value={editedEmployee.designation}
            onChange={handleInputChange}
          />
        </div>
        <div className='info-input-field'>
          <label className='pr-1'>District:</label>
          <input
            type='text'
            name='district'
            value={editedEmployee.district}
            onChange={handleInputChange}
          />
        </div>
        <div className='info-input-field'>
          <label className='pr-1'>Municipality:</label>
          <input
            type='text'
            name='municipality'
            value={editedEmployee.municipality}
            onChange={handleInputChange}
          />
        </div>
        <div className='info-input-field'>
          <label className='pr-1'>Municipality No.:</label>
          <input
            type='text'
            name='municipalityNumber'
            value={editedEmployee.municipalityNumber}
            onChange={handleInputChange}
          />
        </div>
        </div>
        </div>
        <div>

                <div className='flex flex-col gap-2'>

                <div className='info-input-field'>
                  <label className='pr-1'>Company:</label>
                  <input
                    type='text'
                    name='companyName'
                    value={editedEmployee.companyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='info-input-field'>
                  <label className='pr-1'>Mobile No.:</label>
                  <input
                    type='text'
                    name='clientPANNO'
                    value={editedEmployee.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='info-input-field'>
                  <label className='pr-1'>District:</label>
                  <input
                    type='text'
                    name='district'
                    value={editedEmployee.district}
                    onChange={handleInputChange}
                  />
                </div>

                </div>
        </div>
        
          
        </div>
        <div>
        <div className='flex flex-row gap-2 button-container'>
          <div>
            <button
              onClick={handleSave}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
            >
              Save
            </button>
            </div>
            <div>
            <button
              onClick={onClose}
              className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
            >
              Cancel
            </button>
          
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EditAllEmployeePopup;
