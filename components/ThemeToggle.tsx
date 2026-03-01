"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeValue = "light" | "dark" | "system";

const CYCLE: ThemeValue[] = ["light", "dark", "system"];

const ICONS: Record<ThemeValue, { icon: React.ReactNode; label: string }> = {
  light:  { icon: <SunIcon />,    label: "בהיר" },
  dark:   { icon: <MoonIcon />,   label: "כהה" },
  system: { icon: <SystemIcon />, label: "מערכת" },
};

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const current = (CYCLE.includes(theme as ThemeValue) ? theme : "system") as ThemeValue;
  const { icon, label } = ICONS[current];

  function cycle() {
    const idx = CYCLE.indexOf(current);
    setTheme(CYCLE[(idx + 1) % CYCLE.length]);
  }

  return (
    <button
      aria-label={`ערכת נושא: ${label} — לחץ לשינוי`}
      title={label}
      onClick={cycle}
      className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {icon}
    </button>
  );
}
