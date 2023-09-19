import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateClientInfo } from '../../Redux/actions';
import { useLocation, useNavigate } from 'react-router-dom';

import './infoStyles.css'

function Update() {
    const [clientName, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const location = useLocation();
    const history = useNavigate();
    const matchedUser = location.state?.matchedUser;

    const dispatch = useDispatch();
    const clientDetails = useSelector((state) => state.auth.clientData);

    const handleUpdate = () => {
        const clientToUpdate = matchedUser?.clientInformationId;
        dispatch( updateClientInfo({clientToUpdate, clientName, phone, email}))
        // if ( updateSuccess === 200) {
        //     alert('Client Updated')
        //     history('/Info')
        // }
        
    }

  return (
    <div className='flex justify-center h-[100vh] items-center'>
        <div className='shadow-paper w-[400px] flex justify-center rounded-lg bg-slate-400'>
        <div className='info-input-field flex flex-col gap-2 p-4 '>
                <input type='text' value={matchedUser?.clientInformationId} disabled placeholder='ID' onChange={(e) => setName(e.target.value)}/>
                <input type='text' value={matchedUser?.clientName} placeholder='Clinet Name' onChange={(e) => setName(e.target.value)}/>
                <input type='text' value={matchedUser?.phone} placeholder='Clinet Phone Number' onChange={(e) => setPhone(e.target.value)} />
                <input type='text' value={matchedUser?.email} placeholder='Clinet Email' onChange={(e) => setEmail(e.target.value)} />
        <div>
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={handleUpdate}>Update</button>
        </div>
        </div>
        
        </div>
        
    </div>
  )
}

export default Update