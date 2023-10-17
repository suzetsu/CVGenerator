import * as actionTypes from './actionTypes'
import axios from 'axios' 

export const GetAllDepartments = () => async (dispatch) => {
    try {
        const response = await axios.get(
            "http://192.168.0.102:7270/api/MasterDepartments/GetAll"
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
            "http://192.168.0.102:7270/api/MasterDepartments/District/GetAll"
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