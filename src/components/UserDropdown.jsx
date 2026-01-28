import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { profileLinks } from "@/libs/constant";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown, LogOut} from "lucide-react";

export default function UserDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSignOut = () => {
    logout(); // clear user
    setOpen(false); // close dropdown
    navigate("/"); // redirect to home
  };

  return (
    <>
      <div className="relative flex items-center gap-3" ref={dropdownRef}>
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="User Avatar"
          className="w-9 h-9 rounded-full"
        />
        <span className="text-[18px] text-[#000000] font-medium">{user?.name}</span>
        <button
          type="button"
          aria-label="Open profile menu"
          onClick={() => setOpen((prev) => !prev)}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}  text-black w-6 h-6`} />
        </button>
        {/* Dropdown*/}
        {open && (
          <div className="absolute right-0 top-full mt-3 w-56 bg-white px-3 py-4 rounded-[10px] shadow-lg">
            {/* User info */}
            <div className="py-3 border-b-[0.5px] border-[#A0A0A0]">
              <p className="font-semibold text-[#0E0E0E] text-[18px]">{user?.name}</p>
              <p className="font-light text-[14px] text-[#F85E1E]">{user?.role}</p>
            </div>

            {/* Profile Links */}
            <div>
              {profileLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink 
                  key={link.name}
                  to={link.path}
                  onClick={() => setOpen?.(false)}
                  className="flex items-center gap-3  py-2 text-sm hover:bg-[#de825a] active:bg-[#F85E1E] rounded-md mb-1"
                >
                {Icon && <Icon className="w-6 h-6 text-[#292D32] mr-2" />}
                  <span className="text-[18px] text-[#0E0E0E]">{link.name}</span>
                </NavLink>
              )
            })}
            </div>

            {/* Sign Out */}
            <div>
               <button
                 onClick={handleSignOut}
                 className="flex items-center gap-3 w-full px-1 py-2 text-sm hover:bg-[#de825a] active:bg-[#F85E1E] rounded-md"
                >
                 <LogOut className="w-6 h-6 text-[#292D32] mr-2 " />
                 <span className="text-[18px] text-[#0E0E0E]">Sign Out</span>
               </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
