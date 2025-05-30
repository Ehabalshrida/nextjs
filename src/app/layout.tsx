import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Course",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <ToastContainer theme='colored' position='top-center' />
        <main className='container' style={{ minHeight: "calc(100vh - 100px)" }}>
        {children}
        </main>

        <Footer/>
      </body>
    </html>
  );
}
//initial loading time for react greater than for next since it load the whole react project on the first time
// through bundle.js at once, but next loads the page on demand
// react use client side rendering while next use server side rendering, so react is use empty html file . so not frinedly to search engine