import * as actionTypes from './actionTypes';

const initialState = {
  token: null,
  userCreationStatus: null,
  clientData: '',
  clientCreationStatus: null,
  clientDeleteStatus: null,
  clientUpdateStatus: null,
  errorMail:null,
  role : null,

  // matchingClient: null,
  // role: "",
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, token: action.payload };
    case actionTypes.LOGIN_FAILURE:
      return { ...state, token: null };
    case actionTypes.USER_CREATE_SUCCESS:
      return { ...state, userCreationStatus: 'success' };
    case actionTypes.USER_CREATE_FAILURE:
      return { ...state, userCreationStatus: 'failure' };


    case actionTypes.SET_USER_ROLE:
      return {...state, role: action.payload };
    case actionTypes.CLIENT_INFO_SUCCESS:
      return { ...state, clientCreationStatus: 'success' };
    case actionTypes.CLIENT_INFO_FAILURE:
      return { ...state, clientCreationStatus: "failure" };
    case actionTypes.CLIENT_INFO_EMAIL_ERROR:
      return { ...state, errorMail: action.payload };
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
