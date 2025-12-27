
const { configureStore } = require("@reduxjs/toolkit");
import signupSlice from './slices/signupSlice'
import otpSlice from './slices/otpSlice'


export const store = configureStore({
    reducer:{
        auth: signupSlice,
        otp: otpSlice
    }
})