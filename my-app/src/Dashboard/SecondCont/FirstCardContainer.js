import React, {useEffect} from 'react'
import './cards.scss'
import circle from '../../images/blueCircle.png'
import circle1 from '../../images/orangeCircle.png'
import circle2 from '../../images/purpleCircle.png'
import circle3 from '../../images/greenCircle.png'
import parcels from '../../images/parcels.png'
import { fetchClientInfo } from '../../Redux/actions'
import { fetchCompanyInfo } from '../../Redux/companyActions'
import { useDispatch, useSelector} from 'react-redux'


const FirstCardContainer = () => {
    const dispatch = useDispatch()

    const clientInfo = useSelector(state => state.auth.clientData)
    const companyInfo = useSelector(state => state.company.companyData)
    
    
    
    const getEmployeeCount = clientInfo.$values && Array.isArray(clientInfo.$values) ? clientInfo.$values.length:0
        const getCompanyCount = companyInfo.$values && Array.isArray(companyInfo.$values) ? companyInfo.$values.length:0
        function getTotalDepartmentCount(companyInfo) {
            let totalCount = 0;
          
            if (companyInfo.$values && Array.isArray(companyInfo.$values)) {
                companyInfo.$values.forEach(company => {
                  if (company.departments && company.departments.$values) {
                    totalCount += company.departments.$values.length;
                  }
                });
              }
          
            return totalCount;
          }
          
          // Call the function to get the total count of departments
          const totalDepartmentCount = getTotalDepartmentCount(companyInfo);
          
    
    
    useEffect (() => {
        dispatch(fetchClientInfo())
        dispatch(fetchCompanyInfo())
    },[])

  return (
    <div>
    <div className='first-card-container space-x-2'>
        <div>
            <div className='card1'>
                <div className='flex'>
                    <div>
                        <div className='circle-style'>
                            <img src={circle} alt='circle'/>
                            <img className='center-image' src={parcels} alt='parcels'/>
                        </div>
                    </div>
                    <div className='inside-text pl-4 pt-16 text-white font-helvetica'>
                        <div className='mb-2 '>Total Employees</div>
                        <div className='text-xl font-bold mb-2'>{getEmployeeCount}</div>
                        {/* <div className='mb-2'>60% Increase in 28 Days</div> */}
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='card2'>
            <div className='flex'>
                    <div>
                        <div className='circle-style'>
                            <img src={circle1} alt='circle'/>
                            <img className='center-image' src={parcels} alt='parcels'/>
                        </div>
                    </div>
                    <div className='inside-text pl-4 pt-16 text-white '>
                        <div className='mb-2 font-helvetica'>Total Company</div>
                        <div className='text-xl font-bold mb-2 font-helvetica'>{getCompanyCount}</div>
                        {/* <div className='mb-2 font-helvetica'>40% Increase in 28 Days</div> */}
                    </div>
                </div>

            </div>
        </div>
        <div>
            <div className='card3'>
            <div className='flex'>
                    <div>
                        <div className='circle-style'>
                            <img src={circle2} alt='circle'/>
                            <img className='center-image' src={parcels} alt='parcels'/>
                        </div>
                    </div>
                    <div className='inside-text pl-4 pt-16 text-white '>
                        <div className='mb-2 font-helvetica'>Total Departments</div>
                        <div className='text-xl font-bold mb-2 font-helvetica'>{totalDepartmentCount}</div>
                        {/* <div className='mb-2 font-helvetica'>80% Increase in 28 Days</div> */}
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='card4'>
            <div className='flex'>
                    <div>
                        <div className='circle-style'>
                            <img src={circle3} alt='circle'/>
                            <img className='center-image' src={parcels} alt='parcels'/>
                        </div>
                    </div>
                    <div className='inside-text pl-4 pt-12 text-white '>
                        {/* <div className='mb-2 font-helvetica'>Hired</div>
                        <div className='text-xl font-bold mb-2 font-helvetica'>Rs. 20,00,000</div>
                        <div className='mb-2 font-helvetica'>60% Increase in 28 Days</div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default FirstCardContainer