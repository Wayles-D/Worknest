import { NavLink } from "react-router";

export default function Logo() {
      const isAdminAuth = location.pathname.startsWith("/admin");
  return (
    <>
      <NavLink to={isAdminAuth ? "/admin" : "/"}>
        <img src="/worknestlogoo.png" alt="logo" className="lg:w-fit h-10 md:w-40" />
      </NavLink>
    </>
  );
      
}

