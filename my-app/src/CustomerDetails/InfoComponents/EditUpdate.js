import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientInfo } from '../../Redux/actions';
import { useNavigate } from 'react-router-dom';
import { deleteClientInfo } from '../../Redux/actions';
import Swal from 'sweetalert2';

function EditUpdate() {
  const [userName1, setUserName1] = useState('')
  const [userName2, setUserName2] = useState('')
  const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch();
  const history = useNavigate();
  const clientDetails = useSelector((state) => state.auth.clientData);
  const clientDeleteStatus = useSelector((state) => state.auth.clientDeleteStatus);
  
  // console.log(clientDetails);
  const [matchedUser, setMatchedUser] = useState(null);
  useEffect(() => {
    dispatch(fetchClientInfo());
  }, [])

 
  // console.log(clientname)

  const handleEdit = () => {
    if (clientDetails && clientDetails.$values) {
      const matchingClient = clientDetails.$values.find(
        (client) => client.clientName === userName1
      )
      if(matchingClient){
        setMatchedUser(matchingClient);
        history('/Update', { state: { matchedUser: matchingClient } });
      }
      else {
        alert('Please select a client')
      }
    }
    
  }

  const handleDelete = () => {
    if (clientDetails && clientDetails.$values) {
      const matchingClient = clientDetails.$values.find(
        (client) => client.clientName === userName2
      )
      if(matchingClient){
        const clientInformationID = matchingClient.clientInformationID
        console.log(clientInformationID)
        dispatch( deleteClientInfo(clientInformationID))
        
      if ( clientDeleteStatus === 'success') {
        Swal.fire({
            icon: 'success',
            title: 'Client Updated Successfully',
            showConfirmButton: false,
            timer: 1500
        })
        
        setUserName2('')
      }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please select a client'
          })
        }
    
      }
      
    
        // if (clientDeleteStatus === 'success') {
        //   Swal.fire({
        //     icon: 'success',
        //     title: 'Deleted Successfully',
        //   })
        // }
        // else{
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Please select a client'
        //   })
        // }
      
      
    }
  }
  
  return (
    <div>
      <div>
    </div>
    <div className='flex flex-col justify-center gap-2 pt-4'>
                <div className='flex gap-2'>
                    <div className='info-input-field pt-1'>
                    <input  type='text' value={userName1} placeholder='Enter username you want to edit' onChange={(e) => setUserName1(e.target.value)}/>
                    </div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={handleEdit}>Edit</button>
                </div>
                <div className='flex gap-2'>
                    <div className='info-input-field pt-1'>
                    <input  type='text' value={userName2} placeholder='Enter username you want to delete' onChange={(e) => setUserName2(e.target.value)}/>
                    </div>
                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer'onClick = {handleDelete}>Delete</button>
                </div>
                
                </div>
      </div>
  
  )
};

export default EditUpdate