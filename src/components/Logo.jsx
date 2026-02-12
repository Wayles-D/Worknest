import { NavLink } from "react-router";

export default function Logo() {
  return (
    <>
      <NavLink to={"/"}>
        <img src="/worknestlogoo.png" alt="logo" className="lg:w-fit h-10 md:w-40" />
      </NavLink>
    </>
  );
      
}

