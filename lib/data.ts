export const PHONE_NUMBER =
  process.env.NEXT_PUBLIC_PHONE_NUMBER || "+972501234567";
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "972501234567";
export const EMAIL =
  process.env.NEXT_PUBLIC_EMAIL || "info@vishwash.co.il";
export const BUSINESS_NAME =
  process.env.NEXT_PUBLIC_BUSINESS_NAME || "Vish Wash";
export const CITY =
  process.env.NEXT_PUBLIC_CITY || "תל אביב";
export const ADDRESS =
  process.env.NEXT_PUBLIC_ADDRESS || "רחוב הרצל 123, תל אביב, ישראל";
export const SERVICE_AREA =
  process.env.NEXT_PUBLIC_SERVICE_AREA || "מהרצליה ועד קיסריה";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "ניקוי משרדים",
    description:
      "ניקוי יסודי של משרדים קטנים – שולחנות, רצפות, שירותים ומטבחון. צוות של 1–2 עובדים שמגיע בזמן ועושה עבודה מושלמת.",
    icon: "🏢",
  },
  {
    id: 2,
    title: "ניקוי קליניקות",
    description:
      "ניקוי וחיטוי קליניקות לבני אדם ולבעלי חיים – חדרי המתנה, חדרי טיפול ומשטחי מגע. עמידה בתקני תברואה להגנה על מטופלים וצוות.",
    icon: "🏥",
  },
  {
    id: 3,
    title: "ניקוי בתים ודירות",
    description:
      "ניקוי יסודי של בתים ודירות – סלון, חדרי שינה, מטבח, אמבטיה ושירותים. מתאים לניקוי שוטף או חד-פעמי.",
    icon: "🏠",
  },
  {
    id: 4,
    title: "ניקוי שוטף ותחזוקה",
    description:
      "ניקוי חוזר ואמין לפי לוח הזמנים שלכם – שבועי או דו-שבועי. איכות עקבית עם צוות קבוע של 1–2 עובדים.",
    icon: "🔄",
  },
];

export interface TrustItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const trustItems: TrustItem[] = [
  {
    id: 1,
    icon: "⚡",
    title: "מענה מהיר",
    description: "אנחנו מגיבים לבקשות הצעת מחיר תוך שעתיים – מובטח.",
  },
  {
    id: 2,
    icon: "🤝",
    title: "שירות אישי",
    description:
      "צוות קטן ומסור של 1–2 עובדים שמכירים את המקום שלכם ונותנים יחס אישי.",
  },
  {
    id: 3,
    icon: "📅",
    title: "גמישות בזמנים",
    description:
      "בוקר, ערב או סופי שבוע – אנחנו מתאימים את עצמנו לשעות שלכם.",
  },
  {
    id: 4,
    icon: "✅",
    title: "אחריות על שביעות רצון",
    description:
      "לא מרוצים? נחזור ונתקן – ללא עלות נוספת.",
  },
];
