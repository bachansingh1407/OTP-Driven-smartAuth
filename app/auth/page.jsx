"use client";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BsArrowRight, BsShieldLock } from "react-icons/bs";
import { GiSpikedShield } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { AUTHSCHEMA } from "../utils/validate";
import { authAction } from "../slices/signupSlice";
import CustomCountryDropdown from "../components/customDropdown";
import UserVerifyModel from "../components/models/UserVerifyModel";
import { sendOtpAction } from "../slices/otpSlice";

export default function Auth() {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.auth.signup);
    const [verifyModel, setVerifyModel] = useState(false)

    const countryCodes = Array.isArray(data)
        ? data
            .map((c) => {
                if (!c.idd?.root || !c.idd?.suffixes?.length) return null;
                return {
                    key: `${c.cca2}-${c.idd.root}${c.idd.suffixes[0]}`,
                    code: `${c.idd.root}${c.idd.suffixes[0]}`,
                    country: c.name.common,
                };
            })
            .filter(Boolean)
        : [];

    useEffect(() => {
        dispatch(authAction());
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            countryCode: "+91",
            mobile: "",
        },
        validationSchema: AUTHSCHEMA,
        validateOnChange: true,
        onSubmit: async (values) => {
            const phone = `${values.countryCode}${values.mobile}`;
            try {
                await dispatch(sendOtpAction({ phone })).unwrap();
                setVerifyModel(true);
            } catch (err) {
                alert("❌ Failed to send OTP");
            }
        },
    });

    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        formik.setFieldValue("mobile", value.slice(0, 10));
    };

    const isPhoneValid =
        formik.values.mobile.length === 10 &&
        !formik.errors.mobile &&
        !loading;

    return (
        <div className="min-h-screen bg-teal-700 flex items-center justify-center px-4 font-poppins">
            <div className="w-full max-w-md rounded-xl bg-white shadow-sm">

                {/* Header */}
                <div className="px-10 pt-8 text-center">
                    <div className="flex justify-center mb-4 text-teal-600 text-5xl">
                        <GiSpikedShield />
                    </div>

                    <h1 className="text-xl font-semibold text-slate-700">
                        Secure Access Portal
                    </h1>
                    <p className="text-sm text-slate-500">
                        Verify your identity to continue
                    </p>
                </div>

                <div className="px-3 py-3 mx-10 my-4 border rounded-lg border-slate-200 bg-slate-50 text-xs text-slate-600 flex items-center gap-2">
                    <BsShieldLock className="text-teal-600 text-2xl" />
                    Access to protected resources requires identity verification
                </div>

                {/* Form */}
                <form onSubmit={formik.handleSubmit} className="px-10 pb-8">
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                        Mobile number
                    </label>

                    <div
                        className={`flex items-center gap-2 h-12 rounded-lg border-2 px-2 transition
              ${formik.touched.mobile && formik.errors.mobile
                                ? "border-red-400 bg-red-50/40"
                                : " border-teal-600 bg-white"
                            }`}
                    >
                        <CustomCountryDropdown
                            value={formik.values.countryCode}
                            options={countryCodes}
                            loading={loading}
                            onChange={(code) =>
                                formik.setFieldValue("countryCode", code)
                            }
                        />

                        <input
                            type="tel"
                            placeholder="Enter your mobile number"
                            value={formik.values.mobile}
                            onChange={handleMobileChange}
                            onBlur={formik.handleBlur}
                            className="flex-1 h-full bg-transparent text-sm outline-none text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    {formik.touched.mobile && formik.errors.mobile && (
                        <p className="mt-2 text-xs text-red-500">
                            {formik.errors.mobile}
                        </p>
                    )}

                    {/* Trust Copy */}
                    <div className="mt-5 text-xs text-slate-600 leading-relaxed">
                        We’ll send a one-time verification code to confirm your identity.
                        This step helps ensure that only authorized users can access
                        sensitive systems.
                    </div>

                    {/* CTA */}
                    <button
                        type="submit"
                        disabled={!isPhoneValid}
                        className={`mt-7 w-full flex items-center justify-center gap-2 rounded-lg
                                    py-3.5 text-sm font-medium text-white transition shadow-md
                                    ${isPhoneValid
                                ? "bg-teal-600 hover:bg-teal-700"
                                : "bg-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Continue securely
                        <BsArrowRight />
                    </button>

                </form>

                {/* Footer */}
                <div className="border-t-2 border-slate-200 px-10 py-6 text-center text-xs text-slate-500">
                    All access attempts are monitored and logged
                </div>
            </div>
            {verifyModel && (
                <UserVerifyModel
                    phone={`${formik.values.countryCode}${formik.values.mobile}`}
                    setVerifyModel={setVerifyModel}
                />
            )}
        </div>
    );
}
