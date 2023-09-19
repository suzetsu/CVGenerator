import React, { useState } from 'react'
import './template.css'
import { useLocation } from 'react-router-dom'
import locationIcon from '../../images/location-icon.png'
import callIcon from '../../images/phone-icon.png'
import mailIcon from '../../images/email2-icon.png'
import linkIcon from '../../images/links-icon.png'
import html2canvas from 'html2canvas'; 
import jsPDF from 'jspdf'

function SecondCVTemp() {

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

    const [loader, setLoader] = useState(false);

    const downloadPDF = () => {
        
        const capture = document.querySelector('.download-pdf');
        setLoader(true)
        html2canvas(capture, { scale: 2 }).then((canvas)=> {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imageWidth = canvas.width
            const imageHeight = canvas.height

            // const ratio = Math.min(componentWidth/imageWidth, componentHeight/imageHeight)
            // const imgX = (componentWidth-imageWidth*ratio)/2
            // const imgY = (componentHeight-imageHeight*ratio)/2

            // Calculate aspect ratios
            const pdfAspectRatio = pdfWidth / pdfHeight;
            const imageAspectRatio = imageWidth / imageHeight;

            let imgWidth = pdfWidth;
            let imgHeight = pdfHeight;
            let imgX = 0;
            let imgY = 0;

            if (imageAspectRatio < pdfAspectRatio) {
            imgHeight = pdfHeight;
            imgWidth = (imageWidth * pdfHeight) / imageHeight;
            imgX = (pdfWidth - imgWidth) / 2;
            } else {
            imgWidth = pdfWidth;
            imgHeight = (imageHeight * pdfWidth) / imageWidth;
            imgY = (pdfHeight - imgHeight) / 2;
            }

            // pdf.addImage(imgData, 'PNG', imgX, imgY, imageWidth*ratio, imageHeight*ratio);
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);

            setLoader(false)
            pdf.save('resume.pdf')
            
        })
        
    }


  return (
    <div className='  flex justify-center pt-12 bg-[#cde3e7] pb-10'>
        <div className='flex flex-col'>
            <div className=' shadow-paper rounded-lg bg-[#FFF] w-[815px] download-pdf'>
                <div className='p-4 '>
                    <div className='flex flex-col'>
                        <div className='flex flex-col gap-2'>
                            <div className=' font-helvetica font-bold text-lg '>
                                {name}
                            </div>
                            <div className='flex gap-10 pb-0'>
                            <div className='flex'>
                            
                                <img src={locationIcon} alt= 'location' className=' w-5 h-5  '/>
                            
                            <p className='p-0 m-0 font-helvetica text-sm font-thin opacity-50'>
                                {municipality}, {municipalityNumber}, {district}, {province}
                            </p>
                            </div>
                            <div className=' flex gap-1'>
                            
                                <img src={callIcon} alt= 'call' className=' w-4 h-4 '/>
                                                     
                            <p className=' p-0 m-0 font-helvetica text-sm font-thin opacity-50'>
                                {phone}
                            </p>
                            </div>
                            <div className=' flex gap-1'>
                            <div className='pt-[2px]'>
                                <img src={mailIcon} alt= 'mail' className=' w-4 h-4'/>
                                </div>
                            <p className=' p-0 m-0 font-helvetica text-sm font-thin opacity-50'>
                                {email}
                            </p>
                            </div>
                            <div className='flex gap-1'>
                                <img src={linkIcon} alt= 'link' className=' w-4 h-4'/>
                            <p className=' p-0 m-0 font-helvetica text-sm font-thin opacity-50'>
                                linkedin.com/profile
                            </p>

                           
                            </div>
                            </div>
                           


                        </div>
                        <div className=' flex pt-4'>
                            <div className='w-[60%] flex flex-col gap-4'>
                                <div className='w-[25rem]' >
                                    <h2 className=' m-0 p-0 font-helvetica font-bold text-lg text-[#5f0aa8]'>
                                        EDUCATION
                                    </h2>
                                    <hr className='h-[3px] bg-[#5f0aa8]' ></hr>
                                    
                                    
                                    
                                </div>
                                <div>
                                    <div className='flex flex-col gap-1 font-helvetica'>
                                        <div className='text-sm'>{level}</div>
                                        <div className=' font-semibold text-[#8b24f4] '>{university}</div>
                                        <div className='text-xs'>2017 - 2021</div>
                                        <div className='text-xs'>CGPA: 3.5</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex flex-col gap-1 font-helvetica'>
                                        <div className='text-sm'>Class XII (Science)</div>
                                        <div className=' font-semibold text-[#8b24f4] '>Tribhuvan University</div>
                                        <div className='text-xs'>2017 - 2021</div>
                                        <div className='text-xs'>CGPA: 3.5</div>
                                    </div>
                                </div>
                                <div className='w-[25rem]'>
                                    <h2 className=' m-0 p-0 font-helvetica font-bold text-lg text-[#5f0aa8]'>
                                        PROJECTS
                                    </h2>
                                    <hr className='h-[3px]  bg-[#5f0aa8]' ></hr>
                                </div>
                                <div>
                                    <div className='flex flex-col gap-1 font-helvetica'>
                                        <div className='text-sm font-semibold'>{firstProject}</div>
                                        <div className=' text-xs '>{firstProjectDescription}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex flex-col gap-1 font-helvetica'>
                                        <div className='text-sm font-semibold'>{secondProject}</div>
                                        <div className=' text-xs '>{secondProjectDescription}</div>
                                    </div>
                                </div>
                                <div className='w-[25rem]'>
                                    <h2 className='m-0 p-0 font-helvetica font-bold text-lg text-[#5f0aa8]'>
                                        TRAININGS
                                    </h2>
                                    <hr className='h-[3px]  bg-[#5f0aa8]' ></hr>
                                </div>
                                <div>
                                    <div className='flex flex-col gap-1 font-helvetica'>
                                        <div className='text-sm'>JavaScript Training</div>
                                        <div className=' font-semibold text-[#8b24f4] '>Umbrella Solutions</div>
                                        <div className='text-xs'>April 2021</div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1 font-helvetica'>
                                        <div className='text-sm'>JavaScript Training</div>
                                        <div className=' font-semibold text-[#8b24f4] '>Umbrella Solutions</div>
                                        <div className='text-xs'>April 2021</div>
                                </div>

                            </div>
                            <div className='w-[40%] flex flex-col gap-4'>
                            <div className='w-[19rem]'>
                                    <h2 className=' m-0 p-0 font-helvetica font-bold text-lg text-[#5f0aa8]'>
                                        TECHNICAL SKILLS
                                    </h2>
                                    <hr className='h-[3px]  bg-[#5f0aa8]' ></hr>
                                </div>
                                <div>
                                { Array.isArray(skillSets) ? (skillSets.map((skill, index) => (
                                    <li key={index} className='p-0 m-0 text-lg'>
                                        {skill}
                                        </li>
                                ))): 
                                (
                                    <p>No skills available</p>
                                  )
                                }
                                </div>
                                <div className='w-[19rem]'>
                                    <h2 className='font-helvetica font-bold text-lg text-[#5f0aa8]'>
                                        WORK EXPERIENCE
                                    </h2>
                                    <hr className='h-[3px]  bg-[#5f0aa8]' ></hr>
                                </div>
                                <div>
                                    <div className='flex flex-col gap-1 font-helvetica'>
                                        <div className='text-sm font-semibold'>ABC at ABC</div>
                                        <div className=' text-xs '>ABC work Description</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex flex-col gap-1 font-helvetica'>
                                        <div className='text-sm font-semibold'>ABC at ABC</div>
                                        <div className=' text-xs '>ABC Work Description</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='font-helvetica font-bold text-lg text-[#5f0aa8]'>
                                        SOFT SKILLS
                                    </div>
                                    <hr className='h-[3px]  bg-[#5f0aa8]' ></hr>
                                </div>
                                <div>
                                    <li>Time Management</li>
                                    <li>Communication</li>
                                    <li>Teamwork</li>
                                    <li>Problem Solving</li>
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

export default SecondCVTemp