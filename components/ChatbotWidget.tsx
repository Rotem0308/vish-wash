"use client";

import { useState, useEffect, useRef } from "react";
import { BUSINESS_NAME, PHONE_NUMBER, WHATSAPP_URL, EMAIL } from "@/lib/data";

type MsgRole = "bot" | "user";

interface Message {
  id: number;
  role: MsgRole;
  text: string;
  options?: Option[];
  isHtml?: boolean;
}

interface Option {
  label: string;
  action: string;
}

let msgIdCounter = 0;
function makeMsg(role: MsgRole, text: string, options?: Option[], isHtml?: boolean): Message {
  return { id: ++msgIdCounter, role, text, options, isHtml };
}

const INITIAL_MESSAGES: Message[] = [
  makeMsg(
    "bot",
  `שלום! 👋 ברוכים הבאים ל‎${BUSINESS_NAME}.\nאנחנו מתמחים בניקוי משרדים, קליניקות, בתים ודירות.\nכיצד אוכל לעזור לכם היום?`,
    [
      { label: "📞 שיחה / וואטסאפ",     action: "contact"  },
      { label: "✉️ הצעת מחיר במייל",    action: "email"    },
      { label: "ℹ️ השירותים שלנו",       action: "services" },
    ]
  ),
];

export default function ChatbotWidget() {
  const [open, setOpen]         = useState(false);
  const [msgs, setMsgs]         = useState<Message[]>([]);
  const [appeared, setAppeared] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailSent, setEmailSent]   = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Seed messages when first opened
  useEffect(() => {
    if (open && msgs.length === 0) {
      // Slight delay to feel natural
      const t = setTimeout(() => {
        setMsgs([...INITIAL_MESSAGES]);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open, msgs.length]);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  // "New message" badge hint — show after 4s on page
  useEffect(() => {
    const t = setTimeout(() => setAppeared(true), 4000);
    return () => clearTimeout(t);
  }, []);

  function addMsg(msg: Message) {
    setMsgs((prev) => [...prev, msg]);
  }

  function botReply(text: string, options?: Option[], isHtml?: boolean) {
    setTimeout(() => addMsg(makeMsg("bot", text, options, isHtml)), 450);
  }

  function handleOption(action: string, label: string) {
    // Add user message
    addMsg(makeMsg("user", label));

    // Remove options from last bot message
    setMsgs((prev) =>
      prev.map((m) =>
        m.role === "bot" && m.options ? { ...m, options: undefined } : m
      )
    );

    if (action === "contact") {
      botReply(
        `בשמחה! 📞\n<strong>טלפון:</strong> <a href="tel:${PHONE_NUMBER}" class="underline font-semibold text-blue-600">${PHONE_NUMBER}</a>\n\nאפשר גם לשלוח הודעה ישירות בוואטסאפ:`,
        [
          { label: "💬 פתח וואטסאפ", action: "open_whatsapp" },
          { label: "🔙 חזרה לתפריט",  action: "main_menu"    },
        ],
        true
      );
    } else if (action === "open_whatsapp") {
      window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
      botReply("נפתח לכם חלון וואטסאפ 💬\nנשמח לשמוע מכם!", [
        { label: "🔙 חזרה לתפריט", action: "main_menu" },
      ]);
    } else if (action === "email") {
      botReply(
        "מצוין! השאירו את כתובת המייל שלכם ונשלח לכם הצעת מחיר בתוך 24 שעות ✉️",
        undefined
      );
      // Prompt email input via a special "email_form" action render
      setTimeout(() => {
        setMsgs((prev) => [
          ...prev,
          makeMsg("bot", "__email_form__"),
        ]);
      }, 600);
    } else if (action === "send_email") {
      if (!emailInput.trim()) return;
      const mailto = `mailto:${EMAIL}?subject=בקשת הצעת מחיר&body=שלום, אני מעוניין/ת בהצעת מחיר. כתובת המייל שלי: ${emailInput}`;
      window.location.href = mailto;
      setEmailSent(true);
      addMsg(makeMsg("user", emailInput));
      setMsgs((prev) =>
        prev.filter((m) => m.text !== "__email_form__")
      );
      botReply("תודה! 🙏 נציג יצור איתכם קשר בהקדם.\nניפתח לכם אפליקציית המייל לסיום השליחה.", [
        { label: "🔙 חזרה לתפריט", action: "main_menu" },
      ]);
    } else if (action === "services") {
      botReply(
        `הנה השירותים שלנו 🧹\n\n• 🏢 <strong>ניקוי משרדים</strong> – רצפות, שירותים ואזורים משותפים\n• 🏥 <strong>ניקוי קליניקות</strong> – לבני אדם ולבעלי חיים, חיטוי ברמה גבוהה\n• 🏠 <strong>ניקוי בתים ודירות</strong> – ניקוי יסודי לכל חדרי הבית\n• 🔄 <strong>ניקוי שוטף ותחזוקה</strong> – שבועי או דו-שבועי לפי הצורך`,
        [
          { label: "📞 לתיאום שיחה",      action: "contact"   },
          { label: "✉️ הצעת מחיר במייל", action: "email"     },
          { label: "🔙 חזרה לתפריט",      action: "main_menu" },
        ],
        true
      );
    } else if (action === "main_menu") {
      botReply("בטח! כיצד אוכל לעזור לכם?", [
        { label: "📞 שיחה / וואטסאפ",  action: "contact"  },
        { label: "✉️ הצעת מחיר במייל", action: "email"    },
        { label: "ℹ️ השירותים שלנו",    action: "services" },
      ]);
    }
  }

  return (
    /* Position above the floating WhatsApp button */
    <div className="fixed bottom-24 right-5 z-50 md:bottom-28 md:right-8 flex flex-col items-end gap-3">
      {/* Chat window */}
      {open && (
        <div
          className="chat-slide-up bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden"
          style={{ width: "min(340px, calc(100vw - 40px))", height: "min(500px, calc(100dvh - 160px))" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-base">
                🧹
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">{BUSINESS_NAME}</p>
                <p className="text-blue-100 text-xs">בדרך כלל עונים תוך שעתיים</p>
              </div>
            </div>
            <button
              aria-label="סגור צ'אט"
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white text-xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-gray-50 dark:bg-gray-950"
            dir="rtl"
          >
            {msgs.map((msg) => {
              // Email form special message
              if (msg.text === "__email_form__") {
                return (
                  <div key={msg.id} className="flex justify-start">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[85%] shadow-sm">
                      {emailSent ? (
                        <p className="text-sm text-green-600 font-medium">✅ נשלח!</p>
                      ) : (
                        <div className="flex gap-2 items-center">
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleOption("send_email", emailInput);
                            }}
                            className="flex-1 text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 outline-none focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 min-w-0"
                            dir="ltr"
                          />
                          <button
                            onClick={() => handleOption("send_email", emailInput)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 transition-colors"
                          >
                            שלח
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tl-sm"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-tr-sm"
                    }`}
                    {...(msg.isHtml
                      ? { dangerouslySetInnerHTML: { __html: msg.text } }
                      : { children: msg.text }
                    )}
                  />
                </div>
              );
            })}

            {/* Option buttons — rendered below last bot message */}
            {msgs.length > 0 && (() => {
              const lastBotWithOptions = [...msgs]
                .reverse()
                .find((m) => m.role === "bot" && m.options && m.options.length > 0);
              if (!lastBotWithOptions?.options) return null;
              return (
                <div key="options" className="flex flex-col gap-1.5 items-start pr-1" dir="rtl">
                  {lastBotWithOptions.options.map((opt) => (
                    <button
                      key={opt.action}
                      onClick={() => handleOption(opt.action, opt.label)}
                      className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 text-sm font-medium px-4 py-2 rounded-xl transition-colors shadow-sm text-right"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              );
            })()}

            <div ref={bottomRef} />
          </div>

          {/* Footer note */}
          <div className="px-3 py-2 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shrink-0">
            <p className="text-xs text-gray-400 text-center">
              בחרו אפשרות מהרשימה למעלה
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        aria-label={open ? "סגור צ'אט" : "פתח צ'אט"}
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
        className="relative w-14 h-14 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full flex items-center justify-center shadow-xl shadow-blue-300/40 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        {/* Notification badge */}
        {!open && appeared && msgs.length === 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold">
            1
          </span>
        )}
        <span className="text-2xl transition-transform duration-200" style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
          {open ? "✕" : "💬"}
        </span>
      </button>
    </div>
  );
}
