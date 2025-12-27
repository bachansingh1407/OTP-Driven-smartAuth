"use client";
import { BsPersonCheck, BsShieldLock } from "react-icons/bs";

export default function CompleteProfileModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-zinc-200 shadow-[0_40px_100px_rgba(0,0,0,0.25)]">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-zinc-200">
          <div className="flex items-center gap-3 text-teal-600 mb-3">
            <BsPersonCheck className="text-2xl" />
            <span className="text-sm font-medium tracking-wide">
              PROFILE REQUIRED
            </span>
          </div>

          <h2 className="text-xl font-semibold text-zinc-700">
            Complete your profile
          </h2>
          <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
            To ensure secure and accurate access, we need a few more details
            before you can continue using this workspace.
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-6 space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full h-11 rounded-lg border-2 border-zinc-400 px-3 text-sm outline-none focus:border-teal-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full h-11 rounded-lg border-2 border-zinc-400 px-3 text-sm outline-none focus:border-teal-500"
            />
          </div>

          {/* Role */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role / Responsibility
            </label>
            <input
              type="text"
              placeholder="e.g. Administrator, Analyst, Developer"
              className="w-full h-11 rounded-lg border-2 border-zinc-400 px-3 text-sm outline-none focus:border-teal-500"
            />
          </div> */}

          {/* Security Note */}
          <div className="flex items-start gap-2 text-xs text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-lg p-3">
            <BsShieldLock className="mt-0.5 text-teal-600 shrink-0" />
            This information is used for access control, audit logs, and account
            recovery.
          </div>
        </div>

        {/* Actions */}
        <div className="px-8 py-5 border-t border-zinc-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-800"
          >
            Complete later
          </button>

          <button
            className="px-5 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
