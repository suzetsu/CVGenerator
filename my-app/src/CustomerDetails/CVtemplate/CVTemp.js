import React, { useState } from 'react'
import {useLocation} from 'react-router-dom'
import handshake from '../../images/hadshake.png'
import './template.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import NepaliDate from 'nepali-date-converter'


const CVTemp = () => {

const location = useLocation();
const employee =  location?.state;

const employeeInfo = employee && employee.employee


console.log(employeeInfo)
const {
    clientName,
    email,
    clientDOB,
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
    imageData,
    experiences,
    educations,
    age
    
  } = employeeInfo

  const skillSets = employeeInfo.skills.$values
  console.log(skillSets);

// const date = new Date(joiningDate);
// const options = { year: "numeric", month: "long", day: "numeric" };
// const formattedJoiningDate = date.toLocaleDateString("en-US", options);

// const leavedate = new Date(clientLeavingDate);
// const leavedateOptions = { year: "numeric", month: "long", day: "numeric" };
// const formattedLeavingDate = leavedate.toLocaleDateString("en-US", leavedateOptions);
const date = new Date(joiningDate);
const options = { year: "numeric", month: "long", day: "numeric" };
const formattedJoiningDate = formatDate(date, options);

const leavedate = new Date(clientLeavingDate);
const leavedateOptions = { year: "numeric", month: "long", day: "numeric" };
const formattedLeavingDate = formatDate(leavedate, leavedateOptions);

console.log(formattedJoiningDate);
console.log(formattedLeavingDate);

// Function to format date or return a default value if date is null
function formatDate(date, options) {
  if (!isNaN(date.getTime()) && date.toISOString() !== '1970-01-01T00:00:00.000Z') {
    return date.toLocaleDateString("en-US", options);
  } else {
    // You can set a default value or handle it according to your needs
    return "N/A";
  }
}


let DOB = new NepaliDate(new Date(clientDOB))
const dateOfBirth = DOB.format(' DD MMMM YYYY');

  
  const experienceJSON = JSON.parse(experiences)
  const educationJSON = JSON.parse(educations)
    const [loader, setLoader] = useState(false);

    const downloadPDF = () => {
        
        const capture = document.querySelector('.download-pdf');
        setLoader(true)
        html2canvas(capture, { scale: 4 }).then((canvas)=> {
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
    <div className='flex justify-center bg-[#AFEEEE] pb-4' >
        <div className='pt-12' >
            <div className=' shadow-paper rounded-lg bg-[#FFF] download-pdf' style={{ width: '210mm', height: '297mm' }}>
                <div className='flex flex-col p-2 '>
                    <div className='bg-[#121214] h-[10rem] flex gap-56 pl-8 items-center'>
                        <div className='w-[400px] '>
                        <h1 className='text-[#48a7ff] font-helvetica m-0 p-0'>{clientName} </h1> 
                        <h4 className='mt-1 p-0 text-white font-helvetica'>Age { age}</h4>
                        <h4 className='mt-1 p-0 text-white font-helvetica'>{ designation}</h4>
                        <p className='text-white font-helvetica '>{description}</p>
                        </div>
                    <div>
                    <div className='circle-image' >
                        {/* <img src={`data:image/jpg;base64,${imageData}`} alt= 'location' className=' w-16 h-16  '/> */}
                        <div className='image-container' style={{ backgroundImage: `url(data:image/jpg;base64,${imageData})` }}></div>
                        
                    </div>
                    
                    </div>
                    </div>
                    
                    <div className='bg-[#48a7ff] h-[4px]'>
                        
                    </div>
                    <div className='flex pl-2 pt-1 font-helvetica'>
                        <div className='w-[35%] h-[58.8rem] pl-2 bg-[#c7c7c7] pt-2 pb-2'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-1'>
                                <h3 className='text-[#265683] m-0 p-0'>Contact Info</h3>
                                <hr className='h-[2px] w-[4rem] m-0'></hr>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h4 className='p-0 m-0 text-[#666360] font-semibold'>Address</h4>
                                    <p className='p-0 m-0 text-sm font-thin'>{municipality}, {municipalityNumber}, {district}, {province}</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h4 className='p-0 m-0 text-[#666360] font-semibold'>Email</h4>
                                    <p className='p-0 m-0 text-sm font-thin'>{email}</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h4 className='p-0 m-0 text-[#666360] font-semibold'>Phone</h4>
                                    <p className='p-0 m-0 text-sm font-thin'>{phone}</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h4 className='p-0 m-0 text-[#666360] font-semibold'>Age</h4>
                                    <p className='p-0 m-0 text-sm font-thin'>{age}</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                <h3 className='text-[#265683] m-0 p-0'>Education Details</h3>
                                <hr className='h-[2px] w-[4rem] m-0'></hr>
                                </div>
                                { (educationJSON   && Array.isArray(educationJSON) && educationJSON.length >0)  ?educationJSON.map((education) => (
                                   <div>
                                   <div className='flex flex-col gap-1'>
                                       <h4 className='p-0 m-0 text-[#666360] font-semibold'>University</h4>
                                       <p className='p-0 m-0 text-sm font-thin'>{education.university}</p>
                                   </div>
                                   <div className='flex flex-col gap-1'>
                                       <h4 className='p-0 m-0 text-[#666360] font-semibold'>College</h4>
                                       <p className='p-0 m-0 text-sm font-thin'>{education.college}</p>
                                   </div>
                                   <div className='flex flex-col gap-1'>
                                       <h4 className='p-0 m-0 text-[#666360] font-semibold'>Degree</h4>
                                       <p className='p-0 m-0 text-sm font-thin'>{education.degree}</p>
                                   </div>
                                   <div className='flex flex-col gap-1'>
                                       <h4 className='p-0 m-0 text-[#666360] font-semibold'>Level</h4>
                                       <p className='p-0 m-0 text-sm font-thin'>{education.level}</p>
                                   </div>
                                   </div> 
                                )): "No education details available"
                                    }

                                <div className='flex flex-col gap-1'>
                                <h3 className='text-[#265683] m-0 p-0'>Skills</h3>
                                <hr className='h-[2px] w-[4rem] m-0'></hr>
                                { Array.isArray(skillSets) ? (skillSets.map((skill, index) => (
                                    <li key={index} className='p-0 m-0 text-sm font-thin'>
                                        {skill}
                                        </li>
                                ))): 
                                (
                                    <p>No skills available</p>
                                  )
                                }
                                </div>

                            </div>
                        </div>
                        <div className='w-[65%]'>
                            <div className='flex flex-col pl-6 pt-1 gap-6'>
                                <div className='flex flex-col gap-3'>
                                <h3 className='text-[#265683] m-0 p-0'>Current Company</h3>
                                <hr className='h-[2px] w-[5rem] m-0'></hr>
                                <h4 className='p-0 m-0 text-[#1b1b1b] font-semibold'>{companyName}</h4>

                                </div>
                                <div className='flex flex-col gap-3'>
                                <h3 className='text-[#265683] m-0 p-0'>Work Duration</h3>
                                <hr className='h-[2px] w-[5rem] m-0'></hr>
                                <h4 className='p-0 m-0 text-[#1b1b1b] font-semibold'>{formattedJoiningDate} - {formattedLeavingDate}</h4>

                                </div>
                                {/* <div className='flex flex-col gap-3'>
                                <h3 className='text-[#265683] m-0 p-0'>Work Experiences</h3>
                                <hr className='h-[2px] w-[5rem] m-0'></hr>
                                <h5 className='p-0 m-0 text-[#1b1b1b] font-semibold'>{`${firstOrganizationName} (${firstDuration})`}</h5>
                                <li className='p-0 m-0 text-sm font-thin'>{firstTitle}</li>
                                <h5 className='p-0 m-0 text-[#1b1b1b] font-semibold'>{`${secondOrganizationName} (${secondDuration})`}</h5>
                                <li className='p-0 m-0 text-sm font-thin'>{secondTitle}</li>
                                </div> */}
                                <div className='flex flex-col gap-3'>
                                    <h3 className='text-[#265683] m-0 p-0'>Work Experiences</h3>
                                    <hr className='h-[2px] w-[5rem] m-0'></hr>
                                    {(experienceJSON   && Array.isArray(experienceJSON) && experienceJSON.length >0) ?experienceJSON.map((experience, index) => (
                                        <div>
                                        <h5 className='p-0 m-0 text-[#1b1b1b] font-semibold'>{`${experience.organizationName} (${experience.duration})`}</h5>
                                        <li className='p-0 m-0 text-sm font-thin'>{experience.title}</li>
                                        </div>
                                    )): "No Experience found"}
                                    
                                </div>
                                <div className='flex flex-col gap-3'>
                                <h3 className='text-[#265683] m-0 p-0'>Blood Group</h3>
                                <hr className='h-[2px] w-[5rem] m-0'></hr>
                                <h4 className='p-0 m-0 text-[#1b1b1b] font-semibold'>{bloodGroup}</h4>

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

export default CVTemp