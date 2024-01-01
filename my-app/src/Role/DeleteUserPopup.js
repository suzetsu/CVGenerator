import React, { useState, useEffect } from 'react'
import './editContainer.css'
import { fetchUserInfo } from '../Redux/roleActions';
import { useSelector } from 'react-redux';


const DeleteUserPopup = ({ user, onClose, onSave, CompanyId, onCompanySave , id, clientInformationID, onClientSave}) => {
    const [deletedUser, setDeletedUser] = useState(user)

 console.log(clientInformationID);

    const [userPassword, setPasswordInput] = useState('');

    useEffect (() => {
        fetchUserInfo()
    },[])

    

   const userId = localStorage.getItem("tokendata") &&   JSON.parse(localStorage.getItem("tokendata")).id;
   

    const handleInputChange = (e) => {
        setPasswordInput(e.target.value)
    };

    const handleSave = (e) => {
        // Call an update function or dispatch an action to save the edited user data
        if (CompanyId){
            onCompanySave(userId, userPassword)
        } 
        else if (id) {
            onSave( userId, userPassword);
        }
        else if(clientInformationID){
            onClientSave(userId, userPassword )
        }
       
       
        onClose();
    }
    return (
        <div className="popup-container-edit">
            <div className="popup-content-edit">
                <h2>Enter Password To Delete</h2>
                <div className='flex flex-col gap-2'>
                    <input
                        type="string"
                        placeholder="Enter your password"
                        className='info-input-field'
                        value={userPassword}
                        onChange={handleInputChange}
                    />
                    <div className='flex flex-row gap-2 button-container'>
                        <div>
                            <button
                                onClick={handleSave}
                                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
                            >
                                Delete
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

    )
}

export default DeleteUserPopup