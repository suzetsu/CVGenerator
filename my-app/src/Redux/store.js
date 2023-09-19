
// import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // Middleware for handling async actions
import rootReducer from './rootReducer';

// const middleware = [thunk];
// const middleware = [...getDefaultMiddleware(), thunk]; // Use getDefaultMiddleware to include default middleware

// const store = configureStore(rootReducer, applyMiddleware(...Middleware));
const store = configureStore({
    reducer: rootReducer, // Pass your rootReducer here
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk],
  });

export default store;
