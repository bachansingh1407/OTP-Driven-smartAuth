"use client";
import { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

export default function CustomDropdown({
  value,
  options = [],
  onChange,
  loading = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.code === value);

  const filteredOptions =
    search.trim() === ""
      ? options
      : options.filter(
          (o) =>
            o.country.toLowerCase().includes(search.toLowerCase()) ||
            o.code.includes(search)
        );

  // Reset highlight when options change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [search, isOpen]);

  // Scroll highlighted option into view
  useEffect(() => {
    const el = listRef.current?.children[highlightedIndex];
    el?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex]);

  const handleSelect = (code) => {
    onChange(code);
    setIsOpen(false);
    setSearch("");
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, filteredOptions.length - 1)
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;

      case "Enter":
        e.preventDefault();
        const option = filteredOptions[highlightedIndex];
        if (option) handleSelect(option.code);
        break;

      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setSearch("");
        break;

      default:
        break;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="outline-0 flex items-center gap-2 py-2 px-2 hover:bg-gray-100 rounded-md transition"
      >
        <span className="font-medium text-gray-900 text-sm">
          {selected?.code || "+91"}
        </span>
        <BsChevronDown
          className={`text-gray-500 text-xs transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute overflow-hidden top-full -left-2 mt-2 z-50 w-58 bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* Search */}
          <div className="p-2  bg-gray-100">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search country or code…"
              className="outline-0 w-full h-11 px-3 text-sm border border-gray-300 rounded-md bg-white"
            />
          </div>

          {/* Options */}
          <div
            ref={listRef}
            role="listbox"
            className="max-h-52 overflow-y-auto"
          >
            {loading ? (
              <div className="py-8 text-center text-sm text-gray-500">
                Loading…
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-500">
                No countries found
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <button
                  key={option.key}
                  role="option"
                  aria-selected={value === option.code}
                  onClick={() => handleSelect(option.code)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`outline-0 w-full px-4 py-3 text-left flex items-center justify-between ${
                    index === highlightedIndex
                      ? "bg-teal-500 text-white"
                      : ""
                  } ${
                    value === option.code
                      ? "bg-teal-600 text-white"
                      : "text-gray-700"
                  }`}
                >
                 <div className="font-medium text-sm"> {option.country} </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
