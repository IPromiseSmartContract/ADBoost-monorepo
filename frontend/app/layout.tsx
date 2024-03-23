import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavgationBar from "@/layouts/NavgationBar";
import RootContainer from "@/layouts/RootContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdsBoost",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" data-theme="sunset">
        <body
          className={
            inter.className +
            "w-full max-w-7xl mx-auto flex min-h-screen flex-col justify-start"
          }
        >
          <RootContainer>
            <NavgationBar />
            {children}
          </RootContainer>
        </body>
    </html>
  );
}
