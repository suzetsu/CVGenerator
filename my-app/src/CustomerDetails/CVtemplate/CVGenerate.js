import React, { useState, useEffect } from 'react'
import '../InfoComponents/infoStyles.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientInfo } from '../../Redux/actions';
import { useNavigate } from 'react-router-dom';


function CVGenerate() {
    const [userName1, setUserName] = useState('');
    const [userName2, setUserName2] = useState('');
    const [userName3, setUserName3] = useState('');
    const dispatch = useDispatch();
    
    const [matchedUser, setMatchedUser] = useState(null);

    // const [matchingClientInfo, setMatchedClient] = useState(null);
    const history = useNavigate();

    const clientDetails = useSelector((state) => state.auth.clientData);
    // console.log(clientDetails);

    useEffect(() => {
        dispatch(fetchClientInfo());
     } , []);
     const handleGenerateCV = () => {

    if (clientDetails && clientDetails.$values) {
        const matchingClient = clientDetails.$values.find(
          (client) => client.clientName === userName1 || client.clientName === userName2 || client.clientName === userName3
        )
        // setMatchedUser(matchingClient);
        if ( matchingClient) {
            setMatchedUser(matchingClient);
        if (matchingClient.clientName === userName1) {
          history('/CVTemp', { state: { matchedUser: matchingClient } });
          }
        else if ( matchingClient.clientName === userName2) {
            setMatchedUser(matchingClient);
            history('/SecondCVTemp', { state: { matchedUser: matchingClient } });
        
        }
        else if ( matchingClient.clientName === userName3) {
            setMatchedUser(matchingClient);
            history('/ThirdCVTemp', { state: { matchedUser: matchingClient } });
        }
    }
    }
    }
      
  return (
    <div className='flex justify-center'>
        <div className='pt-48'>
        <div className=' shadow-paper p-3 rounded-lg'>
        <div className='pt-4 pl-2 flex flex-col gap-3'>
                <p className=' m-0 pb-4 font-roboto font-bold' style={{ color: '#1670B2', fontSize: '16px' }}>
                  Choose Any One Template to Generate CV
                </p>
                
                <div>
                  <div className='flex gap-2'>
                    <div className='flex flex-col gap-2'>
                      <p className='pb-0 m-0 font-helvetica text-xs font-semibold'>Template 1</p>
                      <div className='info-input-field'>
                        <input type='text' value={userName1} placeholder='Enter Your Name to generate CV' onChange={(e) => setUserName(e.target.value)} />
                      </div>
                    </div>
                    <div className=' pt-[22px]'>
                      <button className='btn-info1' onClick={handleGenerateCV}>
                        Generate
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='flex gap-2'>
                    <div className='flex flex-col gap-2'>
                      <p className='pb-0 m-0 font-helvetica text-xs font-semibold'>Template 2</p>
                      <div className='info-input-field'>
                        <input type='text' value={userName2} placeholder='Enter Your Name to generate CV' onChange={(e) => setUserName2(e.target.value)} />
                      </div>
                    </div>
                    <div className='pt-[22px]'>
                      <button className='btn-info1' onClick={handleGenerateCV}>
                        Generate
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='flex gap-2'>
                    <div className='flex flex-col gap-2'>
                      <p className='pb-0 m-0 font-helvetica text-xs font-semibold'>Template 3</p>
                      <div className='info-input-field'>
                        <input type='text' value={userName3} placeholder='Enter Your Name to generate CV' onChange={(e) => setUserName3(e.target.value)} />
                      </div>
                    </div>
                    <div className='pt-[22px]'>
                      <button className='btn-info1' onClick={handleGenerateCV}>
                        Generate
                      </button>
                    </div>
                  </div>
                </div>

            </div>
        </div>
        </div>
    </div>
  )

};
export default CVGenerate