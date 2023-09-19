import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientInfo } from '../../Redux/actions';
import { useNavigate } from 'react-router-dom';
import { deleteClientInfo } from '../../Redux/actions';

function EditUpdate() {
  const [userName, setUserName] = useState({
    userName1: '',
    userName2: '',
  })
  const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch();
  const history = useNavigate();
  const clientDetails = useSelector((state) => state.auth.clientData);
  const [matchedUser, setMatchedUser] = useState(null);
  useEffect(() => {
    dispatch(fetchClientInfo());
  }, [])

  const handleEdit = () => {
    if (clientDetails && clientDetails.$values) {
      const matchingClient = clientDetails.$values.find(
        (client) => client.clientName === userName.userName1
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
        (client) => client.clientName === userName.userName1
      )
      if(matchingClient){
        const clientIdToDelete = matchingClient.clientInformationId
        dispatch( deleteClientInfo({clientIdToDelete}))
      }
    }
  }
  
  return (
    <div>
      <div>
    </div>
    <div className='flex flex-col justify-center gap-2 pt-4'>
                <div className='flex gap-2'>
                    <div className='info-input-field pt-1'>
                    <input  type='text' value={userName.userName1} placeholder='Enter username you want to edit' onChange={(e) => setUserName(e.target.value)}/>
                    </div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={handleEdit}>Edit</button>
                </div>
                <div className='flex gap-2'>
                    <div className='info-input-field pt-1'>
                    <input  type='text' value={userName.userName2} placeholder='Enter username you want to delete' onChange={(e) => setUserName(e.target.value)}/>
                    </div>
                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer'onClick = {handleDelete}>Delete</button>
                </div>
                
                </div>
      </div>
  
  )
};

export default EditUpdate