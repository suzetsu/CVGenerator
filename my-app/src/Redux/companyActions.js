import axios from "axios";
import * as actionTypes from "./actionTypes";
import { url } from "../Config";

export const createCompany =
  (formData) => async (dispatch) => {
    try {
      console.log("HERE");
      dispatch({ type: actionTypes.COMPANY_CREATE_FAILURE, payload: null });
      const response = await axios.post(
        `${url}/api/Company`,

        formData,
      );

      dispatch({ type: actionTypes.COMPANY_CREATE_SUCCESS });
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
  (CompanyId, updatedcompany) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${url}/api/Company/Edit/${CompanyId}`,
        updatedcompany
      );
      if (response.status === 200) {
        dispatch({ type: actionTypes.COMPANY_UPDATE_SUCCESS });
      } else {
        dispatch({ type: actionTypes.COMPANY_UPDATE_FAILURE });
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      alert("Company information updated successfully");
    } catch (error) {
      dispatch({ type: actionTypes.COMPANY_UPDATE_FAILURE });
    }
  };

export const deleteCompanyInfo = (CompanyId) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${url}/api/Company/Delete/${CompanyId}`
    );
    if (response.status === 200) {
      dispatch({ type: actionTypes.COMPANY_DELETE_SUCCESS });
    } 
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    alert("Company information deleted successfully");
  } catch (error) {
    dispatch({ type: actionTypes.COMPANY_DELETE_FAILURE });
    console.error(error);
  }
};
