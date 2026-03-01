"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "/images/clean-1.jpg",
    caption: "ניקיון משרדים מקצועי",
    sub: "תוצאות ברמה גבוהה לכל סביבת עבודה",
  },
  {
    src: "/images/clean-2.jpg",
    caption: "ניקיון עמוק לבית",
    sub: "כל פינה נקייה ומבריקה",
  },
  {
    src: "/images/clean-3.jpg",
    caption: "ניקיון לאחר שיפוץ",
    sub: "מפנים אבק ופסולת בנייה ביסודיות",
  },
  {
    src: "/images/clean-4.jpg",
    caption: "חיטוי וסניטציה",
    sub: "סביבה בריאה לעסקים ולמשפחות",
  },
  {
    src: "/images/clean-5.jpg",
    caption: "ניקיון תעשייתי",
    sub: "ציוד מקצועי לכל גודל מתחם",
  },
  {
    src: "/images/clean-6.jpg",
    caption: "טיפול בשטיחים ורצפות",
    sub: "ניקוי עמוק המחזיר את הברק המקורי",
  },
  {
    src: "/images/clean-7.jpg",
    caption: "ניקיון חלונות וחזיתות",
    sub: "שקיפות מושלמת לכל מבנה",
  },
];

const AUTO_INTERVAL = 4500;

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % SLIDES.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length),
    []
  );

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, AUTO_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, next]);

  // Touch / swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <section aria-label="גלריית עבודות ניקוי" className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            הפרויקטים שלנו
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-lg">
            תמונות מעבודות אמיתיות שביצענו
          </p>
        </div>

        {/* Carousel wrapper */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl group"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="region"
          aria-label="גלריית תמונות"
        >
          {/* Slides */}
          <div className="relative h-64 sm:h-80 md:h-[26rem] lg:h-[30rem]">
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                aria-hidden={i !== current}
              >
                <Image
                  src={slide.src}
                  alt={slide.caption}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover"
                  priority={i === 0}
                />
                {/* Caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div
                  className={`absolute bottom-0 right-0 left-0 p-6 md:p-8 transition-all duration-700 ${
                    i === current
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <p className="text-white font-bold text-xl md:text-2xl drop-shadow-md">
                    {slide.caption}
                  </p>
                  <p className="text-white/80 text-sm md:text-base mt-1 drop-shadow">
                    {slide.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="הקודם"
            className="absolute top-1/2 right-3 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="הבא"
            className="absolute top-1/2 left-3 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`מעבר לשקופית ${i + 1}`}
                className={`rounded-full transition-all duration-300 focus:outline-none ${
                  i === current
                    ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Progress bar */}
          {!paused && (
            <div
              key={current}
              className="absolute bottom-0 left-0 h-[3px] bg-blue-400 z-20 carousel-progress"
            />
          )}
        </div>
      </div>
    </section>
  );
}
