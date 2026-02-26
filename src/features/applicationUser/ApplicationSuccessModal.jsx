import { useEffect, useId, useRef } from "react";
import { Circle, X } from "lucide-react";

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function SuccessIllustration() {
  return (
    <svg
      className="w-[280px] mt-12 lg:mt-12 md:mt-[22px] md:w-[min(220px,55vw)]"
      viewBox="0 0 280 200"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="72" y="44" width="110" height="105" rx="12" fill="#EFF2FB" />
      <rect x="72" y="54" width="110" height="10" rx="5" fill="#D7DEF3" />
      <rect x="90" y="84" width="82" height="10" rx="5" fill="#D2D9EE" />
      <rect x="90" y="102" width="62" height="8" rx="4" fill="#D8DEEF" />

      <path d="M36 92h28l16 20h120l-40 76H36z" fill="#FF5F17" />
      <path d="M36 92h24l16 20-40 76z" fill="#FF7C3C" />
      <rect x="144" y="122" width="38" height="12" rx="6" fill="#FFB26F" />

      <circle cx="160" cy="54" r="30" fill="#47D7A4" />
      <path
        d="m145 54 10 10 20-23"
        fill="none"
        stroke="#fff"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M24 30c8 0 8-12 8-12s0 12 8 12c-8 0-8 12-8 12s0-12-8-12Z"
        fill="#F8C11C"
      />
      <path
        d="M204 92c6 0 6-9 6-9s0 9 6 9c-6 0-6 9-6 9s0-9-6-9Z"
        fill="#F8C11C"
      />
      <circle cx="219" cy="106" r="5" fill="none" stroke="#F8C11C" strokeWidth="4" />
      <circle cx="58" cy="60" r="4" fill="#F8C11C" />
      <path
        d="M198 26l14-8m-4 20 16-10"
        stroke="#fff"
        strokeOpacity=".45"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ApplicationSuccessModal({
  isOpen,
  onClose,
  onExploreMoreJobs,
  onTrackApplication,
  companyName = "XYZ Company",
  position = "UI/UX Designer",
}) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const headingId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;

    previousFocusRef.current = document.activeElement;
    const modalElement = modalRef.current;

    const focusables = modalElement?.querySelectorAll(FOCUSABLE_SELECTOR);
    if (focusables?.length) closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
      }

      if (event.key !== "Tab" || !modalElement) return;

      const elements = Array.from(modalElement.querySelectorAll(FOCUSABLE_SELECTOR));
      if (!elements.length) {
        event.preventDefault();
        return;
      }

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[1200] flex items-center justify-center
        bg-[rgba(24,24,26,0.78)]
        p-8 md:p-6 max-sm:p-[18px]
      "
      onClick={onClose}
    >
      <section
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-label="Application submitted successfully"
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-[1100px]
          min-h-[650px] md:min-h-0
          bg-[#f8f8f8]
          rounded-[36px] md:rounded-[28px] max-sm:rounded-[24px]
          shadow-[0_26px_60px_rgba(0,0,0,0.18)]
          px-[74px] pt-[58px] pb-[56px]
          md:px-8 md:pt-[70px] md:pb-9
          max-sm:w-[92vw] max-sm:px-[18px] max-sm:pt-[62px] max-sm:pb-6
          flex flex-col items-center
        "
      >
        <p
          className="
            absolute left-[74px] top-9
            md:left-8 md:top-[22px]
            max-sm:left-[18px]
            m-0 text-[15px] md:text-[13px]
            tracking-[0.08em] font-medium text-[#8f9198]
          "
        >
          SUCCESSFULLY DONE
        </p>

        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close success modal"
          onClick={onClose}
          className="
            absolute right-[34px] top-[34px]
            md:right-5 md:top-[18px]
            w-[78px] h-[78px] md:w-14 md:h-14
            rounded-full bg-[#ff5f17] text-white
            grid place-items-center
            cursor-pointer
            transition
            hover:bg-[#e45210]
            active:scale-[0.96]
            focus-visible:outline focus-visible:outline-[3px]
            focus-visible:outline-[#ff9d6e]
            focus-visible:outline-offset-[3px]
          "
        >
          <X aria-hidden="true" className="h-10 w-10 md:h-7 md:w-7" strokeWidth={2.5} />
        </button>

        <SuccessIllustration />

        <h2
          id={headingId}
          className="
            mt-7 mb-[10px] md:mt-5
            text-center text-[#14151a] font-bold leading-[1.15]
            text-[clamp(34px,3.7vw,64px)]
            md:text-[clamp(32px,8vw,48px)]
          "
        >
          Application Submitted Successfully!
        </h2>

        <p
          className="
            m-0 max-w-[840px] md:max-w-[640px]
            text-center text-[#1a1b20] font-[450]
            leading-[1.24] max-sm:leading-[1.32]
            text-[clamp(20px,2.5vw,56px)]
            md:text-[clamp(18px,4.8vw,30px)]
          "
        >
          You applied for {position} at {companyName}. You can track your
          application&apos;s progress in the profile section
        </p>

        <div className="mt-[38px] w-full max-w-[940px] max-sm:w-full">
          <Circle
            aria-hidden="true"
            className="mx-auto mb-3 h-5 w-5 text-[#1f1f1f] fill-current"
            strokeWidth={1.5}
          />
          <div className="border-t-2 border-[#f5cbb4]" />
        </div>

        <div
          className="
            mt-[54px] md:mt-[30px]
            w-full max-w-[940px] max-sm:w-full
            grid grid-cols-2 md:grid-cols-1
            gap-[42px] md:gap-[18px]
          "
        >
          <button
            type="button"
            onClick={onExploreMoreJobs}
            className="
              min-h-[90px] md:min-h-[68px]
              rounded-[22px] md:rounded-[18px]
              border-[3px] border-[#ff5f17]
              bg-transparent
              text-[#ff5f17]
              font-medium leading-none
              text-[44px] md:text-[clamp(24px,5vw,34px)]
              transition
              hover:border-[#e45210] hover:text-[#e45210] hover:bg-[rgba(255,95,23,0.08)]
              active:translate-y-[1px]
              focus-visible:outline focus-visible:outline-[3px]
              focus-visible:outline-[#ff9d6e]
              focus-visible:outline-offset-[3px]
            "
          >
            Explore More Jobs
          </button>

          <button
            type="button"
            onClick={onTrackApplication}
            className="
              min-h-[90px] md:min-h-[68px]
              rounded-[22px] md:rounded-[18px]
              border-[3px] border-transparent
              bg-[#ff5f17]
              text-[#191919]
              font-medium leading-none
              text-[44px] md:text-[clamp(24px,5vw,34px)]
              transition
              hover:bg-[#e45210]
              active:translate-y-[1px]
              focus-visible:outline focus-visible:outline-[3px]
              focus-visible:outline-[#ff9d6e]
              focus-visible:outline-offset-[3px]
            "
          >
            Track My Application
          </button>
        </div>
      </section>
    </div>
  );
}

