import React, { useState, useEffect } from 'react'
import NavBar from '../Dashboard/Navbar'
import { fetchUserInfo } from '../Redux/roleActions'
import { useSelector, useDispatch } from 'react-redux'
import RoleTable from './RoleTable'
import EditUserPopup from './editRole'
import {updateRoleInfo} from '../Redux/roleActions'
import { deleteRoleInfo } from '../Redux/roleActions'
import deleteIcon from "../images/delete.png";
import editIcon from "../images/editing.png";


const ViewRole = () => {
  const role =
    localStorage.getItem("tokendata") &&
    JSON.parse(localStorage.getItem("tokendata")).role;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [])
    const Users = useSelector(state => state.auth.userData);
    console.log(Users)

    console.log(Users)

    const [selectedUser, setSelectedUser] = useState(null); // Track selected user
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Track popup open/close
  
    // Function to handle clicking the Edit button
    const handleEditClick = (user) => {
      setSelectedUser(user);
      setIsPopupOpen(true);
    };
    
  
    // Function to handle closing the popup
    const handleClosePopup = () => {
      setSelectedUser(null);
      setIsPopupOpen(false);
    };
  
    // Function to handle saving edited user data
    const id = selectedUser?.id
    console.log(id)
    const handleSaveUser = (fullName, email, roleName, password) => {
      const updatedUser = {
        fullName, 
        email, 
        roleName,
        password
      }
      console.log(updatedUser)
     
      
      dispatch(updateRoleInfo(id, updatedUser));
      setSelectedUser(null);
      setIsPopupOpen(false);
    };
    const handleDeleteUser = (user) => {
      const id = user.id
      dispatch(deleteRoleInfo(id))
    }

  return (
    <div  className='flex flex-col gap-9'>
        <div>
            <NavBar />
        </div>
        <div className='text-[#666] pt-[5rem] flex justify-center font-helvetica pl-4 text-lg font-bold'>
        UserRole Details
      </div>
        <div className='flex justify-center items-center '>
       

          <table className='m-0 p-0'>
            <thead>
            <tr>
                <th colSpan={1}>S.N.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Edit</th>
            </tr>
            </thead>
           
                {/* <RoleTable Users={Users} /> */}
            {
            Array.isArray(Users.$values) && Users.$values.map((user, index) => {
                const name = user.fullName;
                const email = user.email;
                const roleName = user.roleName
                // const id = user.id;
            return (
                <tbody>
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{roleName}</td>
                        <td>
                            <div className='flex gap-2'>
                            <p className='m-0 p-0 underline cursor-pointer' onClick={() => handleEditClick(user)}>
                            {(role === "SuperAdmin" || role === "Admin") &&<img src={editIcon} alt="edit" className='w-5 h-5'/>}
                            </p>
                            <p className='m-0 p-0 underline cursor-pointer' onClick={() => handleDeleteUser(user)}>
                            {role === "SuperAdmin" && <img src={deleteIcon} alt="delete" className='w-5 h-5'/>}
                            </p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            )
            })}
            
          </table>
        


        </div>
        {isPopupOpen && (
        <EditUserPopup
          user={selectedUser}
          onClose={handleClosePopup}
          onSave={handleSaveUser}
        />
      )}
        </div>
  )
}

export default ViewRole