import axios from 'axios';
import * as actionTypes from './actionTypes';

export const createCompany = (PAN, name, email, address) => async (dispatch) => {
    try {
        const response = await axios.post(
            "http://192.168.0.104:7270/api/Company",
                PAN,
                name,
                address,
                email
           
        );
        if (response.status === 201) {
            dispatch({ type: actionTypes.COMPANY_CREATE_SUCCESS });
        }
        else {
            dispatch({ type: actionTypes.COMPANY_CREATE_FAILURE });
        }
    } catch (error) {
        dispatch({ type: actionTypes.COMPANY_CREATE_FAILURE });
        console.log(error);
    }
}

export const fetchCompanyInfo = () => async (dispatch) => {
    try {
        const response = await axios.get(
            "http://192.168.0.104:7270/api/Company/GetAll"
        );
        if (response.status === 200) {
            const companyData = response.data;
            // console.log(companyData);
            dispatch({ type: actionTypes.FETCH_COMPANY_INFO_SUCCESS, payload: companyData });
        } else {
            dispatch({ type: actionTypes.FETCH_COMPANY_INFO_FAILURE });
        }
    } catch (error) {
        dispatch({ type: actionTypes.FETCH_COMPANY_INFO_FAILURE });
    }
}

export const updateCompanyInfo = (CompanyId, updatedcompany) => async (dispatch) => {
    try {
        const response = await axios.put(`http://192.168.0.104:7270/api/Company/${CompanyId}`,
        updatedcompany,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        if (response.status === 200) {
            dispatch({ type: actionTypes.COMPANY_UPDATE_SUCCESS });
        } else {
            dispatch({ type: actionTypes.COMPANY_UPDATE_FAILURE });
        }
    } catch (error) {
        dispatch({ type: actionTypes.COMPANY_UPDATE_FAILURE });
    }
}

export const deleteCompanyInfo = (CompanyId) => async (dispatch) => {
    try {
        const response = await axios.delete(`http://192.168.0.104:7270/api/Company/${CompanyId}`);
        if (response.status === 200) {
            dispatch({ type: actionTypes.COMPANY_DELETE_SUCCESS });
        } else {
            dispatch({ type: actionTypes.COMPANY_DELETE_FAILURE });
        }
    } catch (error) {
        dispatch({ type: actionTypes.COMPANY_DELETE_FAILURE });
        console.error(error);
    }
}