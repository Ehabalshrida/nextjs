import React from "react";
import header from "@/components/header/style.module.scss";
import NavBar from "./navBar";
import Link from "next/link";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import LogoutButton from "./logoutButton";
export default async function Header() {
  const token = (await cookies()).get("jwtToken")?.value || "";
  const userPayload = verifyTokenForPage(token);
  return (
    <header className={header.header}>
      <NavBar isAdmin= {userPayload?.isAdmin || false} />
      <div className={header.btns}>
        {userPayload ? (
          <>
            <Link
              href="/profile"
              className="text-white font-bold md:text-xl capitalize"
            >
              {userPayload?.username}
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login" className={header.btn}>
              Login
            </Link>
            <Link href="/register" className={header.btn}>
              {" "}
              register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
