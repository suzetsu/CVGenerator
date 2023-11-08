import React from 'react'

const EditImagePopup = ( {image, onClose}) => {
    
    console.log(image)
   
  return (
    <div className='popup-image-div'>
    <div className="image-popup-overlay">
          
          <img
            src={`data:image/jpg;base64,${image}`}
            alt="location"
            className="popup-image"

          />
          <span className="close-popup" onClick={onClose}>
          &times;
          </span>
        </div>
        
        </div>
  )
}
export default EditImagePopup;
