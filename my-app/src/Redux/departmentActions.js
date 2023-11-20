import * as actionTypes from './actionTypes'
import axios from 'axios' 
import {url} from '../Config'

export const GetAllDepartments = () => async (dispatch) => {
    try {
        const response = await axios.get(
            `${url}/api/MasterDepartments/GetAll`
        );
        if (response.status === 200) {
            const departmentData = response.data;
            
            
            dispatch({
                type: actionTypes.GET_ALL_DEPARTMENTS_SUCCESS,
                payload: departmentData,
            });
        } else {
            dispatch({ type: actionTypes.GET_ALL_DEPARTMENTS_FAILURE });
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_ALL_DEPARTMENTS_FAILURE });
    }
}

export const GetAllDistricts = () => async (dispatch) => {
    try {
        const response = await axios.get(
            `${url}/api/MasterDepartments/District/GetAll`
        );
        if (response.status === 200) {
            const districtData = response.data;
            
            
            dispatch({
                type: actionTypes.GET_ALL_DISTRICT_SUCCESS,
                payload: districtData,
            });
        } else {
            dispatch({ type: actionTypes.GET_ALL_DISTRICT_FAILURE });
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_ALL_DISTRICT_FAILURE });
    }
}
export const GetAllDesignation = () => async (dispatch) => {
    try {
        const response = await axios.get(
            `${url}/api/MasterDepartments/Designation/GetAll`
        );
        if (response.status === 200) {
            const districtData = response.data;
            
            
            dispatch({
                type: actionTypes.GET_ALL_DESIGNATION_SUCCESS,
                payload: districtData,
            });
        } else {
            dispatch({ type: actionTypes.GET_ALL_DESIGNATION_FAILURE });
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_ALL_DESIGNATION_FAILURE });
    }
}

