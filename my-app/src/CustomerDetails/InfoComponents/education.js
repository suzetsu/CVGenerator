import React, { useState } from 'react';
import addIcon from '../../images/addIcon.png'
import closeIcon from '../../images/closeIcon.png'

function EducationForm(uniError, collegeError, levelError, degreeError, setAllErrors, allErrors) {
  const [education, setEducation] = useState([
    {
      college: '',
      level: '',
      degree: '',
      university: '',
    },
  ]);
  

  const addEducation = () => {
    setEducation([...education, { college: '', level: '', degree: '', university: ''}]);
  };
  const removeEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  const handleUniversityChange = (value, index) => {
    const updatedEducation = [...education];
    updatedEducation[index].organizationName = value;
    setEducation(updatedEducation);
    setAllErrors({...allErrors, universityFieldError: '' })
  };

  const handleCollegeChange = (value, index) => {
    const updatedEducation = [...education];
    updatedEducation[index].duration = value;
    setEducation(updatedEducation);
  };

  const handleLevelChange = (value, index) => {
    const updatedEducation = [...education];
    updatedEducation[index].title = value;
    setEducation(updatedEducation);
  };
  const handleDegreeChange = (value, index) => {
    const updatedEducation = [...education];
    updatedEducation[index].title = value;
    setEducation(updatedEducation);
  };

  return (
    <div>
      <p className="m-0 pb-4 font-roboto font-bold" style={{ color: "#1670B2", fontSize: "16px" }}>
        Education Details
      </p>
      <div className='pl-2 pb-4 flex flex-col gap-2' >
        {education.map((educations, index) => (
          <div key={index} className='flex gap-14 p-2' style={{border: '1px solid black', outline: 'none'}}>
            <div className='flex flex-col gap-4'>
            <div className='flex gap-14'>
                <div className='flex flex-col gap-2'>
                <p className='p-0 m-0 font-helvetica text-xs font-semibold'>University</p>
                <div className={` ${ uniError ? 'error-input' : 'info-input-field'}`}>
                    <input
                    type='text'
                    value={educations.university}
                    placeholder='Enter University name'
                    onChange={(e) => handleUniversityChange(e.target.value, index)}
                    />
                </div>
                </div>
              <div className='flex flex-col gap-2'>
              <p className='p-0 m-0 font-helvetica text-xs font-semibold'>College</p>
              <div className= 'info-input-field'>
                <input
                  type='text'
                  value={educations.college}
                  placeholder='Enter college name'
                  onChange={(e) => handleCollegeChange(e.target.value, index)}
                />
              </div>
              </div>
              <div className='flex flex-col gap-2'>
              <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Level</p>
              <div className= 'info-input-field'>
                <input
                  type='text'
                  value={educations.level}
                  placeholder='Enter Level...'
                  onChange={(e) => handleLevelChange(e.target.value, index)}
                />
              </div>
              </div>
              </div>
             
              <div className='flex flex-col gap-2'>
                <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Degree</p>
                <div className='info-input-field'>
                    <input
                    type='text'
                    value={educations.degree}
                    placeholder='Enter degree'
                    onChange={(e) => handleDegreeChange(e.target.value, index)}
                    />
                </div>
                </div>
             
            </div>
            {index > 0 && (
                
                <div className='mb-[1rem] ml-[-4.3rem] mt-[-0.4rem]'>
                <div className='flex gap-1 justify-center items-center bg-[red] w-[18px] h-[20px] rounded-[6px] cursor-pointer' onClick={() => removeEducation(index)}>
                    <img src={closeIcon} alt="closeIcon" className='h-[15px] m-0 p-0'/>
                
           
        </div>
        </div>
        )}
          </div>
          
          
          
        ))}
        
        <div className='flex gap-1 justify-center items-center bg-[blue] w-[130px] h-[32px] rounded-[6px] cursor-pointer' onClick={addEducation}>
        {/* <button onClick={addExperience}>Add Experience</button> */}
        <img src={addIcon} alt="addIcon" className='w-[20px] h-[20px] m-0 p-0'/>
        <p  className='m-0 p-0 font-helvetica font-bold text-white text-xs'>Add Education</p>

        </div>
        
      </div>
    </div>
  );
}

export default EducationForm;
