"use client";
import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { useAuth } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const InterSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function ProvideLayout({ children }) {
  const { initializeAuthAction } = useAuth();
  const { authLoader } = useSelector((state) => state.auth);

  useEffect(() => {
    initializeAuthAction();
  }, []);

  if (authLoader) {
    return (
      <html lang="en">
        <body className={`${InterSans.variable}  antialiased`}></body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${InterSans.variable}  antialiased`}>
        <Toaster position="top-right" reverseOrder={false} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
