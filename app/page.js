"use client";

import { useState } from "react";
import { BsShieldCheck, BsActivity, BsDatabase, BsClockHistory } from "react-icons/bs";
import { HiOutlineCommandLine } from "react-icons/hi2";
import CompleteProfileModal from "./components/models/CompleteProfileModal";
import TerminalPanel from "./components/panel/TerminalPanel";
import ActivityModal from "./components/models/ActivityModel";
import HelpSupportModal from "./components/models/HelpSupportModel";
import ProtectedDataModel from "./components/models/ProtectedDataModel";


export default function Home() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showProtectedDataModal, setShowProtectedDataModal] = useState(false);


  const handleLogout = () => {
    alert("Logging out...");
    // Implement actual logout here
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-montserrat">

      {/* Top Bar */}
      <header className="h-16 bg-white border-b border-zinc-200 flex items-center px-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white">
            <BsShieldCheck />
          </div>
          <span className="font-semibold text-zinc-800">
            Secure Workspace
          </span>
        </div>

        <div className="ml-auto flex items-center gap-6 text-sm text-zinc-500">
          Session active
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-md bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-8 py-14">

        {/* Welcome Section */}
        <section className="mb-12">
          <h1 className="text-3xl font-semibold text-zinc-900">
            Access Granted
          </h1>
          <p className="mt-3 text-zinc-600 max-w-2xl">
            You are now authenticated and connected to a protected environment.
            Only authorized personnel can view or modify resources in this workspace.
          </p>
        </section>

        {/* Status Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* System Status */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3 text-teal-600">
              <BsActivity className="text-xl" />
              <h3 className="font-medium text-zinc-800">
                System Logs
              </h3>
            </div>
            <p className="text-sm text-zinc-600">
              Track recent logins, profile changes, and security events.
            </p>
            <button
              onClick={() => setShowActivityModal(true)}
              className="mt-4 text-teal-600 text-sm font-medium hover:underline"
            >
              View System Logs
            </button>
          </div>

          {/* Protected Data */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3 text-teal-600">
              <BsDatabase className="text-xl" />
              <h3 className="font-medium text-zinc-800">
                Protected Data
              </h3>
            </div>
            <p className="text-sm text-zinc-600">
              Sensitive records are encrypted and access-controlled.
            </p>
            <button
              className="mt-4 text-teal-600 text-sm font-medium hover:underline"
              onClick={() => setShowProtectedDataModal(true)}
            >
              Access Data Vault
            </button>

          </div>

          {/* Audit & Logs */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3 text-teal-600">
              <HiOutlineCommandLine className="text-xl" />
              <h3 className="font-medium text-zinc-800">
                Terminal Panel
              </h3>
            </div>
            <p className="text-sm text-zinc-600">
              All actions are monitored and logged for compliance and security review.
            </p>
            <button
              onClick={() => setShowTerminal(true)}
              className="mt-4 text-teal-600 text-sm font-medium hover:underline"
            >
              Open Terminal
            </button>
          </div>

        </section>

        {/* Callout / Next Steps */}
        <section className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900 mb-2">
            Next Steps
          </h2>
          <p className="text-sm text-zinc-600 max-w-2xl">
            Complete your user profile to unlock full access to your workspace and additional secure tools.
            Ensure all information is accurate to maintain compliance with our security policies.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => setShowProfileModal(true)}
              className="px-5 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition"
            >
              Complete Profile
            </button>

            <button
              onClick={() => setShowSecurityModal(true)}
              className="px-5 py-2.5 rounded-lg bg-gray-100 text-zinc-700 text-sm font-medium hover:bg-gray-200 transition"
            >
              Security Settings
            </button>

            <button
              onClick={() => setShowHelp(true)}
              className="px-5 py-2.5 rounded-lg bg-gray-100 text-zinc-700 text-sm font-medium hover:bg-gray-200 transition"
            >
              Help & Support
            </button>
          </div>
        </section>
      </main>

      {/* Modals */}
      {showProfileModal && <CompleteProfileModal onClose={() => setShowProfileModal(false)} />}
      {showTerminal && <TerminalPanel onClose={() => setShowTerminal(false)} />}
      {showActivityModal && <ActivityModal onClose={() => setShowActivityModal(false)} />}
      {showHelp && <HelpSupportModal onClose={() => setShowHelp(false)} />}
        {showSecurityModal}
      {showProtectedDataModal && (
        <ProtectedDataModel onClose={() => setShowProtectedDataModal(false)} />
      )}
    </div>
  );
}
