import * as actionTypes from './actionTypes';

const initialState = {
  token: null,
  userCreationStatus: null,
  userData: '',
  roleUpdateStatus: null,
  roleDeleteStatus: null,

  clientData: '',
  clientCreationStatus: null,
  clientDeleteStatus: null,
  clientUpdateStatus: null,

  errorMail:null,
  role : null,
  
  roleEmailError: null,

  // matchingClient: null,
  editEmployee: null,
  
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {

    //Login action
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, token: action.payload, role: action.payload };

    case actionTypes.LOGIN_FAILURE:
      return { ...state, token: null, role : null };

      case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        role: null,
      };

      //Role Creation
    case actionTypes.USER_CREATE_SUCCESS:
      return { ...state, userCreationStatus: 'success' };
    case actionTypes.USER_CREATE_FAILURE:
      return { ...state, userCreationStatus: 'failure', roleEmailError: action.payload };
    case actionTypes.FETCH_USER_INFO_SUCCESS:
      return { ...state, userData: action.payload };
    case actionTypes.FETCH_USER_INFO_FAILURE:
      return { ...state, userData: 'error' };
      case actionTypes.ROLE_UPDATE_SUCCESS:
      return { ...state, roleUpdateStatus:'success'};
    case actionTypes.ROLE_UPDATE_FAILURE:
      return { ...state, roleUpdateStatus:'failure'};
    case actionTypes.ROLE_DELETE_SUCCESS:
      return { ...state, roleDeleteStatus:'success'};
    case actionTypes.ROLE_DELETE_FAILURE:
      return { ...state, roleDeleteStatus:'failure'};


    case actionTypes.SET_USER_ROLE:
      return {...state, role: action.payload };

      //store employee
    case actionTypes.GET_ALL_EMPLOYEE:
      return { ...state, editEmployee: action.payload };

    //Employe creation
    case actionTypes.CLIENT_INFO_SUCCESS:
      return { ...state, clientCreationStatus: 'success' };
    case actionTypes.CLIENT_INFO_FAILURE:
      return { ...state, clientCreationStatus: "failure", errorMail: action.payload };
    // case actionTypes.CLIENT_INFO_EMAIL_ERROR:
    //   return { ...state, errorMail: action.payload };
    // case actionTypes.USER_INFO_EMAIL_ERROR:
    //   return { ...state, errorUsermail: action.payload };
    case actionTypes.FETCH_CLIENT_INFO_SUCCESS:
      return { ...state, clientData: action.payload };
      
    case actionTypes.FETCH_CLIENT_INFO_FAILURE:
      return { ...state, clientData: 'error'};

    case actionTypes.CLIENT_INFO_DELETE_SUCCESS:
      return { ...state, clientDeleteStatus:'success'};
    case actionTypes.CLIENT_INFO_DELETE_FAILURE:
      return { ...state, clientDeleteStatus:'failure'}
    case actionTypes.CLIENT_INFO_UPDATE_SUCCESS:
      return { ...state, clientUpdateStatus:'success'};
    case actionTypes.CLIENT_INFO_UPDATE_FAILURE:
      return { ...state, clientUpdateStatus:'failure'};

    
      
    default:
      return state;
  }
};


export default authReducer;


