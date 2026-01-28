import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { profileLinks, navLink, navAuthLink } from "@/libs/constant";
import { useAuth } from "@/context/AuthContext";

export default function Drawer() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    setOpen(false);
    navigate("/");
  };
  return (
    <>
      {/* guest sees menu icon */}
      {!user && (
        <button onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* logged in user sees avatar */}
      {user && (
        <button onClick={() => setOpen(true)} aria-label="Open profile menu">
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* close button */}
        <button
          className="absolute top-4 right-4"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 mt-8 flex flex-col h-full">
          {/* user info only when logged in */}
          {user && (
            <div className="mb-6 border-b pb-4">
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={user.avatar || "/tempAvatar.png"}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <p className="font-medium text-[20px] text-[#0E0E0E]">
                  {user.name}
                </p>
              </div>
              <p className="text-[16px] text-[#F89E85] font-light">
                {user.role}
              </p>
            </div>
          )}

          {/* {main nav links always shown} */}
          <nav className="flex flex-col gap-4">
            {navLink.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-[18px] ${isActive ? "text-[#F75D1F]" : "text-[#0E0E0E] hover:text-[#F75D1F]"}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Auth links only shown when not logged in */}
          {!user && (
            <div className="border-t pt-4 flex flex-col gap-3 mt-6">
              {navAuthLink.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-[18px] text-[#0E0E0E] ${isActive ? "text-[#F75D1F]" : "text-[#0E0E0E] hover:text-[#F75D1F]"}`
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          )}

          {/* {acct links only when logged in} */}
          {user && (
            <>
              <div className="border-t mt-6 pt-4 flex flex-col gap-2">
                {profileLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={() => setOpen?.(false)}
                      className="flex items-center gap-2  py-2 text-[#0E0E0E] text-[18px] text-sm hover:bg-[#de825a] active:bg-[#F85E1E] rounded-md"
                    >
                      {Icon && <Icon className="w-6 h-6 text-[#292D32]" />}
                      <span>{link.name}</span>
                    </NavLink>
                  );
                })}

                <button
                  className=" flex items-center gap-2 w-full py-2 text-sm hover:bg-[#de825a] active:bg-[#F85E1E] rounded-md"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-6 h-6 text-[#292D32]" />
                  <span className="text-[#0E0E0E] text-[18px]">Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
