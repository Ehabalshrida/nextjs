"use client";
// event handlers, hooks only used with client components, to change component to client component, add the following code to the file:
// 'use client'
import React, { useState } from "react";
import { SiNextdotjs } from "react-icons/si";
import header from "@/components/header/style.module.scss";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
interface NavBarProps {
  isAdmin: boolean;
}
export default function NavBar({isAdmin}:NavBarProps) {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className={header.nav}>
      <div className={header.logo}>
        {" "}
        <Link href="./">
          <SiNextdotjs style={{ width: "50px", height: "50px" }} />
        </Link>
      </div>
      <div className={header.menu}>
        {!toggle ? (
          <CiMenuBurger
            onClick={() => {
              setToggle((prev) => !prev);
            }}
          />
        ) : (
          <IoCloseSharp  onClick={() => {
            setToggle((prev) => !prev);
          }}/>
        )}
      </div>
      <div
        className={header.navLinksWrapper}
        style={{
          clipPath: toggle ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "",
        }}
      >
        <ul className={header.navLinks} >
          <Link
            onClick={() => {
              setToggle(false);
            }}
            className={header.navLink}
            href="/"
          >
            Home
          </Link>
         <Link
            onClick={() => {
              setToggle(false);
            }}
            className={header.navLink}
            href="/about"
          >
            About
          </Link>
          <Link
            onClick={() => {
              setToggle(false);
            }}
            className={header.navLink}
            href="/articles/?pageNumber=1"
          >
            Articles
          </Link>
          {isAdmin&&<Link
            onClick={() => {
              setToggle(false);
            }}
            className={header.navLink}
            href="/admin"
          >
            Admin
          </Link>}
        </ul>
      </div>
    </nav>
  );
}
// https://bennettfeely.com/clippy/