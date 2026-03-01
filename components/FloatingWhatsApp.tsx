import { WHATSAPP_URL } from "@/lib/data";

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-pulse hidden md:flex fixed bottom-6 right-5 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-full items-center justify-center shadow-xl shadow-green-300/50 transition-colors duration-200 md:bottom-8 md:right-8"
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="w-7 h-7"
        aria-hidden="true"
      >
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.408.64 4.716 1.856 6.74L2 30l7.456-1.82A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.832-1.598l-.418-.25-4.424 1.08 1.12-4.304-.274-.44A11.47 11.47 0 014.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zM22.6 19.21c-.332-.166-1.962-.966-2.266-1.074-.304-.11-.524-.166-.746.166-.22.332-.856 1.074-1.05 1.294-.192.22-.386.248-.718.082-1.966-.984-3.254-1.756-4.548-3.98-.344-.59.344-.548.984-1.824.11-.22.054-.414-.028-.58-.082-.166-.746-1.796-1.02-2.458-.268-.644-.542-.554-.746-.564l-.636-.012a1.218 1.218 0 00-.884.414c-.304.332-1.158 1.132-1.158 2.762s1.186 3.204 1.35 3.426c.166.22 2.334 3.564 5.658 5.002.792.342 1.41.546 1.892.698.794.252 1.518.216 2.09.13.636-.094 1.962-.802 2.238-1.576.276-.774.276-1.436.192-1.576-.082-.14-.304-.22-.636-.386z" />
      </svg>
    </a>
  );
}
