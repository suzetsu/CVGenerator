import axios from 'axios';
import * as actionTypes from './actionTypes';

export const createRole = (email, password, fullName, roleName) => async (dispatch) => {
    try {
      const response = await axios.post(
        "http://192.168.0.104:7270/api/Users",
        email, password, fullName, roleName,
        {
          headers: { 
            "Content-Type": "application/json",
          }
        }
      );
  
      if (response.status === 201) {
        dispatch({ type: actionTypes.USER_CREATE_SUCCESS });
      
      } else {
        
        dispatch({ type: actionTypes.USER_CREATE_FAILURE });
      }
    } catch (error) {
      
        if (error.response.data.message){
          console.log(error.response.data.message)
          dispatch({ type: actionTypes.USER_INFO_EMAIL_ERROR, payload: error.response.data.message });
        }
        else {
      dispatch({ type: actionTypes.USER_CREATE_FAILURE });
        }
    }
  };
  
  export const fetchUserInfo = () => async (dispatch) => {
    try {
      const response = await axios.get(
        "http://192.168.0.104:7270/api/Users/GetUsers"
      );
      if (response.status === 200) {
        const userData = response.data;
        dispatch({ type: actionTypes.FETCH_USER_INFO_SUCCESS, payload: userData });
      } else {
        dispatch({ type: actionTypes.FETCH_USER_INFO_FAILURE });
      }
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_USER_INFO_FAILURE });
    }
  }

  export const deleteRoleInfo = (id) => async (dispatch) => {
    try {
      const response = await axios.delete(`http://192.168.0.104:7270/api/Users/${id}`);
      if (response.status === 200) {
        dispatch({ type: actionTypes.ROLE_DELETE_SUCCESS });
      } else {
        dispatch({ type: actionTypes.ROLE_DELETE_FAILURE });
      }
    } catch (error) {
      dispatch({ type: actionTypes.ROLE_DELETE_FAILURE });
    }
  }

  export const updateRoleInfo = (id, updatedUser) => async (dispatch) => {
    try {
      const response = await axios.put(`http://192.168.0.104:7270/api/Users/${id}`,
      updatedUser,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      if (response.status === 200) {
        dispatch({ type: actionTypes.ROLE_UPDATE_SUCCESS });
      } else {
        dispatch({ type: actionTypes.ROLE_UPDATE_FAILURE });
      }
    } catch (error) {
      dispatch({ type: actionTypes.ROLE_UPDATE_FAILURE });
    }
  }