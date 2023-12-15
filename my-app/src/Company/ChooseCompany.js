import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCompanyInfo } from '../Redux/companyActions';
import InfoBody from '../CustomerDetails/InfoComponents/FirstForm';

const ChooseCompany = () => {
    const inputRef = useRef(null);
    const [companyName, setCompany] = useState("");
    const [showCompanyOptions, setShowCompanyOptions] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const dispatch = useDispatch();
    const history = useNavigate();
    useEffect(() => {

        dispatch(fetchCompanyInfo());

    }, []);
    const companyDetails = useSelector((state) => state.company.companyData);
    console.log(companyDetails)
    const companyInfo = companyDetails?.$values;
    const companyNames = Array.isArray(companyInfo)
        ? companyInfo.map((company) => company.name)
        : [];
    const handleDocumentClick = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setShowCompanyOptions(false);
            // setShowDepartmentOptions(false);
        }
    }
    const handleCompanyClick = (option) => {
        // Handle the selection of companies from the dropdown
        setCompany(option);
        setSelectedCompany(option);
        setShowCompanyOptions(false);
    };
    const handleCompanyInputChange = (e) => {

        const companyValue = e.target.value;
        setCompany(companyValue);

        setSelectedOption("");
    };
    const filteredCompanyNames = companyNames.filter((company) => {
        return company.toLowerCase().includes(companyName.toLowerCase());
    });
    const handleCompanyFocus = (e) => {
        setShowCompanyOptions(!showCompanyOptions);
    };

    React.useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);
    const handleButtonClick = () => { 
        if (companyName) {
            // Find the selected company's information
            const selectedCompanyInfo = companyInfo.find(
              (company) => company.name === companyName
            );
        
            // Check if the selected company information exists
            if (selectedCompanyInfo) {
              history('/firstForm', { state: { companyInfo: selectedCompanyInfo } });
            }
          }
    }
    return (
        <div className='bg-[#F0F4F3] h-[100vh]'>
            <div className='pt-40 flex justify-center'>
                <div className='shadow-paper h-[100%] p-4 rounded-lg flex flex-col gap-4'>
                    <span className='p-0 m-0 font-helvetica text-lg font-bold text-lime-500'>Select the Company for Employee Addition</span>

                    <div className="flex flex-col gap-1 pt-2">
                        <p className="p-0 m-0 font-helvetica text-xs font-semibold">
                            Company Name
                        </p>
                        <div
                            className="info-input-field"
                        >
                            <input
                                type="text"
                                value={companyName}
                                placeholder="Company Name"
                                onChange={handleCompanyInputChange}
                                onFocus={handleCompanyFocus}
                                ref={inputRef}
                            />
                            {showCompanyOptions && (
                                <div className="absolute">
                                    <div className="autocomplete-options">
                                        {filteredCompanyNames.map((option) => (
                                            <div
                                                key={option}
                                                className="option"
                                                onClick={() => handleCompanyClick(option)}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="flex pb-4">
                        <div
                            type="submit"
                            className="bg-blue-700 hover:bg-[#8FD448] text-white font-semibold py-1 px-2 rounded-2xl cursor-pointer hover:scale-110 transition-transform duration-2000"
                        onClick={handleButtonClick}
                        >
                            Select
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ChooseCompany
