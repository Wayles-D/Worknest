import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/store";
import { googleLoginUser } from "@/api/api";
import { toast } from "sonner";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";
const GOOGLE_SCRIPT_ID = "google-gsi-script";

/**
 * Injects the Google Identity Services script once into <head>.
 * Returns a promise that resolves when the script is ready.
 */
function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (document.getElementById(GOOGLE_SCRIPT_ID)) {
      // Script already present — wait for it to be ready
      if (window.google?.accounts?.id) {
        resolve();
      } else {
        const existing = document.getElementById(GOOGLE_SCRIPT_ID);
        existing.addEventListener("load", resolve);
        existing.addEventListener("error", () =>
          reject(new Error("Google Identity Services script failed to load.")),
        );
      }
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_SCRIPT_ID;
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = () =>
      reject(new Error("Google Identity Services script failed to load."));
    document.head.appendChild(script);
  });
}

export default function GoogleLoginButton() {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      console.warn(
        "[GoogleLoginButton] VITE_GOOGLE_CLIENT_ID is not set. Google Sign-In will not work.",
      );
      return;
    }

    let cancelled = false;

    loadGoogleScript()
      .then(() => {
        if (cancelled) return;

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        if (buttonRef.current && containerRef.current) {
          // Render the button inside the hidden div
          // We set width to match the container to ensure clickable area is maximized
          window.google.accounts.id.renderButton(buttonRef.current, {
            theme: "outline",
            size: "large",
            width: containerRef.current.offsetWidth,
            type: "standard",
            text: "continue_with",
          });
        }
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("[GoogleLoginButton] Script load error:", err.message);
        setError("Google Sign-In is currently unavailable. Please try again.");
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCredentialResponse = async (response) => {
    const credential = response.credential;

    setIsLoading(true);
    setError(null);

    try {
      const res = await googleLoginUser(credential);
      const token = res?.data?.data?.token || res?.data?.localJWT || null;

      if (!token) {
        throw new Error("No token received from server.");
      }

      localStorage.setItem("worknestToken", token);
      setAccessToken(token);

      toast.success("Login successful");
      navigate("/", { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Google Sign-In failed.";
      console.error("[GoogleLoginButton] Auth error:", message);
      setError("We couldn't sign you in with Google. Please try again.");
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full mt-4">
      {error && (
        <p
          className="text-red-600 text-sm text-center mb-3 absolute -top-8 w-full"
          role="alert"
        >
          {error}
        </p>
      )}

      {/* Visual Custom Button */}
      <button
        type="button"
        disabled={isLoading}
        className="btn border border-[rgba(247,95,32,1)] text-[rgba(247,95,32,1)] w-full rounded-lg h-11 hover:bg-[#FFA366] hover:text-white flex items-center justify-center cursor-pointer transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          "Signing you in..."
        ) : (
          <>
            <img src="/gog.svg" className="w-5 h-5 mr-2" alt="" />
            Continue with Google
          </>
        )}
      </button>

      {/* Invisible Google Button Overlay */}
      {/* Opacity 0 makes it invisible but clickable. z-10 places it above the custom button. */}
      {GOOGLE_CLIENT_ID && (
        <div
          ref={buttonRef}
          className="absolute inset-0 z-10 opacity-0 overflow-hidden"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
