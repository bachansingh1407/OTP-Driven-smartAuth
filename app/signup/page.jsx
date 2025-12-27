"use client"
import { useRef, useState } from "react";
import { BsArrowRight, BsCheckCircle, BsKey, BsPhone, BsShield } from "react-icons/bs";
import { MdOutlineSmartphone, MdVerified } from "react-icons/md";

export default function Signup() {

    return (
        <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
            <div className="bg-white py-6 min-w-120 rounded-2xl shadow border border-gray-300">
                <div className="flex flex-col gap-1 items-center">
                    <h2 className="font-bold text-teal-500 text-2xl">welcome to smartAuth</h2>
                    <p className="text-gray-500">Enter a mobile number to continue</p>
                </div>
                <form className="p-6">
                    <div className="flex flex-col gap-1">
                        <label className="font-medium text-sm text-gray-600">Phone number</label>
                        <div className="flex gap-1 border border-gray-300 px-2 py-3 rounded-lg">
                            <select>
                                <option>+1</option>
                                <option>+91</option>
                                <option>+44</option>
                                <option>+45</option>
                                <option>+234</option>
                            </select>
                            <input
                                placeholder="Enter your phone number"
                                className="w-full border border-gray-50 outline-0"
                            />
                        </div>
                        <span className="text-red-500 text-sm font-medium">Error: Mobile number error will diaply here</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-5">
                        <BsShield className="w-4 h-4 text-teal-500 shrink-0" />
                        <span className="text-sm">We'll send an OTP to verify your number. No password needed.</span>
                    </div>


                    <button className="w-full flex items-center justify-center gap-3 mt-10 bg-teal-500 text-white p-3 rounded-lg hover:shadow cursor-pointer hover:bg-teal-600 transition">
                        <BsArrowRight />
                        <span>Continue with OTP</span>
                    </button>
                </form>
            </div>

        </div>
    )
}