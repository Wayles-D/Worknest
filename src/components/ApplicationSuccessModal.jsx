import { useEffect, useId, useRef } from "react";
import styles from "./ApplicationSuccessModal.module.css";

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
      className={styles.illustration}
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

      <path d="M24 30c8 0 8-12 8-12s0 12 8 12c-8 0-8 12-8 12s0-12-8-12Z" fill="#F8C11C" />
      <path d="M204 92c6 0 6-9 6-9s0 9 6 9c-6 0-6 9-6 9s0-9-6-9Z" fill="#F8C11C" />
      <circle cx="219" cy="106" r="5" fill="none" stroke="#F8C11C" strokeWidth="4" />
      <circle cx="58" cy="60" r="4" fill="#F8C11C" />
      <path d="M198 26l14-8m-4 20 16-10" stroke="#fff" strokeOpacity=".45" strokeWidth="6" strokeLinecap="round" />
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
    if (focusables?.length) {
      closeButtonRef.current?.focus();
    }

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
    <div className={styles.overlay} onClick={onClose}>
      <section
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-label="Application submitted successfully"
        onClick={(event) => event.stopPropagation()}
      >
        <p className={styles.label}>SUCCESSFULLY DONE</p>

        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          aria-label="Close success modal"
          onClick={onClose}
        >
          <span aria-hidden="true">✕</span>
        </button>

        <SuccessIllustration />

        <h2 id={headingId} className={styles.heading}>
          Application Submitted Successfully!
        </h2>

        <p className={styles.description}>
          You applied for {position} at {companyName}. You can track your
          application&apos;s progress in the profile section
        </p>

        <div className={styles.separatorWrap}>
          <span className={styles.dot} aria-hidden="true">
            •
          </span>
          <div className={styles.separator} />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.outlineButton} onClick={onExploreMoreJobs}>
            Explore More Jobs
          </button>
          <button type="button" className={styles.solidButton} onClick={onTrackApplication}>
            Track My Application
          </button>
        </div>
      </section>
    </div>
  );
}
