import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateClientInfo } from '../../Redux/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import './infoStyles.css'
import Swal from 'sweetalert2';

function Update() {
    const location = useLocation();
    const history = useNavigate();
    const matchedUser = location.state?.matchedUser;

    const dispatch = useDispatch();

    // const clientName = matchedUser?.clientName
    // const mobileNum = matchedUser?.phone
    // const mail  = matchedUser?.email
  
    const [clientName, setName] = useState( matchedUser?.clientName)
    const [phone, setPhone] = useState(matchedUser?.phone)
    const [email, setEmail] = useState(matchedUser?.email)
    const [clientPANNO, setPan] = useState(matchedUser?.clientPANNO)
    const [municipality, setMun] = useState(matchedUser?.municipality)
    const [municipalityNumber, setMunNo] = useState(matchedUser?.municipalityNumber)
    const [district, setDistrict] = useState(matchedUser?.district)
    const [province, setProvince] = useState(matchedUser?.province)
    const [role, setRole] = useState(matchedUser?.role)
    const [university, setUni] = useState(matchedUser?.university)
    const [college, setCollege] = useState(matchedUser?.college)
    const [level, setLevel] = useState(matchedUser?.level)
    const [degree, setDegree] = useState(matchedUser?.degree)
    const [skills, setSkills] = useState(matchedUser?.skills)
    const [description, setDescription] = useState(matchedUser?.description)
    const [firstProject, setFirstProject] = useState(matchedUser?.firstProject)
    const [secondProject, setSecondProject] = useState(matchedUser?.secondProject)
    const [firstProjectDescription, setFirstProjectDescription] = useState(matchedUser?.firstProjectDescription)
    const [secondProjectDescription, setSecondProjectDescription] = useState(matchedUser?.secondProjectDescription)

    const clientInformationID = matchedUser?.clientInformationID;
    const clientUpdateStatus = useSelector((state) => state.auth.clientUpdateStatus);

    
    

    const handleUpdate = () => {
      const updatedClient = {
        clientName,
        phone,
        email,
        clientPANNO,
        municipality,
        municipalityNumber,
        district,
        province,
        role,
        university,
        college,
        level,
        degree,
        skills,
        description,
        firstProject,
        secondProject,
        firstProjectDescription,
        secondProjectDescription
      }
     
    
        dispatch( updateClientInfo(clientInformationID, updatedClient) )
        if ( clientUpdateStatus === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Client Updated Successfully',
                showConfirmButton: false,
                timer: 1500
            })
            history('/Info')
        }
        
    }

  return (
    <div className='flex justify-center h-[100vh] items-center'>
        <div className='shadow-paper w-[400px] flex justify-center rounded-lg bg-slate-400'>
        <div className='info-input-field flex flex-col gap-2 p-4 '>
                <input type='text' value={matchedUser?.clientInformationID} disabled placeholder='ID'/>
                <input type='text' value={clientName} placeholder='Clinet Name' onChange={(e) => setName(e.target.value)}/>
                <input type='tel' value={phone} placeholder='Clinet Phone Number' onChange={(e) => setPhone(e.target.value)} />
                <input type='email' value={email} placeholder='Clinet Email' onChange={(e) => setEmail(e.target.value)} />
        <div>
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={handleUpdate}>Update</button>
        </div>
        </div>
        
        </div>
        
    </div>
  )
}

export default Update