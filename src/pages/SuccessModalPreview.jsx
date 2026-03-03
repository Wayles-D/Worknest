import { useState } from "react";
import ApplicationSuccessModal from "@/components/ApplicationSuccessModal";

export default function SuccessModalPreview() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main className="min-h-screen bg-[#e9eaef] flex items-center justify-center p-6">
      <button
        type="button"
        className="px-4 py-2 rounded-lg border border-gray-700 text-gray-900"
        onClick={() => setIsOpen(true)}
      >
        Open Success Modal
      </button>

      <ApplicationSuccessModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onExploreMoreJobs={() => setIsOpen(false)}
        onTrackApplication={() => setIsOpen(false)}
        position="UI/UX Designer"
        companyName="XYZ Company"
      />
    </main>
  );
}
