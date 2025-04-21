import React from "react";
import AdminSidebar from "./adminSidebar";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/utils/verifyToken";
// to apply metadata to the page, we need to export a metadata object from the page file
// since this is layout file, so meta data will apply to all the pages that use this layout
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "admin page",
};

export default async function Adminlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("jwtToken")?.value || "";
  if (!token) { redirect("/login"); }
    const userPayload = verifyTokenForPage(token);
    if (!userPayload || !userPayload.isAdmin) { redirect("/"); }
  return (
    <div className="flex flex-row justify-start items-start gap-2">
      <AdminSidebar/>
      {/* children here represents all routes inside admin folder */}
      <div className="w-11/12 lg:w-3/4">{children}</div> 
      
    </div>
  );
}
