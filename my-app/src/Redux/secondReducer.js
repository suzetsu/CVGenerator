import * as actionTypes from './actionTypes';

const initialState = {
    companyCreationStatus: null,
    companyData: '',
    companyUpdateStatus : null,
    companyDeleteStatus : null,
}

const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMPANY_CREATE_SUCCESS:
            return { ...state, companyCreationStatus: 'success' };
        case actionTypes.COMPANY_CREATE_FAILURE:
            return { ...state, companyCreationStatus: 'failure' };
        case actionTypes.FETCH_COMPANY_INFO_SUCCESS:
            return { ...state, companyData: action.payload };
        case actionTypes.FETCH_COMPANY_INFO_FAILURE:
            return { ...state, companyData: 'error' };
        case actionTypes.COMPANY_UPDATE_SUCCESS:
            return { ...state, companyUpdateStatus: 'success' };
        case actionTypes.COMPANY_UPDATE_FAILURE:
            return { ...state, companyUpdateStatus: 'failure' };
        case actionTypes.COMPANY_DELETE_SUCCESS:
            return { ...state, companyDeleteStatus: 'success' };
        case actionTypes.COMPANY_DELETE_FAILURE:
            return { ...state, companyDeleteStatus: 'failure' };
        default:
            return state;
    }
}

export default companyReducer