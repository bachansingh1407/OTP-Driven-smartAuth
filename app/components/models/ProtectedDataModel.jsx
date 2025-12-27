"use client";
import { BsX } from "react-icons/bs";

export default function ProtectedDataModel({onClose}) {

  // Mock user info
  const userInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876******",
    lastLogin: "2025-12-26 14:05",
    lastIP: "192.168.0.105",
    device: "MacBook Pro",
    accountStatus: "Verified",
    profileCompletion: "85%",
  };

  return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-slate-700">
                User Info & Activity
              </h2>
              <button
                onClick={() => onClose()}
                className="rounded-md p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <BsX size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-4 space-y-3 max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
                <div className="font-medium">Full Name:</div>
                <div>{userInfo.name}</div>

                <div className="font-medium">Email:</div>
                <div>{userInfo.email}</div>

                <div className="font-medium">Phone:</div>
                <div>{userInfo.phone}</div>

                <div className="font-medium">Last Login:</div>
                <div>{userInfo.lastLogin}</div>

                <div className="font-medium">Last IP:</div>
                <div>{userInfo.lastIP}</div>

                <div className="font-medium">Device:</div>
                <div>{userInfo.device}</div>

                <div className="font-medium">Account Status:</div>
                <div>{userInfo.accountStatus}</div>

                <div className="font-medium">Profile Completion:</div>
                <div>{userInfo.profileCompletion}</div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => onClose()}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
  );
}
