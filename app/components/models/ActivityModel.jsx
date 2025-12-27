"use client";
import { useState } from "react";
import {
  BsLaptop,
  BsPersonCheck,
  BsShieldLock,
  BsBoxArrowInRight,
} from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function ActivityModal({ onClose }) {
  const [filter, setFilter] = useState("all");

  const activities = [
    { id: 1, type: "login", action: "User signed in", time: "14:05", device: "MacBook Pro", date: "Today" },
    { id: 2, type: "security", action: "OTP verified", time: "14:02", device: "iPhone 14", date: "Today" },
    { id: 3, type: "data", action: "Accessed dashboard", time: "13:45", device: "MacBook Pro", date: "Today" },
    { id: 4, type: "profile", action: "Profile updated", time: "13:30", device: "Web Browser", date: "Today" },
    { id: 5, type: "security", action: "Security alert triggered", time: "12:15", device: "Unknown device", date: "Yesterday" },
    { id: 6, type: "data", action: "Data exported", time: "11:45", device: "MacBook Pro", date: "Yesterday" },
    { id: 7, type: "login", action: "New session started", time: "10:30", device: "Android", date: "Yesterday" },
  ];

  const filtered =
    filter === "all"
      ? activities
      : activities.filter((a) => a.type === filter);

  // Group by date
  const grouped = filtered.reduce((acc, item) => {
    (acc[item.date] = acc[item.date] || []).push(item);
    return acc;
  }, {});

  const typeIcon = {
    login: <BsBoxArrowInRight className="text-blue-500" />,
    security: <BsShieldLock className="text-red-500" />,
    data: <BsLaptop className="text-teal-500" />,
    profile: <BsPersonCheck className="text-purple-500" />,
  };

  const typeLabel = {
    all: "All",
    login: "Login",
    security: "Security",
    data: "Data",
    profile: "Profile",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Activity & Audit Logs
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Your recent security and usage events
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 transition"
          >
            <AiOutlineArrowRight size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex gap-3 overflow-x-auto">
          {Object.keys(typeLabel).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`text-sm font-medium px-4 py-2 rounded-full transition ${
                filter === t
                  ? "bg-teal-600 text-white"
                  : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
              }`}
            >
              {typeLabel[t]}
            </button>
          ))}
        </div>

        {/* Activity List */}
        <div className="px-6 py-4 max-h-[440px] overflow-y-auto space-y-6">

          {Object.keys(grouped).length === 0 && (
            <div className="text-center text-slate-400 text-sm py-16">
              No activity found
            </div>
          )}

          {Object.entries(grouped).map(([date, items]) => (
            <div key={date} className="space-y-4">
              <div className="text-xs font-semibold text-slate-500 uppercase">
                {date}
              </div>

              <div className="space-y-3">
                {items.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-3 bg-white shadow-sm border border-slate-200 rounded-xl p-4"
                  >
                    {/* Icon */}
                    <div className="shrink-0 text-xl">
                      {typeIcon[a.type]}
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">
                        {a.action}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>{a.time}</span>
                        <span className="before:block before:w-1 before:h-1 before:bg-slate-300 before:rounded-full before:mr-2">
                          {a.device}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            {filtered.length} events shown
          </span>
          <div className="flex gap-3">
            <button className="px-3 py-1 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
              Download Logs
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-slate-700 rounded-lg hover:bg-gray-200 transition">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
