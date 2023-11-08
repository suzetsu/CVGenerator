import axios from "axios";
import * as actionTypes from "./actionTypes";

export const createCompany =
  (PAN, name, email, address, departments) => async (dispatch) => {
    try {
      console.log("HERE");
      dispatch({ type: actionTypes.COMPANY_CREATE_FAILURE, payload: null });
      const response = await axios.post(
        "http://192.168.0.104:7270/api/Company",

        PAN,
        name,
        email,
        address,
        departments
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
      "http://192.168.0.104:7270/api/Company/GetAll"
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
      const response = await axios.put(
        `http://192.168.0.104:7270/api/Company/${CompanyId}`,
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
    const response = await axios.delete(
      `http://192.168.0.104:7270/api/Company/${CompanyId}`
    );
    if (response.status === 200) {
      dispatch({ type: actionTypes.COMPANY_DELETE_SUCCESS });
    } else {
      dispatch({ type: actionTypes.COMPANY_DELETE_FAILURE });
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
