import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const authAction = createAsyncThunk(
    'auth/authAction', async(data, thunkAPI) => {
        try{
            const res = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2,flags,idd');
            return res.data;

        } catch(error){
           return thunkAPI.rejectWithValue(error.redponse?.data || "Internal server error")
        }
    }
)


const signupSlice = createSlice({
    name:"auth",
    initialState:{
        signup:{ loading: false, data: null, error:null},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(authAction.pending, (state) => {
            state.signup.loading = true;
            state.signup.error = null;
        })
        .addCase(authAction.fulfilled, (state, action) => {
            state.signup.loading = false;
            state.signup.data = action.payload;
        })
        .addCase(authAction.rejected, (state, action) => {
            state.signup.loading = false;
            state.signup.error = action.payload;
        })
    }
})
export default signupSlice.reducer;