import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import ReduxProvider from "@/state/redux-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {
          // This is a hack to make the page fit the screen
        }
        <div className="flex flex-col h-screen">
          {
            // This is the navbar
          }
          <Navbar />
          {
            // This is the main content
          }
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
