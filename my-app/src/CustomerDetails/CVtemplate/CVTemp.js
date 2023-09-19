import React, { useState } from 'react'
import {useLocation} from 'react-router-dom'
import handshake from '../../images/hadshake.png'
import './template.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'




// import axios from 'axios';
// import Template from './template'
// import { useSelector, useDispatch } from 'react-redux';
// import { selectClientInformation } from '../../Redux/slector';
// import { fetchClientInfo } from '../../Redux/actions';

const CVTemp = () => {

const location = useLocation();
const matchedUser = location.state?.matchedUser;
    const name = matchedUser? matchedUser.clientName : "no client";
    const role = matchedUser? matchedUser.role : "no role";
    const email = matchedUser? matchedUser.email : "no email";
    const phone = matchedUser? matchedUser.phone : "no phone";
    const PANNO = matchedUser? matchedUser.clientPANNO : "no PAN";
    const municipality = matchedUser? matchedUser.municipality : "no municipality";
    const municipalityNumber = matchedUser? matchedUser.municipalityNumber : "no municipality";
    const district = matchedUser? matchedUser.district : "no district";
    const province = matchedUser? matchedUser.province : "no province";
    const university = matchedUser? matchedUser.university : "no university";
    const college = matchedUser? matchedUser.college : "no college";
    const level = matchedUser? matchedUser.level : "no level";
    const degree = matchedUser? matchedUser.degree : "no degree";
    const description = matchedUser? matchedUser.description : "no description";
    const firstProject = matchedUser? matchedUser.firstProject : "no first project";
    const secondProject = matchedUser? matchedUser.secondProject : "no second project";
    const firstProjectDescription = matchedUser? matchedUser.firstProjectDescription : "no first project";
    const secondProjectDescription = matchedUser? matchedUser.secondProjectDescription : "no second project";
    
    const skills = matchedUser? matchedUser.skills : "no skills";
    const skillSets= skills.$values
    console.log(skillSets)
  
    // console.log(matchedUser)
// console.log(skills)

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
    <div className='flex justify-center bg-[#AFEEEE] pb-4'>
        <div className='pt-12'>
            <div className=' shadow-paper rounded-lg bg-[#FFF] w-[815px] '>
                <div className='flex flex-col p-2 download-pdf'>
                    <div className='bg-[#121214] h-[10rem] flex gap-56 pl-8 items-center'>
                        <div className='w-[400px] '>
                        <h1 className='text-[#48a7ff] font-helvetica m-0 p-0'>{name}</h1> 
                        <h4 className='mt-1 p-0 text-white font-helvetica'>{ role}</h4>
                        <p className='text-white font-helvetica '>{description}</p>
                        </div>
                    <div>
                    <div className='circle-image' style={{ backgroundImage: `url(${handshake})` }}></div>
                    </div>
                    </div>
                    
                    <div className='bg-[#48a7ff] h-[4px]'>
                        
                    </div>
                    <div className='flex pl-2 pt-1 font-helvetica'>
                        <div className='w-[35%] h-[42rem] pl-2 bg-[#c7c7c7] pt-2 pb-2'>
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
                                <h3 className='text-[#265683] m-0 p-0'>Education Details</h3>
                                <hr className='h-[2px] w-[4rem] m-0'></hr>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h4 className='p-0 m-0 text-[#666360] font-semibold'>University</h4>
                                    <p className='p-0 m-0 text-sm font-thin'>{university}</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h4 className='p-0 m-0 text-[#666360] font-semibold'>College</h4>
                                    <p className='p-0 m-0 text-sm font-thin'>{college}</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h4 className='p-0 m-0 text-[#666360] font-semibold'>Degree</h4>
                                    <p className='p-0 m-0 text-sm font-thin'>{degree}</p>
                                </div>

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
                            <div className='flex flex-col pl-6 pt-1'>
                                <div className='flex flex-col gap-1'>
                                <h3 className='text-[#265683] m-0 p-0'>Project Works</h3>
                                <hr className='h-[2px] w-[5rem] m-0'></hr>
                                <h4 className='p-0 m-0 text-[#1b1b1b] text-sm font-semibold'>{firstProject}</h4>
                                <li className='p-0 m-0 text-sm font-thin'>{firstProjectDescription}</li>
                                <h5 className='p-0 m-0 text-[#1b1b1b] text-sm font-semibold'>{secondProject}</h5>
                                <li className='p-0 m-0 text-sm font-thin'>{secondProjectDescription}</li>
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