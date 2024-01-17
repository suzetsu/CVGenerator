import { combineReducers } from 'redux';
import authReducer from './reducers';
import companyReducer from './secondReducer'
import selectedCompanyReducer from './thirdReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  selectedCompany: selectedCompanyReducer,
  // Add other reducers here if nseeded
});

export default rootReducer;
