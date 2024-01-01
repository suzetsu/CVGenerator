import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import handshake from '../../images/hadshake.png'
import './template.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import NepaliDate from 'nepali-date-converter'
import logo from './umLogo.png'
import image from './image.png'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCompanyInfo } from '../../Redux/companyActions'




const CVFormat = () => {

    const location = useLocation();
    const employee = location?.state;

    // const employeeInfo = employee && employee.employee\
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCompanyInfo())
    }, [])
    const companyDetails = useSelector((state) => state.company.companyData);
  
    const companyLogo = () => {
        if (employee && employee.client.companyName) {
          const matchingCompany = companyDetails && companyDetails.$values.find(
            (company) => company.companyName === employee.client.name
          );
      
          if (matchingCompany) {
            return matchingCompany.imageData;
          }
        }
      
        
        // return "logo.png";
      };
     const compLogo = companyLogo();
    const {
        client: { clientName,
            email,
            clientDOB,
            clientPANNO,
            designation,
            clientInformationID,
            companyName,
            departmentName,
            municipality,
            tole,
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
            age,
            gender,
            fatherName,
            religion,
            marriedStatus,
            homeNumber,
            clientheight,
            weight,
            familyContactInfo,
            appointmentStatus,
            skills,
            otherInformation,
        }

    } = employee

    const parsedDoB = new Date(clientDOB);
    const formattedDoB = parsedDoB.toISOString().split('T')[0];

    let DOB = new NepaliDate(new Date(clientDOB))
    const dateOfBirth = DOB.format(' DD MMMM YYYY');

    const skillsJSON = JSON.parse(skills)
    const skillObject = skillsJSON[0]
    const otherInformationJSON = JSON.parse(otherInformation)
    const otherInformationObject = otherInformationJSON[0]

    const familyContactInfoJSON = JSON.parse(familyContactInfo)
    const familyContactInfoObject = familyContactInfoJSON[0]

    const educationJSON = JSON.parse(educations)
    const experienceJSON = JSON.parse(experiences)
    
    const date = new Date(joiningDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedJoiningDate = formatDate(date, options);

    function formatDate(date, options) {
        if (!isNaN(date.getTime()) && date.toISOString() !== '1970-01-01T00:00:00.000Z') {
          return date.toLocaleDateString("en-US", options);
        } else {
          // You can set a default value or handle it according to your needs
          return "N/A";
        }
      }
    const [loader, setLoader] = useState(false);

    const downloadPDF = () => {

        const capture = document.querySelector('.download-pdf');
        setLoader(true)
        html2canvas(capture, { scale: 4 }).then((canvas) => {
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
        <div className='flex justify-center bg-[#d9ebeb] pb-4' >
            <div className='pt-24' >
                <div className=' font-helvetica shadow-paper rounded-lg bg-[#FFF] download-pdf' style={{ width: '210mm', height: '297mm' }}>
                    <div className='p-8'>
                        <div className='flex flex-col gap-1 '>
                            <div className='h-[10rem] flex justify-between text-black '>
                                <div className='float-left w-[100px] h-[100px] bg-cover '>
                                    <div style={{ backgroundImage: `url(data:image/jpg;base64,${compLogo})` }} className='w-[100%] h-[100%] bg-cover rounded-[50%]'></div>
                                </div>
                                <div className=' flex flex-col gap-2 items-center'>
                                    <p className='p-0 m-0 text-2xl font-bold pt-4'> CABLECAR EMPLOYEE TRADE UNION</p>

                                    <p className='p-0 m-0 flex justify-center'> ICHHAKAMANA-4, CHERES, CHITWAN</p>
                                    <div className='text-white mt-2'>
                                        <p className='bg-black rounded-3xl text-xl font-bold py-2 px-10 flex justify-center'>MEMBERSHIP FORM</p>
                                    </div>
                                </div>
                                <div className='float-right  w-[150px] h-[150px] bg-cover'>
                                    <div style={{ backgroundImage: `url(data:image/jpg;base64,${imageData})` }} className='w-[100%] h-[100%] bg-cover rounded-[50%]'></div>
                                </div>

                            </div>
                            <div className='flex justify-between h-[100%] font-helvetica'>
                                <div className='flex flex-1 pl-[30px] pt-4 flex-col gap-12'>
                                    <div className='flex flex-col gap-3'>
                                        <h4 className='p-0 m-0'>PERSONAL INFORMATION</h4>
                                        <p>Name: {clientName}</p>
                                        <p>Date of Birth: {dateOfBirth}</p>
                                        <p>Gender: {gender}</p>
                                        <p>Father's Name: {fatherName}</p>
                                        <p>Religion: {religion}</p>
                                        <p>Marital Status: {marriedStatus}</p>

                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <h4 className='p-0 m-0'>CONTACT DETAILS</h4>
                                        <p>Mobile: {phone}</p>
                                        <p>Home: {homeNumber}</p>
                                        <p>Email: {email}</p>


                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <h4 className='p-0 m-0'>PHYSICAL INFORMATION</h4>
                                        <p>Height: {clientheight}</p>
                                        <p>Weight: {weight}</p>
                                        <p>Blood Group: {bloodGroup}</p>


                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <h4 className='p-0 m-0 flex'>POSTAL INFORMATION</h4>
                                        <p>{province && <span className='m-0 p-0'>{province} Pradesh,</span>} {district&& <span className='m-0 p-0'> {district} District </span>}</p> 
                                        <p><span className='m-0 p-0'>{municipality}</span> {municipalityNumber && <span className='m-0 p-0'>,Ward No.: {municipalityNumber}</span>}</p>
                                        <p><span className='m-0 p-0'>{tole}</span></p>

                                    </div>

                                    <div className='flex flex-col gap-3'>

                                        <h4 className='p-0 m-0'>EDUCATION</h4>
                                        {(educationJSON && Array.isArray(educationJSON) && educationJSON.length > 0) ? educationJSON.map((education) => (
                                            <div className='flex flex-col gap-2'>
                                                <p>Level: {education.level}</p>
                                                <p>Degree: {education.degree}</p>
                                            </div>
                                        )) : "No education details available"
                                        }

                                    </div>



                                </div>
                                <div className='w-[1px] h-[242mm] bg-black flex'></div>
                                <div className='flex flex-1 p-[10px] ml-4 pt-4 flex-col gap-12'>
                                    <div className='flex flex-col gap-3'>
                                        <h4 className='p-0 m-0'>OFFICIAL INFORMATION</h4>
                                        <p>Designation: {designation}</p>
                                        <p>Department: {departmentName}</p>
                                        <p>Date of Join: {formattedJoiningDate}</p>
                                        <p>Type of Appointment: {appointmentStatus}</p>
                                        

                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <h4 className='p-0 m-0'>SKILLS</h4>
                                        <p>Driving License Category: {skillObject && skillObject.license}</p>
                                        <p>Swimming: {skillObject && skillObject.swimming}</p>
                                        <p>Others: { skillObject && skillObject.otherSkill}</p>


                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <h4 className='p-0 m-0'>TRAINING/EXPERIENCE</h4>
                                        {(experienceJSON && Array.isArray(experienceJSON) && experienceJSON.length > 0) ? experienceJSON.map((experience) => (
                                            <div className='ml-[18px]'>
                                                <ol className='p-0 m-0'>
                                                    <li className='p-0 m-0'>{experience.title}</li>
                                                </ol>
                                            </div>
                                        )): 'No experience'
                                        } 
                                         


                                    </div>
                                    
                                    <div className='flex flex-col gap-3'>
                                        <h4 className='p-0 m-0'>FAMILY CONTACT INFORMATION</h4>
                                        <p>Spouse Name: {familyContactInfoObject && familyContactInfoObject.spouseName}</p>
                                        <p>Mobile No.: {familyContactInfoObject && familyContactInfoObject.spouseNumber}</p>
                                        <p>No. Of Children: Son - {familyContactInfoObject && familyContactInfoObject.sonNum} Daughter - {familyContactInfoObject && familyContactInfoObject.daughterNum}</p>


                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <h4 className='p-0 m-0'>OTHER INFORMATION</h4>
                                        <p>Citiznship No.: {otherInformationObject && otherInformationObject.citizenNum}, {otherInformationObject && otherInformationObject.issueDistrict}, {otherInformationObject && otherInformationObject.issueDate}</p>
                                        <p>PF/SSF No.: {otherInformationObject && otherInformationObject.pfSsfNum}</p>
                                        <p>CIT No.: {otherInformationObject && otherInformationObject.citNum}</p>
                                        <p>PAN No.: {clientPANNO}</p>
                                        <p>Insurance No.: {otherInformationObject && otherInformationObject.insuranceNum}</p>
                                        <p>Insurance Company: {otherInformationObject && otherInformationObject.insuranceCompany}</p>


                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>
                <div className='pt-2 flex justify-center'>
                    <button className='bg-[#48a7ff] text-white p-2 cursor-pointer' onClick={downloadPDF} disabled={!(loader) === false}>
                        {loader ? (<span>Downloading</span>) : (<span>Download CV</span>)}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default CVFormat