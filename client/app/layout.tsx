"use client";

import { Inter } from 'next/font/google'
import "./globals.css";

import { store } from "@/redux/store";
import { Provider } from "react-redux";
import Navbar from "@/app/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen`}
        style={{ backgroundColor: "#000000" }}
      >
        <Provider store={store}>
          <Navbar />
          {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
