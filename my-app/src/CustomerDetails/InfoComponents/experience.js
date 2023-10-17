import React, { useState } from 'react';
import addIcon from '../../images/addIcon.png'
import closeIcon from '../../images/closeIcon.png'

function ExperienceForm() {
  const [experiences, setExperiences] = useState([
    {
      organizationName: '',
      duration: '',
      title: '',
    },
  ]);

  const [organizationName, setOrganization] = useState('');
  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState('');


  const addExperience = () => {
    setExperiences([...experiences, { organizationName: '', duration: '', title: '' }]);
  };
  const removeExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  const handleOrganizationNameChange = (value, index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index].organizationName = value;
    setExperiences(updatedExperiences);
  };

  const handleDurationChange = (value, index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index].duration = value;
    setExperiences(updatedExperiences);
  };

  const handleTitleChange = (value, index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index].title = value;
    setExperiences(updatedExperiences);
  };

  return (
    <div>
      <p className="m-0 pb-4 font-roboto font-bold" style={{ color: "#1670B2", fontSize: "16px" }}>
        Professional Experiences
      </p>
      <div className='pl-2 pb-4 flex flex-col gap-2' >
        {experiences.map((experience, index) => (
          <div key={index} className='flex gap-14 p-2' style={{border: '1px solid black', outline: 'none'}}>
            <div className='flex flex-col gap-4'>
            <div className='flex gap-20'>
            <div className='flex flex-col gap-2'>
              <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Organization Name</p>
              <div className='info-input-field'>
                <input
                  type='text'
                  value={organizationName}
                  placeholder='Enter Organization name'
                  onChange={(e) => setOrganization(e.target.value)}
                />
              </div>
              </div>
              <div className='flex flex-col gap-2'>
              <p className='p-0 m-0 font-helvetica text-xs font-semibold'>Work Duration</p>
              <div className= 'info-input-field'>
                <input
                  type='text'
                  value={duration}
                  placeholder='Enter work duration'
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              </div>
              </div>
             
              <div className='info-input-field-project-desc'>
                <textarea
                  type='text'
                  value={title}
                  placeholder='Enter your work details...'
                  onChange={(e) => setTitle(e.target.value)}
                  rows={3}
                  cols={40}
                ></textarea>
              </div>
             
            </div>
            {index > 0 && (
                <div className='pl-[10.5rem] pb-4'>
        <div className='flex gap-1 justify-center items-center bg-[red] w-[20px] h-[20px] rounded-[6px] cursor-pointer' onClick={() => removeExperience(index)}>
            <img src={closeIcon} alt="closeIcon" className='h-[15px] m-0 p-0'/>
           
        </div>
        </div>
        )}
          </div>
          
          
          
        ))}
        
        <div className='flex gap-1 justify-center items-center bg-[blue] w-[130px] h-[32px] rounded-[6px] cursor-pointer' onClick={addExperience}>
        {/* <button onClick={addExperience}>Add Experience</button> */}
        <img src={addIcon} alt="addIcon" className='w-[20px] h-[20px] m-0 p-0'/>
        <p  className='m-0 p-0 font-helvetica font-bold text-white text-xs'>Add Experience</p>

        </div>
        
      </div>
    </div>
  );
}

export default ExperienceForm;
