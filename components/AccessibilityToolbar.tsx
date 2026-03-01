"use client";

import { useState, useEffect } from "react";

type FontSize = "sm" | "md" | "lg" | "xl";

const SIZES: { value: FontSize; label: string }[] = [
  { value: "sm", label: "A–" },
  { value: "md", label: "A"  },
  { value: "lg", label: "A+" },
  { value: "xl", label: "A⁺⁺"},
];

const STORAGE_KEY = "a11y_font_size";
const DEFAULT: FontSize = "md";

function applySize(size: FontSize) {
  document.documentElement.setAttribute("data-font-size", size);
  localStorage.setItem(STORAGE_KEY, size);
}

export default function AccessibilityToolbar() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<FontSize>(DEFAULT);
  const [highContrast, setHighContrast] = useState(false);

  // Restore preferences on mount (localStorage is client-only)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as FontSize | null;
    const savedHC = localStorage.getItem("a11y_high_contrast") === "1";
    if (saved) setCurrent(saved);
    setHighContrast(savedHC);
  }, []);

  // Apply preferences whenever they change
  useEffect(() => {
    applySize(current);
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [current, highContrast]);

  function setSize(size: FontSize) {
    setCurrent(size);
    applySize(size);
  }

  function resetAll() {
    setSize(DEFAULT);
    setHighContrast(false);
    document.documentElement.classList.remove("high-contrast");
    localStorage.removeItem("a11y_high_contrast");
  }

  function toggleHighContrast() {
    const next = !highContrast;
    setHighContrast(next);
    if (next) {
      document.documentElement.classList.add("high-contrast");
      localStorage.setItem("a11y_high_contrast", "1");
    } else {
      document.documentElement.classList.remove("high-contrast");
      localStorage.removeItem("a11y_high_contrast");
    }
  }

  return (
    <>
      {/* Toggle tab — fixed to left edge */}
      <div
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center"
        style={{ direction: "ltr" }}
      >
        <button
          aria-label={open ? "סגור סרגל נגישות" : "פתח סרגל נגישות"}
          aria-expanded={open}
          onClick={() => setOpen((p) => !p)}
          className="bg-blue-600 hover:bg-blue-700 text-white writing-mode-vertical rounded-r-xl px-2 py-3 shadow-lg text-xs font-bold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 select-none"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          ♿ נגישות
        </button>
      </div>

      {/* Panel */}
      <div
        role="region"
        aria-label="סרגל נגישות"
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          open ? "translate-x-10 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"
        }`}
        style={{ direction: "ltr" }}
      >
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-r-2xl shadow-2xl p-4 flex flex-col gap-3 min-w-[160px] mr-0">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              נגישות
            </span>
            <button
              aria-label="סגור"
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg leading-none"
            >
              ×
            </button>
          </div>

          {/* Font size */}
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
              גודל טקסט
            </p>
            <div className="flex gap-1">
              {SIZES.map((s) => (
                <button
                  key={s.value}
                  aria-label={`גודל טקסט ${s.label}`}
                  aria-pressed={current === s.value}
                  onClick={() => setSize(s.value)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    current === s.value
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* High contrast */}
          <button
            aria-pressed={highContrast}
            onClick={toggleHighContrast}
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              highContrast
                ? "bg-yellow-400 text-black border-yellow-500"
                : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <span>◑</span>
            <span>ניגודיות גבוהה</span>
          </button>

          {/* Reset */}
          <button
            onClick={resetAll}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            ↺ איפוס
          </button>
        </div>
      </div>
    </>
  );
}
