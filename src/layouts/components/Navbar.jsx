import React from "react";
import { NavLink } from "react-router";
import { navLink } from "@/libs/constant";
import { navAuthLink } from "@/libs/constant";
import Logo from "@/components/Logo";
import Drawer from "@/components/Drawer";

export default function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full shadow z-50 bg-white ">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Logo />

          <div className="hidden md:flex gap-5 items-center">
            {navLink.map((item) => (
              <NavLink to={item.path}>{item.name}</NavLink>
            ))}
          </div>

          <div className="hidden md:flex  gap-5 items-center">
            {navAuthLink.map((item) => (
              <NavLink to={item.path}>{item.name}</NavLink>
            ))}
          </div>
          <Drawer />
        </div>
      </nav>
    </>
  );
}
