"use client";

import { useSnackbar } from "notistack";
import { verifyOtpAction } from "../../slices/otpSlice";
import { useEffect, useRef, useState } from "react";
import { BsShieldCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

export default function UserVerifyModel({ phone, setVerifyModel }) {

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);

  const dispatch = useDispatch();
  const { verifyOtp } = useSelector((state) => state.otp);
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");
  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    try {
      await dispatch(
        verifyOtpAction({ phone, otp: enteredOtp })
      ).unwrap();

      enqueueSnackbar("Verification successful!", {
        variant: "success",
      });
      setVerifyModel(false);
    } catch (err) {
      enqueueSnackbar("Invalid OTP. Please try again.", {
        variant: "error",
      });
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white border border-slate-200 shadow-[0_30px_80px_rgba(0,0,0,0.25)] rounded-2xl max-w-md w-full p-8 relative">

        {/* Close */}
        <button
          onClick={() => setVerifyModel(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3 text-teal-600 text-4xl">
            <BsShieldCheck />
          </div>

          <h2 className="text-lg font-semibold text-slate-900">
            Verify your identity
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter the 6-digit code sent to your mobile number
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg font-semibold rounded-lg text-slate-700 border-2 border-slate-400 outline-none"
            />
          ))}
        </div>

        {/* Info */}
        <div className="text-xs text-slate-600 text-center mb-6 leading-relaxed">
          This verification step helps protect sensitive systems.
          <br />
          Do not share your code with anyone.
        </div>

        {/* CTA */}
        <button
          disabled={!isOtpComplete || verifyOtp.loading}
          onClick={handleVerify}
          className={`w-full rounded-lg py-3.5 text-sm font-medium text-white transition cursor-pointer
            ${isOtpComplete
              ? "bg-teal-600 hover:bg-teal-700 shadow-md"
              : "bg-slate-400 cursor-not-allowed"
            }`}
        >
          Verify & Continue
        </button>

        {/* Footer */}
        <div className="mt-5 text-center text-xs text-slate-500">
          Didn’t receive the code? <span className="text-teal-600 font-medium cursor-pointer">Resend</span>
        </div>
      </div>
    </div>
  );
}
