import { useRef } from "react";
import { useNavigate } from "react-router";

export default function Email() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleSubmit = () => {
    setTimeout(() => {
      formRef.current.reset();
      navigate("/");
    }, 1000);
  };

  return (
    <div>
      <form
        ref={formRef}
        action="https://6895434f.sibforms.com/serve/MUIFANRku4PN0KMxKahwWGO1ORB5zOu67COxJ3rr1Bso5Cs7c_JIGOSCAXZB2UNaqJ1nZSD2ieGixCGzBQr851TjxVYZ-i9Fn5bEhlSizAyEQ1xvWYXd943LhmM9ihJJc3uP4cMaStT653nVB4I4A6kM-HbIRhBjhin86M5W_uGzT_4vgJsO1z9V2FkW2u1JYjSMt5XgASPL9cL57g=="
        method="POST"
        target="hidden_iframe"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="mt-5 w-full rounded-[13px] border border-[#727171] p-3
           placeholder:text-[18px] text-[#6B7280] font-semibold"
        />
        <button
          type="submit"
          className="mt-3 w-full rounded-[13px] bg-[#F85E1E] p-3 text-[#FFFFFF]"
        >
          <p className="text-[18px] font-semibold">Subscribe</p>
        </button>
      </form>

      <iframe
        name="hidden_iframe"
        style={{ display: "none" }}
        title="hidden"
      ></iframe>
    </div>
  );
}
