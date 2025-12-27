import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* =======================
   SEND OTP
======================= */
export const sendOtpAction = createAsyncThunk(
  "otp/send",
  async ({ phone }, thunkAPI) => {
    try {
      const res = await axios.post("/api/sendOtp", { phone });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

/* =======================
   VERIFY OTP
======================= */
export const verifyOtpAction = createAsyncThunk(
  "otp/verify",
  async ({ phone, otp }, thunkAPI) => {
    try {
      const res = await axios.post("/api/verifyOtp", { phone, otp });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    sendOtp: {
      loading: false,
      success: false,
      error: null,
    },
    verifyOtp: {
      loading: false,
      success: false,
      error: null,
    },
  },
  reducers: {
    resetOtpState: (state) => {
      state.sendOtp = { loading: false, success: false, error: null };
      state.verifyOtp = { loading: false, success: false, error: null };
    },
  },
  extraReducers: (builder) => {
    builder
      /* SEND OTP */
      .addCase(sendOtpAction.pending, (state) => {
        state.sendOtp.loading = true;
      })
      .addCase(sendOtpAction.fulfilled, (state) => {
        state.sendOtp.loading = false;
        state.sendOtp.success = true;
      })
      .addCase(sendOtpAction.rejected, (state, action) => {
        state.sendOtp.loading = false;
        state.sendOtp.error = action.payload;
      })

      /* VERIFY OTP */
      .addCase(verifyOtpAction.pending, (state) => {
        state.verifyOtp.loading = true;
      })
      .addCase(verifyOtpAction.fulfilled, (state) => {
        state.verifyOtp.loading = false;
        state.verifyOtp.success = true;
      })
      .addCase(verifyOtpAction.rejected, (state, action) => {
        state.verifyOtp.loading = false;
        state.verifyOtp.error = action.payload;
      });
  },
});

export const { resetOtpState } = otpSlice.actions;
export default otpSlice.reducer;
