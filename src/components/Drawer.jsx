import { Menu } from "lucide-react";
import { NavLink } from "react-router";

export default function Drawer() {
  return (
    <>
      <Menu className="w-6 h-6" />
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1"></div>
        {/* <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/jobs"}>Find Job</NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>About Us</NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>Contact Us</NavLink>
          </li>
          <li>
            <NavLink to={"/auth/login"}>Login</NavLink>
          </li>
          <li>
            <NavLink to={"/auth/signup"}>Join now</NavLink>
          </li>

        </ul> */}
      </div>
    </>
  );
}
