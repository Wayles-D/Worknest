import React from "react";
import { NavLink } from "react-router";

export default function Logo() {
  return (
    <>
      <NavLink to={"/"}>
        <img src="/worknestLogo.png" alt="logo" className="w-fit h-10" />
      </NavLink>
    </>
  );
}
