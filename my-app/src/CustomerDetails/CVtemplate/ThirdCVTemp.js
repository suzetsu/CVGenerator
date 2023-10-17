import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import handshake from '../../images/hadshake.png'
import './template.css'
import locationIcon from '../../images/location-icon.png'
import callIcon from '../../images/phone-icon.png'
import mailIcon from '../../images/email2-icon.png'
import linkIcon from '../../images/links-icon.png'
import bookIcon from '../../images/book-icon.png'
import profileIcon from '../../images/business-icon.png'

function ThirdCVTemp() {
    const location = useLocation();
    const employee = location.state;
    
    const employeeInfo = employee.employee
    console.log(employeeInfo)
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
        level,
        degree,
        description,
        firstOrganizationName,
        firstDuration,
        firstTitle,
        secondOrganizationName,
        secondDuration,
        secondTitle,
        imagePath
        
      } = employeeInfo
    
      const skillSets = employeeInfo.skills.$values
      console.log(skillSets)

    const [loader, setLoader] = useState(false);

    const downloadPDF = () => {
        
        const capture = document.querySelector('.download-pdf');
        setLoader(true)
        html2canvas(capture, { scale: 2 }).then((canvas)=> {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const componentWidth = pdf.internal.pageSize.getWidth();
            const componentHeight = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);

            setLoader(false)
            pdf.save('resume.pdf')
            
        })
        
    }

  return (
    <div className='  flex justify-center pt-12 bg-[#cde3e7] pb-10'>
        <div className='flex flex-col'>
            <div className=' shadow-paper rounded-lg bg-[#FFF] w-[715px]'>
                <div className='flex p-2 download-pdf'>
                    <div className='w-[30%] bg-[#e5f1ff] '>
                        <div className='p-2 flex flex-col gap-10'>
                            <div>
                            <div className='circle-image-thirdCV' style={{ backgroundImage: `url(${imagePath})` }}></div>
                            
                            </div>
                            <div className='flex flex-col pl-3'>
                            
                            <div className='flex gap-3'>
                            <img src={profileIcon} alt= 'location' className=' w-5 h-5  '/>
                                <div className='flex flex-col gap-2 font-helvetica'>
                                <p className='m-0 p-0 font-bold text-[#0268d7]'>
                                    About Me
                                </p>
                                <p className='text-sm opacity-80 p-0 m-0'>
                                    {description}
                                </p>
                                </div>
                            </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                            <p className='m-0 pl-11 pt-0 pb-0 font-bold text-[#0268d7]'>
                                Contact
                            </p>
                            <div className='flex flex-col gap-3 pl-3 font-helvetica opacity-75 text-sm w-auto'>
                                <div className='flex gap-4'>
                                <img src={locationIcon} alt= 'location' className=' w-4 h-4  '/>
                                <div className='overflow-anywhere'>{municipality}, {municipalityNumber}, {district}, {province}</div>
                                </div>
                                <div className='flex gap-4'>
                                <img src={mailIcon} alt= 'location' className=' w-4 h-4  '/>
                                <div className='overflow-anywhere'>
                                    {email}
                                </div>
                                </div>
                                <div className='flex gap-4'>
                                <img src={callIcon} alt= 'location' className=' w-4 h-4  '/>
                                <div>{phone}</div>
                                </div>
                                <div className='flex gap-4'>
                                <img src={linkIcon} alt= 'location' className=' w-4 h-4  '/>
                                <div>linkedin.com/profile</div>
                                </div>

                            </div>
                            </div>
                            <div className='pl-2 flex gap-2 '>
                                <div>
                            <img src={bookIcon} alt= 'location' className=' w-6 h-6 '/>
                            </div>
                                <div className='flex flex-col gap-4 font-helvetica'>
                                    <p className='mt-1 mb-0 mr-0 ml-0 p-0 font-bold text-[#0268d7]'>Education</p>
                                    <div className='flex flex-col gap-2'>
                                        <div className='text-sm opacity-70'>2015-2019</div>
                                        <div className='text-sm opacity-90'>{level}</div>
                                        <div className='text-sm opacity-70'>{university}</div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='text-sm opacity-70'>2020-2023</div>
                                        <div className='text-sm opacity-90'>Masters of Information and Technology</div>
                                        <div className='text-sm opacity-70'>{university}</div>
                                    </div>
                                </div>

                            </div>
                            

                        </div>
                    </div>
                    <div className='w-[70%] p-6'>
                        <div className='flex flex-col gap-11 pt-12'>
                            <div className='flex flex-col'>
                                <h1 className='m-0 p-0 font-bold text-4xl text-[#0268d7]'>{clientName}</h1>
                                <p className='m-0 p-0 opacity-70 text-lg font-helvetica'>{designation}</p>
                            </div>
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-col gap-4 font-helvetica'>
                            <div className='text-[#0268d7] font-bold'>
                                Experience
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-8'>
                                    <div className='p-0 m-0 text-sm font-semibold'>{firstOrganizationName}</div>
                                    <div className='m-0 p-0 text-sm opacity-70'>{firstDuration}</div>
                                </div>
                                {/* <p className='m-0 p-0 text-xs font-thin opacity-70'>Role</p> */}
                                <li className='m-0 p-0 text-sm font-thin '>{firstTitle}</li>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-8'>
                                    <div className='p-0 m-0 text-sm font-semibold'>{secondOrganizationName}</div>
                                    <div className='m-0 p-0 text-sm opacity-70'>{secondDuration}</div>
                                </div>
                                {/* <p className='m-0 p-0 text-xs font-thin opacity-70'>Role</p> */}
                                <li className='m-0 p-0 text-sm font-thin '>{secondTitle}</li>
                            </div>
                            
                            </div>

                            <div>
                            {/* <div className='flex flex-col gap-4 font-helvetica'>
                            <div className='text-[#0268d7] font-bold'>
                                Work Experience
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-1'>
                                <div className='p-0 m-0 text-sm font-semibold'>{`${firstOrganizationName} (${firstDuration})`}</div>
                                <li className='m-0 p-0 text-sm font-thin '>{firstTitle}</li>
                                </div>
                                <div className='flex flex-col gap-1'>
                                <div className='p-0 m-0 text-sm font-semibold'>{`${secondOrganizationName} (${secondDuration})`}</div>
                                <li className='m-0 p-0 text-sm font-thin '>{secondTitle}</li>
                                </div>
                            
                            
                            </div>
                            </div> */}
                            </div>
                            <div className='flex flex-col gap-3 font-helvetica'>
                            <div className='text-[#0268d7] font-bold'>
                                Professional Skills
                            </div>
                            <div className='flex flex-col gap-2'>
                                {Array.isArray(skillSets) ? (skillSets.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))) : (<li>No Skills</li>)}
                                
                            </div>
                            </div>
                            <div className='flex flex-col gap-3 font-helvetica'>
                            <div className='text-[#0268d7] font-bold'>
                                Soft Skills
                            </div>
                            <div className='flex flex-col gap-2'>
                                <li>Communication</li>
                                <li>Teamwork</li>
                                <li>Problem Solving</li>
                                <li>Time Management</li>
                            </div>
                            </div>
                        </div>
                        </div>
                        

                    </div>
                </div>
            </div>
            <div className='pt-2 flex justify-center'>
        <button className='bg-[#48a7ff] text-white p-2 cursor-pointer' onClick={downloadPDF} disabled={!(loader)===false}>
            {loader? (<span>Downloading</span>): (<span>Download CV</span>)}
        </button>
    </div>

        </div>
    </div>
  )
}

export default ThirdCVTemp