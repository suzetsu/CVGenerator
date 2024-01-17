import axios from 'axios';
import * as actionTypes from './actionTypes';
import { url } from '../Config';
import Swal from 'sweetalert2';

export const createRole = (email, password, fullName, roleName) => async (dispatch) => {
    try {
      dispatch({ type: actionTypes.USER_CREATE_FAILURE, payload : null });
      const response = await axios.post(
        `${url}/api/Users`,
        email, password, fullName, roleName,
        {
          headers: { 
            "Content-Type": "application/json",
          }
        }
      );
  
      if (response.status === 201) {
        dispatch({ type: actionTypes.USER_CREATE_SUCCESS });
        Swal.fire({
          title: "Role Created successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false, // Hide the "OK" button
        }).then(() => {
          // Reload the window after the timer expires
          window.location.reload();
        });
      
      } else {
        
        dispatch({ type: actionTypes.USER_CREATE_FAILURE });
        
      }
    } catch (error) {
      
      const errorMessage = error.response? error.response.data? error.response.data.message?error.response.data.message: 'Error Occurred': 'Error Occurred': 'Error Occurred';
      dispatch({ type: actionTypes.USER_CREATE_FAILURE, payload : errorMessage });
    }
  };
  
  export const fetchUserInfo = () => async (dispatch) => {
    try {
      const response = await axios.get(
        `${url}/api/Users/GetUsers`
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

  export const deleteRoleInfo = (id, deletedUser) => async (dispatch) => {
    try {
      const response = await axios.post(`${url}/api/Users/Delete/${id}`, 
      deletedUser,
       );
      if (response.status === 200) {
        dispatch({ type: actionTypes.ROLE_DELETE_SUCCESS });
      } 
      Swal.fire({
        title: "Role Deleted successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false, // Hide the "OK" button
      }).then(() => {
        // Reload the window after the timer expires
        window.location.reload();
      });
    } catch (error) {
      dispatch({ type: actionTypes.ROLE_DELETE_FAILURE });
     
      Swal.fire({
        title: "Error occurred while deleting role",
        icon: "error",
        timer: 2000,
        showConfirmButton: false, // Hide the "OK" button
      })
    }
  }

  export const updateRoleInfo = (id, updatedUser) => async (dispatch) => {
    try {
      const response = await axios.post(`${url}/api/Users/Update/${id}`,
      updatedUser,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      if (response.status === 200) {
        dispatch({ type: actionTypes.ROLE_UPDATE_SUCCESS });
      } 
      Swal.fire({
        title: "Role Updated successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false, // Hide the "OK" button
      }).then(() => {
        // Reload the window after the timer expires
        window.location.reload();
      });
    } catch (error) {
      dispatch({ type: actionTypes.ROLE_UPDATE_FAILURE });
    }
  }