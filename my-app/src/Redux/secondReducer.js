import * as actionTypes from './actionTypes';

const initialState = {
    companyCreationStatus: '',
    companyData: '',
    companyUpdateStatus : null,
    companyDeleteStatus : null,
    departmentData: '',
    districtData: '',
    designationData: '',
    companyError: null,
    
}

const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMPANY_CREATE_SUCCESS:
            return { ...state, companyCreationStatus: 'success' };
        case actionTypes.COMPANY_CREATE_FAILURE:
            return { ...state, companyCreationStatus: 'failure', companyError: action.payload };
        case actionTypes.FETCH_COMPANY_INFO_SUCCESS:
            return { ...state, companyData: action.payload };
        case actionTypes.FETCH_COMPANY_INFO_FAILURE:
            return { ...state, companyData: null };
        case actionTypes.COMPANY_UPDATE_SUCCESS:
            return { ...state, companyUpdateStatus: 'success' };
        case actionTypes.COMPANY_UPDATE_FAILURE:
            return { ...state, companyUpdateStatus: 'failure' };
        case actionTypes.COMPANY_DELETE_SUCCESS:
            return { ...state, companyDeleteStatus: 'success' };
        case actionTypes.COMPANY_DELETE_FAILURE:
            return { ...state, companyDeleteStatus: 'failure' };
        case actionTypes.GET_ALL_DEPARTMENTS_SUCCESS:
            return { ...state, departmentData: action.payload };
        case actionTypes.GET_ALL_DEPARTMENTS_FAILURE:
            return { ...state, departmentData: null };
        case actionTypes.GET_ALL_DISTRICT_SUCCESS:
            return { ...state, districtData: action.payload };
        case actionTypes.GET_ALL_DISTRICT_FAILURE:
            return { ...state, districtData: null };
        case actionTypes.GET_ALL_DESIGNATION_SUCCESS:
            return { ...state, designationData: action.payload };
        case actionTypes.GET_ALL_DESIGNATION_FAILURE:
            return { ...state, designationData: null };
        default:
            return state;
    }
}

export default companyReducer