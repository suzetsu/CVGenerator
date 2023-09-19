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
  try {
    const response = await axios.post(
      "https://192.168.1.72:7270/api/Authentication/Login",
      { email, password }
    );

    const token = response.data.token;
    console.log(token);
    // const secretKey = "ABCDEFGHHIabchdgeubchaolha8fkf123447684b";
    // const decodedToken = jwtDecode(token, secretKey);
    // const userRole = response.data.role
    // console.log(decodedToken);
   
    if (token) {
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: token });
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

export const createUser = (email, password, fullName, mobile) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://192.168.1.72:7270/api/Users",
      email, password, fullName, mobile
    );

    if (response.status === 201) {
      dispatch({ type: actionTypes.USER_CREATE_SUCCESS });
    
    } else {
      dispatch({ type: actionTypes.USER_CREATE_FAILURE });
    }
  } catch (error) {
    dispatch({ type: actionTypes.USER_CREATE_FAILURE });
  }
};

export const storeClientInfo = ( clientName, 
  email, 
  phone, 
  clientPANNO,
  municipality,
  municipalityNumber,
  district,
  province,
  role, 
  university, 
  college, 
  level, 
  degree,
  skills,
  description,
  firstProject,
  secondProject,
  firstProjectDescription,
  secondProjectDescription) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://192.168.1.72:7270/api/Client",
      {clientName, 
      email, 
      phone, 
      clientPANNO,
      municipality,
      municipalityNumber,
      district,
      province,
      role, 
      university, 
      college, 
      level, 
      degree,
      skills,
      description,
      firstProject,
      secondProject,
      firstProjectDescription,
      secondProjectDescription},
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
      // console.log(Errmessage);
    }
    dispatch({ type: actionTypes.CLIENT_INFO_FAILURE });
  
  }
}

export const fetchClientInfo = () => async (dispatch) => {
  try {
    const response = await axios.get("https://192.168.1.72:7270/api/Client/GetAllClients");

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

export const deleteClientInfo = (clientIdToDelete) => async (dispatch) => {
  try {
    const response = await axios.delete(`https://192.168.1.72:7270/api/Client/${clientIdToDelete}`);
    if (response.status === 200) {
      dispatch({ type: actionTypes.CLIENT_INFO_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: actionTypes.CLIENT_INFO_FAILURE });
  }
}

export const updateClientInfo = (clientToUpdate, clientName, phone, email) => async (dispatch) => {
  try {
    const response = await axios.put(`https://192.168.1.72:7270/api/Client/${clientToUpdate}`, {clientName, phone, email});
    if (response.status === 200) {
      dispatch({ type: actionTypes.CLIENT_INFO_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: actionTypes.CLIENT_INFO_FAILURE });
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