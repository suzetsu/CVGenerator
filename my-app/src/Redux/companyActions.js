import axios from "axios";
import * as actionTypes from "./actionTypes";
import { url } from "../Config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const createCompany =
  (formData) => async (dispatch) => {
    try {
    
      dispatch({ type: actionTypes.COMPANY_CREATE_FAILURE, payload: null });
      const response = await axios.post(
        `${url}/api/Company`,

        formData,
      );

      dispatch({ type: actionTypes.COMPANY_CREATE_SUCCESS });
      Swal.fire({
        title: "Company Created successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false, // Hide the "OK" button
      }).then(() => {
        // Reload the window after the timer expires
        window.location.reload();
      });
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
          ? error.response.data.message
            ? error.response.data.message
            : "Error Occurred"
          : "Error Occurred"
        : "Error Occurred";
      dispatch({
        type: actionTypes.COMPANY_CREATE_FAILURE,
        payload: errorMessage,
      });
     
      
    }
  };

export const fetchCompanyInfo = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${url}/api/Company/GetAll`
    );
    if (response.status === 200) {
      const companyData = response.data;
      // console.log(companyData);
      dispatch({
        type: actionTypes.FETCH_COMPANY_INFO_SUCCESS,
        payload: companyData,
      });
    } else {
      dispatch({ type: actionTypes.FETCH_COMPANY_INFO_FAILURE });
    }
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_COMPANY_INFO_FAILURE });
  }
};

export const updateCompanyInfo =
  (CompanyId, updatedcompany, history) => async (dispatch) => {
    try {
      dispatch({ type: actionTypes.COMPANY_UPDATE_FAILURE, payload: null});
      const response = await axios.post(
        `${url}/api/Company/Edit/${CompanyId}`,
        updatedcompany
      );
      if (response.status === 200) {
        dispatch({ type: actionTypes.COMPANY_UPDATE_SUCCESS });
        Swal.fire({
          title: "Company Updated successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false, // Hide the "OK" button
        })
        
        history('/viewCompany')
      } else {
        dispatch({ type: actionTypes.COMPANY_UPDATE_FAILURE });
      }
     
    } catch (error) {
      dispatch({ type: actionTypes.COMPANY_UPDATE_FAILURE });
    }
  };

export const deleteCompanyInfo = (CompanyId, deletedCompany) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${url}/api/Company/Delete/${CompanyId}`,
      deletedCompany 
    );
    if (response.status === 200) {
      dispatch({ type: actionTypes.COMPANY_DELETE_SUCCESS });
    } 
    Swal.fire({
      title: "Company Deleted successfully",
      icon: "success",
      timer: 2000,
      showConfirmButton: false, // Hide the "OK" button
    }). then(() => {
      // Reload the window after the timer expires
      window.location.reload();
    }); 
  } catch (error) {
    dispatch({ type: actionTypes.COMPANY_DELETE_FAILURE });
    // alert("Error occurred while deleting company information");
    Swal.fire({
      title: "Error occurred while deleting company information",
      icon: "error",
      // timer: 2000,
      showConfirmButton: true, // Hide the "OK" button
    })
   
  }
};

export const setCompany = (companyInf) =>  (dispatch) => {
   dispatch( {
    type: actionTypes.SET_COMPANY,
    payload: companyInf,
  });
};

