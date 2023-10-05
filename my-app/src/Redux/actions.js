import axios from 'axios';
import * as actionTypes from './actionTypes';
// import jwtDecode from 'jwt-decode';

// export const setUserRole = (role) => {
//   return {
//     type: actionTypes.SET_USER_ROLE,
//     payload: role,
//   };
// };



export const login = (email, password) => async (dispatch) => {
  // const authToken = "UmbrellaSolutions"
  // const headers = {
  //   'Authorization': `Bearer ${authToken}`
  // };
  try {
    const response = await axios.post(
      "http://192.168.0.104:7270/api/Authentication/Login",
      { email, password },
      // {
        
      //   headers: { 'Authorization': 'Bearer UmbrellaSolutions'},
      // }
    );

    const token = response.data.token;
    // console.log(token);
    const role = response.data.roleName
    console.log(role);
   
    if (token) {
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: token });
      dispatch({type:actionTypes.SET_USER_ROLE, payload:role})
      // dispatch(setUserRole(userRole));
      return { success: true };
    } else {
      dispatch({ type: actionTypes.LOGIN_FAILURE });
      return { success: false };
    }

  } catch (error) {
    dispatch({ type: actionTypes.LOGIN_FAILURE });
    return { success: false };
  }
};



export const storeClientInfo = (clientName,
  clientPANNO,
  companyName,
  departmentName,
  designation,
  municipality,
  municipalityNumber,
  province,
  district,
  email,
  phone,
  university,
  college,
  level,
  degree,
  description,
  firstOrganizationName,
  firstDuration,
  firstTitle,
  secondOrganizationName,
  secondDuration,
  secondTitle,
  skills) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://192.168.0.104:7270/api/Client",
      
        clientName,
        clientPANNO,
        companyName,
        departmentName,
        designation,
        municipality,
        municipalityNumber,
        province,
        district,
        email,
        phone,
        university,
        college,
        level,
        degree,
        description,
        firstOrganizationName,
        firstDuration,
        firstTitle,
        secondOrganizationName,
        secondDuration,
        secondTitle,
        skills,
      {
        headers: { 
          "Content-Type": "application/json",
        }
      }
      
      
    );
    if (response.status === 201) {
      dispatch({ type: actionTypes.CLIENT_INFO_SUCCESS });
    } else{
      dispatch({ type: actionTypes.CLIENT_INFO_FAILURE });

    }
  } catch (error) {
   if (error.response.data.message)
    { 
      const Errmessage = error.response.data.message
      dispatch({ type: actionTypes.CLIENT_INFO_EMAIL_ERROR, payload: Errmessage });
      console.log(Errmessage);
    }
    dispatch({ type: actionTypes.CLIENT_INFO_FAILURE });
    // console.log(error);
  
  }
}

export const fetchClientInfo = () => async (dispatch) => {
  try {
    const response = await axios.get("http://192.168.0.104:7270/api/Client/GetAllClients");

    if (response.status === 200) {
      // Assuming the response data contains the client information
      const clientData = response.data;
      // console.log(clientData);
      dispatch({
        type: actionTypes.FETCH_CLIENT_INFO_SUCCESS,
        payload: clientData,
      });
    } else {
      dispatch({ type: actionTypes.FETCH_CLIENT_INFO_FAILURE });
    }
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_CLIENT_INFO_FAILURE });
  }
  
};

export const deleteClientInfo = (clientInformationID) => async (dispatch) => {
  try {
    const response = await axios.delete(`http://192.168.0.104:7270/api/Client/${clientInformationID}`);
    if (response.status === 200) {
      dispatch({ type: actionTypes.CLIENT_INFO_DELETE_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: actionTypes.CLIENT_INFO_DELETE_FAILURE });
  }
}

export const updateClientInfo = (clientInformationID, updatedClient) => async (dispatch) => {
  try {
    const response = await axios.put(`http://192.168.0.104:7270/api/Client/${clientInformationID}`,
    updatedClient,
    {
      headers: { 
        "Content-Type": "application/json",
      }
    }
    );
    if (response.status === 200) {
      dispatch({ type: actionTypes.CLIENT_INFO_UPDATE_SUCCESS });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: actionTypes.CLIENT_INFO_UPDATE_FAILURE });
  }
}

// export const getUserRole = () => async (dispatch) => {
//   try {
//     const response = await axios.get(
//       "https://192.168.1.72:7270/api/UserRole/Login"
//     );
//     const userRole = response.data.role;
//     console.log(userRole);
//     dispatch(setUserRole(userRole));
//   } catch (error) {
//     console.log(error);
//   }
// }