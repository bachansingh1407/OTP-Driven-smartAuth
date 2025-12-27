"use client";
import { useState, useRef, useEffect } from "react";
import { FiX, FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { BsTerminal } from "react-icons/bs";

export default function LinuxTerminal({ onClose }) {
  const [history, setHistory] = useState([
    "Welcome to SmartAuth Terminal v2.1.4",
    "Type 'help' for available commands.",
    "",
    "user@smartauth:~$ █"
  ]);
  const [input, setInput] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Available commands
  const commands = {
    help: "Available commands: help, status, auth, profile, clear, exit",
    status: `System Status:
    ✅ Authentication: ACTIVE
    🔒 Security Level: HIGH
    👥 Sessions: 3 active
    🛡️ Firewall: ENABLED`,
    auth: `Authentication Log:
    • 14:05: User login successful (2FA verified)
    • 14:02: OTP sent to +91********10
    • 14:01: New session started`,
    profile: `User Profile:
    👤 Name: John Doe
    📧 Email: john@enterprise.com
    📱 Phone: +91 98765*****
    👔 Role: System Administrator`,
    clear: "clear",
    exit: "exit"
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === "clear") {
      setHistory([
        "SmartAuth Terminal v2.1.4",
        "Type 'help' for available commands.",
        "",
        "user@smartauth:~$ █"
      ]);
      return;
    }
    
    if (trimmedCmd === "exit") {
      onClose();
      return;
    }
    
    const response = commands[trimmedCmd] || `Command not found: ${cmd}. Type 'help' for commands.`;
    
    setHistory(prev => [
      ...prev.slice(0, -1), // Remove the cursor line
      `user@smartauth:~$ ${cmd}`,
      response,
      "",
      "user@smartauth:~$ █"
    ]);
  };

  // Auto-scroll and focus
  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight });
    inputRef.current?.focus();
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      executeCommand(input);
      setInput("");
    }
    if (e.key === "Escape") onClose();
  };

  const handleQuickCommand = (cmd) => {
    executeCommand(cmd);
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Terminal Window */}
      <div className={`bg-gray-900 text-gray-100 rounded-lg shadow-2xl overflow-hidden border border-gray-700
        ${isMaximized ? 'w-full h-full' : 'w-full max-w-3xl h-[500px]'}`}>
        
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <BsTerminal className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">SmartAuth Terminal</span>
          </div>
          
          {/* Window Controls */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 hover:bg-gray-700 rounded transition-colors"
            >
              {isMaximized ? (
                <FiMinimize2 className="w-3.5 h-3.5" />
              ) : (
                <FiMaximize2 className="w-3.5 h-3.5" />
              )}
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-red-600 rounded transition-colors"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="flex flex-col h-[calc(100%-56px)] font-mono">
          {/* Output Area */}
          <div 
            ref={terminalRef}
            className="flex-1 overflow-y-auto p-4 bg-gray-900"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          >
            {history.map((line, idx) => (
              <div key={idx} className="mb-1">
                {line === "user@smartauth:~$ █" ? (
                  <div className="flex items-center gap-2">
                    <span className="text-white">$:</span>
                    <span className="text-white animate-blink">█</span>
                  </div>
                ) : line.startsWith("user@smartauth:~$") ? (
                  <div className="flex items-center gap-2">
                    <span className="text-white">$:</span>
                    <span className="text-white ml-2">{line.split('$ ')[1]}</span>
                  </div>
                ) : (
                  <div className={
                    line.includes("✅") ? "text-green-400" :
                    line.includes("🔒") ? "text-blue-400" :
                    line.includes("⚠️") ? "text-yellow-400" :
                    "text-gray-300"
                  }>
                    {line}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-700 bg-gray-800 p-4">
           

            {/* Command Input */}
            <div className="flex items-center gap-2">
               <span className="text-gray-100 text-xs">$:</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-xs text-gray-100 caret-green-400"
                placeholder="Type command..."
                spellCheck="false"
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}