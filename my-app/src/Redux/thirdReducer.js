import { createSlice } from '@reduxjs/toolkit';
import * as actionTypes from './actionTypes';

const initialState = {
    chosenCompany: null,
}
const selectdCompanyReducer = createSlice({
    initialState: initialState,
    name:"selectedCompany", 
    reducers:{
        insertCompanyDetails:(state, action)=>{
            localStorage.setItem("selectedCompany",JSON.stringify(action.payload))
            console.log(action.payload);
            state.chosenCompany = action.payload
        }
    }
})
export const {insertCompanyDetails } = selectdCompanyReducer.actions 
export default selectdCompanyReducer.reducer