"use client";
import { BsX, BsChatDots } from "react-icons/bs";

export default function HelpSupportModal({ onClose }) {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to Security Settings → Change Password and follow the instructions.",
    },
    {
      question: "How do I view my activity logs?",
      answer: "Click on 'Review Audit Trail' in the Audit & Logs section.",
    },
    {
      question: "Who can access my data?",
      answer: "Only authorized users with your role can access protected resources.",
    },
    {
      question: "How do I contact support?",
      answer: "You can email support@yourapp.com or open a live chat with our team.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <BsChatDots className="text-teal-600 text-xl" />
            <h2 className="text-xl font-semibold text-slate-900">
              Help & Support
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 transition"
          >
            <BsX size={20} />
          </button>
        </div>

        {/* FAQ List */}
        <div className="max-h-[400px] overflow-y-auto px-6 py-4 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl p-4 hover:shadow-sm transition"
            >
              <h3 className="text-sm font-medium text-slate-900">{faq.question}</h3>
              <p className="mt-1 text-xs text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
