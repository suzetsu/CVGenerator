import { combineReducers } from 'redux';
import authReducer from './reducers';
import companyReducer from './secondReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  // Add other reducers here if needed
});

export default rootReducer;
